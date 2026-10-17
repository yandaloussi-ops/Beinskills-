import React from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Compass, 
  Award, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Bot,
  Layers,
  Building2,
  GraduationCap,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import { RegistrationRole } from './RegistrationModal';
import { Language, translations } from '../translations';
import { BrandLogo, LOGO_IMAGE_URL } from './BrandLogo';

interface HeroProps {
  onExploreCourses: () => void;
  onOpenPassport: () => void;
  onOpenChat: () => void;
  onOpenImageGen: () => void;
  onOpenSpecializations: () => void;
  onOpenRegistration: (role: RegistrationRole) => void;
  onOpenAdmin: () => void;
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCourses,
  onOpenPassport,
  onOpenChat,
  onOpenImageGen,
  onOpenSpecializations,
  onOpenRegistration,
  onOpenAdmin,
  currentLang,
}) => {
  const t = translations[currentLang];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:py-16 lg:py-20 border-b border-slate-800/80">
      {/* Background Decorative Gradients & Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-[28rem] h-[28rem] bg-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Official Adopted Brand Logo Showcase */}
          <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
            <div className="relative group cursor-pointer" onClick={onExploreCourses}>
              {/* Multilayered Glow Rings */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#7C3AED] via-[#06B6D4] to-[#7C3AED] rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse"></div>
              <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-[#7C3AED] via-slate-900 to-[#06B6D4] shadow-2xl">
                <img
                  src={LOGO_IMAGE_URL}
                  alt="BeInSkills Official Logo"
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-[22px] bg-[#0F172A] shadow-inner transform group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Eyebrow Pill with Admin & All Disciplines Triggers */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 shadow-md">
            <span className="flex h-2 w-2 rounded-full bg-[#06B6D4] animate-ping" />
            <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]">
              BeInSkills Official Platform • 2026
            </span>
            <span className="text-slate-500">|</span>
            <button
              onClick={onOpenSpecializations}
              className="text-xs text-[#06B6D4] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Layers className="w-3 h-3" />
              <span>{t.all_domains}</span>
            </button>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <button
              onClick={onOpenAdmin}
              className="text-xs text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 cursor-pointer hidden sm:flex"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>{t.nav_admin}</span>
            </button>
          </div>

          {/* Main Headline with exact slogan */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.25] sm:leading-[1.2]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#38BDF8] to-[#7C3AED]">
              {t.slogan}
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            {t.slogan_sub}
          </p>

          {/* Main Action Triggers */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onExploreCourses}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#7C3AED]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-cyan-200" />
              <span>{t.explore_marketplace}</span>
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
            </button>

            <button
              onClick={onOpenSpecializations}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 text-[#06B6D4] font-bold text-xs sm:text-sm border border-[#06B6D4]/40 hover:border-[#06B6D4] transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#06B6D4]" />
              <span>{t.all_domains}</span>
            </button>

            <button
              onClick={onOpenPassport}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-purple-300 font-bold text-xs sm:text-sm border border-[#7C3AED]/40 hover:border-[#7C3AED] transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-[#7C3AED]" />
              <span>{t.open_passport}</span>
            </button>
          </div>

          {/* 3 Registration Badges / Quick Cards */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            
            {/* تسجيل مؤسسة تكوين */}
            <div
              onClick={() => onOpenRegistration('institute')}
              className="glass-card p-3 rounded-2xl border border-purple-800/40 hover:border-[#7C3AED] bg-slate-900/60 hover:bg-slate-800/80 transition-all cursor-pointer flex items-center gap-2.5 text-right rtl:text-right ltr:text-left group"
            >
              <div className="p-2 rounded-xl bg-[#7C3AED]/20 text-purple-300 group-hover:scale-110 transition-transform">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                  {t.reg_institute}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {t.reg_institute_sub}
                </div>
              </div>
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-300 transition-all rtl:rotate-0 ltr:rotate-180" />
            </div>

            {/* تسجيل مكوّن خاص */}
            <div
              onClick={() => onOpenRegistration('trainer')}
              className="glass-card p-3 rounded-2xl border border-cyan-800/40 hover:border-[#06B6D4] bg-slate-900/60 hover:bg-slate-800/80 transition-all cursor-pointer flex items-center gap-2.5 text-right rtl:text-right ltr:text-left group"
            >
              <div className="p-2 rounded-xl bg-[#06B6D4]/20 text-[#06B6D4] group-hover:scale-110 transition-transform">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white group-hover:text-[#06B6D4] transition-colors">
                  {t.reg_trainer}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {t.reg_trainer_sub}
                </div>
              </div>
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#06B6D4] transition-all rtl:rotate-0 ltr:rotate-180" />
            </div>

            {/* تسجيل باحث عن التكوين */}
            <div
              onClick={() => onOpenRegistration('learner')}
              className="glass-card p-3 rounded-2xl border border-emerald-800/40 hover:border-emerald-500 bg-slate-900/60 hover:bg-slate-800/80 transition-all cursor-pointer flex items-center gap-2.5 text-right rtl:text-right ltr:text-left group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {t.reg_learner}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {t.reg_learner_sub}
                </div>
              </div>
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-300 transition-all rtl:rotate-0 ltr:rotate-180" />
            </div>

          </div>

          {/* Quick Value Pillars */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-card p-3.5 rounded-2xl border border-slate-800/80 text-center">
              <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-cyan-300">
                +120
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">{t.stat_courses}</div>
            </div>

            <div className="glass-card p-3.5 rounded-2xl border border-slate-800/80 text-center">
              <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-purple-300">
                +45
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">{t.stat_instructors}</div>
            </div>

            <div className="glass-card p-3.5 rounded-2xl border border-slate-800/80 text-center">
              <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                98%
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">{t.stat_rate}</div>
            </div>

            <div className="glass-card p-3.5 rounded-2xl border border-slate-800/80 text-center">
              <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                1K-4K
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">{t.stat_badges}</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
