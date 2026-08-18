import React from 'react';
import { UserProfile, CourseVolumeId, VocabItem } from '../types';
import { getFullBook1VocabList } from '../data/book1VocabManager';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { BookOpen, Award, ArrowRight, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface VocabProgressChartProps {
  profile: UserProfile;
  onNavigateToVocab: () => void;
}

export const VocabProgressChart: React.FC<VocabProgressChartProps> = ({
  profile,
  onNavigateToVocab
}) => {
  // Calculate total combined vocabulary from the authentic curriculum manager
  const currentVolId: CourseVolumeId = profile.selectedVolumeId || 'vol1';
  const combinedList: VocabItem[] = currentVolId === 'vol1' ? getFullBook1VocabList() : getFullBook1VocabList();

  const totalWords = combinedList.length;
  
  // Mastered words set
  const masteredSet = new Set((profile.masteredWords || []).map(w => w.toLowerCase()));
  const masteredCount = combinedList.filter(item => masteredSet.has(item.word.toLowerCase())).length;
  const unmasteredCount = Math.max(0, totalWords - masteredCount);

  const percentage = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;

  const chartData = [
    {
      name: '已掌握词汇',
      key: 'mastered',
      count: masteredCount,
      color: '#22C55E',
      hoverColor: '#16A34A',
      icon: '🟩',
      desc: '已熟练背诵掌握'
    },
    {
      name: '待学习词汇',
      key: 'unmastered',
      count: unmasteredCount,
      color: '#F59E0B',
      hoverColor: '#D97706',
      icon: '🟨',
      desc: '需要继续探索学习'
    }
  ];

  const handleBarClick = () => {
    playClickSound();
    onNavigateToVocab();
  };

  return (
    <div className="bg-white/95 border-2 border-[#487E2C] rounded-2xl p-3.5 sm:p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-lg">
            📊
          </div>
          <div>
            <h3 className="font-mono font-black text-sm text-slate-800 flex items-center space-x-2">
              <span>词汇掌握进度统计</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                掌握率 {percentage}%
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              词库总计 <span className="font-bold text-slate-800">{totalWords}</span> 词 • 点击柱状图快速跳转词库页
            </p>
          </div>
        </div>

        <button
          onClick={handleBarClick}
          className="flex items-center space-x-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>前往词库管理</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-4 border border-slate-200">
        <div
          className="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-44 sm:h-48 w-full cursor-pointer" onClick={handleBarClick}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: -20, bottom: 5 }}
            barSize={48}
          >
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              tick={{ fontSize: 12, fontWeight: 700, fill: '#334155' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#64748B' }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(72, 126, 44, 0.08)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs font-mono border border-slate-700 shadow-xl">
                      <div className="font-bold flex items-center space-x-1 text-amber-300">
                        <span>{data.icon}</span>
                        <span>{data.name}</span>
                      </div>
                      <div className="mt-1 text-slate-200">
                        词汇数量: <span className="font-black text-white text-sm">{data.count}</span> 个
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{data.desc}</div>
                      <div className="text-[10px] text-emerald-400 mt-1 font-bold">👉 点击直接进入 MC 词库</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              <LabelList
                dataKey="count"
                position="top"
                style={{ fill: '#1E293B', fontWeight: 800, fontSize: 13, fontFamily: 'monospace' }}
              />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
