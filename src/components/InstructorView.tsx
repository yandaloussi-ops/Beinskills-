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
  Download
} from 'lucide-react';
import { Course, Transaction, TrustCertificate } from '../types';
import { Language, translations } from '../translations';
import { TrustPassportCard } from './TrustPassportCard';
import { ALL_SPECIALIZATIONS } from '../data/specializationsData';

interface InstructorViewProps {
  courses: Course[];
  transactions: Transaction[];
  onOpenCreateCourse: () => void;
  onRequestPayout: (courseTitle: string, amount: number) => void;
  onOpenCertificateModal?: (cert: TrustCertificate) => void;
  onBackToLearner?: () => void;
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
  courses,
  transactions,
  onOpenCreateCourse,
  onRequestPayout,
  onOpenCertificateModal,
  onBackToLearner,
  currentLang = 'ar',
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'tracking' | 'publisher' | 'accounting'>('tracking');
  const [payoutRequestedMessage, setPayoutRequestedMessage] = useState<string | null>(null);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(courses[0]?.id || null);

  // Mock enrolled learners per course for live management
  const [learnersByCourse, setLearnersByCourse] = useState<Record<string, EnrolledLearnerItem[]>>({
    'course-ai-mastery': [
      { id: 'lrn-1', name: 'أحمد التازي', email: 'ahmed.tazi@gmail.com', enrolledDate: '2026-11-01', paymentStatus: 'paid_escrow', attendanceRate: 100, badgeIssued: false },
      { id: 'lrn-2', name: 'سناء بناني', email: 'sanaa.b@yahoo.fr', enrolledDate: '2026-11-03', paymentStatus: 'paid_escrow', attendanceRate: 90, badgeIssued: false },
      { id: 'lrn-3', name: 'عمر القاسمي', email: 'omar.q@outlook.com', enrolledDate: '2026-11-04', paymentStatus: 'installment', attendanceRate: 85, badgeIssued: false },
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

  // Instructor stats
  const totalCourses = courses.length;
  const totalStudents = courses.reduce((acc, c) => acc + (c.enrolledStudentsCount || (c.totalSeats - c.remainingSeats)), 0);
  
  // Escrow & Earnings
  const totalGross = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalPlatformFees = transactions.reduce((acc, t) => acc + t.platformFee, 0);
  const netInstructorTotal = totalGross - totalPlatformFees;

  const pendingEscrow = transactions
    .filter((t) => t.escrowStatus === 'held_in_escrow')
    .reduce((acc, t) => acc + t.instructorPayout, 0);

  const releasedPayout = transactions
    .filter((t) => t.escrowStatus === 'released')
    .reduce((acc, t) => acc + t.instructorPayout, 0);

  const handleRequestPayoutClick = (courseTitle: string, amount: number) => {
    onRequestPayout(courseTitle, amount);
    setPayoutRequestedMessage(`تم تقديم طلب تحرير دفعة Escrow بمبلغ ${amount.toLocaleString()} درهم للمراجعة والصرف البنكي!`);
    setTimeout(() => setPayoutRequestedMessage(null), 4000);
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
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setActiveTab('tracking');
    }, 2500);
  };

  const activeCategoryObj = ALL_SPECIALIZATIONS.find((c) => c.id === newCategory) || ALL_SPECIALIZATIONS[0];

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Toast notifications */}
      {payoutRequestedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-600 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{payoutRequestedMessage}</span>
        </div>
      )}
      {badgeToast && (
        <div className="p-4 rounded-2xl bg-cyan-950/90 border border-cyan-500 text-cyan-200 text-xs flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 shrink-0 text-[#06B6D4]" />
          <span>{badgeToast}</span>
        </div>
      )}

      {/* Instructor Banner Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#06B6D4]/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4 text-center sm:text-right">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
              alt="Instructor"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-[#06B6D4] shadow-xl"
            />
            <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-slate-950 p-1 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                لوحة تحكم وإدارة المكوّن والمؤسسة
              </h2>
              <span className="text-[10px] bg-cyan-950 text-[#06B6D4] px-2.5 py-0.5 rounded-full border border-cyan-800 font-bold">
                💎 رتبة الثقة الماسية (Diamond Tier)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              مساحة العمل المتكاملة: إعلان الدورات، متابعة المسجلين، تحرير دفعات الضمان Escrow، ومنح الشارات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onBackToLearner && (
            <button
              onClick={onBackToLearner}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span>الرئيسية (فضاء المتدرب)</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('publisher')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs sm:text-sm font-bold shadow-xl shadow-[#7C3AED]/20 hover:shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إعلان ونشر تكوين جديد</span>
          </button>
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
          <span>متابعة التكوينات النشطة والمسجلين ({courses.length})</span>
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
          <DollarSign className="w-4 h-4" />
          <span>الوضعية المحاسباتية والـ Escrow</span>
        </button>
      </div>

      {/* Financial & Operational KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-950/60">
          <div className="text-[11px] text-slate-400 font-medium">صافي الأرباح المحققة:</div>
          <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
            {netInstructorTotal.toLocaleString()} <span className="text-xs">درهم</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">بعد اقتطاع عمولة المنصة (12%)</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-amber-500/30 bg-slate-950/60">
          <div className="text-[11px] text-slate-400 font-medium">أموال محتجزة في الضمان (Escrow):</div>
          <div className="text-2xl font-black text-amber-300 mt-1 font-mono">
            {pendingEscrow.toLocaleString()} <span className="text-xs">درهم</span>
          </div>
          <div className="text-[10px] text-amber-400/90 mt-1">تُحرر تباعاً مع تقدم الساعات</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-950/60">
          <div className="text-[11px] text-slate-400 font-medium">دفعات تم صرفها بنكياً:</div>
          <div className="text-2xl font-black text-[#06B6D4] mt-1 font-mono">
            {releasedPayout.toLocaleString()} <span className="text-xs">درهم</span>
          </div>
          <div className="text-[10px] text-cyan-400 mt-1">تحويلات بنكية مكتملة</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-950/60">
          <div className="text-[11px] text-slate-400 font-medium">إجمالي المتدربين المسجلين:</div>
          <div className="text-2xl font-black text-purple-300 mt-1 font-mono">
            {totalStudents} متدرب
          </div>
          <div className="text-[10px] text-purple-400 mt-1">عبر {totalCourses} برامج تدريبية</div>
        </div>

      </div>

      {/* ================= TAB 1: TRACKING & LEARNERS ================= */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          
          {/* Trust Passport for Instructors */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#06B6D4]" />
                <h3 className="text-base font-bold text-white font-['Alexandria']">
                  جواز الثقة والاعتماد المهني للمكوّن (Instructor Trust Passport)
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                درجة موثقة برقم تجاري وشهادات رسمية
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
              <h3 className="text-base font-bold text-white font-['Alexandria']">
                التكوينات المعلنة ومتابعة المسار والمسجلين
              </h3>
              <span className="text-xs text-[#06B6D4] font-bold">
                {courses.length} دورات معتمدة
              </span>
            </div>

            <div className="space-y-4">
              {courses.map((course) => {
                const enrolledCount = course.enrolledStudentsCount || (course.totalSeats - course.remainingSeats);
                const courseRevenue = enrolledCount * course.price;
                const netCourseEarnings = Math.round(courseRevenue * 0.88);
                const isExpanded = expandedCourseId === course.id;
                const learners = learnersByCourse[course.id] || [
                  { id: 'mock-1', name: 'رشيد العلمي', email: 'rachid@gmail.com', enrolledDate: '2026-11-05', paymentStatus: 'paid_escrow' as const, attendanceRate: 100, badgeIssued: false },
                  { id: 'mock-2', name: 'مريم الصقلي', email: 'meryem.s@yahoo.fr', enrolledDate: '2026-11-07', paymentStatus: 'paid_escrow' as const, attendanceRate: 95, badgeIssued: false },
                ];

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
                          <span className="text-xs text-emerald-400 font-bold mt-1 inline-block">
                            السعر: {course.price} درهم/مقعد • صافي الأرباح: {netCourseEarnings.toLocaleString()} درهم
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                        {/* Enrollment Progress */}
                        <div className="text-right text-xs">
                          <span className="text-slate-400 block text-[11px]">حجز المقاعد:</span>
                          <span className="font-bold text-white">
                            {enrolledCount} / {course.totalSeats} ({course.remainingSeats} مقعد متبقٍ)
                          </span>
                        </div>

                        {/* Payout Request Button */}
                        <button
                          onClick={() => handleRequestPayoutClick(course.title, netCourseEarnings)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>تحرير الدفعة</span>
                        </button>

                        {/* Toggle Drawer */}
                        <button
                          onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          aria-label="تفاصيل المسجلين"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                    </div>

                    {/* EXPANDABLE SECTION: Enrolled Learners & Attendance & Badge Issuance */}
                    {isExpanded && (
                      <div className="p-5 bg-slate-950/80 border-t border-slate-800 space-y-4 animate-in fade-in">
                        
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#06B6D4]" />
                            <h5 className="text-xs sm:text-sm font-bold text-white">
                              قائمة المتدربين المسجلين في هذا التكوين ({learners.length} متدربين)
                            </h5>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            يمكنك رصد الحضور وإصدار شارات التخرج بنقرة واحدة في جواز مهارات المتدرب
                          </span>
                        </div>

                        {/* Learners Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-right text-slate-300">
                            <thead className="text-[11px] text-slate-400 bg-slate-900 border-b border-slate-800">
                              <tr>
                                <th className="p-2.5">المتدرب</th>
                                <th className="p-2.5">تاريخ التسجيل</th>
                                <th className="p-2.5">حالة الرسوم (Escrow)</th>
                                <th className="p-2.5">نسبة الحضور</th>
                                <th className="p-2.5 text-center">إصدار الشارة لجواز المهارات</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                              {learners.map((learner) => (
                                <tr key={learner.id} className="hover:bg-slate-900/50">
                                  <td className="p-2.5 font-bold text-white">
                                    {learner.name}
                                    <span className="block text-[10px] text-slate-500 font-normal">{learner.email}</span>
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

          </div>

        </div>
      )}

      {/* ================= TAB 2: COURSE PUBLISHER ================= */}
      {activeTab === 'publisher' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-6">
          
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white font-['Alexandria'] flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#06B6D4]" />
              <span>إعلان ونشر تكوين جديد على المنصة</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              املأ تفاصيل التكوين، الجدول الزمني، والمخرجات المهارية لنشره في سوق BeInSkills المفتوح
            </p>
          </div>

          {publishSuccess ? (
            <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">تم نشر وإعلان التكوين بنجاح!</h4>
              <p className="text-xs text-slate-300">
                أصبح التكوين معروضاً في المنصة لاستقبال حجوزات المتدربين وتأمين مدفوعاتهم عبر Escrow.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePublishCourse} className="space-y-5 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">عنوان التكوين: *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="مثال: ورشة الإخراج السينمائي وكتابة السيناريو الاحترافي"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">القطاع المعرفي الأكبر: *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => {
                      setNewCategory(e.target.value);
                      const cat = ALL_SPECIALIZATIONS.find((c) => c.id === e.target.value);
                      setNewSpecialty(cat?.specializations[0]?.name || '');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  >
                    {ALL_SPECIALIZATIONS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">التخصص الفرعي:</label>
                  <select
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  >
                    {activeCategoryObj.specializations.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">صيغة التكوين:</label>
                  <select
                    value={newMode}
                    onChange={(e) => setNewMode(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  >
                    <option value="remote">عن بُعد تفاعلي (Online Live)</option>
                    <option value="in-person">حضوري بالقاعة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">المستوى المستهدف:</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  >
                    <option value="جميع المستويات">جميع المستويات</option>
                    <option value="مبتدئ">مبتدئ</option>
                    <option value="متوسط">متوسط</option>
                    <option value="متقدم">متقدم وخبير</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">السعر لكل مقعد (درهم): *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">عدد المقاعد الإجمالي: *</label>
                  <input
                    type="number"
                    required
                    value={newSeats}
                    onChange={(e) => setNewSeats(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">مدة التكوين:</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  />
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
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800"
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

      {/* ================= TAB 3: ACCOUNTING & ESCROW ================= */}
      {activeTab === 'accounting' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-['Alexandria'] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>الوضعية المحاسباتية والضمان المالي (Escrow Accounting)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                سجل شفاف لجميع المدفوعات، العمولات، والمبالغ المحتجزة في الضمان والمصروفة
              </p>
            </div>
            <button
              onClick={() => handleRequestPayoutClick('كافة المستحقات المتاحة', releasedPayout || 2400)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all cursor-pointer shadow-lg shadow-emerald-400/20"
            >
              طلب تحويل بنكي للمستحقات
            </button>
          </div>

          {/* Transactions ledger */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300">سجل المعاملات والتحصيلات الأخيرة:</h4>
            <div className="divide-y divide-slate-800/80 bg-slate-950/60 rounded-2xl border border-slate-800 overflow-hidden text-xs">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="font-bold text-white">{tx.courseTitle}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      المسدد: {tx.payerName} ({tx.payerEmail}) • {tx.date}
                    </div>
                  </div>

                  <div className="text-left flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block">صافي المدرب (88%):</span>
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
          </div>
        </div>
      )}

    </div>
  );
};
