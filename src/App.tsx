import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  INITIAL_COURSES, 
  INITIAL_USER_PROFILE,
  INITIAL_TRANSACTIONS,
  INITIAL_USER_ACCOUNTS
} from './data/coursesData';
import { 
  Course, 
  UserProfile, 
  AchievementBadge, 
  CourseMode,
  ActiveViewRole,
  Transaction,
  UserAccount,
  UserAccountRole,
  UserAccountStatus,
  CourseApprovalStatus,
  TrustCertificate,
  TrustCertificateTier
} from './types';
import { Header } from './components/Header';
import { BrandLogo } from './components/BrandLogo';
import { Hero } from './components/Hero';
import { QuickAdviceBar } from './components/QuickAdviceBar';
import { CourseCard } from './components/CourseCard';
import { SkillsPassportCard } from './components/SkillsPassportCard';
import { CourseModal } from './components/CourseModal';
import { CheckoutModal } from './components/CheckoutModal';
import { InstructorView } from './components/InstructorView';
import { GeminiChatbotModal } from './components/GeminiChatbotModal';
import { ImageGeneratorModal } from './components/ImageGeneratorModal';
import { BadgeDetailModal } from './components/BadgeDetailModal';
import { RegistrationModal, RegistrationRole } from './components/RegistrationModal';
import { AllSpecializationsModal } from './components/AllSpecializationsModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { TrustCertificateModal } from './components/TrustCertificateModal';
import { Language, translations, LANGUAGES } from './translations';
import { 
  Filter, 
  Sparkles, 
  Search, 
  Compass, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  Layers, 
  ArrowUp,
  MapPin,
  Video,
  ShieldCheck,
  Building2,
  UserPlus,
  DollarSign,
  Lock,
  Wallet
} from 'lucide-react';

export default function App() {
  // 0. Language State (Arabic, English, French, Spanish)
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('beinskills_lang');
    return (saved as Language) || 'ar';
  });

  const t = translations[currentLang];

  // 1. Role Swapper State (Student, Instructor, Admin)
  const [activeViewRole, setActiveViewRole] = useState<ActiveViewRole>(() => {
    const saved = localStorage.getItem('beinskills_view_role');
    return (saved as ActiveViewRole) || 'student';
  });

  // 2. Courses State
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('beinskills_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  // 3. User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('beinskills_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  // 4. Financial Transactions State
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('beinskills_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // 5. User Accounts & Institutions State
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('beinskills_users');
    return saved ? JSON.parse(saved) : INITIAL_USER_ACCOUNTS;
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [selectedMode, setSelectedMode] = useState<'all' | CourseMode>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'marketplace' | 'passport'>('all');

  // Modals state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isImageGenOpen, setIsImageGenOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trust Certificate & Accreditation Modal State
  const [selectedTrustCert, setSelectedTrustCert] = useState<TrustCertificate | null>(null);
  const [isTrustCertModalOpen, setIsTrustCertModalOpen] = useState(false);

  // Admin & Directory Modals
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSpecializationsOpen, setIsSpecializationsOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [registrationRole, setRegistrationRole] = useState<RegistrationRole>('learner');

  // References for smooth scrolling
  const coursesSectionRef = useRef<HTMLDivElement>(null);
  const passportSectionRef = useRef<HTMLDivElement>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('beinskills_lang', currentLang);
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  useEffect(() => {
    localStorage.setItem('beinskills_view_role', activeViewRole);
  }, [activeViewRole]);

  useEffect(() => {
    localStorage.setItem('beinskills_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('beinskills_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('beinskills_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('beinskills_users', JSON.stringify(userAccounts));
  }, [userAccounts]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(courses.map((c) => c.category));
    return ['الكل', ...Array.from(set)];
  }, [courses]);

  // Filtered courses (only approved courses shown in public marketplace)
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const isApproved = (course.status || 'approved') === 'approved';
      if (!isApproved) return false;

      const matchSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'الكل' || course.category === selectedCategory;

      const matchMode =
        selectedMode === 'all' || course.mode === selectedMode;

      return matchSearch && matchCategory && matchMode;
    });
  }, [courses, searchQuery, selectedCategory, selectedMode]);

  // Handle Enrollment & Checkout Flow
  const handleEnrollCourse = (course: Course) => {
    setCheckoutCourse(course);
    setIsCheckoutOpen(true);
  };

  const handleOpenCourseDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsCourseModalOpen(true);
  };

  // Payment Success Handler (Escrow & Wallet updates)
  const handlePaymentSuccess = (newTx: Transaction, updatedWalletBalance: number) => {
    // 1. Add transaction to platform transactions
    setTransactions((prev) => [newTx, ...prev]);

    // 2. Decrease remaining seats & increment enrolled count
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === newTx.courseId) {
          const newRemaining = Math.max(0, c.remainingSeats - newTx.seatsCount);
          const currentEnrolled = c.enrolledStudentsCount || (c.totalSeats - c.remainingSeats);
          return {
            ...c,
            remainingSeats: newRemaining,
            enrolledStudentsCount: currentEnrolled + newTx.seatsCount,
          };
        }
        return c;
      })
    );

    // 3. Update User Profile (Enrolled course, XP, wallet cashback balance)
    const targetCourse = courses.find((c) => c.id === newTx.courseId);
    const newBadge: AchievementBadge = {
      id: `badge-enrolled-${newTx.courseId}-${Date.now()}`,
      title: targetCourse?.badgeName || 'شارة الإتقان المعتمدة',
      category: targetCourse?.category || 'المهارات التقنية',
      description: `تم الانضمام لتكوين "${newTx.courseTitle}" مع ${newTx.instructorName}.`,
      icon: 'Award',
      dateEarned: new Date().toISOString().split('T')[0],
      rarity: 'ذهبي',
    };

    setUserProfile((prev) => {
      const isAlreadyIn = prev.enrolledCourseIds.includes(newTx.courseId);
      const updatedEnrolled = isAlreadyIn
        ? prev.enrolledCourseIds
        : [...prev.enrolledCourseIds, newTx.courseId];

      const newXp = prev.xp + 300;
      const leveledUp = newXp >= prev.nextLevelXp;

      const currentWallet = prev.wallet || { balance: 380, currency: 'درهم', history: [] };
      const cashbackEarned = Math.round(newTx.amount * 0.05);

      return {
        ...prev,
        enrolledCourseIds: updatedEnrolled,
        xp: newXp,
        level: leveledUp ? prev.level + 1 : prev.level,
        nextLevelXp: leveledUp ? prev.nextLevelXp + 500 : prev.nextLevelXp,
        badges: [newBadge, ...prev.badges],
        wallet: {
          ...currentWallet,
          balance: updatedWalletBalance,
          history: [
            {
              id: `w-${Date.now()}`,
              type: 'earned',
              amount: cashbackEarned,
              reason: `كاشباك حجز الدورة "${newTx.courseTitle.slice(0, 30)}..."`,
              date: new Date().toISOString().split('T')[0],
            },
            ...currentWallet.history,
          ],
        },
      };
    });

    showToast(`تهانينا! تم تأكيد الدفع وإيداع الرسوم في الحساب الوسيط (Escrow Protected) بنجاح 🛡️✨`);
  };

  // Escrow Release Handler (Called by Admin)
  const handleReleaseEscrowPayout = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId
          ? { ...t, escrowStatus: 'released' }
          : t
      )
    );
    showToast(`تم تحرير الدفعة من الحساب الوسيط وتحويل المستحقات للمكوّن بنجاح!`);
  };

  // Admin Course Handlers
  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
    showToast(`تم نشر التكوين الجديد "${newCourse.title}" بنجاح في السوق! 🚀`);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    showToast('تم حذف التكوين من السوق.');
  };

  const handleUpdateCourseSeats = (courseId: string, delta: number) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updated = Math.max(0, c.remainingSeats + delta);
          return { ...c, remainingSeats: updated };
        }
        return c;
      })
    );
  };

  const handleToggleCourseFeatured = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, featured: !c.featured } : c
      )
    );
  };

  const handleSetCourseStatus = (courseId: string, status: CourseApprovalStatus) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, status } : c
      )
    );
  };

  // Admin User Handlers
  const handleUpdateUserStatus = (userId: string, status: UserAccountStatus) => {
    setUserAccounts((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status } : u
      )
    );
  };

  const handleToggleUserVerified = (userId: string) => {
    setUserAccounts((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, verified: !u.verified } : u
      )
    );
  };

  const handleUpdateUserRole = (userId: string, role: UserAccountRole) => {
    setUserAccounts((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, role } : u
      )
    );
  };

  // Registration Handlers
  const handleLearnerRegistered = (profileData: Partial<UserProfile>) => {
    const welcomeBadge: AchievementBadge = {
      id: `welcome-badge-${Date.now()}`,
      title: 'شارة الانضمام لمنظومة BeInSkills',
      category: 'التنمية المهنية',
      description: 'مُنحت عند تفعيل حساب باحث عن التكوين وافتتاح جواز المهارات.',
      icon: 'Award',
      dateEarned: new Date().toISOString().split('T')[0],
      rarity: 'فضي',
    };

    setUserProfile((prev) => ({
      ...prev,
      name: profileData.name || prev.name,
      headline: profileData.headline || prev.headline,
      xp: prev.xp + 200,
      badges: [welcomeBadge, ...prev.badges],
    }));

    // Add to accounts list
    setUserAccounts((prev) => [
      {
        id: `usr-${Date.now()}`,
        name: profileData.name || 'متدرب جديد',
        email: 'new.student@beinskills.ma',
        role: 'student',
        status: 'active',
        verified: true,
        coursesCount: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        balance: 200,
      },
      ...prev,
    ]);

    showToast('أهلاً بك في BeInSkills! تم تفعيل جواز مهاراتك وشحن +200 XP 🎉');
  };

  const handleInstituteRegistered = (instituteData: any) => {
    setUserAccounts((prev) => [
      {
        id: `inst-${Date.now()}`,
        name: instituteData.name,
        email: instituteData.email,
        role: 'institute_b2b',
        status: 'active',
        verified: false,
        coursesCount: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        balance: 0,
      },
      ...prev,
    ]);
    showToast('تم استلام طلب تسجيل مؤسسة التكوين بنجاح!');
  };

  const handleTrainerRegistered = (trainerData: any) => {
    setUserAccounts((prev) => [
      {
        id: `tr-${Date.now()}`,
        name: trainerData.name,
        email: trainerData.email,
        role: 'instructor',
        status: 'active',
        verified: false,
        coursesCount: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        balance: 0,
      },
      ...prev,
    ]);
    showToast('تم استلام ملف تسجيل المكوّن الخاص بنجاح!');
  };

  const handleBadgeAdded = (newBadge: AchievementBadge) => {
    setUserProfile((prev) => ({
      ...prev,
      xp: prev.xp + 150,
      badges: [newBadge, ...prev.badges],
    }));
    showToast(`تمت إضافة "${newBadge.title}" إلى جواز المهارات بنجاح! ✨`);
  };

  const handleOpenTrustCertificate = (cert: TrustCertificate) => {
    setSelectedTrustCert(cert);
    setIsTrustCertModalOpen(true);
  };

  const handleUpdateUserTrustTier = (userId: string, tier: TrustCertificateTier | null) => {
    setUserAccounts((prev) =>
      prev.map((acc) => (acc.id === userId ? { ...acc, trustTier: tier || undefined } : acc))
    );
    showToast(
      tier
        ? `تم تعيين مستوى الاعتماد (${tier === 'diamond' ? 'الشهادة الماسية 💎' : tier === 'gold' ? 'الشهادة الذهبية 🥇' : 'الشهادة الفضية 🥈'}) بنجاح`
        : 'تم سحب شهادة الاعتماد'
    );
  };

  const openRegistrationWithRole = (role?: RegistrationRole) => {
    setRegistrationRole(role || 'learner');
    setIsRegistrationOpen(true);
  };

  const scrollToCourses = () => {
    coursesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPassport = () => {
    passportSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectSpecialization = (specName: string) => {
    setSearchQuery(specName);
    scrollToCourses();
  };

  const handleConsultAiAboutSpec = (specName: string) => {
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-['Alexandria'] selection:bg-[#7C3AED] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 border border-[#06B6D4] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="p-2 rounded-xl bg-[#06B6D4]/20 text-[#06B6D4]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm font-semibold">{toastMessage}</div>
        </div>
      )}

      {/* 1. Header with Role Swapper & Language Switcher */}
      <Header
        userProfile={userProfile}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenImageGen={() => setIsImageGenOpen(true)}
        onScrollToCourses={scrollToCourses}
        onScrollToPassport={scrollToPassport}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSpecializations={() => setIsSpecializationsOpen(true)}
        onOpenRegistration={openRegistrationWithRole}
        activeViewRole={activeViewRole}
        onChangeViewRole={(role) => {
          setActiveViewRole(role);
          if (role === 'admin') {
            setIsAdminOpen(true);
          }
        }}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      <main className="flex-1">
        
        {/* VIEW 1: INSTRUCTOR VIEW (When Role is instructor) */}
        {activeViewRole === 'instructor' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <InstructorView
              courses={courses}
              transactions={transactions}
              onOpenCreateCourse={() => {
                setIsAdminOpen(true);
              }}
              onRequestPayout={(courseTitle, amount) => {
                showToast(currentLang === 'ar' ? `تم إرسال طلب تحرير مستحقات الضمان الوسيط بمبلغ ${amount} درهم إلى الإدارة.` : `Escrow payout request of ${amount} ${t.currency} sent to administration.`);
              }}
              onOpenCertificateModal={handleOpenTrustCertificate}
              currentLang={currentLang}
            />
          </div>
        )}

        {/* VIEW 2: ADMIN VIEW SHORTCUT BANNER (When Role is admin) */}
        {activeViewRole === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="glass-card p-6 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900 to-purple-950/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 font-black">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-['Alexandria']">
                    {t.admin_mode_banner_title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {t.admin_mode_banner_sub}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer shrink-0"
              >
                {t.admin_mode_banner_btn}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: STUDENT / MARKETPLACE EXPERIENCE (Default & accessible across roles) */}
        {activeViewRole !== 'instructor' && (
          <>
            {/* 2. Hero Section */}
            <Hero
              onExploreCourses={scrollToCourses}
              onOpenPassport={scrollToPassport}
              onOpenChat={() => setIsChatOpen(true)}
              onOpenImageGen={() => setIsImageGenOpen(true)}
              onOpenSpecializations={() => setIsSpecializationsOpen(true)}
              onOpenRegistration={openRegistrationWithRole}
              onOpenAdmin={() => setIsAdminOpen(true)}
              currentLang={currentLang}
            />

            {/* 3. Low-Latency Instant Advice Bar */}
            <QuickAdviceBar 
              onOpenFullChat={() => setIsChatOpen(true)} 
              currentLang={currentLang}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
              
              {/* Quick Access Bar for All Specializations & Admin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Specializations Card Banner */}
                <div
                  onClick={() => setIsSpecializationsOpen(true)}
                  className="glass-card p-5 rounded-2xl border border-[#06B6D4]/30 hover:border-[#06B6D4] bg-slate-900/60 hover:bg-slate-800/80 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-[#06B6D4]/20 text-[#06B6D4] group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#06B6D4] transition-colors">
                        {t.specializations_banner_title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {t.specializations_banner_sub}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#06B6D4] bg-cyan-950/80 border border-cyan-800/50 px-3 py-1.5 rounded-xl shrink-0 group-hover:bg-[#06B6D4] group-hover:text-slate-950 transition-all">
                    {t.explore_btn}
                  </span>
                </div>

                {/* Admin Management Card Banner */}
                <div
                  onClick={() => setIsAdminOpen(true)}
                  className="glass-card p-5 rounded-2xl border border-amber-500/30 hover:border-amber-400 bg-slate-900/60 hover:bg-slate-800/80 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {t.admin_banner_title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {t.admin_banner_sub}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-800/50 px-3 py-1.5 rounded-xl shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                    {t.admin_banner_btn}
                  </span>
                </div>

              </div>

              {/* 4. Skills Passport (جواز المهارات & محفظة المهارات) Card Section */}
              <section id="passport" ref={passportSectionRef} className="scroll-mt-24">
                <SkillsPassportCard
                  userProfile={userProfile}
                  courses={courses}
                  onOpenImageGen={() => setIsImageGenOpen(true)}
                  onSelectBadge={(badge) => setSelectedBadge(badge)}
                  onExploreCourses={scrollToCourses}
                  currentLang={currentLang}
                />
              </section>

              {/* 5. Marketplace / Courses Section */}
              <section id="courses" ref={coursesSectionRef} className="scroll-mt-24 space-y-8">
                
                {/* Section Header & Filters */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
                      <Compass className="w-4 h-4" />
                      <span>{t.marketplace_heading}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {t.marketplace_subheading}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      {t.marketplace_desc}
                    </p>
                  </div>

                  {/* Remote / In-Person Mode Switcher */}
                  <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 self-start md:self-auto">
                    <button
                      onClick={() => setSelectedMode('all')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedMode === 'all'
                          ? 'bg-slate-800 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.mode_all} ({courses.length})
                    </button>
                    <button
                      onClick={() => setSelectedMode('remote')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedMode === 'remote'
                          ? 'bg-[#06B6D4] text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{t.mode_remote}</span>
                    </button>
                    <button
                      onClick={() => setSelectedMode('in-person')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedMode === 'in-person'
                          ? 'bg-[#7C3AED] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{t.mode_in_person}</span>
                    </button>
                  </div>
                </div>

                {/* Category Pills Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
                  <span className="text-slate-400 font-semibold shrink-0 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-[#06B6D4]" />
                    {t.filter_label}
                  </span>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md shadow-[#7C3AED]/20'
                          : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {cat === 'الكل' ? t.mode_all : cat}
                    </button>
                  ))}
                </div>

                {/* Course Grid Cards */}
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        isEnrolled={userProfile.enrolledCourseIds.includes(course.id)}
                        onSelectCourse={handleOpenCourseDetails}
                        onEnroll={handleEnrollCourse}
                        currentLang={currentLang}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 space-y-3">
                    <Search className="w-10 h-10 text-slate-500 mx-auto" />
                    <h3 className="text-base font-bold text-white">{t.no_courses_found}</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      {t.no_courses_found_sub}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('الكل');
                        setSelectedMode('all');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-[#06B6D4] hover:bg-slate-700 cursor-pointer"
                    >
                      {t.reset_search_btn}
                    </button>
                  </div>
                )}

              </section>

              {/* 6. AI Studio Banner Feature */}
              <section className="glass-card rounded-3xl p-6 sm:p-10 border border-[#7C3AED]/30 bg-gradient-to-r from-purple-950/30 via-[#0F172A] to-cyan-950/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="space-y-3 text-center md:text-right max-w-xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED]/20 text-purple-300 border border-[#7C3AED]/40">
                    <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                    <span>{t.ai_studio_badge}</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {t.ai_studio_title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t.ai_studio_sub}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <button
                      onClick={() => setIsImageGenOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] text-white text-xs font-bold shadow-lg shadow-[#7C3AED]/20 cursor-pointer"
                    >
                      {t.ai_studio_open_btn}
                    </button>
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
                    >
                      {t.ai_studio_advisor_btn}
                    </button>
                  </div>
                </div>

                {/* Visual Decorative Badges */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] p-1 shadow-2xl animate-pulse">
                    <div className="w-full h-full bg-[#0F172A] rounded-[22px] flex flex-col items-center justify-center p-4 text-center">
                      <Award className="w-12 h-12 text-[#06B6D4] mb-2" />
                      <span className="text-[11px] font-black text-white">4K Badge</span>
                      <span className="text-[9px] text-[#7C3AED] font-bold">BeInSkills Passport</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 bg-slate-950/80 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <BrandLogo
              size="sm"
              showText={true}
              showSlogan={true}
              sloganText={t.slogan}
              onClick={scrollToCourses}
            />

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="hover:text-white cursor-pointer" onClick={() => setIsSpecializationsOpen(true)}>{t.nav_specializations}</span>
              <span className="hover:text-white cursor-pointer" onClick={scrollToCourses}>{t.nav_marketplace}</span>
              <span className="hover:text-white cursor-pointer" onClick={scrollToPassport}>{t.nav_passport}</span>
              <span className="hover:text-white cursor-pointer" onClick={() => setIsAdminOpen(true)}>{t.nav_admin}</span>
              <span className="hover:text-white cursor-pointer" onClick={() => openRegistrationWithRole('institute')}>{t.reg_institute}</span>
              <span className="hover:text-white cursor-pointer" onClick={() => openRegistrationWithRole('trainer')}>{t.reg_trainer}</span>
              <span className="hover:text-white cursor-pointer" onClick={() => openRegistrationWithRole('learner')}>{t.reg_learner}</span>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              {t.footer_rights}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{t.footer_status}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      
      {/* 1. Course Details Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onEnrollConfirm={() => {}}
        onOpenCheckout={(course) => {
          setIsCourseModalOpen(false);
          handleEnrollCourse(course);
        }}
        isAlreadyEnrolled={
          selectedCourse
            ? userProfile.enrolledCourseIds.includes(selectedCourse.id)
            : false
        }
      />

      {/* 2. Full Checkout & Monetization Modal (Escrow, Installments, Wallet, B2B) */}
      <CheckoutModal
        course={checkoutCourse}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        userProfile={userProfile}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 3. Gemini Chatbot Modal */}
      <GeminiChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* 4. AI Image Badge Studio Modal (1K, 2K, 4K) */}
      <ImageGeneratorModal
        isOpen={isImageGenOpen}
        onClose={() => setIsImageGenOpen(false)}
        onBadgeAdded={handleBadgeAdded}
      />

      {/* 5. Badge Credentials Modal */}
      <BadgeDetailModal
        badge={selectedBadge}
        isOpen={Boolean(selectedBadge)}
        onClose={() => setSelectedBadge(null)}
      />

      {/* 6. Comprehensive Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        courses={courses}
        transactions={transactions}
        userAccounts={userAccounts}
        onAddCourse={handleAddCourse}
        onDeleteCourse={handleDeleteCourse}
        onUpdateCourseSeats={handleUpdateCourseSeats}
        onToggleCourseFeatured={handleToggleCourseFeatured}
        onSetCourseStatus={handleSetCourseStatus}
        onUpdateUserStatus={handleUpdateUserStatus}
        onToggleUserVerified={handleToggleUserVerified}
        onUpdateUserRole={handleUpdateUserRole}
        onReleaseEscrowPayout={handleReleaseEscrowPayout}
        onUpdateUserTrustTier={handleUpdateUserTrustTier}
        onOpenCertificateModal={handleOpenTrustCertificate}
        currentLang={currentLang}
      />

      {/* 7. Official Trust & Accreditation Certificate Modal (3 Tiers: Diamond, Gold, Silver) */}
      <TrustCertificateModal
        certificate={selectedTrustCert}
        isOpen={isTrustCertModalOpen}
        onClose={() => setIsTrustCertModalOpen(false)}
        currentLang={currentLang}
      />

      {/* 8. All Specializations & Fields Modal */}
      <AllSpecializationsModal
        isOpen={isSpecializationsOpen}
        onClose={() => setIsSpecializationsOpen(false)}
        onSelectSpecialization={handleSelectSpecialization}
        onConsultAiAboutSpec={handleConsultAiAboutSpec}
      />

      {/* 8. 3-Role Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        defaultRole={registrationRole}
        onLearnerRegistered={handleLearnerRegistered}
        onInstituteRegistered={handleInstituteRegistered}
        onTrainerRegistered={handleTrainerRegistered}
      />

    </div>
  );
}
