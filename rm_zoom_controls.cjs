const fs = require('fs');

let content = fs.readFileSync('src/components/GiantWorldMap.tsx', 'utf8');

const regex = /        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">\s*\{\/\* Zoom & View Controls \*\/\}[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*<\/div>/;

content = content.replace(regex, '');

fs.writeFileSync('src/components/GiantWorldMap.tsx', content);
