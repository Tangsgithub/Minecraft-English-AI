import re
with open('src/components/AlexChatView.tsx', 'r') as f:
    content = f.read()

target_props = """  onOpenSettings: () => void;
  onCompleteLesson: (lessonId: number) => void;
  onBackToMap: () => void;
}"""
replacement_props = """  onOpenSettings: () => void;
  onCompleteLesson: (lessonId: number) => void;
  onCheckMission?: (text: string) => void;
  onBackToMap: () => void;
}"""
content = content.replace(target_props, replacement_props)

target_params = """  onOpenSettings,
  onCompleteLesson,
  onBackToMap
}) => {"""
replacement_params = """  onOpenSettings,
  onCompleteLesson,
  onCheckMission,
  onBackToMap
}) => {"""
content = content.replace(target_params, replacement_params)

target_send = """  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;"""
replacement_send = """  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;
    if (onCheckMission) onCheckMission(textToSend);"""
content = content.replace(target_send, replacement_send)

with open('src/components/AlexChatView.tsx', 'w') as f:
    f.write(content)
