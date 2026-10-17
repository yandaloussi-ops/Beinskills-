import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Users, 
  Building2, 
  GraduationCap, 
  DollarSign, 
  Award, 
  Check, 
  Clock, 
  Search, 
  AlertCircle,
  TrendingUp,
  Settings,
  Eye,
  CheckCircle2,
  Lock,
  Unlock,
  Ban,
  PauseCircle,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  Star
} from 'lucide-react';
import { 
  Course, 
  Transaction, 
  UserAccount, 
  UserAccountRole, 
  UserAccountStatus,
  CourseApprovalStatus,
  TrustCertificateTier,
  TrustCertificate
} from '../types';
import { getOrCreateTrustCertificate, SAMPLE_TRUST_CERTIFICATES, TRUST_TIERS_CONFIG } from '../data/trustCertificatesData';
import { Language, translations } from '../translations';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  transactions: Transaction[];
  userAccounts: UserAccount[];
  onAddCourse: (newCourse: Course) => void;
  onDeleteCourse: (courseId: string) => void;
  onUpdateCourseSeats: (courseId: string, delta: number) => void;
  onToggleCourseFeatured: (courseId: string) => void;
  onSetCourseStatus: (courseId: string, status: CourseApprovalStatus) => void;
  onUpdateUserStatus: (userId: string, status: UserAccountStatus) => void;
  onToggleUserVerified: (userId: string) => void;
  onUpdateUserRole: (userId: string, role: UserAccountRole) => void;
  onReleaseEscrowPayout: (transactionId: string) => void;
  onUpdateUserTrustTier?: (userId: string, tier: TrustCertificateTier | null) => void;
  onOpenCertificateModal?: (cert: TrustCertificate) => void;
  currentLang?: Language;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  courses,
  transactions,
  userAccounts,
  onAddCourse,
  onDeleteCourse,
  onUpdateCourseSeats,
  onToggleCourseFeatured,
  onSetCourseStatus,
  onUpdateUserStatus,
  onToggleUserVerified,
  onUpdateUserRole,
  onReleaseEscrowPayout,
  onUpdateUserTrustTier,
  onOpenCertificateModal,
  currentLang = 'ar',
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'users' | 'finance'>('overview');
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [courseSearch, setCourseSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');
  const [txSearch, setTxSearch] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Add Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('الذكاء الاصطناعي');
  const [newInstructorName, setNewInstructorName] = useState('');
  const [newInstructorTitle, setNewInstructorTitle] = useState('خبير معتمد');
  const [newMode, setNewMode] = useState<'remote' | 'in-person'>('remote');
  const [newLocation, setNewLocation] = useState('عبر منصة BeInSkills');
  const [newSeats, setNewSeats] = useState(20);
  const [newPrice, setNewPrice] = useState(1500);
  const [newDuration, setNewDuration] = useState('4 أسابيع (24 ساعة)');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80');

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Financial Calculations
  const totalGrossCollected = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalPlatformFees = transactions.reduce((acc, t) => acc + t.platformFee, 0);
  const escrowPendingFunds = transactions
    .filter((t) => t.escrowStatus === 'held_in_escrow')
    .reduce((acc, t) => acc + t.instructorPayout, 0);
  const totalReleasedPayouts = transactions
    .filter((t) => t.escrowStatus === 'released')
    .reduce((acc, t) => acc + t.instructorPayout, 0);

  const activeCoursesCount = courses.filter((c) => (c.status || 'approved') === 'approved').length;
  const totalLearnersCount = userAccounts.filter((u) => u.role === 'student').length;
  const totalInstructorsCount = userAccounts.filter((u) => u.role === 'instructor').length;
  const totalInstitutesCount = userAccounts.filter((u) => u.role === 'institute_b2b').length;

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const courseObj: Course = {
      id: `course-custom-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      description: newDesc || 'برنامج تكويني مكثف يركز على التطبيق العملي والمشاريع الواقعية وتطوير المهارات المطلوبة في السوق.',
      instructor: {
        name: newInstructorName || 'مكوّن خبير معتمد',
        title: newInstructorTitle,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        rating: 5.0,
        reviewsCount: 12,
        verified: true,
      },
      mode: newMode,
      location: newLocation,
      remainingSeats: Number(newSeats),
      totalSeats: Number(newSeats),
      enrolledStudentsCount: 0,
      price: Number(newPrice),
      currency: 'درهم',
      duration: newDuration,
      level: 'متوسط',
      image: newImage,
      syllabus: [
        'المفاهيم الأساسية والتأسيس العملي',
        'التطبيقات العملية ودراسة الحالات السوقية',
        'مشروع التخرج وإصدار شارة الجواز المعتمدة',
      ],
      features: ['شهادة إتمام معتمدة', 'تطبيق عملي 100%', 'دعم توجيهي ممتد'],
      badgeName: `شارة إتقان ${newTitle.slice(0, 25)}`,
      badgeIcon: 'Award',
      startDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      featured: true,
      status: 'approved',
    };

    onAddCourse(courseObj);
    setShowAddCourseForm(false);
    setNewTitle('');
    setNewInstructorName('');
    setNewDesc('');
    showNotification('تمت إضافة التكوين واعتماده في السوق بنجاح!');
  };

  const handleReleasePayout = (txId: string, instructorName: string, amount: number) => {
    onReleaseEscrowPayout(txId);
    showNotification(`تم تحرير دفعة الضمان الوسيط (Escrow) بمبلغ ${amount} درهم للمكوّن ${instructorName} بنجاح!`);
  };

  const handleUserStatusChange = (userId: string, newStatus: UserAccountStatus, userName: string) => {
    onUpdateUserStatus(userId, newStatus);
    const label = newStatus === 'blocked' ? 'حظر الحساب' : newStatus === 'suspended' ? 'تجميد الحساب' : 'تفعيل الحساب';
    showNotification(`تم ${label} للمستخدم "${userName}" بنجاح.`);
  };

  // Filtered lists
  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.category.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.instructor.name.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const filteredUsers = userAccounts.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchSearch && matchRole;
  });

  const filteredTransactions = transactions.filter((t) =>
    t.courseTitle.toLowerCase().includes(txSearch.toLowerCase()) ||
    t.payerName.toLowerCase().includes(txSearch.toLowerCase()) ||
    t.instructorName.toLowerCase().includes(txSearch.toLowerCase()) ||
    t.id.toLowerCase().includes(txSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-7xl h-[94vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Admin Header */}
        <div className="p-4 sm:px-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-[#7C3AED] text-slate-950 font-black shadow-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white font-['Alexandria']">
                  لوحة تحكم الإدارة العامة والتحصيل المالي (Admin Panel)
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                  صلاحيات مدير النظام
                </span>
              </div>
              <p className="text-xs text-slate-400">
                إدارة التكوينات، الحساب الوسيط Escrow، توثيق وحظر المستخدمين، وتحرير العمولات
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Temporary Notification Banner */}
        {actionNotice && (
          <div className="bg-emerald-950/90 border-b border-emerald-600/60 p-2.5 px-6 text-xs text-emerald-300 font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#7C3AED] text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>ملخص المؤشرات (KPIs)</span>
          </button>

          <button
            onClick={() => setActiveTab('finance')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'finance'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>المعاملات المالية والضمان الوسيط (Escrow)</span>
            <span className="text-[10px] bg-slate-950 text-amber-300 px-1.5 rounded-full">
              {transactions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-[#06B6D4] text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>إدارة التكوينات ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>المستخدمون والمؤسسات ({userAccounts.length})</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW & KPIS */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Top 5 KPI Cards Requested by User */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
                
                {/* 1. إجمالي المبالغ المحصلة */}
                <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-950/70">
                  <div className="text-[11px] text-slate-400 font-medium">إجمالي المبالغ المحصلة (Gross)</div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1 font-mono">
                    {totalGrossCollected.toLocaleString()} <span className="text-xs">درهم</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">عبر كافة طرق التحصيل</div>
                </div>

                {/* 2. عمولة المنصة الحالية */}
                <div className="glass-card p-4 rounded-2xl border border-purple-500/30 bg-purple-950/20">
                  <div className="text-[11px] text-purple-300 font-medium">عمولة المنصة الحالية (12%)</div>
                  <div className="text-xl sm:text-2xl font-black text-purple-400 mt-1 font-mono">
                    {totalPlatformFees.toLocaleString()} <span className="text-xs">درهم</span>
                  </div>
                  <div className="text-[10px] text-purple-300/80 mt-1">صافي أرباح المنصة</div>
                </div>

                {/* 3. المبالغ المعلقة في الحساب الوسيط Escrow */}
                <div className="glass-card p-4 rounded-2xl border border-amber-500/40 bg-amber-950/20">
                  <div className="text-[11px] text-amber-300 font-medium">معلقة بالضمان الوسيط (Escrow)</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1 font-mono">
                    {escrowPendingFunds.toLocaleString()} <span className="text-xs">درهم</span>
                  </div>
                  <div className="text-[10px] text-amber-400/80 mt-1">محتجزة لحين بدء الدورات</div>
                </div>

                {/* 4. التكوينات النشطة */}
                <div className="glass-card p-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/20">
                  <div className="text-[11px] text-[#06B6D4] font-medium">التكوينات المعتمدة والنشطة</div>
                  <div className="text-xl sm:text-2xl font-black text-[#06B6D4] mt-1 font-mono">
                    {activeCoursesCount} <span className="text-xs">تكوين</span>
                  </div>
                  <div className="text-[10px] text-cyan-400/80 mt-1">في مختلف التخصصات</div>
                </div>

                {/* 5. المتدربون والمكونون والمؤسسات */}
                <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-950/70">
                  <div className="text-[11px] text-slate-400 font-medium">المستخدمون والشركاء</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1 font-mono">
                    {userAccounts.length} <span className="text-xs">حساب</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {totalLearnersCount} طالب • {totalInstructorsCount} مكوّن • {totalInstitutesCount} معهد
                  </div>
                </div>

              </div>

              {/* Quick Actions Bar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20 border border-[#06B6D4]/40 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">إضافة تكوين جديد للسوق</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      اعتماد دورة تكوينية مع تحديد المقاعد والأسعار ونوع الحضور.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('courses');
                      setShowAddCourseForm(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold text-xs shrink-0 cursor-pointer"
                  >
                    + إضافة تكوين
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">تحرير دفعات الضمان الوسيط (Escrow)</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      توجد مبالغ محجوزة جاهزة للتحرير إلى حسابات المكونين بعد التأكد من التزامهم.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('finance')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shrink-0 cursor-pointer"
                  >
                    جدول التحويلات
                  </button>
                </div>
              </div>

              {/* Trust Certification Status Overview Bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-[#7C3AED]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] text-white">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-['Alexandria']">
                      منظومة شهادات الثقة والاعتماد للمكونين والمؤسسات (BeInSkills Trust Passport)
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      3 مستويات معتمدة رسمياً: الشهادة الماسية 💎 • الشهادة الذهبية 🥇 • الشهادة الفضية 🥈
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-xl bg-cyan-950/80 text-[#06B6D4] border border-cyan-800 font-bold">
                    💎 {userAccounts.filter(u => u.trustTier === 'diamond').length} ماسية
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-800 font-bold">
                    🥇 {userAccounts.filter(u => u.trustTier === 'gold').length} ذهبية
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 font-bold">
                    🥈 {userAccounts.filter(u => u.trustTier === 'silver').length} فضية
                  </span>
                  <button
                    onClick={() => setActiveTab('users')}
                    className="text-xs px-3 py-1 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold cursor-pointer"
                  >
                    إدارة واعتماد
                  </button>
                </div>
              </div>

              {/* Recent Financial Transactions Overview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300">أحدث المعاملات وحالة الحساب الوسيط:</h4>
                  <button
                    onClick={() => setActiveTab('finance')}
                    className="text-xs text-[#06B6D4] hover:underline"
                  >
                    عرض كافة المعاملات ({transactions.length})
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
                  <table className="w-full text-right text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 text-[10px]">
                      <tr>
                        <th className="p-3">رقم العملية</th>
                        <th className="p-3">التكوين</th>
                        <th className="p-3">الدافع</th>
                        <th className="p-3">المبلغ</th>
                        <th className="p-3">حالة الضمان Escrow</th>
                        <th className="p-3">إجراء التحرير</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {transactions.slice(0, 4).map((t) => (
                        <tr key={t.id} className="hover:bg-slate-900/50">
                          <td className="p-3 font-mono text-[11px] text-slate-400">{t.id}</td>
                          <td className="p-3 font-bold text-white max-w-xs truncate">{t.courseTitle}</td>
                          <td className="p-3">{t.payerName}</td>
                          <td className="p-3 font-bold text-white">{t.amount} {t.currency}</td>
                          <td className="p-3">
                            {t.escrowStatus === 'held_in_escrow' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                                محجوز وسيطاً (Escrow)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                تم التحرير للمكوّن
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            {t.escrowStatus === 'held_in_escrow' ? (
                              <button
                                onClick={() => handleReleasePayout(t.id, t.instructorName, t.instructorPayout)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer"
                              >
                                تحرير الدفعة ({t.instructorPayout} د.م)
                              </button>
                            ) : (
                              <span className="text-[10px] text-slate-500 font-semibold">محررة مسبقاً</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: FINANCIAL TRANSACTIONS & ESCROW */}
          {activeTab === 'finance' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white">إدارة التحويلات المالية والحساب الوسيط (Escrow)</h4>
                  <p className="text-xs text-slate-400">
                    متابعة العمولات المقتطعة (12%)، وتوثيق تحرير المبالغ المعلقة إلى حسابات المكونين
                  </p>
                </div>

                <div className="relative w-72">
                  <input
                    type="text"
                    value={txSearch}
                    onChange={(e) => setTxSearch(e.target.value)}
                    placeholder="ابحث برقم المعاملة، الدورة، أو الدافع..."
                    className="w-full bg-slate-950 text-xs text-white pr-8 pl-3 py-2 rounded-xl border border-slate-700 outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                </div>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-right text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">رقم التحويل</th>
                      <th className="p-3">التكوين المستهدف</th>
                      <th className="p-3">المكوّن</th>
                      <th className="p-3">الدافع ونوع الدفع</th>
                      <th className="p-3">المبلغ الإجمالي</th>
                      <th className="p-3">عمولة المنصة (12%)</th>
                      <th className="p-3">صافي المكوّن</th>
                      <th className="p-3">حالة الحساب الوسيط</th>
                      <th className="p-3 text-center">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-900/40">
                        <td className="p-3 font-mono text-[11px] text-cyan-400 font-bold">{tx.id}</td>
                        <td className="p-3 font-bold text-white max-w-[180px] truncate">{tx.courseTitle}</td>
                        <td className="p-3">{tx.instructorName}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-200">{tx.payerName}</div>
                          <span className="text-[10px] text-slate-400 block">
                            {tx.paymentType === 'escrow-full' && 'دفع كامل وسيط'}
                            {tx.paymentType === 'installments' && 'دفع مجزأ أسبوعي'}
                            {tx.paymentType === 'wallet' && 'محفظة مهارات'}
                            {tx.paymentType === 'b2b-group' && `حجز شركات (${tx.seatsCount} مقاعد)`}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-white">{tx.amount} درهم</td>
                        <td className="p-3 text-purple-400 font-bold">{tx.platformFee} درهم</td>
                        <td className="p-3 text-emerald-400 font-black font-mono">{tx.instructorPayout} درهم</td>
                        <td className="p-3">
                          {tx.escrowStatus === 'held_in_escrow' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-700">
                              <Lock className="w-3 h-3" />
                              <span>محجوز وسيطاً</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-700">
                              <Unlock className="w-3 h-3" />
                              <span>تم التحرير للمكوّن</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {tx.escrowStatus === 'held_in_escrow' ? (
                            <button
                              onClick={() => handleReleasePayout(tx.id, tx.instructorName, tx.instructorPayout)}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer transition-all active:scale-95"
                            >
                              تحرير الدفعة الآن
                            </button>
                          ) : (
                            <span className="text-xs text-slate-500 font-medium">تم تحرير الدفعة</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: COURSES MANAGEMENT */}
          {activeTab === 'courses' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 max-w-xs">
                  <input
                    type="text"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    placeholder="ابحث في التكوينات والمكوّنين..."
                    className="w-full bg-slate-950 text-xs text-white pr-8 pl-3 py-2 rounded-xl border border-slate-700 outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                </div>

                <button
                  onClick={() => setShowAddCourseForm(!showAddCourseForm)}
                  className="px-4 py-2 rounded-xl bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddCourseForm ? 'إلغاء الإضافة' : 'إضافة تكوين جديد'}</span>
                </button>
              </div>

              {/* Add Course Form */}
              {showAddCourseForm && (
                <form onSubmit={handleCreateCourseSubmit} className="p-5 rounded-2xl bg-slate-950 border border-[#06B6D4]/50 space-y-4 animate-in fade-in">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#06B6D4]" />
                    <span>بيانات التكوين الجديد</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">عنوان التكوين:</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="مثال: هندسة النظم السحابية وDocker"
                        className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">المجال / التصنيف:</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                      >
                        <option>الذكاء الاصطناعي</option>
                        <option>البرمجة والتطوير</option>
                        <option>التصميم الرقمي</option>
                        <option>الأمن السيبراني</option>
                        <option>إدارة الأعمال والقيادة</option>
                        <option>البيانات والتحليل</option>
                        <option>التنمية الذاتية</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">اسم المكوّن:</label>
                      <input
                        type="text"
                        required
                        value={newInstructorName}
                        onChange={(e) => setNewInstructorName(e.target.value)}
                        placeholder="مثال: م. حسام التازي"
                        className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">صيغة التكوين:</label>
                      <select
                        value={newMode}
                        onChange={(e: any) => setNewMode(e.target.value)}
                        className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                      >
                        <option value="remote">عن بعد (Online)</option>
                        <option value="in-person">حضوري (In-Person)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">مكان الإجراء أو المنصة:</label>
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="الدار البيضاء / منصة Zoom"
                        className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">عدد المقاعد الإجمالي:</label>
                      <input
                        type="number"
                        min="1"
                        value={newSeats}
                        onChange={(e) => setNewSeats(Number(e.target.value))}
                        className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">رسوم التكوين (درهم):</label>
                      <input
                        type="number"
                        min="0"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1">المدة التدريبية:</label>
                      <input
                        type="text"
                        value={newDuration}
                        onChange={(e) => setNewDuration(e.target.value)}
                        placeholder="6 أسابيع (30 ساعة)"
                        className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">وصف مختصر للبرنامج:</label>
                    <textarea
                      rows={2}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="صف محتوى ومخرجات هذا التكوين..."
                      className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCourseForm(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 bg-slate-800 cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white cursor-pointer"
                    >
                      حفظ ونشر التكوين في السوق
                    </button>
                  </div>
                </form>
              )}

              {/* Courses Table with Approval & Featured toggles */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-right text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">التكوين والتصنيف</th>
                      <th className="p-3">المكوّن</th>
                      <th className="p-3">المسجلون / المقاعد</th>
                      <th className="p-3">السعر</th>
                      <th className="p-3">حالة الاعتماد</th>
                      <th className="p-3">ترويج مدفوع (Featured)</th>
                      <th className="p-3 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredCourses.map((c) => {
                      const enrolledCount = c.enrolledStudentsCount || (c.totalSeats - c.remainingSeats);
                      const isApproved = (c.status || 'approved') === 'approved';
                      const isRejected = c.status === 'rejected';

                      return (
                        <tr key={c.id} className="hover:bg-slate-900/40">
                          <td className="p-3">
                            <div className="font-bold text-white max-w-xs truncate">{c.title}</div>
                            <span className="text-[10px] text-[#06B6D4]">{c.category} • {c.mode === 'remote' ? 'عن بعد' : 'حضوري'}</span>
                          </td>
                          <td className="p-3">{c.instructor.name}</td>
                          <td className="p-3">
                            <span className="font-bold text-white">{enrolledCount}</span>
                            <span className="text-slate-400 text-[10px]"> / {c.totalSeats} ({c.remainingSeats} متبقي)</span>
                          </td>
                          <td className="p-3 font-bold text-white">{c.price} درهم</td>
                          <td className="p-3">
                            {isApproved ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                معتمد
                              </span>
                            ) : isRejected ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800">
                                مرفوض
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                                قيد التدقيق
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                onToggleCourseFeatured(c.id);
                                showNotification(c.featured ? 'تم إلغاء الترويج المميز' : 'تم تفعيل الترويج المميز للتكوين ★');
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                                c.featured
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              <Star className={`w-3 h-3 ${c.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                              <span>{c.featured ? 'مميز Featured' : 'عادي'}</span>
                            </button>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-center gap-1.5">
                              {!isApproved && (
                                <button
                                  onClick={() => {
                                    onSetCourseStatus(c.id, 'approved');
                                    showNotification('تمت الموافقة على التكوين ونشره في السوق');
                                  }}
                                  className="px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-bold cursor-pointer"
                                >
                                  موافقة
                                </button>
                              )}
                              {!isRejected && (
                                <button
                                  onClick={() => {
                                    onSetCourseStatus(c.id, 'rejected');
                                    showNotification('تم رفض التكوين وإيقافه');
                                  }}
                                  className="px-2 py-1 rounded bg-rose-900 hover:bg-rose-800 text-rose-200 text-[10px] font-bold cursor-pointer"
                                >
                                  رفض
                                </button>
                              )}
                              <button
                                onClick={() => onUpdateCourseSeats(c.id, 1)}
                                className="px-1.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                                title="إضافة مقعد"
                              >
                                +مقعد
                              </button>
                              <button
                                onClick={() => {
                                  onDeleteCourse(c.id);
                                  showNotification('تم حذف التكوين من المنصة');
                                }}
                                className="p-1 rounded bg-rose-950 hover:bg-rose-900 text-rose-400 cursor-pointer"
                                title="حذف"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: USERS & INSTITUTIONS MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="ابحث بالاسم أو البريد..."
                      className="w-full bg-slate-950 text-xs text-white pr-8 pl-3 py-2 rounded-xl border border-slate-700 outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                  </div>

                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="bg-slate-950 text-xs text-slate-300 px-3 py-2 rounded-xl border border-slate-700 outline-none"
                  >
                    <option value="all">كافة الأدوار</option>
                    <option value="student">المتدربون (Student)</option>
                    <option value="instructor">المكونون الخواص (Instructor)</option>
                    <option value="institute_b2b">مؤسسات التكوين (B2B)</option>
                  </select>
                </div>

                <span className="text-xs text-slate-400 font-bold">
                  {filteredUsers.length} حساب مطابق
                </span>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-right text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">المستخدم / المؤسسة</th>
                      <th className="p-3">الدور الحالي</th>
                      <th className="p-3">حالة الحساب</th>
                      <th className="p-3">التوثيق</th>
                      <th className="p-3">تاريخ الانضمام</th>
                      <th className="p-3 text-center">شهادة الثقة والاعتماد BeInSkills</th>
                      <th className="p-3 text-center">إجراءات الحظر والتجميد</th>
                      <th className="p-3 text-center">تعديل الدور</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredUsers.map((user) => {
                      const isInstructorOrInst = user.role === 'instructor' || user.role === 'institute_b2b';
                      const currentTier = user.trustTier;

                      return (
                      <tr key={user.id} className="hover:bg-slate-900/40">
                        <td className="p-3">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {user.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4]" />}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">{user.email}</span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            user.role === 'institute_b2b'
                              ? 'bg-purple-950 text-purple-300 border border-purple-800'
                              : user.role === 'instructor'
                              ? 'bg-cyan-950 text-[#06B6D4] border border-cyan-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}>
                            {user.role === 'institute_b2b' && 'مؤسسة تكوين B2B'}
                            {user.role === 'instructor' && 'مكوّن خاص'}
                            {user.role === 'student' && 'متدرب باحث'}
                          </span>
                        </td>
                        <td className="p-3">
                          {user.status === 'active' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                              نشط (Active)
                            </span>
                          )}
                          {user.status === 'suspended' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                              مجمّد (Suspended)
                            </span>
                          )}
                          {user.status === 'blocked' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800">
                              محظور (Blocked)
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              onToggleUserVerified(user.id);
                              showNotification(user.verified ? 'تم إلغاء شارة التوثيق' : 'تم منح شارة التوثيق الرسمية');
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                              user.verified
                                ? 'bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/40'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {user.verified ? 'موثق ✓' : 'غير موثق'}
                          </button>
                        </td>
                        <td className="p-3 font-mono text-slate-400 text-[11px]">{user.joinedDate}</td>
                        
                        {/* Trust Certificate Column */}
                        <td className="p-3 text-center">
                          {isInstructorOrInst ? (
                            <div className="flex flex-col items-center gap-1.5">
                              {currentTier === 'diamond' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-950 text-[#06B6D4] border border-cyan-800 shadow-sm flex items-center gap-1">
                                  <span>💎</span>
                                  <span>الشهادة الماسية</span>
                                </span>
                              )}
                              {currentTier === 'gold' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-950 text-amber-400 border border-amber-800 shadow-sm flex items-center gap-1">
                                  <span>🥇</span>
                                  <span>الشهادة الذهبية</span>
                                </span>
                              )}
                              {currentTier === 'silver' && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-900 text-slate-200 border border-slate-700 shadow-sm flex items-center gap-1">
                                  <span>🥈</span>
                                  <span>الشهادة الفضية</span>
                                </span>
                              )}
                              {!currentTier && (
                                <span className="text-[10px] text-slate-500 italic">
                                  غير معتمد بعد
                                </span>
                              )}

                              {/* Tier Control Select & Preview */}
                              <div className="flex items-center gap-1">
                                <select
                                  value={currentTier || 'none'}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const nextTier = val === 'none' ? null : (val as TrustCertificateTier);
                                    if (onUpdateUserTrustTier) {
                                      onUpdateUserTrustTier(user.id, nextTier);
                                      showNotification(`تم تحديث مستوى شهادة ثقة "${user.name}" إلى ${val === 'none' ? 'إلغاء الاعتماد' : val}`);
                                    }
                                  }}
                                  className="bg-slate-900 text-[9px] text-slate-300 p-1 rounded border border-slate-700 outline-none cursor-pointer"
                                  title="تغيير مستوى الاعتماد"
                                >
                                  <option value="diamond">💎 ماسية</option>
                                  <option value="gold">🥇 ذهبية</option>
                                  <option value="silver">🥈 فضية</option>
                                  <option value="none">✕ غير معتمد</option>
                                </select>

                                {currentTier && onOpenCertificateModal && (
                                  <button
                                    onClick={() => {
                                      const sampleCert = SAMPLE_TRUST_CERTIFICATES[user.id] || getOrCreateTrustCertificate(
                                        user.name,
                                        user.role === 'institute_b2b' ? 'مؤسسة تدريبية معتمدة' : 'مكوّن معتمد',
                                        user.role === 'institute_b2b' ? 'institute' : 'instructor',
                                        currentTier
                                      );
                                      onOpenCertificateModal(sampleCert);
                                    }}
                                    className="p-1 rounded bg-[#06B6D4]/20 hover:bg-[#06B6D4]/30 text-[#06B6D4] text-[9px] cursor-pointer"
                                    title="معاينة الشهادة الرسمية"
                                  >
                                    <Eye className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-600">—</span>
                          )}
                        </td>

                        <td className="p-3">
                          <div className="flex items-center justify-center gap-1.5">
                            {user.status !== 'active' && (
                              <button
                                onClick={() => handleUserStatusChange(user.id, 'active', user.name)}
                                className="px-2 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-[10px] font-bold cursor-pointer"
                                title="إلغاء الحظر وتفعيل الحساب"
                              >
                                تفعيل
                              </button>
                            )}
                            {user.status !== 'suspended' && (
                              <button
                                onClick={() => handleUserStatusChange(user.id, 'suspended', user.name)}
                                className="px-2 py-1 rounded bg-amber-900 hover:bg-amber-800 text-amber-200 text-[10px] font-bold cursor-pointer"
                                title="تجميد مؤقت"
                              >
                                تجميد
                              </button>
                            )}
                            {user.status !== 'blocked' && (
                              <button
                                onClick={() => handleUserStatusChange(user.id, 'blocked', user.name)}
                                className="px-2 py-1 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 text-[10px] font-bold cursor-pointer"
                                title="حظر الحساب عند الإخلال بالشروط"
                              >
                                حظر
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <select
                            value={user.role}
                            onChange={(e) => {
                              onUpdateUserRole(user.id, e.target.value as UserAccountRole);
                              showNotification(`تم تغيير دور "${user.name}" إلى ${e.target.value}`);
                            }}
                            className="bg-slate-900 text-[10px] text-slate-300 p-1.5 rounded-lg border border-slate-700 outline-none"
                          >
                            <option value="student">متدرب (Student)</option>
                            <option value="instructor">مكوّن (Instructor)</option>
                            <option value="institute_b2b">مؤسسة (B2B Institute)</option>
                          </select>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
