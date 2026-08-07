const fs = require('fs');
let code = fs.readFileSync('src/components/AlexChatView.tsx', 'utf8');

// Add onCompleteLesson and onBackToMap to Props
code = code.replace(
  /onAwardEmeralds: \(amount: number, xpAmount: number\) => void;/,
  `onAwardEmeralds: (amount: number, xpAmount: number) => void;
  onCompleteLesson: (lessonId: number) => void;
  onBackToMap: () => void;`
);

code = code.replace(
  /onAwardEmeralds,\s*onOpenSettings/,
  `onAwardEmeralds,
  onOpenSettings,
  onCompleteLesson,
  onBackToMap`
);

// We need to figure out where to add the "✅ 打卡通关 (Complete Lesson)" button.
// It can be added to the Top Banner.

const topBannerRegex = /<div className="flex items-center space-x-2 sm:space-x-3 min-w-0">[\s\S]*?<\/div>\s*<div className="flex items-center space-x-2 shrink-0">/g;

// Actually, let's just insert it before `<button onClick={onOpenSettings}`

code = code.replace(
  /<button\s+onClick=\{onOpenSettings\}\s+className="p-1\.5 sm:p-2 bg-black\/20 hover:bg-black\/40 text-white rounded-lg sm:rounded-xl transition-colors"/,
  `{activeLesson && messages.length >= 3 && (
            <button
              onClick={() => {
                playEmeraldSound();
                onCompleteLesson(activeLesson.id);
                onBackToMap();
              }}
              className="px-2 py-1.5 sm:px-3 sm:py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black font-mono text-[10px] sm:text-xs rounded-lg sm:rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-none flex items-center gap-1 shrink-0"
            >
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-900" />
              <span className="hidden sm:inline">打卡通关</span>
              <span className="sm:hidden">通关</span>
            </button>
          )}
          <button
            onClick={onOpenSettings}
            className="p-1.5 sm:p-2 bg-black/20 hover:bg-black/40 text-white rounded-lg sm:rounded-xl transition-colors"`
);

fs.writeFileSync('src/components/AlexChatView.tsx', code);
