import re
with open('src/App.tsx', 'r') as f:
    content = f.read()

target = """            <AlexChatView
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
            />"""

replacement = """            <AlexChatView
              profile={profile}
              activeLesson={selectedLessonForChat}
              messages={chatMessages}
              setMessages={setChatMessages}
              onAwardEmeralds={handleAwardEmeralds}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onCompleteLesson={handleCompleteLesson}
              onCheckMission={(text) => {
                const lowerText = text.toLowerCase();
                const newReady = [];
                import('./data/gamificationData').then(({ INITIAL_MISSIONS }) => {
                  INITIAL_MISSIONS.forEach(mission => {
                    if ((profile.completedMissionIds || []).includes(mission.id)) return;
                    if ((profile.readyToClaimMissionIds || []).includes(mission.id)) return;
                    
                    let matched = false;
                    if (mission.id === 'mission_001' && lowerText.includes('wooden door')) matched = true;
                    if (mission.id === 'mission_002' && (lowerText.includes('excuse me') || lowerText.includes('teacher'))) matched = true;
                    if (mission.id === 'mission_003' && lowerText.includes('diamonds')) matched = true;
                    if (mission.id === 'mission_004' && (lowerText.includes('how much') || lowerText.includes('emerald'))) matched = true;
                    
                    if (matched) {
                      newReady.push(mission.id);
                      alert(`🎉 恭喜！你通过对话完成了隐藏任务: [${mission.titleZh}]！请去"任务"页面领取奖励吧！`);
                    }
                  });
                  if (newReady.length > 0) {
                    handleUpdateProfile({
                      readyToClaimMissionIds: [...(profile.readyToClaimMissionIds || []), ...newReady]
                    });
                  }
                });
              }}
              onBackToMap={() => {
                setActiveTab('map');
                setSelectedLessonForChat(null);
              }}
            />"""

content = content.replace(target, replacement)
with open('src/App.tsx', 'w') as f:
    f.write(content)
