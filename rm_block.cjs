const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\/\* ===== 《新概念英语》分册与版本号体系控制面板 ===== \*\/\}.*?\{\/\* Main App Container \*\/\}/s;

appContent = appContent.replace(regex, "{/* Main App Container */}");

fs.writeFileSync('src/App.tsx', appContent);
