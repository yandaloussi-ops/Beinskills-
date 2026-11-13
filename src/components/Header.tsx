import React, { useState } from 'react';
import { 
  Home,
  Sparkles, 
  Search, 
  Award, 
  Bot, 
  Menu, 
  X, 
  GraduationCap, 
  Layers, 
  UserPlus, 
  Building2, 
  ChevronDown
} from 'lucide-react';
import { UserProfile, ActiveViewRole, UserAccount } from '../types';
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
  onOpenSpecializations: () => void;
  onOpenInstructorsDirectory?: () => void;
  onOpenRegistration: (role?: RegistrationRole) => void;
  activeViewRole: ActiveViewRole;
  onChangeViewRole: (role: ActiveViewRole) => void;
  currentInstructor?: UserAccount | null;
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
  onOpenSpecializations,
  onOpenInstructorsDirectory,
  onOpenRegistration,
  activeViewRole,
  onChangeViewRole,
  currentInstructor,
  currentLang,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [regDropdownOpen, setRegDropdownOpen] = useState(false);

  const t = translations[currentLang];

  const handleGoHome = () => {
    onChangeViewRole('student');
    setActiveTab('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800/80 transition-all font-['Alexandria']">
      
      {/* Unified Single-Row Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo & Brand Identity (Clicking returns to Home) */}
          <BrandLogo
            size="md"
            showBadge={true}
            badgeText={t.brand_sub}
            showSlogan={true}
            sloganText={t.slogan}
            onClick={handleGoHome}
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
          <nav className="hidden xl:flex items-center gap-1.5">
            
            {/* 1. الرئيسية Home (The Primary Gateway) */}
            <button
              onClick={handleGoHome}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all' && activeViewRole === 'student'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>الرئيسية</span>
            </button>

            {/* 2. دليل التخصصات Specializations */}
            <button
              onClick={onOpenSpecializations}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 hover:text-[#06B6D4] hover:bg-slate-800/60 transition-all border border-slate-800 hover:border-[#06B6D4]/30 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>دليل التخصصات</span>
            </button>

            {/* 3. دليل المكوّنين والمراكز Instructors Directory */}
            <button
              onClick={onOpenInstructorsDirectory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 hover:text-cyan-300 hover:bg-slate-800/60 transition-all border border-slate-800 hover:border-cyan-500/30 cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>دليل المكوّنين</span>
            </button>

            {/* 4. جواز المهارات Skills Passport */}
            <button
              onClick={() => {
                onChangeViewRole('student');
                setActiveTab('passport');
                onScrollToPassport();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'passport' && activeViewRole === 'student'
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

            {/* 5. المستشار الذكي AI Advisor */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-[#06B6D4] animate-pulse" />
              <span>{t.nav_advisor}</span>
            </button>

            {/* 6. أستوديو الشارات AI Studio */}
            <button
              onClick={onOpenImageGen}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>{t.nav_ai_studio}</span>
            </button>

          </nav>

          {/* Action Area: فضاء المدربين ومؤسسات التكوين + انضمام وتسجيل + زر اللغة */}
          <div className="flex items-center gap-2">
            
            {/* 1. زر فضاء المدربين ومؤسسات التكوين */}
            <button
              type="button"
              onClick={() => onChangeViewRole('instructor')}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                activeViewRole === 'instructor'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white ring-2 ring-cyan-400/40'
                  : 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 hover:border-[#06B6D4]/40'
              }`}
              title="الانتقال إلى فضاء المدربين ومؤسسات التكوين"
            >
              <GraduationCap className="w-4 h-4 text-[#06B6D4]" />
              <span className="hidden sm:inline">فضاء المدربين ومؤسسات التكوين</span>
              <span className="sm:hidden">فضاء المدربين</span>
            </button>

            {/* 2. زر انضمام وتسجيل Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRegDropdownOpen(!regDropdownOpen)}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#06B6D4] to-teal-500 hover:from-cyan-400 text-slate-950 shadow-md transition-all cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>انضمام وتسجيل</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {regDropdownOpen && (
                <div className="absolute left-0 sm:right-0 mt-2 w-64 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 text-right space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold px-2 py-1 border-b border-slate-800">
                    اختر نوع الحساب للانضمام:
                  </div>

                  <button
                    onClick={() => {
                      onOpenRegistration('learner');
                      setRegDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl text-right transition-colors"
                  >
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div>تسجيل كباحث عن التكوين</div>
                      <div className="text-[10px] text-slate-400 font-normal">تفعيل جواز المهارات وحضور الدورات</div>
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
                      <div>تسجيل كمكوّن معتمد</div>
                      <div className="text-[10px] text-slate-400 font-normal">نشر الدورات وإدارة المسجلين والأرباح</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenRegistration('institute');
                      setRegDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl text-right transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <div>اعتماد مركز / مؤسسة تكوين</div>
                      <div className="text-[10px] text-slate-400 font-normal">شراكة مؤسسية وإصدار شارات المركز</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. زر اللغة (منزّل إلى السطر الرئيسي) */}
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />

            {/* 4. Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 xl:hidden cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-4">
          
          {/* Mobile Direct Button: فضاء المدربين ومؤسسات التكوين */}
          <button
            onClick={() => {
              onChangeViewRole('instructor');
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md"
          >
            <GraduationCap className="w-4 h-4" />
            <span>فضاء المدربين ومؤسسات التكوين</span>
          </button>

          {/* Mobile Links */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
            <button
              onClick={() => {
                handleGoHome();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 text-white text-right"
            >
              <Home className="w-4 h-4 text-[#06B6D4]" />
              <span>الرئيسية</span>
            </button>

            <button
              onClick={() => {
                onOpenSpecializations();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 text-[#06B6D4] text-right"
            >
              <Layers className="w-4 h-4 text-[#06B6D4]" />
              <span>دليل التخصصات</span>
            </button>

            <button
              onClick={() => {
                onOpenInstructorsDirectory?.();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 text-cyan-300 text-right"
            >
              <GraduationCap className="w-4 h-4 text-[#06B6D4]" />
              <span>دليل المكوّنين</span>
            </button>

            <button
              onClick={() => {
                onChangeViewRole('student');
                setActiveTab('passport');
                onScrollToPassport();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 text-purple-300 text-right"
            >
              <Award className="w-4 h-4 text-[#7C3AED]" />
              <span>جواز المهارات</span>
            </button>

            <button
              onClick={() => {
                onOpenChat();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 text-cyan-300 text-right"
            >
              <Bot className="w-4 h-4 text-[#06B6D4]" />
              <span>المستشار الذكي</span>
            </button>

            <button
              onClick={() => {
                onOpenImageGen();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 text-purple-300 text-right"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>أستوديو الشارات</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
