const fs = require('fs');
let content = fs.readFileSync('src/components/HeaderBar.tsx', 'utf8');

content = content.replace(
    /import \{ UserProfile, APP_VERSION_INFO \} from '\.\.\/types';/,
    "import { UserProfile, APP_VERSION_INFO, CourseVolumeId } from '../types';"
);

content = content.replace(
    /import \{ Volume2, VolumeX, Settings, Sparkles, Flame, Shield, HelpCircle, Cloud, User as UserIcon, Mic, Headphones \} from 'lucide-react';/,
    "import { Volume2, VolumeX, Settings, Sparkles, Flame, Shield, HelpCircle, Cloud, User as UserIcon, Mic, Headphones, ChevronDown } from 'lucide-react';"
);

content = content.replace(
    /interface HeaderBarProps \{/,
    "interface HeaderBarProps {\n  selectedVolumeId: CourseVolumeId;\n  onChangeVolumeId: (id: CourseVolumeId) => void;"
);

content = content.replace(
    /export const HeaderBar: React\.FC<HeaderBarProps> = \(\{/,
    "export const HeaderBar: React.FC<HeaderBarProps> = ({\n  selectedVolumeId,\n  onChangeVolumeId,"
);

const oldBrandSection = `            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="font-black text-xs sm:text-base md:text-lg text-white font-mono tracking-tight sm:tracking-wide uppercase drop-shadow-sm">
                Minecraft English
              </span>
              <span className="text-[8px] sm:text-[10px] font-black bg-[#FFD700] text-black px-1 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                {APP_VERSION_INFO.version}
              </span>
            </div>`;

const newBrandSection = `            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="font-black text-xs sm:text-base md:text-lg text-white font-mono tracking-tight sm:tracking-wide uppercase drop-shadow-sm hidden sm:inline">
                Minecraft English
              </span>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-[10px] sm:text-[11px] font-black bg-[#FFD700] hover:bg-amber-300 text-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm transition-colors">
                  <span>{APP_VERSION_INFO.volumes.find(v => v.id === selectedVolumeId)?.title.replace('新概念英语 ', '新概念')}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute left-0 top-full mt-1 w-48 bg-slate-900 border-2 border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                  {APP_VERSION_INFO.volumes.map(vol => (
                    <button
                      key={vol.id}
                      onClick={() => {
                        playClickSound();
                        onChangeVolumeId(vol.id);
                      }}
                      className={\`w-full text-left px-3 py-2 text-xs font-bold font-mono transition-colors \${selectedVolumeId === vol.id ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-800'}\`}
                    >
                      {vol.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>`;

content = content.replace(oldBrandSection, newBrandSection);

fs.writeFileSync('src/components/HeaderBar.tsx', content);
