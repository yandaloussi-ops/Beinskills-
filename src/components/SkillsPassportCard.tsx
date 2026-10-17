import React from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Download, 
  Share2, 
  ShieldCheck, 
  ExternalLink,
  Flame,
  PlusCircle,
  Eye,
  Wallet
} from 'lucide-react';
import { UserProfile, Course, AchievementBadge } from '../types';
import { SkillWalletWidget } from './SkillWalletWidget';
import { Language, translations } from '../translations';
import { LOGO_IMAGE_URL } from './BrandLogo';

interface SkillsPassportCardProps {
  userProfile: UserProfile;
  courses: Course[];
  onOpenImageGen: () => void;
  onSelectBadge: (badge: AchievementBadge) => void;
  onExploreCourses: () => void;
  currentLang?: Language;
}

export const SkillsPassportCard: React.FC<SkillsPassportCardProps> = ({
  userProfile,
  courses,
  onOpenImageGen,
  onSelectBadge,
  onExploreCourses,
  currentLang = 'ar',
}) => {
  const t = translations[currentLang];
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);
  const enrolledCourses = courses.filter((c) => userProfile.enrolledCourseIds.includes(c.id));
  const progressPercent = Math.min(
    100,
    Math.round((userProfile.xp / userProfile.nextLevelXp) * 100)
  );

  const handleExportPassport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="relative glass-card rounded-3xl p-6 sm:p-7 border border-[#7C3AED]/40 bg-gradient-to-br from-slate-900/95 via-[#0F172A] to-slate-900/90 shadow-2xl overflow-hidden space-y-6">
      
      {/* Holographic glowing borders & decorative accents */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#06B6D4]/15 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#7C3AED]/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#7C3AED]/30 to-[#06B6D4]/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header of Passport */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative rounded-2xl p-0.5 bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] shadow-lg shadow-[#7C3AED]/30 shrink-0">
            <img
              src={LOGO_IMAGE_URL}
              alt="BeInSkills Seal"
              className="w-10 h-10 rounded-[14px] object-cover bg-[#0F172A]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                {t.passport_title}
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#06B6D4]/20 text-[#06B6D4] font-bold border border-[#06B6D4]/30">
                {t.passport_verified}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              BeInSkills Skills Passport • #{userProfile.name.length}849-BIS
            </p>
          </div>
        </div>

        {/* Quick Actions: Export & Share */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPassport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
            title="Passport Credential"
          >
            <Download className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>{downloadSuccess ? (currentLang === 'ar' ? 'تم التصدير بنجاح!' : 'Exported Successfully!') : t.export_passport}</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: User ID Card & Skill Wallet Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* User Passport ID Card (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-[#06B6D4] shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 p-1 bg-[#7C3AED] text-white rounded-lg shadow-md">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-right space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-lg font-black text-white">{userProfile.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#7C3AED]/30 text-purple-200 border border-[#7C3AED]/50 font-bold">
                {t.level_prefix} {userProfile.level} • {userProfile.levelTitle}
              </span>
            </div>
            <p className="text-xs text-slate-400">{userProfile.headline}</p>

            {/* XP Progress Bar */}
            <div className="pt-2 max-w-md">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {userProfile.xp} / {userProfile.nextLevelXp} XP
                </span>
                <span>{t.next_level} {t.level_prefix} {userProfile.level + 1}</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#06B6D4] rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Wallet Widget (1 col) */}
        <div className="lg:col-span-1">
          <SkillWalletWidget
            wallet={userProfile.wallet}
            onExploreCourses={onExploreCourses}
            currentLang={currentLang}
          />
        </div>

      </div>

      {/* Achievement Badges Section */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-white">
              {t.badges_earned}
            </h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#7C3AED]/20 text-purple-300 font-bold">
              {userProfile.badges.length}
            </span>
          </div>

          {/* Trigger to generate custom AI badge */}
          <button
            onClick={onOpenImageGen}
            className="flex items-center gap-1.5 text-xs font-bold text-[#06B6D4] hover:text-cyan-300 transition-colors group cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{t.generate_ai_badge}</span>
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {userProfile.badges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => onSelectBadge(badge)}
              className="group p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-[#06B6D4]/50 transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden"
            >
              {/* Badge Icon / AI Image Thumbnail */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#7C3AED]/30 to-[#06B6D4]/30 border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden relative shadow-md">
                {badge.imageUrl ? (
                  <img
                    src={badge.imageUrl}
                    alt={badge.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <Sparkles className="w-6 h-6 text-[#06B6D4] group-hover:scale-110 transition-transform" />
                )}
                {badge.isCustomAi && (
                  <span className="absolute bottom-0 right-0 bg-purple-600 text-[8px] text-white px-1 font-bold">
                    {badge.resolution || 'AI'}
                  </span>
                )}
              </div>

              {/* Badge Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="text-xs font-bold text-white truncate group-hover:text-[#06B6D4] transition-colors">
                    {badge.title}
                  </h5>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 font-semibold shrink-0">
                    {badge.rarity}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {badge.description}
                </p>
                <span className="text-[10px] text-slate-500 block mt-1">
                  {badge.dateEarned}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Courses Status Inside Passport */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
          <span>{t.enrolled_in_progress}</span>
          <span className="text-xs bg-slate-800 text-[#06B6D4] px-2 py-0.5 rounded-full">
            {enrolledCourses.length}
          </span>
        </h4>

        {enrolledCourses.length > 0 ? (
          <div className="space-y-2">
            {enrolledCourses.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/70 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">{c.title}</div>
                    <div className="text-[11px] text-slate-400">
                      {c.instructor.name} • {c.mode === 'remote' ? t.mode_remote : t.mode_in_person}
                    </div>
                  </div>
                </div>

                <div className="text-left shrink-0">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                    {t.escrow_protected}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 bg-slate-950/30 p-3 rounded-xl text-center">
            {t.no_courses_yet}
          </p>
        )}
      </div>

    </div>
  );
};
