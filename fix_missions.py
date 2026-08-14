import re
with open('src/components/MissionsView.tsx', 'r') as f:
    content = f.read()

target = """                      <button
                        onClick={() => handleClaimReward(mission)}
                        className="px-4 py-2 bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white rounded-xl text-xs font-mono font-black shadow-[0_3px_0_0_#2A4718] transform hover:translate-y-0.5 active:translate-y-[3px] active:shadow-none transition-all"
                      >
                        领取奖励
                      </button>"""

replacement = """                      {(profile.readyToClaimMissionIds || []).includes(mission.id) ? (
                        <button
                          onClick={() => handleClaimReward(mission)}
                          className="px-4 py-2 bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white rounded-xl text-xs font-mono font-black shadow-[0_3px_0_0_#2A4718] transform hover:translate-y-0.5 active:translate-y-[3px] active:shadow-none transition-all"
                        >
                          领取奖励
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2 bg-slate-300 border-2 border-slate-400 text-slate-500 rounded-xl text-xs font-mono font-black shadow-sm cursor-not-allowed"
                        >
                          任务未完成
                        </button>
                      )}"""

content = content.replace(target, replacement)
with open('src/components/MissionsView.tsx', 'w') as f:
    f.write(content)
