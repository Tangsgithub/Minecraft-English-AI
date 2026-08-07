const fs = require('fs');
let code = fs.readFileSync('src/components/AlexChatView.tsx', 'utf8');

const regex = /<button\s+onClick=\{onOpenSettings\}\s+className="px-2\.5 py-1\.5 bg-\[#FF6321\] hover:bg-\[#e05316\] text-white rounded-xl border-2 border-black text-xs font-bold shadow-sm"/;

code = code.replace(
  regex,
  `{activeLesson && messages.length >= 3 && (
            <button
              onClick={() => {
                playEmeraldSound();
                onCompleteLesson(activeLesson.id);
                onBackToMap();
              }}
              className="px-2 py-1.5 sm:px-3 sm:py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black font-mono text-[10px] sm:text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-none flex items-center gap-1 shrink-0"
            >
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-900" />
              <span className="hidden sm:inline">打卡通关</span>
              <span className="sm:hidden">通关</span>
            </button>
          )}
          <button
            onClick={onOpenSettings}
            className="px-2.5 py-1.5 bg-[#FF6321] hover:bg-[#e05316] text-white rounded-xl border-2 border-black text-xs font-bold shadow-sm"`
);

fs.writeFileSync('src/components/AlexChatView.tsx', code);
