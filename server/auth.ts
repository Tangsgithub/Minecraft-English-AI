import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import fs from 'fs';
import path from 'path';


let db: any = null;
try {
  // Use absolute path fallback for Vercel, or try requiring it directly
  let configData;
  if (process.env.FIREBASE_APPLET_CONFIG) {
    try {
      configData = JSON.parse(process.env.FIREBASE_APPLET_CONFIG);
    } catch (e) {
      console.warn("Could not parse FIREBASE_APPLET_CONFIG env var", e);
    }
  }

  if (!configData) {
    try {
     // Dynamic require so esbuild/Vercel tracks it if possible, or we fallback to reading it
     const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
     if (fs.existsSync(configPath)) {
       configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
     } else {
       const dirConfigPath = path.join(__dirname, '../firebase-applet-config.json');
       if (fs.existsSync(dirConfigPath)) {
         configData = JSON.parse(fs.readFileSync(dirConfigPath, 'utf8'));
       }
     }
  } catch (e) {
       console.warn("Could not read config via fs", e);
    }
  }

  if (configData) {
    const app = initializeApp(configData);
    db = getFirestore(app, configData.firestoreDatabaseId || '(default)');
    console.log('[Server Firestore Proxy] Initialized successfully with DB:', configData.firestoreDatabaseId);
  } else {
    console.warn('[Server Firestore Proxy] firebase-applet-config.json not found');
  }
} catch (err) {
  console.error('[Server Firestore Proxy] Initialization failed:', err);
}


const getSafeDocId = (email: string) => email.toLowerCase().trim().replace(/[^a-zA-Z0-9_.-]/g, '_');

export async function checkUserExistsServer(email: string, nickname?: string): Promise<{ exists: boolean; reason?: 'email' | 'nickname' }> {
  if (!db) return { exists: false };

  const cleanEmail = email.toLowerCase().trim();
  const safeDocId = getSafeDocId(cleanEmail);

  try {
    // 1. Check account index document
    const indexRef = doc(db, 'user_accounts', safeDocId);
    const indexSnap = await getDoc(indexRef);
    if (indexSnap.exists()) {
      return { exists: true, reason: 'email' };
    }

    // 2. Query users collection by email
    const usersRef = collection(db, 'users');
    const qEmail = query(usersRef, where('email', '==', cleanEmail));
    const snapEmail = await getDocs(qEmail);
    if (!snapEmail.empty) {
      return { exists: true, reason: 'email' };
    }

    // 3. Query nickname if provided
    if (nickname && nickname.trim()) {
      const qNick = query(usersRef, where('nickname', '==', nickname.trim()));
      const snapNick = await getDocs(qNick);
      if (!snapNick.empty) {
        return { exists: true, reason: 'nickname' };
      }
    }
  } catch (err) {
    console.warn('[Server Firestore] Deduplication check warning:', err);
  }

  return { exists: false };
}

export async function registerUserServer(email: string, password: string, nickname: string, initialProfile: any) {
  const cleanEmail = email.toLowerCase().trim();
  const safeDocId = getSafeDocId(cleanEmail);

  const dup = await checkUserExistsServer(cleanEmail, nickname);
  if (dup.exists) {
    if (dup.reason === 'email') {
      return { success: false, message: '该邮箱/用户名已被注册！请直接登录或修改密码。' };
    } else {
      return { success: false, message: '该玩家昵称已被占用！请修改昵称重试。' };
    }
  }

  const uid = 'mc-user-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
  const cleanProfile = {
    ...initialProfile,
    id: uid,
    email: cleanEmail,
    nickname: nickname.trim(),
    isInitialSetupDone: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (db) {
    try {
      // Write user profile to users collection
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, cleanProfile, { merge: true });

      // Write index to user_accounts collection
      const indexRef = doc(db, 'user_accounts', safeDocId);
      await setDoc(indexRef, {
        uid,
        email: cleanEmail,
        nickname: nickname.trim(),
        password,
        profile: cleanProfile,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });

      console.log(`[Server Firestore] Registered user ${cleanEmail} (uid: ${uid}) in Firestore`);
    } catch (err: any) {
      console.error('[Server Firestore] Registration save failed:', err);
    }
  }

  return {
    success: true,
    profile: cleanProfile,
    message: '注册成功！全量数据已中转保存至 Firestore 云端数据库。'
  };
}

export async function loginUserServer(email: string, password: string) {
  const cleanEmail = email.toLowerCase().trim();
  const safeDocId = getSafeDocId(cleanEmail);

  if (db) {
    try {
      // 1. Try index doc
      const indexRef = doc(db, 'user_accounts', safeDocId);
      const indexSnap = await getDoc(indexRef);

      if (indexSnap.exists()) {
        const accData = indexSnap.data();
        if (accData.password && accData.password !== password) {
          return { success: false, reason: 'wrong_password', message: '密码不正确，请重新输入或使用【修改密码】！' };
        }
        if (!accData.password) {
          return { success: false, reason: 'needs_client_auth', message: '该账号为早期注册，缺少服务端密码。请前往【修改密码】直接设置新密码后即可登录！' };
        }

        let userProfile = accData.profile;
        if (!userProfile && accData.uid) {
          const userSnap = await getDoc(doc(db, 'users', accData.uid));
          if (userSnap.exists()) {
            userProfile = userSnap.data();
          }
        }

        return {
          success: true,
          profile: userProfile || {
            id: accData.uid || 'fs-' + Date.now(),
            email: cleanEmail,
            nickname: accData.nickname || 'Minecraft探险家',
            isInitialSetupDone: true
          },
          message: '登录成功！(服务器中转直连 Firestore)'
        };
      }

      // 2. Query users collection
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', cleanEmail));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const userDoc = snap.docs[0].data();
        if (userDoc.password && userDoc.password !== password) {
          return { success: false, reason: 'wrong_password', message: '密码不正确，请重新输入或使用【修改密码】！' };
        }
        if (!userDoc.password) {
          return { success: false, reason: 'needs_client_auth', message: '该账号缺少服务端密码。请前往【修改密码】直接设置新密码后即可登录！' };
        }
        return {
          success: true,
          profile: userDoc,
          message: '登录成功！(从 Firestore 查询载入)'
        };
      }
    } catch (err: any) {
      console.error('[Server Firestore] Login query error:', err);
    }
  }

  return {
    success: false,
    message: '账号不存在或密码不匹配，请先【注册账号】！'
  };
}

export async function changePasswordServer(email: string, newPassword: string, oldPassword?: string) {
  const cleanEmail = email.toLowerCase().trim();
  const safeDocId = getSafeDocId(cleanEmail);

  if (!db) {
    return { success: false, message: '服务器数据库连接异常，请重试' };
  }

  try {
    const indexRef = doc(db, 'user_accounts', safeDocId);
    const indexSnap = await getDoc(indexRef);

    if (indexSnap.exists()) {
      const accData = indexSnap.data();
      if (oldPassword && accData.password && accData.password !== oldPassword) {
        return { success: false, message: '原密码输入不正确，校验未通过！' };
      }

      await setDoc(indexRef, {
        password: newPassword,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      if (accData.uid) {
        await setDoc(doc(db, 'users', accData.uid), {
          password: newPassword,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }

      return { success: true, message: '密码修改成功！已在 Firestore 中转全量更新。' };
    } else {
      // Create index if missing
      await setDoc(indexRef, {
        email: cleanEmail,
        password: newPassword,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      return { success: true, message: '密码已成功更新并中转同步！' };
    }
  } catch (err: any) {
    console.error('[Server Firestore] Change password error:', err);
    return { success: false, message: '修改密码失败: ' + (err.message || '网络问题') };
  }
}

export async function saveProfileServer(profile: any, uid: string) {
  if (!db || !uid) return { success: false };

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...profile,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    if (profile.email) {
      const safeDocId = getSafeDocId(profile.email);
      const indexRef = doc(db, 'user_accounts', safeDocId);
      await setDoc(indexRef, {
        profile,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

    return { success: true };
  } catch (err) {
    console.error('[Server Firestore] Save profile error:', err);
    return { success: false };
  }
}

export async function getProfileServer(uid?: string, email?: string) {
  if (!db) return null;

  try {
    if (uid) {
      const userSnap = await getDoc(doc(db, 'users', uid));
      if (userSnap.exists()) return userSnap.data();
    }

    if (email) {
      const safeDocId = getSafeDocId(email);
      const indexSnap = await getDoc(doc(db, 'user_accounts', safeDocId));
      if (indexSnap.exists()) {
        const data = indexSnap.data();
        if (data.profile) return data.profile;
      }
    }
  } catch (err) {
    console.error('[Server Firestore] Get profile error:', err);
  }

  return null;
}
