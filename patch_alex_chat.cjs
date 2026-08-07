const fs = require('fs');
let code = fs.readFileSync('src/components/AlexChatView.tsx', 'utf8');

const regex = /\{activeLesson && messages\.length >= 3 && \([\s\S]*?<\/button>\s*\)\}/;

const replacement = `
          {activeLesson && (
            <div className="flex items-center gap-2">
              {messages.length < 4 ? (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 rounded-xl border border-white/20 text-white text-[10px] font-mono">
                  <span className="animate-pulse">🔒</span>
                  <span>任务: 进行 2 轮对话解锁</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    playEmeraldSound();
                    onCompleteLesson(activeLesson.id);
                    onBackToMap();
                  }}
                  className="px-2 py-1.5 sm:px-3 sm:py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black font-mono text-[10px] sm:text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-none flex items-center gap-1 shrink-0 animate-in fade-in zoom-in"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-900" />
                  <span className="hidden sm:inline">打卡通关</span>
                  <span className="sm:hidden">通关</span>
                </button>
              )}
            </div>
          )}
`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/AlexChatView.tsx', code);
