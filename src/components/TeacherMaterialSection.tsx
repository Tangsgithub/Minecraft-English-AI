import React, { useState, useEffect } from 'react';
import { Video, FileText, Upload, Link, Check, Settings, Eye, ExternalLink, HelpCircle, AlertCircle, Trash2 } from 'lucide-react';
import { LessonTeachingMaterial } from '../types';
import { playClickSound, playSuccessSound } from '../utils/audio';

interface TeacherMaterialSectionProps {
  lessonId: number;
  lessonTitle: string;
  onUpdate?: (material: LessonTeachingMaterial) => void;
}

const STORAGE_KEY_PREFIX = 'nce_teacher_material_';

export function getStoredTeachingMaterial(lessonId: number): LessonTeachingMaterial | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${lessonId}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveStoredTeachingMaterial(lessonId: number, data: LessonTeachingMaterial) {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${lessonId}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save teaching material', e);
  }
}

export function clearStoredTeachingMaterial(lessonId: number) {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${lessonId}`);
  } catch (e) {}
}

export const TeacherMaterialSection: React.FC<TeacherMaterialSectionProps> = ({
  lessonId,
  lessonTitle,
  onUpdate
}) => {
  const [material, setMaterial] = useState<LessonTeachingMaterial | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'ppt' | 'note'>('video');

  // Form states
  const [videoInput, setVideoInput] = useState('');
  const [videoTitleInput, setVideoTitleInput] = useState('');
  const [pptInput, setPptInput] = useState('');
  const [pptTitleInput, setPptTitleInput] = useState('');
  const [teacherNoteInput, setTeacherNoteInput] = useState('');
  const [localVideoName, setLocalVideoName] = useState<string | null>(null);
  const [localPptName, setLocalPptName] = useState<string | null>(null);

  useEffect(() => {
    const loaded = getStoredTeachingMaterial(lessonId);
    if (loaded) {
      setMaterial(loaded);
      setVideoInput(loaded.videoUrl || '');
      setVideoTitleInput(loaded.videoTitle || '');
      setPptInput(loaded.pptUrl || '');
      setPptTitleInput(loaded.pptTitle || '');
      setTeacherNoteInput(loaded.teacherNote || '');
    } else {
      setMaterial(null);
      setVideoInput('');
      setVideoTitleInput('');
      setPptInput('');
      setPptTitleInput('');
      setTeacherNoteInput('');
    }
  }, [lessonId]);

  // Convert raw URL/BV to embeddable video URL
  const getEmbedVideoUrl = (raw: string): string => {
    if (!raw) return '';
    const trimmed = raw.trim();

    // Bilibili BV or full link
    const bvMatch = trimmed.match(/(BV[a-zA-Z0-9]{10})/i);
    if (bvMatch) {
      return `https://player.bilibili.com/player.html?bvid=${bvMatch[1]}&page=1&high_quality=1&danmaku=0&autoplay=0`;
    }

    // YouTube link
    if (trimmed.includes('youtube.com/watch') || trimmed.includes('youtu.be/')) {
      let videoId = '';
      if (trimmed.includes('youtu.be/')) {
        videoId = trimmed.split('youtu.be/')[1]?.split('?')[0] || '';
      } else {
        const urlObj = new URL(trimmed);
        videoId = urlObj.searchParams.get('v') || '';
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0`;
      }
    }

    // Direct MP4 or iframe source
    return trimmed;
  };

  // Convert PPT URL to online preview iframe URL
  const getEmbedPptUrl = (raw: string): string => {
    if (!raw) return '';
    const trimmed = raw.trim();

    // If it's a PDF link or blob, return directly
    if (trimmed.toLowerCase().endsWith('.pdf') || trimmed.startsWith('blob:')) {
      return trimmed;
    }

    // If it's a PowerPoint (.ppt or .pptx) public URL, wrap with Microsoft Office Web Viewer
    if (trimmed.toLowerCase().match(/\.(pptx?|ppsx?)/)) {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(trimmed)}`;
    }

    // Google Docs viewer fallback
    if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
      return trimmed.replace('/view', '/preview');
    }

    return trimmed;
  };

  const handleSave = () => {
    playSuccessSound();
    const newMaterial: LessonTeachingMaterial = {
      videoUrl: videoInput.trim(),
      videoTitle: videoTitleInput.trim() || `${lessonTitle} · 名师讲解视频`,
      videoType: videoInput.includes('bilibili') || videoInput.match(/BV[a-zA-Z0-9]{10}/i) ? 'bilibili' : videoInput.includes('youtu') ? 'youtube' : 'mp4',
      pptUrl: pptInput.trim(),
      pptTitle: pptTitleInput.trim() || `${lessonTitle} · 配套课件 PPT`,
      pptType: pptInput.toLowerCase().endsWith('.pdf') ? 'pdf' : 'office_online',
      teacherNote: teacherNoteInput.trim(),
      updatedAt: Date.now()
    };

    saveStoredTeachingMaterial(lessonId, newMaterial);
    setMaterial(newMaterial);
    setIsEditing(false);
    if (onUpdate) onUpdate(newMaterial);
  };

  const handleClear = () => {
    if (window.confirm('确定要清空本课植入的专属视频与 PPT 吗？')) {
      playClickSound();
      clearStoredTeachingMaterial(lessonId);
      setMaterial(null);
      setVideoInput('');
      setVideoTitleInput('');
      setPptInput('');
      setPptTitleInput('');
      setTeacherNoteInput('');
      setIsEditing(false);
    }
  };

  // Handle local video file upload (creates blob URL for offline immediate preview)
  const handleLocalVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setVideoInput(blobUrl);
      setLocalVideoName(file.name);
      if (!videoTitleInput) {
        setVideoTitleInput(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  // Handle local PPT or PDF file upload
  const handleLocalPptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setPptInput(blobUrl);
      setLocalPptName(file.name);
      if (!pptTitleInput) {
        setPptTitleInput(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const hasContent = material && (material.videoUrl || material.pptUrl || material.teacherNote);

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-emerald-600/10 rounded-2xl border-2 border-amber-300 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🎬</span>
          <div>
            <h3 className="text-xs sm:text-sm font-mono font-black text-amber-950 flex items-center gap-1.5">
              <span>名师专属教学微课 & PPT 课件</span>
              {hasContent ? (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 font-bold">
                  ✓ 教师专属课件已植入
                </span>
              ) : (
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300 font-bold">
                  可自主植入
                </span>
              )}
            </h3>
            <p className="text-[10px] text-amber-800 font-mono">
              支持教师一键植入自制 B 站/YouTube 讲解视频、本地 MP4 与在线 PPT/PDF 幻灯片
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              playClickSound();
              setShowHelpModal(true);
            }}
            className="px-2.5 py-1 text-xs font-mono font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg border border-amber-300 flex items-center space-x-1 transition-all active:scale-95"
            title="查看视频与 PPT 植入操作指南"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>植入操作指南</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setIsEditing(!isEditing);
            }}
            className="px-3 py-1.5 text-xs font-mono font-black text-white bg-amber-600 hover:bg-amber-700 rounded-xl border-2 border-amber-800 flex items-center space-x-1.5 transition-all shadow-sm active:translate-y-0.5"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isEditing ? '收起配置面板' : hasContent ? '管理/修改课件' : '＋ 植入我的视频/PPT'}</span>
          </button>
        </div>
      </div>

      {/* Editor Panel (when isEditing is true) */}
      {isEditing && (
        <div className="bg-white p-4 sm:p-5 rounded-xl border-2 border-amber-400 shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-xs sm:text-sm font-mono font-black text-slate-900 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-amber-600" />
              <span>本课专属教学资料配置 (第 {lessonId} 课)</span>
            </h4>
            <span className="text-[11px] text-slate-500 font-mono">
              配置后将自动保存在当前浏览器，学生立即可看
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Section 1: Video Config */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-800">
                <Video className="w-4 h-4 text-indigo-600" />
                <span>1. 微课讲解视频 (B站/MP4/YouTube)</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  视频标题 / 主讲人：
                </label>
                <input
                  type="text"
                  value={videoTitleInput}
                  onChange={e => setVideoTitleInput(e.target.value)}
                  placeholder={`例如：新概念 1 册 第 ${lessonId} 课名师语法精讲`}
                  className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  视频地址 (支持 B站 BV号、B站网址、YouTube、MP4 直链)：
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={videoInput}
                    onChange={e => {
                      setVideoInput(e.target.value);
                      setLocalVideoName(null);
                    }}
                    placeholder="输入如 BV1xx411c7mD 或 https://www.bilibili.com/video/..."
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 font-mono pr-8"
                  />
                  {videoInput && (
                    <button
                      onClick={() => setVideoInput('')}
                      className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Or upload local video */}
              <div className="pt-1 border-t border-slate-200">
                <label className="flex items-center justify-between text-[11px] text-slate-600 cursor-pointer bg-white px-3 py-2 rounded-lg border border-dashed hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-1.5 truncate">
                    <Upload className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="truncate">
                      {localVideoName ? `已选本地视频: ${localVideoName}` : '或从电脑本地选择 MP4 教学视频'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={handleLocalVideoUpload}
                    className="hidden"
                  />
                  <span className="text-[10px] text-indigo-600 font-bold shrink-0 ml-1">浏览文件</span>
                </label>
              </div>
            </div>

            {/* Section 2: PPT / PDF Config */}
            <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-800">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>2. 配套课件幻灯片 (PPT / PDF 讲义)</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  课件名称：
                </label>
                <input
                  type="text"
                  value={pptTitleInput}
                  onChange={e => setPptTitleInput(e.target.value)}
                  placeholder={`例如：第 ${lessonId} 课核心句型与词汇板书 PPT`}
                  className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  课件网络链接 (公开 PPT/PDF 网址或网盘链接)：
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pptInput}
                    onChange={e => {
                      setPptInput(e.target.value);
                      setLocalPptName(null);
                    }}
                    placeholder="输入公开 .pptx/.pdf 网址或在线预览链接"
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 font-mono pr-8"
                  />
                  {pptInput && (
                    <button
                      onClick={() => setPptInput('')}
                      className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Or upload local PPT / PDF */}
              <div className="pt-1 border-t border-slate-200">
                <label className="flex items-center justify-between text-[11px] text-slate-600 cursor-pointer bg-white px-3 py-2 rounded-lg border border-dashed hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-1.5 truncate">
                    <Upload className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">
                      {localPptName ? `已选本地课件: ${localPptName}` : '或从电脑本地选择 PDF / PPT 课件'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.ppt,.pptx"
                    onChange={handleLocalPptUpload}
                    className="hidden"
                  />
                  <span className="text-[10px] text-emerald-600 font-bold shrink-0 ml-1">浏览文件</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Teacher's Guidance Note */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              3. 教师专属导学寄语 / 重点提醒 (可选)：
            </label>
            <textarea
              value={teacherNoteInput}
              onChange={e => setTeacherNoteInput(e.target.value)}
              rows={2}
              placeholder="例如：同学们好！本节课重点是 There is / There are 的单复数就近原则，看视频第 03:15 处的口诀总结，课后记得完成口语对话跟读打卡！"
              className="w-full text-xs p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 font-mono"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2 border-t">
            {hasContent ? (
              <button
                onClick={handleClear}
                className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg flex items-center space-x-1 font-bold transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>清空本课课件</span>
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-mono font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition-all"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 text-xs font-mono font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl border-2 border-emerald-800 shadow-sm flex items-center space-x-1.5 transition-all active:translate-y-0.5"
              >
                <Check className="w-4 h-4" />
                <span>保存并即时生效</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Display Area (when material exists) */}
      {hasContent ? (
        <div className="space-y-3">
          {/* Sub tabs if multiple materials exist */}
          <div className="flex items-center space-x-2 border-b border-amber-200/80 pb-2">
            {material.videoUrl && (
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                  activeTab === 'video'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white/80 text-slate-700 hover:bg-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>微课视频</span>
              </button>
            )}

            {material.pptUrl && (
              <button
                onClick={() => setActiveTab('ppt')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                  activeTab === 'ppt'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white/80 text-slate-700 hover:bg-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>课件 PPT</span>
              </button>
            )}

            {material.teacherNote && (
              <button
                onClick={() => setActiveTab('note')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                  activeTab === 'note'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white/80 text-slate-700 hover:bg-white'
                }`}
              >
                <span>📝 导学寄语</span>
              </button>
            )}
          </div>

          {/* Active Tab 1: Video Player */}
          {activeTab === 'video' && material.videoUrl && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-800">
                <span className="font-bold flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-indigo-600" />
                  <span>{material.videoTitle || '教学讲解视频'}</span>
                </span>
                <a
                  href={material.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-indigo-600 hover:underline flex items-center space-x-1"
                >
                  <span>新窗口全屏观看</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border-2 border-slate-700 shadow-md">
                {material.videoUrl.startsWith('blob:') || material.videoUrl.endsWith('.mp4') ? (
                  <video
                    src={material.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={getEmbedVideoUrl(material.videoUrl)}
                    title={material.videoTitle || '教学视频'}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          )}

          {/* Active Tab 2: PPT / PDF Viewer */}
          {activeTab === 'ppt' && material.pptUrl && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-800">
                <span className="font-bold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>{material.pptTitle || '配套 PPT 课件'}</span>
                </span>
                <a
                  href={material.pptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-emerald-700 hover:underline flex items-center space-x-1"
                >
                  <span>新窗口大图预览</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative w-full h-96 sm:h-[450px] rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-300 shadow-md">
                <iframe
                  src={getEmbedPptUrl(material.pptUrl)}
                  title={material.pptTitle || '课件预览'}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* Active Tab 3: Teacher Note */}
          {activeTab === 'note' && material.teacherNote && (
            <div className="bg-amber-100/80 p-4 rounded-xl border border-amber-300 text-amber-950 space-y-1.5">
              <div className="text-xs font-mono font-black flex items-center space-x-1.5">
                <span>👩‍🏫 授课老师本课重点导读：</span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap">
                {material.teacherNote}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Empty state prompt */
        <div className="bg-white/70 p-4 rounded-xl border border-amber-200 text-center space-y-2">
          <p className="text-xs text-amber-900 font-mono">
            💡 本课暂未绑定专属视频或 PPT 课件。
          </p>
          <p className="text-[11px] text-slate-600">
            作为授课教师，您可以点击上方「＋ 植入我的视频/PPT」按钮，将您录制的微课讲解或 PPT 课件绑定到本课！
          </p>
        </div>
      )}

      {/* Guide Modal: Explaining how to embed video and PPT */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white max-w-lg w-full rounded-2xl border-3 border-amber-600 p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🎓</span>
                <h3 className="text-base font-mono font-black text-slate-900">
                  如何植入您的视频与 PPT 课件？
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-black font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-700 leading-relaxed">
              <div className="bg-indigo-50 p-3.5 rounded-xl border border-indigo-200 space-y-1.5">
                <div className="font-black text-indigo-900 flex items-center space-x-1.5">
                  <Video className="w-4 h-4 text-indigo-600" />
                  <span>一、植入微课视频（三种常用方式）：</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-indigo-950 pl-1">
                  <li>
                    <strong className="text-indigo-800">方式 1 (最推荐 · 零成本超清)：</strong>
                    将视频发布至哔哩哔哩 (B站)，可以设为“仅知道链接可见”防公开。将视频网址或 BV 号（如 BV1xx411c7mD）粘贴进来，系统会自动将其嵌入无水印播放器！
                  </li>
                  <li>
                    <strong className="text-indigo-800">方式 2 (网盘/云存储直链)：</strong>
                    将视频上传到七牛云/阿里云 OSS/GitHub Release 等，填入以 <code>.mp4</code> 结尾的直链。
                  </li>
                  <li>
                    <strong className="text-indigo-800">方式 3 (本地即时演示)：</strong>
                    直接点击“从电脑本地选择 MP4 教学视频”，浏览器会即时读取并在当前设备上流畅播放！
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 space-y-1.5">
                <div className="font-black text-emerald-900 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>二、植入 PPT 课件与 PDF 讲义：</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-emerald-950 pl-1">
                  <li>
                    <strong className="text-emerald-800">PPT 在线翻页预览：</strong>
                    支持将 <code>.pptx</code> 课件上传到 OneDrive、腾讯微云公开分享链接或网盘公开链接，系统将通过微软官方 Web Viewer 自动加载在线翻页！
                  </li>
                  <li>
                    <strong className="text-emerald-800">PDF 讲义板书：</strong>
                    可将 PPT 另存为 PDF 文件，将链接填入或直接选择本地 PDF，内置高清多页阅读器！
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-950">
                <span className="font-bold">✨ 温馨提示：</span>
                您配置的所有课件资料都会自动绑定到该课程的 ID 上。学生只要打开这门课，就能直接在上方看到您的教学视频并翻看您的课件！
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-5 py-2 text-xs font-mono font-black text-white bg-amber-600 hover:bg-amber-700 rounded-xl border-2 border-amber-800 shadow-sm"
              >
                我知道了，立即尝试
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
