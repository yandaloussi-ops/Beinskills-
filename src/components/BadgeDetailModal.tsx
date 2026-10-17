import React from 'react';
import { X, Award, Sparkles, Download, CheckCircle2, Calendar, ShieldCheck, Share2 } from 'lucide-react';
import { AchievementBadge } from '../types';

interface BadgeDetailModalProps {
  badge: AchievementBadge | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !badge) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `حصلت على "${badge.title}" من منصة BeInSkills لتنمية القدرات وسوق التكوينات! #BeInSkills #جواز_المهارات`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 overflow-hidden text-center space-y-4">
        
        {/* Glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-48 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge Visual */}
        <div className="relative w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr from-[#7C3AED]/30 via-slate-800 to-[#06B6D4]/30 border-2 border-[#06B6D4]/60 flex items-center justify-center shadow-xl overflow-hidden mt-2">
          {badge.imageUrl ? (
            <img
              src={badge.imageUrl}
              alt={badge.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Award className="w-14 h-14 text-[#06B6D4]" />
          )}

          {badge.isCustomAi && (
            <span className="absolute bottom-1 right-1 text-[9px] bg-[#7C3AED] text-white px-1.5 py-0.2 rounded font-black">
              {badge.resolution || 'AI 4K'}
            </span>
          )}
        </div>

        {/* Badge Metadata */}
        <div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 font-bold border border-slate-700">
            {badge.rarity} • {badge.category}
          </span>
          <h3 className="text-lg font-black text-white mt-2 font-['Alexandria']">
            {badge.title}
          </h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {badge.description}
          </p>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>تاريخ المنح: {badge.dateEarned}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>معتمد على السلسلة</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#06B6D4] text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'تم نسخ نص المشاركة!' : 'مشاركة الشارة'}</span>
          </button>

          {badge.imageUrl && (
            <a
              href={badge.imageUrl}
              download={`${badge.title}.png`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              <Download className="w-4 h-4 text-[#7C3AED]" />
              <span>تحميل الصورة</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
