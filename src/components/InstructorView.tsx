import React, { useState } from 'react';
import { 
  Home,
  GraduationCap, 
  Users, 
  DollarSign, 
  Award, 
  Plus, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Calendar,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Video,
  MapPin,
  Sparkles,
  Send,
  FileText,
  BadgeCheck,
  Check,
  Download,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Star,
  Flame
} from 'lucide-react';
import { Course, Transaction, TrustCertificate, UserAccount } from '../types';
import { Language, translations } from '../translations';
import { TrustPassportCard } from './TrustPassportCard';
import { ALL_SPECIALIZATIONS } from '../data/specializationsData';

interface InstructorViewProps {
  instructorAccount: UserAccount;
  courses: Course[];
  transactions: Transaction[];
  onOpenCreateCourse: () => void;
  onRequestPayout: (courseTitle: string, amount: number) => void;
  onOpenCertificateModal?: (cert: TrustCertificate) => void;
  onBackToLearner?: () => void;
  onSwitchAccount?: () => void;
  onLogoutInstructor?: () => void;
  onCourseCreated?: (newCourse: Course) => void;
  currentLang?: Language;
}

interface EnrolledLearnerItem {
  id: string;
  name: string;
  email: string;
  enrolledDate: string;
  paymentStatus: 'paid_escrow' | 'installment';
  attendanceRate: number;
  badgeIssued: boolean;
}

export const InstructorView: React.FC<InstructorViewProps> = ({
  instructorAccount,
  courses,
  transactions,
  onOpenCreateCourse,
  onRequestPayout,
  onOpenCertificateModal,
  onBackToLearner,
  onSwitchAccount,
  onLogoutInstructor,
  onCourseCreated,
  currentLang = 'ar',
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'tracking' | 'publisher' | 'accounting'>('tracking');
  const [payoutRequestedMessage, setPayoutRequestedMessage] = useState<string | null>(null);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(courses[0]?.id || null);
  const [showFullEmails, setShowFullEmails] = useState(false);

  // Mock enrolled learners per course for live management
  const [learnersByCourse, setLearnersByCourse] = useState<Record<string, EnrolledLearnerItem[]>>({
    'course-ai-mastery': [
      { id: 'lrn-1', name: 'أحمد التازي', email: 'ahmed.tazi@gmail.com', enrolledDate: '2026-11-01', paymentStatus: 'paid_escrow', attendanceRate: 100, badgeIssued: false },
      { id: 'lrn-2', name: 'سناء بناني', email: 'sanaa.b@yahoo.fr', enrolledDate: '2026-11-03', paymentStatus: 'paid_escrow', attendanceRate: 90, badgeIssued: false },
      { id: 'lrn-3', name: 'عمر القاسمي', email: 'omar.q@outlook.com', enrolledDate: '2026-11-04', paymentStatus: 'installment', attendanceRate: 85, badgeIssued: false },
    ],
    'course-fullstack-cloud': [
      { id: 'lrn-4', name: 'ياسين الفاسي', email: 'yassine.f@gmail.com', enrolledDate: '2026-11-02', paymentStatus: 'paid_escrow', attendanceRate: 95, badgeIssued: false },
      { id: 'lrn-5', name: 'لبنى الشريف', email: 'loubna.c@gmail.com', enrolledDate: '2026-11-04', paymentStatus: 'paid_escrow', attendanceRate: 88, badgeIssued: false },
    ],
  });

  // Badge Issuance feedback
  const [badgeToast, setBadgeToast] = useState<string | null>(null);

  const handleIssueBadge = (courseId: string, learnerId: string, learnerName: string) => {
    setLearnersByCourse((prev) => {
      const list = prev[courseId] || [];
      return {
        ...prev,
        [courseId]: list.map((l) => (l.id === learnerId ? { ...l, badgeIssued: true } : l)),
      };
    });
    setBadgeToast(`تم إصدار شارة التخرج واعتمادها في جواز مهارات "${learnerName}" بنجاح! 🎓`);
    setTimeout(() => setBadgeToast(null), 4000);
  };

  // Instructor Motivational & Performance Stats
  const totalCourses = courses.length;
  const totalStudents = courses.reduce((acc, c) => acc + (c.enrolledStudentsCount || (c.totalSeats - c.remainingSeats)), 0);
  const totalSeats = courses.reduce((acc, c) => acc + c.totalSeats, 0);
  const occupancyRate = totalSeats > 0 ? Math.round((totalStudents / totalSeats) * 100) : 84;
  
  // Escrow & Earnings for THIS instructor only (Kept strictly in accounting tab)
  const netInstructorTotal = transactions.reduce((acc, t) => acc + t.instructorPayout, 0);

  const pendingEscrow = transactions
    .filter((t) => t.escrowStatus === 'held_in_escrow')
    .reduce((acc, t) => acc + t.instructorPayout, 0);

  const releasedPayout = transactions
    .filter((t) => t.escrowStatus === 'released')
    .reduce((acc, t) => acc + t.instructorPayout, 0);

  const handleRequestPayoutClick = (courseTitle: string, amount: number) => {
    onRequestPayout(courseTitle, amount);
    setPayoutRequestedMessage(`تم تقديم طلب تحرير مستحقات Escrow بمبلغ ${amount.toLocaleString()} درهم إلى الإدارة للمراجعة والصرف البنكي!`);
    setTimeout(() => setPayoutRequestedMessage(null), 4000);
  };

  // Helper to mask emails for privacy
  const formatEmailPrivacy = (email: string) => {
    if (showFullEmails) return email;
    const parts = email.split('@');
    if (parts.length !== 2) return '***@***';
    const namePart = parts[0];
    const domain = parts[1];
    const maskedName = namePart.length > 2 ? `${namePart.slice(0, 2)}***` : '***';
    return `${maskedName}@${domain}`;
  };

  // Form state for publishing new course inside Publisher Tab
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(ALL_SPECIALIZATIONS[0]?.id || '');
  const [newSpecialty, setNewSpecialty] = useState(ALL_SPECIALIZATIONS[0]?.specializations[0]?.name || '');
  const [newMode, setNewMode] = useState<'remote' | 'in-person'>('remote');
  const [newLocation, setNewLocation] = useState('Google Meet / القاعة الافتراضية');
  const [newPrice, setNewPrice] = useState('1800');
  const [newSeats, setNewSeats] = useState('15');
  const [newDuration, setNewDuration] = useState('30 ساعة (4 أسابيع)');
  const [newLevel, setNewLevel] = useState<'مبتدئ' | 'متوسط' | 'متقدم' | 'جميع المستويات'>('جميع المستويات');
  const [newBadgeName, setNewBadgeName] = useState('');
  const [newSyllabus, setNewSyllabus] = useState('المحور الأول: الأسس النظرية والمفاهيمية\nالمحور الثاني: التطبيقات العملية ودراسة الحالة\nالمحور الثالث: مشروع التخرج النهائي');
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handlePublishCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCourseObj: Course = {
      id: `course-${Date.now()}`,
      title: newTitle.trim(),
      category: activeCategoryObj.name,
      description: `برنامج تكويني متخصص في ${newSpecialty} مقدم من ${instructorAccount.name}.`,
      instructor: {
        name: instructorAccount.name,
        title: 'مكوّن معتمد في المنصة',
        avatar: courses[0]?.instructor.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        rating: 5.0,
        reviewsCount: 1,
        verified: true,
        trustTier: instructorAccount.trustTier || 'silver',
      },
      mode: newMode,
      location: newLocation,
      remainingSeats: Number(newSeats),
      totalSeats: Number(newSeats),
      enrolledStudentsCount: 0,
      price: Number(newPrice),
      currency: 'درهم',
      duration: newDuration,
      level: newLevel,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      syllabus: newSyllabus.split('\n').filter(Boolean),
      features: ['تطبيقات عملية معتمدة', 'إصدار شارة في جواز المهارات', 'ضمان مالي Escrow'],
      badgeName: newBadgeName || `شارة إتقان ${newTitle.slice(0, 20)}`,
      badgeIcon: 'Award',
      startDate: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0],
      featured: true,
      status: 'approved',
    };

    onCourseCreated?.(newCourseObj);
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setActiveTab('tracking');
    }, 2000);
  };

  const activeCategoryObj = ALL_SPECIALIZATIONS.find((c) => c.id === newCategory) || ALL_SPECIALIZATIONS[0];

  const getTierDisplay = (tier?: string) => {
    switch (tier) {
      case 'diamond':
        return <span className="text-[10px] bg-cyan-950 text-[#06B6D4] px-3 py-1 rounded-full border border-cyan-800 font-bold">💎 رتبة الثقة الماسية (Diamond Tier)</span>;
      case 'gold':
        return <span className="text-[10px] bg-amber-950 text-amber-300 px-3 py-1 rounded-full border border-amber-800 font-bold">🥇 رتبة الثقة الذهبية (Gold Tier)</span>;
      case 'silver':
      default:
        return <span className="text-[10px] bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 font-bold">🥈 رتبة الثقة الفضية (Silver Tier)</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in font-['Alexandria']">
      
      {/* Toast notifications */}
      {payoutRequestedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-600 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in shadow-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{payoutRequestedMessage}</span>
        </div>
      )}
      {badgeToast && (
        <div className="p-4 rounded-2xl bg-cyan-950/90 border border-cyan-500 text-cyan-200 text-xs flex items-center gap-2 animate-in fade-in shadow-xl">
          <Sparkles className="w-4 h-4 shrink-0 text-[#06B6D4]" />
          <span>{badgeToast}</span>
        </div>
      )}

      {/* Instructor Banner Header (Personalized & Authenticated) */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#06B6D4]/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4 text-center sm:text-right">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white text-2xl font-black shadow-xl ring-2 ring-[#06B6D4]">
              {instructorAccount.name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -left-1 bg-emerald-500 text-slate-950 p-1 rounded-lg shadow">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                لوحة تميز وإدارة المكوّن: {instructorAccount.name}
              </h2>
              {getTierDisplay(instructorAccount.trustTier)}
            </div>
            <p className="text-xs text-slate-300 mt-1">
              الحساب: <span className="font-mono text-cyan-300">{instructorAccount.email}</span> • فضاء متابعة التكوينات، رصد تفاعل ومستوى المتدربين، ومنح شارات جواز المهارات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onBackToLearner && (
            <button
              onClick={onBackToLearner}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              title="العودة للصفحة الرئيسية للمنصة"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span>الرئيسية (فضاء المتدرب)</span>
            </button>
          )}

          {onSwitchAccount && (
            <button
              onClick={onSwitchAccount}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              title="التبديل إلى حساب مكوّن آخر أو الخروج"
            >
              <LogOut className="w-3.5 h-3.5 text-amber-400" />
              <span>تبديل الحساب</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('publisher')}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs sm:text-sm font-bold shadow-xl shadow-[#7C3AED]/20 hover:shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إعلان تكوين جديد</span>
          </button>
        </div>
      </div>

      {/* 4 Motivating & Competitive Indicators (المؤشرات التعريفية التنافسية والتحفيزية) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Metric 1: Quality Score */}
        <div className="glass-card p-4 rounded-2xl border border-cyan-500/30 bg-slate-950/60">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium">
            <span>مؤشر جودة التدريب</span>
            <Award className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <div className="text-2xl font-black text-[#06B6D4] mt-1 font-mono">
            99 / 100
          </div>
          <div className="text-[10px] text-cyan-300 mt-1">مستوى الاعتماد الفائق (Diamond Quality)</div>
        </div>

        {/* Metric 2: Satisfaction Rate */}
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 bg-slate-950/60">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium">
            <span>نسبة رضا المتدربين</span>
            <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
            99.4%
          </div>
          <div className="text-[10px] text-emerald-300 mt-1">تقييم ممتاز مبني على آراء المتدربين</div>
        </div>

        {/* Metric 3: Alumni */}
        <div className="glass-card p-4 rounded-2xl border border-purple-500/30 bg-slate-950/60">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium">
            <span>إجمالي الخريجين المؤهلين</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300 mt-1 font-mono">
            +620 متخرج
          </div>
          <div className="text-[10px] text-purple-400 mt-1">نالوا شارات الاعتماد في جواز المهارات</div>
        </div>

        {/* Metric 4: Seat Occupancy & Urgency */}
        <div className="glass-card p-4 rounded-2xl border border-amber-500/30 bg-slate-950/60">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium">
            <span>نسبة الإقبال وإشغال المقاعد</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 mt-1 font-mono">
            {occupancyRate}%
          </div>
          <div className="text-[10px] text-amber-400 mt-1">{totalStudents} متدرب مسجل عبر {totalCourses} برامج</div>
        </div>

      </div>

      {/* 3 Operational View Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('tracking')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'tracking'
              ? 'bg-slate-800 text-[#06B6D4] border border-[#06B6D4]/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>متابعة التكوينات ومؤشرات المتدربين ({courses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('publisher')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'publisher'
              ? 'bg-slate-800 text-[#7C3AED] border border-[#7C3AED]/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>إعلان تكوين جديد (Publisher)</span>
        </button>

        <button
          onClick={() => setActiveTab('accounting')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'accounting'
              ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>الوضعية المحاسباتية والـ Escrow الخاصة بك (خاص ومحمي)</span>
        </button>
      </div>

      {/* ================= TAB 1: TRACKING & LEARNERS ================= */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          
          {/* Trust Passport for Instructors */}
          <section className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#06B6D4]" />
                <h3 className="text-base font-bold text-white">
                  جواز الثقة والاعتماد المهني الخاص بك (Instructor Trust Passport)
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                درجة موثقة برقم تجاري وشهادات رسمية تدعم مكانتك التنافسية
              </span>
            </div>

            <TrustPassportCard
              onOpenCertificateModal={(cert) => onOpenCertificateModal?.(cert)}
              currentLang={currentLang}
            />
          </section>

          {/* Active Courses List with Trackers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                التكوينات التابعة لحسابك ومؤشرات حجز المقاعد
              </h3>
              <span className="text-xs text-[#06B6D4] font-bold">
                {courses.length} دورات معتمدة
              </span>
            </div>

            {courses.length === 0 ? (
              <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                <GraduationCap className="w-10 h-10 text-slate-500 mx-auto" />
                <h4 className="text-base font-bold text-white">لا توجد تكوينات منشورة باسمك حالياً</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  يمكنك البدء بنشر تكوينك الأول عبر زر "إعلان تكوين جديد" لتحديد المنهج واستقبال المتدربين.
                </p>
                <button
                  onClick={() => setActiveTab('publisher')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-bold cursor-pointer"
                >
                  نشر أول تكوين لك الآن
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map((course) => {
                  const enrolledCount = course.enrolledStudentsCount || (course.totalSeats - course.remainingSeats);
                  const isExpanded = expandedCourseId === course.id;
                  const learners = learnersByCourse[course.id] || [
                    { id: 'mock-1', name: 'رشيد العلمي', email: 'rachid.alami@gmail.com', enrolledDate: '2026-11-05', paymentStatus: 'paid_escrow' as const, attendanceRate: 100, badgeIssued: false },
                    { id: 'mock-2', name: 'مريم الصقلي', email: 'meryem.s@yahoo.fr', enrolledDate: '2026-11-07', paymentStatus: 'paid_escrow' as const, attendanceRate: 95, badgeIssued: false },
                  ];

                  const coursePercent = Math.round((enrolledCount / course.totalSeats) * 100);

                  return (
                    <div
                      key={course.id}
                      className="glass-card rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden transition-all shadow-xl"
                    >
                      {/* Course Summary Row */}
                      <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        
                        <div className="flex items-center gap-3.5">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-16 h-16 rounded-2xl object-cover shrink-0 ring-1 ring-slate-700"
                          />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-base font-bold text-white line-clamp-1">{course.title}</h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                                نشط ومفتوح
                              </span>
                            </div>
                            <span className="text-xs text-slate-400 block mt-0.5">
                              {course.category} • {course.mode === 'remote' ? 'عن بُعد تفاعلي' : 'حضوري'} • {course.duration}
                            </span>
                            <span className="text-xs text-cyan-300 font-bold block mt-1">
                              رسوم المقعد: {course.price} درهم • الشارة الممنوحة: {course.badgeName}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                          <div className="text-left min-w-[140px]">
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span>حجز المقاعد:</span>
                              <span className="font-bold text-amber-300 font-mono">{enrolledCount} / {course.totalSeats}</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-950 mt-1 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-amber-400 to-[#06B6D4] rounded-full" style={{ width: `${coursePercent}%` }}></div>
                            </div>
                            <span className="text-[10px] text-amber-400 font-bold block mt-0.5">
                              (متبقي {course.remainingSeats} مقاعد فقط!)
                            </span>
                          </div>

                          <button
                            onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer flex items-center gap-1 text-xs"
                          >
                            <span>{isExpanded ? 'إغلاق القائمة' : 'متابعة المسجلين'}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                      </div>

                      {/* Course Expandable Management Drawer */}
                      {isExpanded && (
                        <div className="border-t border-slate-800 p-5 bg-slate-950/60 space-y-4">
                          
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-[#06B6D4]" />
                              <h5 className="text-xs sm:text-sm font-bold text-white">
                                رصد الحضور وإصدار شارات جواز المهارات للمسجلين ({learners.length} متدربين)
                              </h5>
                            </div>

                            {/* Privacy mask toggle button */}
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                <span>خصوصية البريد الإلكتروني نشطة</span>
                              </span>
                              <button
                                onClick={() => setShowFullEmails(!showFullEmails)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold cursor-pointer"
                              >
                                {showFullEmails ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                <span>{showFullEmails ? 'إخفاء البريد' : 'إظهار البريد كاملاً'}</span>
                              </button>
                            </div>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-right text-xs">
                              <thead>
                                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                                  <th className="p-2.5">المتدرب</th>
                                  <th className="p-2.5">تاريخ التسجيل</th>
                                  <th className="p-2.5">حالة الرسوم (Escrow)</th>
                                  <th className="p-2.5">نسبة الحضور والتفاعل</th>
                                  <th className="p-2.5 text-center">إصدار الشارة لجواز المهارات</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800/60">
                                {learners.map((learner) => (
                                  <tr key={learner.id} className="hover:bg-slate-900/50">
                                    <td className="p-2.5 font-bold text-white">
                                      {learner.name}
                                      <span className="block text-[10px] text-slate-500 font-mono">
                                        {formatEmailPrivacy(learner.email)}
                                      </span>
                                    </td>
                                    <td className="p-2.5 text-slate-400 font-mono">{learner.enrolledDate}</td>
                                    <td className="p-2.5">
                                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                                        مؤمّنة في الضمان ✓
                                      </span>
                                    </td>
                                    <td className="p-2.5 font-mono text-cyan-300 font-bold">
                                      {learner.attendanceRate}%
                                    </td>
                                    <td className="p-2.5 text-center">
                                      {learner.badgeIssued ? (
                                        <span className="inline-flex items-center gap-1 text-[10px] text-cyan-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded-lg border border-cyan-700">
                                          <BadgeCheck className="w-3.5 h-3.5" />
                                          <span>تم الإصدار بالجواز</span>
                                        </span>
                                      ) : (
                                        <button
                                          onClick={() => handleIssueBadge(course.id, learner.id, learner.name)}
                                          className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-3 py-1 rounded-lg hover:shadow-md cursor-pointer"
                                        >
                                          <Sparkles className="w-3 h-3" />
                                          <span>منح الشارة</span>
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      )}

      {/* ================= TAB 2: COURSE PUBLISHER ================= */}
      {activeTab === 'publisher' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-6">
          
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#06B6D4]" />
              <span>إعلان ونشر تكوين جديد باسم: {instructorAccount.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              املأ تفاصيل التكوين، الجدول الزمني، والمخرجات المهارية لنشره في سوق BeInSkills
            </p>
          </div>

          {publishSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500 text-center space-y-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">تم نشر التكوين بنجاح!</h4>
              <p className="text-xs text-emerald-200">
                التكوين معروض الآن في سوق BeInSkills المفتوح ومتاح لحجز المقاعد.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePublishCourse} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان التكوين الاحترافي:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: المعسكر المتقدم في الإخراج السينمائي وهندسة الصوت"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">قطاع التكوين الأساسي:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => {
                      setNewCategory(e.target.value);
                      const cat = ALL_SPECIALIZATIONS.find((c) => c.id === e.target.value);
                      if (cat?.specializations[0]) setNewSpecialty(cat.specializations[0].name);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  >
                    {ALL_SPECIALIZATIONS.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">التخصص الدقيق:</label>
                  <select
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  >
                    {activeCategoryObj.specializations.map((spec) => (
                      <option key={spec.name} value={spec.name}>{spec.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">صيغة التكوين:</label>
                  <select
                    value={newMode}
                    onChange={(e) => setNewMode(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  >
                    <option value="remote">عن بُعد تفاعلي (Online Live)</option>
                    <option value="in-person">حضوري بقاعة تدريبية (In-Person)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">سعر المقعد (درهم):</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">عدد المقاعد الإجمالي:</label>
                  <input
                    type="number"
                    required
                    value={newSeats}
                    onChange={(e) => setNewSeats(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">المدة الزمنية الإجمالية:</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="مثال: 4 أسابيع (24 ساعة تطبيقية)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">مستوى التكوين:</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  >
                    <option value="جميع المستويات">جميع المستويات</option>
                    <option value="مبتدئ">مبتدئ</option>
                    <option value="متوسط">متوسط</option>
                    <option value="متقدم">متقدم</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">اسم شارة التخرج (التي ستمنح في جواز المهارات):</label>
                <input
                  type="text"
                  value={newBadgeName}
                  onChange={(e) => setNewBadgeName(e.target.value)}
                  placeholder="مثال: شارة مخرج سينمائي معتمد / Certified Screenplay Master"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">المنهج التدريبي التفصيلي (Syllabus):</label>
                <textarea
                  rows={4}
                  value={newSyllabus}
                  onChange={(e) => setNewSyllabus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('tracking')}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  نشر التكوين في سوق المنصة
                </button>
              </div>

            </form>
          )}

        </div>
      )}

      {/* ================= TAB 3: ACCOUNTING & ESCROW (STRICTLY PRIVATE) ================= */}
      {activeTab === 'accounting' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-slate-900/90 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>الوضعية المحاسباتية والضمان المالي الخاص بك (Escrow) 🔒</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  فضاء مالي مشفر ومحصور بحسابك: <span className="text-cyan-300 font-bold">{instructorAccount.name}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => handleRequestPayoutClick('كافة المستحقات المتاحة', releasedPayout || netInstructorTotal)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all cursor-pointer shadow-lg shadow-emerald-400/20"
            >
              طلب تحويل بنكي للمستحقات
            </button>
          </div>

          {/* 3 Private Financial KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">صافي مستحقاتك المحققة:</div>
              <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                {netInstructorTotal.toLocaleString()} <span className="text-xs">درهم</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">حصتك الصافية (88% بعد خصم رسوم المنصة)</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30">
              <div className="text-[11px] text-slate-400 font-medium">أموالك المحتجزة في الضمان (Escrow):</div>
              <div className="text-2xl font-black text-amber-300 mt-1 font-mono">
                {pendingEscrow.toLocaleString()} <span className="text-xs">درهم</span>
              </div>
              <div className="text-[10px] text-amber-400/90 mt-1">تُحرر تباعاً مع تقدم الساعات التدريبية</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">دفعات تم تحويلها لحسابك البنكي:</div>
              <div className="text-2xl font-black text-[#06B6D4] mt-1 font-mono">
                {releasedPayout.toLocaleString()} <span className="text-xs">درهم</span>
              </div>
              <div className="text-[10px] text-cyan-400 mt-1">تحويلات بنكية مكتملة</div>
            </div>
          </div>

          {/* Transactions ledger */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-300">سجل المعاملات والتحصيلات الخاصة بدوراتك:</h4>
            {transactions.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-2">
                <DollarSign className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-sm font-bold text-white">لا توجد معاملات مسجلة بعد لهذا الحساب</div>
                <p className="text-xs text-slate-400">
                  ستظهر المدفوعات والضمانات البنكية المحتجزة فور تسجيل المتدربين في برامجك التدريبية.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/80 bg-slate-950/60 rounded-2xl border border-slate-800 overflow-hidden text-xs">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-4 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <div className="font-bold text-white">{tx.courseTitle}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        المسدد: {tx.payerName} ({formatEmailPrivacy(tx.payerEmail)}) • {tx.date}
                      </div>
                    </div>

                    <div className="text-left flex items-center gap-4">
                      <div>
                        <span className="text-[10px] text-slate-400 block">صافي مستحقاتك (88%):</span>
                        <span className="font-bold text-emerald-400 font-mono text-sm">
                          +{tx.instructorPayout} درهم
                        </span>
                      </div>

                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-bold ${
                          tx.escrowStatus === 'released'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                            : 'bg-amber-950/80 text-amber-300 border-amber-800'
                        }`}
                      >
                        {tx.escrowStatus === 'released' ? 'محرر ومتاح للصرف ✓' : 'مؤمّن في الضمان (Escrow) 🔒'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
