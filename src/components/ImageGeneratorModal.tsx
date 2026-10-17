import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Download, 
  Check, 
  Layers, 
  Image as ImageIcon, 
  Sliders, 
  Award,
  ShieldCheck,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { AchievementBadge } from '../types';

interface ImageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBadgeAdded: (badge: AchievementBadge) => void;
}

export const ImageGeneratorModal: React.FC<ImageGeneratorModalProps> = ({
  isOpen,
  onClose,
  onBadgeAdded,
}) => {
  const [prompt, setPrompt] = useState(
    'شارة ذهبية ثلاثية الأبعاد لإتقان تقنيات الذكاء الاصطناعي مع أجنحة نيون تيركواز ودرع رقمي كحلي عميق'
  );
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('2K');
  const [badgeTitle, setBadgeTitle] = useState('شارة إتقان الذكاء الاصطناعي الفائقة');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9'>('1:1');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isSavedToPassport, setIsSavedToPassport] = useState(false);

  if (!isOpen) return null;

  const handleGenerateImage = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);
    setIsSavedToPassport(false);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageSize, // Affordance for 1K, 2K, 4K
          aspectRatio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل توليد الصورة بالذكاء الاصطناعي');
      }

      if (data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
      } else {
        throw new Error('لم يتم استلام رابط الصورة');
      }
    } catch (err: any) {
      console.error('Image gen error:', err);
      setErrorMsg(err?.message || 'تعذر توليد الصورة بواسطة النموذج');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToPassport = () => {
    if (!generatedImageUrl) return;

    const newBadge: AchievementBadge = {
      id: `ai-badge-${Date.now()}`,
      title: badgeTitle.trim() || 'شارة إنجاز مخصصة بالذكاء الاصطناعي',
      category: 'ابتكار الذكاء الاصطناعي',
      description: prompt.slice(0, 80) + '...',
      icon: 'Sparkles',
      dateEarned: new Date().toISOString().split('T')[0],
      isCustomAi: true,
      imageUrl: generatedImageUrl,
      resolution: imageSize,
      rarity: 'خاص بالذكاء الاصطناعي',
    };

    onBadgeAdded(newBadge);
    setIsSavedToPassport(true);
  };

  const PROMPT_IDEAS = [
    {
      title: 'وسام الذكاء الاصطناعي الذهبي',
      prompt: 'وسام ذهبي فاخر ثلاثي الأبعاد للذكاء الاصطناعي مع درع هندسي متوهج باللونين البنفسجي والتيركواز',
    },
    {
      title: 'شارة مهندس السحابة والبرمجة',
      prompt: 'رمز تقني مستقبلي لأمان السحابة والأكواد البرمجية مع بلورة زجاجية نيون على خلفية كحلية عميقة',
    },
    {
      title: 'شارة قيادة الأعمال الرقمية',
      prompt: 'رمز قيادة الأعمال وإدارة المنتجات الحديثة مع تاجر نجمي ألماسي وشعلة ابتكار براقة',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:px-6 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-['Alexandria']">
                  استوديو توليد الشارات الفائقة بالذكاء الاصطناعي
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                  gemini-3-pro-image-preview
                </span>
              </div>
              <p className="text-xs text-slate-400">
                صمم شارات إنجاز احترافية بدقة 1K و 2K و 4K وأضفها مباشرة لجواز مهاراتك
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Badge Title Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              عنوان الشارة أو الإنجاز:
            </label>
            <input
              type="text"
              value={badgeTitle}
              onChange={(e) => setBadgeTitle(e.target.value)}
              placeholder="مثال: شارة إتقان الذكاء الاصطناعي"
              className="w-full bg-slate-950 text-sm text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-[#06B6D4] outline-none"
            />
          </div>

          {/* Affordance: Image Size Selector (1K, 2K, 4K) Required by Prompt */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>دقة وجودة الصورة (Resolution Affordance):</span>
              <span className="text-[11px] text-[#06B6D4]">نموذج gemini-3-pro-image-preview</span>
            </label>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(['1K', '2K', '4K'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setImageSize(size)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    imageSize === size
                      ? 'bg-gradient-to-r from-[#7C3AED]/30 to-[#06B6D4]/30 border-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/10 font-bold'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="text-base font-black tracking-wide">{size}</div>
                  <div className="text-[10px] text-slate-400">
                    {size === '1K' && '1024x1024 • سريع'}
                    {size === '2K' && '2048x2048 • فائق الدقة'}
                    {size === '4K' && '3840x3840 • دقة قصوى'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              وصف الشارة أو الأيقونة المراد توليدها:
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="اكتب وصفاً مفصلاً للشارة أو التصميم المراد توليده..."
              className="w-full bg-slate-950 text-sm text-slate-100 p-3.5 rounded-2xl border border-slate-800 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none resize-none"
            />
          </div>

          {/* Quick Prompt Ideas */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 font-medium">أفكار سريعة مقترحة:</span>
            <div className="flex flex-wrap gap-2">
              {PROMPT_IDEAS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setBadgeTitle(item.title);
                    setPrompt(item.prompt);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700/60 transition-colors text-right"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateImage}
            disabled={isLoading || !prompt.trim()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] text-white font-black text-sm shadow-xl shadow-[#7C3AED]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>جاري توليد الشارة بدقة {imageSize} بواسطة Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-cyan-200" />
                <span>توليد الشارة الآن (بدقة {imageSize})</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Generated Result Showcase */}
          {generatedImageUrl && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-[#06B6D4]/40 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  تم توليد الشارة بنجاح بدقة {imageSize}!
                </span>
                <span className="text-slate-400 font-mono text-[10px]">
                  gemini-3-pro-image-preview
                </span>
              </div>

              {/* Image Preview Container */}
              <div className="relative aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden border-2 border-[#7C3AED]/60 shadow-2xl bg-slate-950 flex items-center justify-center">
                <img
                  src={generatedImageUrl}
                  alt={badgeTitle}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 text-[10px] bg-slate-900/90 text-[#06B6D4] px-2 py-0.5 rounded-md font-bold border border-slate-700">
                  {imageSize} HD
                </span>
              </div>

              {/* Actions: Save to Passport & Download */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleSaveToPassport}
                  disabled={isSavedToPassport}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSavedToPassport
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                      : 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md shadow-[#7C3AED]/20'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>
                    {isSavedToPassport
                      ? 'تمت الإضافة إلى جواز المهارات!'
                      : 'إضافة إلى جواز المهارات'}
                  </span>
                </button>

                <a
                  href={generatedImageUrl}
                  download={`BeInSkills-${badgeTitle}-${imageSize}.png`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#06B6D4]" />
                  <span>تحميل ملف الشارة</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
