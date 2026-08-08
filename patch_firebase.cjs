const fs = require('fs');
let code = fs.readFileSync('src/lib/firebase.ts', 'utf8');

code = code.replace(/export const serverProxyLogin = async \(email: string, password: string\) => \{[\s\S]*?catch \(e\) \{\s*console\.warn\('Server proxy login error:', e\);\s*\}\s*return null;\s*\};/, 
`export const serverProxyLogin = async (email: string, password: string) => {
  try {
    const resp = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (resp.ok) {
      return await resp.json();
    } else {
      const errText = await resp.text();
      try {
        return JSON.parse(errText);
      } catch (e) {
        return { success: false, message: \`HTTP Error \${resp.status}: \${errText.substring(0, 50)}\` };
      }
    }
  } catch (e: any) {
    return { success: false, message: \`Network Exception: \${e.message}\` };
  }
};`);

code = code.replace(/export const serverProxyRegister = async \(email: string, password: string, nickname: string, initialProfile: any\) => \{[\s\S]*?catch \(e\) \{\s*console\.warn\('Server proxy register error:', e\);\s*\}\s*return null;\s*\};/,
`export const serverProxyRegister = async (email: string, password: string, nickname: string, initialProfile: any) => {
  try {
    const resp = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, nickname, initialProfile })
    });
    if (resp.ok) {
      return await resp.json();
    } else {
      const errText = await resp.text();
      try {
        return JSON.parse(errText);
      } catch (e) {
        return { success: false, message: \`HTTP Error \${resp.status}: \${errText.substring(0, 50)}\` };
      }
    }
  } catch (e: any) {
    return { success: false, message: \`Network Exception: \${e.message}\` };
  }
};`);

fs.writeFileSync('src/lib/firebase.ts', code);
