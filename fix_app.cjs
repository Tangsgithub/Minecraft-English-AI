const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<AlexChatView\s+profile=\{profile\}\s+activeLesson=\{selectedLessonForChat\}\s+messages=\{chatMessages\}\s+setMessages=\{setChatMessages\}\s+onAwardEmeralds=\{handleAwardEmeralds\}\s+onOpenSettings=\{\(\) => setIsSettingsOpen\(true\)\}\s+\/>/,
  `<AlexChatView
              profile={profile}
              activeLesson={selectedLessonForChat}
              messages={chatMessages}
              setMessages={setChatMessages}
              onAwardEmeralds={handleAwardEmeralds}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onCompleteLesson={handleCompleteLesson}
              onBackToMap={() => {
                setActiveTab('map');
                setSelectedLessonForChat(null);
              }}
            />`
);

fs.writeFileSync('src/App.tsx', code);
