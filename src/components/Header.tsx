import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Compass, 
  Award, 
  Bot, 
  Menu, 
  X, 
  User,
  GraduationCap,
  ShieldCheck,
  Layers,
  UserPlus,
  Building2,
  ChevronDown,
  Wallet,
  Check
} from 'lucide-react';
import { UserProfile, ActiveViewRole } from '../types';
import { RegistrationRole } from './RegistrationModal';
import { Language, translations } from '../translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  userProfile: UserProfile;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenChat: () => void;
  onOpenImageGen: () => void;
  onScrollToCourses: () => void;
  onScrollToPassport: () => void;
  activeTab: 'all' | 'marketplace' | 'passport';
  setActiveTab: (tab: 'all' | 'marketplace' | 'passport') => void;
  onOpenAdmin: () => void;
  onOpenSpecializations: () => void;
  onOpenRegistration: (role?: RegistrationRole) => void;
  activeViewRole: ActiveViewRole;
  onChangeViewRole: (role: ActiveViewRole) => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  searchQuery,
  setSearchQuery,
  onOpenChat,
  onOpenImageGen,
  onScrollToCourses,
  onScrollToPassport,
  activeTab,
  setActiveTab,
  onOpenAdmin,
  onOpenSpecializations,
  onOpenRegistration,
  activeViewRole,
  onChangeViewRole,
  currentLang,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [regDropdownOpen, setRegDropdownOpen] = useState(false);

  const t = translations[currentLang];
  const walletBalance = userProfile.wallet?.balance || 380;

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
      
      {/* Top Utility Bar: Role Swapper & Language Switcher & Wallet */}
      <div className="bg-slate-950/80 border-b border-slate-800/60 py-1.5 px-4 sm:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Role Swapper Widget */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-bold hidden sm:inline">
              {t.role_swapper_title}
            </span>

            <div className="inline-flex bg-slate-900 p-0.5 rounded-xl border border-slate-700/80">
              {/* Student View */}
              <button
                type="button"
                onClick={() => onChangeViewRole('student')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeViewRole === 'student'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3 h-3" />
                <span>{t.role_student}</span>
              </button>

              {/* Instructor View */}
              <button
                type="button"
                onClick={() => onChangeViewRole('instructor')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeViewRole === 'instructor'
                    ? 'bg-[#06B6D4] text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3 h-3" />
                <span>{t.role_instructor}</span>
              </button>

              {/* Admin View */}
              <button
                type="button"
                onClick={() => onChangeViewRole('admin')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                  activeViewRole === 'admin'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                <span>{t.role_admin}</span>
              </button>
            </div>
          </div>

          {/* Quick Wallet Balance & Language Switcher */}
          <div className="flex items-center gap-2.5">
            
            {/* Wallet quick balance */}
            <div
              onClick={onScrollToPassport}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold cursor-pointer hover:bg-amber-500/25 transition-colors"
              title={t.wallet_sub}
            >
              <Wallet className="w-3 h-3 text-amber-400" />
              <span>{t.wallet_balance_label} {walletBalance} {t.currency}</span>
            </div>

            {/* Escrow badge */}
            <div className="hidden lg:flex items-center gap-1 text-[10px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t.escrow_active}</span>
            </div>

            {/* Language Switcher Button (Requested: العربية، الإنجليزية، الفرنسية، الإسبانية) */}
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />

          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo & Brand Identity */}
          <BrandLogo
            size="md"
            showBadge={true}
            badgeText={t.brand_sub}
            showSlogan={true}
            sloganText={t.slogan}
            onClick={() => setActiveTab('all')}
          />

          {/* Quick Search Bar */}
          <div className="flex-1 max-w-xs xl:max-w-sm hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder={t.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 text-xs text-slate-200 placeholder-slate-400 pr-9 pl-3 py-2 rounded-xl border border-slate-700/60 focus:border-[#06B6D4] outline-none transition-all shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 top-2 text-[10px] text-slate-400 hover:text-white bg-slate-800 rounded px-1.5"
                >
                  {t.clear}
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            
            {/* All Specializations */}
            <button
              onClick={onOpenSpecializations}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 hover:text-[#06B6D4] hover:bg-slate-800/60 transition-all border border-slate-800 hover:border-[#06B6D4]/30 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{t.nav_specializations}</span>
            </button>

            {/* Marketplace */}
            <button
              onClick={() => {
                setActiveTab('marketplace');
                onScrollToCourses();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'marketplace'
                  ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{t.nav_marketplace}</span>
            </button>

            {/* Skills Passport */}
            <button
              onClick={() => {
                setActiveTab('passport');
                onScrollToPassport();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'passport'
                  ? 'bg-[#7C3AED]/25 text-purple-300 border border-[#7C3AED]/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>{t.nav_passport}</span>
              <span className="text-[10px] bg-[#7C3AED] text-white px-1.5 rounded-full font-bold">
                {userProfile.badges.length}
              </span>
            </button>

            {/* Smart Advisor */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-all glow-turquoise cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-[#06B6D4] animate-pulse" />
              <span>{t.nav_advisor}</span>
            </button>

            {/* AI Studio */}
            <button
              onClick={onOpenImageGen}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6D28D9] text-white shadow-md shadow-[#7C3AED]/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>{t.nav_ai_studio}</span>
            </button>

          </nav>

          {/* Action Buttons: Registration Dropdown + Admin Button + User Avatar */}
          <div className="flex items-center gap-2">
            
            {/* Registration Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setRegDropdownOpen(!regDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#06B6D4] to-teal-500 hover:from-cyan-400 text-slate-950 shadow-md transition-all cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.nav_register}</span>
                <span className="sm:hidden">{t.nav_register}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {regDropdownOpen && (
                <div className="absolute left-0 sm:right-0 mt-2 w-60 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 text-right">
                  <div className="text-[10px] text-slate-400 font-bold px-2 py-1 border-b border-slate-800">
                    {t.choose_reg_type}
                  </div>

                  <button
                    onClick={() => {
                      onOpenRegistration('institute');
                      setRegDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl text-right transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <div>{t.reg_institute}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.reg_institute_sub}</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenRegistration('trainer');
                      setRegDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl text-right transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-[#06B6D4] shrink-0" />
                    <div>
                      <div>{t.reg_trainer}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.reg_trainer_sub}</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenRegistration('learner');
                      setRegDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl text-right transition-colors"
                  >
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div>{t.reg_learner}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.reg_learner_sub}</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer shadow-sm"
              title={t.admin_title}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav_admin}</span>
            </button>

            {/* User Profile Mini Badge */}
            <button
              onClick={onScrollToPassport}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-800/70 border border-slate-700/60 hover:border-[#06B6D4]/40 transition-all text-right cursor-pointer"
            >
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-[#7C3AED]/60"
                />
                <span className="absolute -bottom-1 -left-1 text-[9px] bg-[#06B6D4] text-slate-950 font-black px-1 rounded">
                  L{userProfile.level}
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="text-[11px] font-bold text-white leading-tight">
                  {userProfile.name}
                </div>
                <div className="text-[9px] text-[#06B6D4] font-medium">
                  {userProfile.xp} XP
                </div>
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-800 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
            
            {/* Mobile Language Switcher Row */}
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-bold">اللغة / Language:</span>
              <LanguageSwitcher
                currentLang={currentLang}
                onLanguageChange={(lang) => {
                  onLanguageChange(lang);
                  setMobileMenuOpen(false);
                }}
              />
            </div>

            {/* Mobile Role Swapper */}
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
              <div className="text-[10px] text-slate-400 font-bold">{t.role_swapper_title}</div>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => {
                    onChangeViewRole('student');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1.5 rounded text-[10px] font-bold ${
                    activeViewRole === 'student' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  {t.role_student}
                </button>
                <button
                  onClick={() => {
                    onChangeViewRole('instructor');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1.5 rounded text-[10px] font-bold ${
                    activeViewRole === 'instructor' ? 'bg-[#06B6D4] text-slate-950' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  {t.role_instructor}
                </button>
                <button
                  onClick={() => {
                    onChangeViewRole('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1.5 rounded text-[10px] font-bold ${
                    activeViewRole === 'admin' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-amber-300'
                  }`}
                >
                  {t.role_admin}
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onOpenSpecializations();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800/80 text-[#06B6D4] text-right font-bold text-xs"
            >
              <Layers className="w-4 h-4 text-[#06B6D4]" />
              <span>{t.nav_specializations}</span>
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-right font-bold text-xs"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t.admin_title}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('marketplace');
                onScrollToCourses();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800/60 text-slate-200 text-right font-medium text-xs"
            >
              <Compass className="w-4 h-4 text-[#06B6D4]" />
              <span>{t.nav_marketplace}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('passport');
                onScrollToPassport();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800/60 text-slate-200 text-right font-medium text-xs"
            >
              <Award className="w-4 h-4 text-[#7C3AED]" />
              <span>{t.nav_passport} ({userProfile.badges.length})</span>
            </button>

            <button
              onClick={() => {
                onOpenChat();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 text-right font-semibold text-xs"
            >
              <Bot className="w-4 h-4 text-[#06B6D4]" />
              <span>{t.nav_advisor}</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
