const fs = require('fs');

let content = fs.readFileSync('src/components/GiantWorldMap.tsx', 'utf8');

const regex = /\{\/\* Zoom & View Controls \*\/\}\s*<div className="flex items-center space-x-2">/s;

const replacement = `{/* Zoom & View Controls */}
          <div className="flex flex-1 items-center justify-between">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono font-black text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border-2 border-slate-200">
              <span>🗺️ 12 个大生态领地 • 144 个英语关卡 • NPC 实战交流</span>
            </div>
            <div className="flex items-center space-x-2">`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/components/GiantWorldMap.tsx', content);
