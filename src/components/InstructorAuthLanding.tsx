import React, { useState } from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  UserCheck, 
  Award,
  ChevronLeft,
  KeyRound,
  Star,
  Users,
  TrendingUp,
  Clock,
  Video,
  MapPin,
  Flame,
  BadgeCheck
} from 'lucide-react';
import { UserAccount, TrustCertificateTier } from '../types';
import { Language, translations } from '../translations';
import { RegistrationRole } from './RegistrationModal';

interface InstructorAuthLandingProps {
  instructorAccounts: UserAccount[];
  onSelectInstructor: (account: UserAccount) => void;
  onOpenRegistration: (role: RegistrationRole) => void;
  onBackToLearner: () => void;
  currentLang?: Language;
}

export const InstructorAuthLanding: React.FC<InstructorAuthLandingProps> = ({
  instructorAccounts,
  onSelectInstructor,
  onOpenRegistration,
  onBackToLearner,
  currentLang = 'ar',
}) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    instructorAccounts[0]?.id || ''
  );
  const [customEmail, setCustomEmail] = useState('');
  const [loginError, setLoginError] = useState(false);

  const t = translations[currentLang];

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = instructorAccounts.find(
      (acc) => acc.email.toLowerCase() === customEmail.trim().toLowerCase()
    );
    if (found) {
      onSelectInstructor(found);
    } else if (customEmail.trim().length > 3) {
      const newAcc: UserAccount = {
        id: `tr-${Date.now()}`,
        name: customEmail.split('@')[0],
        email: customEmail.trim(),
        role: 'instructor',
        status: 'active',
        verified: true,
        coursesCount: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        balance: 0,
        trustTier: 'silver',
      };
      onSelectInstructor(newAcc);
    } else {
      setLoginError(true);
    }
  };

  const getTierBadge = (tier?: TrustCertificateTier) => {
    switch (tier) {
      case 'diamond':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-[#06B6D4] border border-cyan-800">اعتماد ماسي 💎</span>;
      case 'gold':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">اعتماد ذهبي 🥇</span>;
      case 'silver':
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">اعتماد فضي 🥈</span>;
    }
  };

  // Top verified instructors ranking benchmark to fuel healthy competition
  const competitiveInstructors = [
    {
      name: 'د. يونس التازي',
      title: 'خبير ذكاء اصطناعي وباحث في التعلم العميق',
      specialty: 'الذكاء الاصطناعي التوليدي وهندسة الأوامر',
      tier: 'diamond' as TrustCertificateTier,
      qualityScore: 99,
      satisfaction: 99.4,
      graduates: 620,
      activeCourses: 2,
    },
    {
      name: 'د. ياسمين المرابط',
      title: 'كبير ممارسي الكوتشينغ ومدربة مدربين دولية (Master TOT & ICF)',
      specialty: 'تدريب المدربين TOT والكوتشينغ التنفيذي',
      tier: 'diamond' as TrustCertificateTier,
      qualityScore: 99.8,
      satisfaction: 99.8,
      graduates: 1840,
      activeCourses: 3,
    },
    {
      name: 'المهندس كريم المنصوري',
      title: 'كبير مهندسي النظم السحابية وتطبيقات الويب',
      specialty: 'تطوير Full-Stack والأنظمة السحابية الموزعة',
      tier: 'gold' as TrustCertificateTier,
      qualityScore: 98,
      satisfaction: 98.7,
      graduates: 480,
      activeCourses: 2,
    },
    {
      name: 'أ. طارق الشاوي',
      title: 'فنان تشكيلي وأستاذ الفنون الجميلة والسينوغرافيا',
      specialty: 'الفنون التشكيلية والمسرح والتعبير الركحي',
      tier: 'gold' as TrustCertificateTier,
      qualityScore: 97,
      satisfaction: 99.0,
      graduates: 520,
      activeCourses: 1,
    },
    {
      name: 'سلمى الإدريسي',
      title: 'مديرة تجربة وواجهة المستخدم UX/UI بأنظمة التصميم',
      specialty: 'تصميم تجربة المستخدم Figma & Design Systems',
      tier: 'silver' as TrustCertificateTier,
      qualityScore: 96,
      satisfaction: 98.5,
      graduates: 380,
      activeCourses: 1,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 animate-in fade-in font-['Alexandria']">
      
      {/* Top Breadcrumb & Return to Home */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBackToLearner}
          className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400 rotate-180" />
          <span>العودة إلى الصفحة الرئيسية</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3.5 py-2 rounded-2xl border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>الخصوصية المالية والبيانات البنكية محمية 100%</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MAIN INSTRUCTORS SPACE BOX (مربع فضاء المكوّنين والمدربين الرئيسي) */}
      {/* ============================================================== */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#7C3AED]/40 bg-gradient-to-br from-slate-900 via-slate-900/95 to-purple-950/40 shadow-2xl relative overflow-hidden space-y-8">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header inside the box */}
        <div className="relative space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED]/20 text-purple-300 border border-[#7C3AED]/40">
            <GraduationCap className="w-4 h-4 text-[#06B6D4]" />
            <span>فضاء المكوّنين والمدربين ومراكز التكوين المعتمدة</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
            بوابة الإدارة، نشر التكوينات، والاعتماد المهني
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            اختر الدخول المباشر إلى لوحة إدارة دوراتك ومتابعة طلابك، أو قدم طلب اعتماد شريك تدريبي جديد للانضمام إلى شبكة التميز المهني.
          </p>
        </div>

        {/* ============================================================== */}
        {/* THE TWO PRIMARY ENTRY CARDS (الزر الأول للتسجيل والزر الثاني لدخول البروفايل الخاص) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          
          {/* Card 1 (الزر الأول): طلب اعتماد مكوّن أو مؤسسة تكوين (التسجيل) */}
          <div className="rounded-3xl p-6 bg-slate-950/80 border border-[#7C3AED]/40 hover:border-purple-400 transition-all space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#7C3AED]/20 text-purple-300 shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    1. التسجيل وطلب اعتماد شريك تدريبي جديد
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    انضم كمدرب معتمد أو مؤسسة تكوين وابدأ في استقبال المتدربين
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-1 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>نيل جواز الثقة والاعتماد المهني:</strong> تصنيف ملفك برتبة ماسية أو ذهبية معترف بها.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>ضمان المدفوعات بنسبة 100%:</strong> تحصيل الرسوم في حساب وسيط Escrow وصرف 88% صافية.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>إصدار شارات التخرج الرقمية:</strong> منح شارات معتمدة في جوازات مهارات المتدربين.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>سرية تامة لأرقامك المالية:</strong> أرباحك وعملياتك محجوبة عن الجمهور ومخصصة لك وحدك.</span>
                </div>
              </div>
            </div>

            {/* Glowing Action Buttons 1 (التسجيل) */}
            <div className="space-y-2.5">
              <button
                onClick={() => onOpenRegistration('trainer')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-cyan-200" />
                <span>تقديم طلب اعتماد مكوّن فردي (Trainer)</span>
              </button>

              <button
                onClick={() => onOpenRegistration('institute')}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-purple-200 text-xs font-bold border border-purple-800 hover:border-purple-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Building2 className="w-4 h-4 text-purple-300" />
                <span>اعتماد معهد أو مركز تكوين (Training Institute)</span>
              </button>
            </div>
          </div>

          {/* Card 2 (الزر الثاني): دخول البروفايل الخاص وإدارة التكوينات 🔒 */}
          <div className="rounded-3xl p-6 bg-slate-950/80 border border-[#06B6D4]/40 hover:border-[#06B6D4] transition-all space-y-5 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#06B6D4]/20 text-[#06B6D4] shadow-md">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>2. دخول البروفايل الخاص ولوحة التحكم</span>
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    الوصول مشفّر ومحمي لإدارة الدورات ورصد الحضور والوضعية المالية
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-slate-300">
                  اختر حساب المكوّن المعتمد:
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {instructorAccounts.map((acc) => {
                    const isSelected = selectedAccountId === acc.id;
                    return (
                      <div
                        key={acc.id}
                        onClick={() => setSelectedAccountId(acc.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-[#06B6D4] bg-cyan-950/50 text-white shadow-md'
                            : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                            {acc.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-xs font-bold line-clamp-1">{acc.name}</div>
                            <div className="text-[10px] text-slate-500 line-clamp-1 font-mono">{acc.email}</div>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          {getTierBadge(acc.trustTier)}
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Glowing Action Button 2 (دخول البروفايل) */}
            <button
              onClick={() => {
                const target = instructorAccounts.find((a) => a.id === selectedAccountId);
                if (target) onSelectInstructor(target);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#06B6D4] via-[#0284C7] to-[#7C3AED] hover:from-cyan-400 hover:to-purple-600 text-slate-950 sm:text-white text-xs sm:text-sm font-bold shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>الدخول إلى البروفايل الخاص ولوحة التحكم</span>
            </button>
          </div>

        </div>

        {/* 4 Performance & Quality Indicators inside the box */}
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>مؤشر الجودة الفائقة</span>
              <Award className="w-4 h-4 text-[#06B6D4]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#06B6D4] mt-1 font-mono">
              99 / 100
            </div>
            <div className="text-[11px] text-cyan-300 mt-0.5">معايير الاعتماد المؤسسي الصارم</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-emerald-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>نسبة رضا المتدربين</span>
              <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 font-mono">
              99.4%
            </div>
            <div className="text-[11px] text-emerald-300 mt-0.5">من آلاف التقييمات الموثقة</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>إجمالي المتخرجين</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-300 mt-1 font-mono">
              +4,800
            </div>
            <div className="text-[11px] text-purple-400 mt-0.5">نالوا شارات جواز المهارات</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>حماية الضمان المالي</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1 font-mono">
              100%
            </div>
            <div className="text-[11px] text-amber-400 mt-0.5">رسوم مؤمنة بحساب Escrow</div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* SECTION 1: COMPETITIVE BENCHMARK AMONG INSTRUCTORS */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#06B6D4]" />
            <h2 className="text-base sm:text-lg font-bold text-white">
              لوحة التنافسية والتميز بين المكوّنين المعتمدين (Instructors Excellence Benchmark)
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            ترتيب شفاف مبني على درجات الاعتماد، تقييم المتدربين، ومعدل إتمام الدورات
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitiveInstructors.map((trainer, idx) => (
            <div
              key={trainer.name}
              className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-[#06B6D4]/50 transition-all space-y-3 relative overflow-hidden group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                    {trainer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#06B6D4] transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{trainer.title}</p>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-xs font-black text-slate-500">
                  #{idx + 1}
                </span>
              </div>

              <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span>التخصص الرئيسي:</span>
                <span className="text-cyan-300 font-bold truncate max-w-[160px]">{trainer.specialty}</span>
              </div>

              {/* Performance Scores (Competitive) */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="text-[9px] text-slate-400">مؤشر الجودة</div>
                  <div className="text-xs font-bold text-[#06B6D4] font-mono mt-0.5">{trainer.qualityScore}/100</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="text-[9px] text-slate-400">نسبة الرضا</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">{trainer.satisfaction}%</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="text-[9px] text-slate-400">الخريجون</div>
                  <div className="text-xs font-bold text-purple-300 font-mono mt-0.5">+{trainer.graduates}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                {getTierBadge(trainer.tier)}
                <span className="text-[11px] text-slate-400">{trainer.activeCourses} تكوينات معتمدة</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: MOTIVATIONAL COURSE INDICATORS */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">
              مؤشرات التكوينات الأكثر طلباً وإقبالاً (Motivational Indicators)
            </h2>
          </div>
          <span className="text-xs text-amber-300/80 font-bold">
            ⚡ احجز مقعدك قبل اكتمال العدد
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: المعسكر المكثف في الذكاء الاصطناعي */}
          <div className="glass-card p-5 rounded-2xl border border-[#06B6D4]/30 bg-slate-900/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950 text-[#06B6D4] border border-cyan-800 font-bold">
                الذكاء الاصطناعي التوليدي
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-cyan-400" />
                <span>عن بُعد تفاعلي (36 ساعة)</span>
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">
              المعسكر المكثف في الذكاء الاصطناعي التوليدي وهندسة الأوامر المتقدمة
            </h3>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>المكوّن: <strong>د. يونس التازي</strong> (اعتماد ماسي 💎)</span>
              <span className="text-cyan-300 font-bold">1850 درهم/مقعد</span>
            </div>

            {/* Urgency Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>محجوز 21 من أصل 25 مقعد (متبقي 4 مقاعد فقط!)</span>
                </span>
                <span className="font-mono text-slate-400 font-bold">84% مكتمل</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-[#06B6D4] rounded-full w-[84%]"></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-purple-300 flex items-center gap-1 font-bold">
                <BadgeCheck className="w-4 h-4 text-purple-400" />
                <span>شارة: خبير الذكاء الاصطناعي التوليدي (4K Badge)</span>
              </span>
              <button
                onClick={onBackToLearner}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-bold cursor-pointer hover:shadow-md"
              >
                حجز المقعد الآن
              </button>
            </div>
          </div>

          {/* Card 2: تطوير الأنظمة السحابية Full-Stack */}
          <div className="glass-card p-5 rounded-2xl border border-purple-500/30 bg-slate-900/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                البرمجة والسحابة
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>حضوري بالدار البيضاء (48 ساعة)</span>
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">
              تطوير تطبيقات الويب الحديثة Full-Stack والأنظمة السحابية
            </h3>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>المكوّن: <strong>المهندس كريم المنصوري</strong> (اعتماد ذهبي 🥇)</span>
              <span className="text-purple-300 font-bold">2400 درهم/مقعد</span>
            </div>

            {/* Urgency Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>محجوز 15 من أصل 18 مقعد (متبقي 3 مقاعد فقط!)</span>
                </span>
                <span className="font-mono text-slate-400 font-bold">83% مكتمل</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-[#7C3AED] rounded-full w-[83%]"></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#06B6D4] flex items-center gap-1 font-bold">
                <BadgeCheck className="w-4 h-4 text-[#06B6D4]" />
                <span>شارة: مهندس التطبيقات السحابية المعتمد</span>
              </span>
              <button
                onClick={onBackToLearner}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-bold cursor-pointer hover:shadow-md"
              >
                حجز المقعد الآن
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
