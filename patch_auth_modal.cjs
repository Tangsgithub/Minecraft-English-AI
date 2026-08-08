const fs = require('fs');
let code = fs.readFileSync('src/components/AuthModal.tsx', 'utf8');

// Fix Login fallthrough
code = code.replace(
  /        \} else if \(serverResult\.message && serverResult\.message\.includes\('网络'\)\) \{\n          console\.log\('Server proxy network issue, falling back\.\.\.'\);\n        \}/,
  `        } else if (serverResult.message) {
          setErrorMsg(serverResult.message);
          setLoading(false);
          return;
        }`
);

// Fix loading spinner persisting during setTimeout (Login)
code = code.replace(
  /          setSuccessMsg\(serverResult\.message \|\| '登录成功！\(服务端直连 云端 数据库已同步\)'\);\n          setTimeout\(\(\) => onClose\(\), 1000\);\n          return;/,
  `          setSuccessMsg(serverResult.message || '登录成功！(服务端直连 云端 数据库已同步)');
          setLoading(false);
          setTimeout(() => onClose(), 800);
          return;`
);

// Fix loading spinner persisting during setTimeout (Register)
code = code.replace(
  /          setSuccessMsg\(serverResult\.message \|\| '注册成功！全量数据已中转保存至 云端 云端数据库。'\);\n          setTimeout\(\(\) => onClose\(\), 1200\);\n          return;/,
  `          setSuccessMsg(serverResult.message || '注册成功！全量数据已中转保存至 云端 云端数据库。');
          setLoading(false);
          setTimeout(() => onClose(), 800);
          return;`
);

fs.writeFileSync('src/components/AuthModal.tsx', code);
