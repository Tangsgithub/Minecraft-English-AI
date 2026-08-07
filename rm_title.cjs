const fs = require('fs');

let content = fs.readFileSync('src/components/GiantWorldMap.tsx', 'utf8');

const titleRegex = /<div className="flex items-center space-x-3">[\s\S]*?<\/div>\s*<\/div>\s*\{\/\* Zoom & View Controls \*\/\}/;
content = content.replace(titleRegex, '{/* Zoom & View Controls */}');

fs.writeFileSync('src/components/GiantWorldMap.tsx', content);
