const fs = require('fs');

let content = fs.readFileSync('src/components/GiantWorldMap.tsx', 'utf8');

const regex = /<div className="pt-2 border-t-2 border-slate-200">/;

content = content.replace(regex, '<div className="">');

fs.writeFileSync('src/components/GiantWorldMap.tsx', content);
