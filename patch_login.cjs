const fs = require('fs');
let code = fs.readFileSync('src/components/AuthModal.tsx', 'utf8');

code = code.replace(/      \/\/ 2\. Client SDK Firebase Auth Login fallback[\s\S]*?finally \{\n      setLoading\(false\);\n    \}\n  \};/m, 
`      } else {
        setErrorMsg('服务器代理请求失败，请检查网络连接！');
      }
    } catch (err: any) {
      setErrorMsg('登录失败: ' + (err.message || '未知网络错误'));
    } finally {
      setLoading(false);
    }
  };`);

fs.writeFileSync('src/components/AuthModal.tsx', code);
