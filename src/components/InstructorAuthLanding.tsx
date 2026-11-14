import React, { useState, useMemo } from 'react';
import { 
  Home,
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Search, 
  Award, 
  Star, 
  Users, 
  CheckCircle2, 
  MapPin, 
  KeyRound, 
  ArrowLeft, 
  Sparkles,
  Filter,
  X,
  Lock,
  Layers,
  ChevronDown
} from 'lucide-react';
import { UserAccount, TrustCertificateTier, Course } from '../types';
import { Language, translations } from '../translations';
import { RegistrationRole } from './RegistrationModal';

interface InstructorAuthLandingProps {
  instructorAccounts: UserAccount[];
  courses: Course[];
  onSelectInstructorForPublicView: (account: UserAccount) => void;
  onSelectInstructorForPrivateLogin: (account: UserAccount) => void;
  onOpenRegistration: (role: RegistrationRole) => void;
  onBackToLearner: () => void;
  currentLang?: Language;
}

export interface EnhancedInstructorProfile extends UserAccount {
  titleText: string;
  category: string;
  city: string;
  ratingScore: number;
  reviewsCount: number;
  graduatesCount: number;
  bioText: string;
  specializationPills: string[];
  avatarUrl: string;
}

export const InstructorAuthLanding: React.FC<InstructorAuthLandingProps> = ({
  instructorAccounts,
  courses,
  onSelectInstructorForPublicView,
  onSelectInstructorForPrivateLogin,
  onOpenRegistration,
  onBackToLearner,
  currentLang = 'ar',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'trainer' | 'institute'>('all');
  const [filterTier, setFilterTier] = useState<'all' | 'diamond' | 'gold'>('all');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedLoginId, setSelectedLoginId] = useState<string>(instructorAccounts[0]?.id || '');
  const [customLoginEmail, setCustomLoginEmail] = useState('');

  const t = translations[currentLang];

  // Enhanced metadata catalog for all trainers and institutes
  const catalogProfiles: EnhancedInstructorProfile[] = useMemo(() => {
    const staticMetadata: Record<string, Partial<EnhancedInstructorProfile>> = {
      'usr-4': {
        titleText: 'مركز تدريب مهني معتمد - ترخيص B2B وشراكات مؤسسية',
        category: 'البرمجة والأنظمة السحابية والتحول الرقمي',
        city: 'الدار البيضاء',
        ratingScore: 4.98,
        reviewsCount: 312,
        graduatesCount: 3400,
        bioText: 'أكاديمية تكنوبارك الرقمية رائدة في تأهيل الكفاءات التقنية للشركات وتدريب وتطوير برمجيات السحابة والذكاء الاصطناعي المؤسسي.',
        specializationPills: ['تطوير الويب Full-Stack', 'الأنظمة السحابية Cloud SaaS', 'الذكاء الاصطناعي B2B'],
        avatarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
      },
      'inst-future': {
        name: 'أكاديمية المستقبل للطاقات المتجددة والتكنولوجيا',
        titleText: 'مؤسسة تكوين مهني معتمدة - ترخيص وزاري',
        category: 'الهندسة والصناعة والطاقات المتجددة',
        city: 'الدار البيضاء',
        role: 'institute_b2b',
        trustTier: 'diamond',
        ratingScore: 4.96,
        reviewsCount: 142,
        graduatesCount: 1250,
        bioText: 'معهد رائد في تأهيل المهندسين والتقنيين في الطاقات النظيفة وإدارة المحطات الشمسية والأنظمة الذكية والميكاترونكس.',
        specializationPills: ['هندسة الطاقة الشمسية', 'الميكاترونكس الصناعي', 'كفاءة الطاقة والبيئة'],
        avatarUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=300&q=80',
      },
      'tr-yasmin': {
        name: 'د. ياسمين المرابط',
        titleText: 'كبير ممارسي الكوتشينغ ومدربة مدربين دولية (Master TOT & ICF Coach)',
        category: 'تدريب المكوّنين (TOT) والكوتشينغ الاحترافي المعتمد',
        city: 'الرباط',
        role: 'instructor',
        trustTier: 'diamond',
        ratingScore: 4.98,
        reviewsCount: 215,
        graduatesCount: 1840,
        bioText: 'خبير دولي معتمد من الاتحاد الدولي للكوتشينغ ICF، دربت أكثر من 1800 مدرب وقائد مؤسسي في المغرب والعالم العربي.',
        specializationPills: ['تدريب المدربين TOT', 'الكوتشينغ التنفيذي والقيادي', 'هندسة الحقائب التدريبية'],
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      },
      'usr-3': {
        titleText: 'كبير مهندسي النظم وتطوير الويب والحلول السحابية',
        category: 'البرمجة والتطوير السحابي',
        city: 'الرباط',
        ratingScore: 4.88,
        reviewsCount: 210,
        graduatesCount: 920,
        bioText: 'مهندس برمجيات ونظم سحابية بخبرة تتجاوز 12 عاماً في بناء الحلول التقنية الحديثة React وNode.js وتطبيقات السحاب.',
        specializationPills: ['React & Node.js', 'PostgreSQL & Docker', 'هندسة الأنظمة الموزعة'],
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      },
      'inst-agritech': {
        name: 'معهد الابتكار الفلاحي والري الذكي (AgriTech Institute)',
        titleText: 'مؤسسة متخصصة في الزراعة الدقيقة وتثمين الموارد المائية',
        category: 'الفلاحة الدقيقة والري الحديث والتقنيات الزراعية',
        city: 'أكادير / مكناس',
        role: 'institute_b2b',
        trustTier: 'diamond',
        ratingScore: 4.94,
        reviewsCount: 118,
        graduatesCount: 880,
        bioText: 'مؤسسة تدريبية وتطبيقية متقدمة في تقنيات الفلاحة الذكية، إدارة المياه، والزراعة العصرية المستدامة.',
        specializationPills: ['الري الذكي بالتنقيط', 'الزراعة المغطاة والدقيقة', 'إدارة المشاريع الفلاحية'],
        avatarUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=300&q=80',
      },
      'inst-safety': {
        name: 'مركز السلامة والصحة المهنية وتدبير المخاطر',
        titleText: 'مركز معتمد في تأهيل مسؤولي السلامة الصناعية والبيئة (HSE)',
        category: 'السلامة والصحة المهنية وإدارة المخاطر الصناعية',
        city: 'طنجة',
        role: 'institute_b2b',
        trustTier: 'gold',
        ratingScore: 4.89,
        reviewsCount: 96,
        graduatesCount: 1100,
        bioText: 'تكوينات تطبيقية ميدانية متوافقة مع معايير OSHA وNEBOSH الدولية لتأهيل أطر السلامة والوقاية للقطاع الصناعي.',
        specializationPills: ['معايير NEBOSH / OSHA', 'تقييم المخاطر المهنية', 'خطة الطوارئ والإنقاذ الصناعي'],
        avatarUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=300&q=80',
      },
      'tr-chawi': {
        name: 'أ. طارق الشاوي',
        titleText: 'فنان تشكيلي وأستاذ الفنون الجميلة والسينوغرافيا المسرحية',
        category: 'الفنون الجميلة والتعبير الإبداعي والأداء الركحي',
        city: 'مراكش',
        role: 'instructor',
        trustTier: 'gold',
        ratingScore: 4.92,
        reviewsCount: 94,
        graduatesCount: 520,
        bioText: 'خريج المعهد العالي للفنون الجميلة، عارض دولي ومدرب لتقنيات الصباغة الكلاسيكية والتشخيص والتعبير الإبداعي.',
        specializationPills: ['الصباغة الزيتية والمائية', 'السينوغرافيا وتصميم الديكور', 'التعبير المسرحي والركحي'],
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      },
      'tr-sara': {
        name: 'د. سارة العلمي',
        titleText: 'استشارية التسويق الرقمي ونمو الشركات وتصميم الحملات',
        category: 'ريادة الأعمال والتسويق الرقمي وإدارة المنتجات',
        city: 'الدار البيضاء',
        role: 'instructor',
        trustTier: 'gold',
        ratingScore: 4.91,
        reviewsCount: 126,
        graduatesCount: 760,
        bioText: 'خبيرة في استراتيجيات التسويق الرقمي المتقدم، نمو المبيعات للشركات الناشئة، وتحسين معدلات التحويل للعلامات التجارية.',
        specializationPills: ['Growth Hacking', 'إعلانات الأداء المتقدمة', 'استراتيجيات تحويل العملاء'],
        avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
      },
      'usr-2': {
        titleText: 'خبير ذكاء اصطناعي وباحث في التعلم العميق',
        category: 'الذكاء الاصطناعي وهندسة الأوامر',
        city: 'فاس',
        ratingScore: 4.90,
        reviewsCount: 148,
        graduatesCount: 620,
        bioText: 'باحث في خوارزميات التعلم العميق وتطبيقات النماذج اللغوية الكبيرة LLMs وأتمتة المهام الذكية.',
        specializationPills: ['الذكاء الاصطناعي التوليدي', 'هندسة الأوامر Prompt Engineering', 'Gemini SDK'],
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      'usr-5': {
        titleText: 'خبير الأمن السيبراني واختبار الاختراق المعتمد',
        category: 'الأمن السيبراني وحماية البيانات',
        city: 'الدار البيضاء',
        ratingScore: 4.79,
        reviewsCount: 84,
        graduatesCount: 410,
        bioText: 'مستشار حماية نظم المعلومات واختبار الثغرات الأمنية للشركات، مدرب معتمد لشهادات CEH وCompTIA Security+.',
        specializationPills: ['اختبار الاختراق الأخلاقي', 'أمن الشبكات والخوادم', 'معايير ISO 27001'],
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      },
    };

    // Combine accounts from state and known partner institutions
    const allIds = Array.from(new Set([
      ...instructorAccounts.map(a => a.id),
      'inst-future',
      'tr-yasmin',
      'inst-agritech',
      'inst-safety',
      'tr-chawi',
      'tr-sara'
    ]));

    return allIds.map(id => {
      const acc = instructorAccounts.find(a => a.id === id);
      const meta = staticMetadata[id] || {};
      
      const role = meta.role || acc?.role || 'instructor';
      const name = meta.name || acc?.name || 'مكوّن معتمد';
      const email = acc?.email || `${id}@beinskills.ma`;
      const trustTier = meta.trustTier || acc?.trustTier || 'diamond';

      return {
        id: id,
        name: name,
        email: email,
        role: role,
        status: 'active',
        verified: true,
        coursesCount: acc?.coursesCount || 2,
        joinedDate: acc?.joinedDate || '2026-06-01',
        balance: acc?.balance || 0,
        trustTier: trustTier,
        titleText: meta.titleText || 'مكوّن ومؤطر تدريبي معتمد',
        category: meta.category || 'تنمية القدرات والمهارات',
        city: meta.city || 'الدار البيضاء',
        ratingScore: meta.ratingScore || 4.9,
        reviewsCount: meta.reviewsCount || 100,
        graduatesCount: meta.graduatesCount || 500,
        bioText: meta.bioText || 'مكوّن معتمد حائز على جواز الثقة في منصة BeInSkills ومؤهل لتقديم برامج تدريبية تخصصية.',
        specializationPills: meta.specializationPills || ['تطوير المهارات', 'التدريب التطبيقي'],
        avatarUrl: meta.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      } as EnhancedInstructorProfile;
    });
  }, [instructorAccounts]);

  // Filtered profiles
  const filteredProfiles = useMemo(() => {
    return catalogProfiles.filter(profile => {
      const isInstitute = profile.role === 'institute_b2b' || profile.name.includes('أكاديمية') || profile.name.includes('معهد') || profile.name.includes('مركز');
      
      // Filter by type
      if (filterType === 'trainer' && isInstitute) return false;
      if (filterType === 'institute' && !isInstitute) return false;

      // Filter by tier
      if (filterTier !== 'all' && profile.trustTier !== filterTier) return false;

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = profile.name.toLowerCase().includes(q);
        const matchesTitle = profile.titleText.toLowerCase().includes(q);
        const matchesCategory = profile.category.toLowerCase().includes(q);
        const matchesCity = profile.city.toLowerCase().includes(q);
        const matchesPills = profile.specializationPills.some(p => p.toLowerCase().includes(q));
        if (!matchesName && !matchesTitle && !matchesCategory && !matchesCity && !matchesPills) {
          return false;
        }
      }

      return true;
    });
  }, [catalogProfiles, filterType, filterTier, searchQuery]);

  const getTierDisplay = (tier?: TrustCertificateTier) => {
    switch (tier) {
      case 'diamond':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-[#06B6D4] border border-cyan-700/60 shadow-sm">
            <span>اعتماد ماسي</span>
            <span>💎</span>
          </span>
        );
      case 'gold':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-700/60 shadow-sm">
            <span>اعتماد ذهبي</span>
            <span>🥇</span>
          </span>
        );
      case 'silver':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            <span>اعتماد فضي</span>
            <span>🥈</span>
          </span>
        );
    }
  };

  const handlePrivateLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = catalogProfiles.find(p => p.id === selectedLoginId || p.email.toLowerCase() === customLoginEmail.trim().toLowerCase());
    if (found) {
      onSelectInstructorForPrivateLogin(found);
      setShowLoginModal(false);
    } else if (customLoginEmail.trim().length > 3) {
      const newAcc: UserAccount = {
        id: `tr-${Date.now()}`,
        name: customLoginEmail.split('@')[0],
        email: customLoginEmail.trim(),
        role: 'instructor',
        status: 'active',
        verified: true,
        coursesCount: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        balance: 0,
        trustTier: 'silver',
      };
      onSelectInstructorForPrivateLogin(newAcc);
      setShowLoginModal(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-['Alexandria']">

      {/* ============================================================== */}
      {/* 1. TOP UTILITY & ACTION NAVIGATION BAR                         */}
      {/* ============================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 rounded-2xl border border-slate-800/80 backdrop-blur-md shadow-xl">
        
        {/* Button 1: Return to Home (العودة للرئيسية) */}
        <button
          onClick={onBackToLearner}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
          title="العودة إلى الصفحة الرئيسية وسوق التكوينات"
        >
          <Home className="w-4 h-4 text-white" />
          <span>العودة للصفحة الرئيسية</span>
        </button>

        {/* Action Buttons: New Accreditation & Private Login */}
        <div className="flex items-center gap-2 flex-wrap">
          
          <button
            onClick={() => onOpenRegistration('trainer')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 text-xs font-bold border border-purple-700/60 hover:border-purple-500 transition-all cursor-pointer shadow-sm"
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-300" />
            <span>طلب اعتماد مكوّن جديد</span>
          </button>

          <button
            onClick={() => onOpenRegistration('institute')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold border border-slate-700 hover:border-purple-500/60 transition-all cursor-pointer shadow-sm"
          >
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span>اعتماد معهد أو مركز تكوين</span>
          </button>

          <button
            onClick={() => setShowLoginModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:opacity-95 text-white text-xs font-black shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
            title="دخول لوحة التحكم وإدارة التكوينات الخاصة بالمكوّن"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-300" />
            <span>دخول حسابي الخاص (لوحة التحكم) 🔒</span>
          </button>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. HERO BANNER: GENERAL INSTRUCTORS & INSTITUTES DIRECTORY     */}
      {/* ============================================================== */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900/95 to-purple-950/40 border border-slate-800/80 shadow-2xl overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED]/20 text-purple-300 border border-[#7C3AED]/40">
            <GraduationCap className="w-4 h-4 text-[#06B6D4]" />
            <span>فضاء المكوّنين والمدربين ومؤسسات التكوين المعتمدة</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
            دليل وبوابة شركاء التكوين ومؤسسات التدريب المعتمدة
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            استعرض بطائق نخبة المدربين والمراكز المعتمدة الحاصلة على جواز الثقة والاعتماد المهني. اضغط على أي بطاقة للاطلاع على ملف المكوّن أو المؤسسة وبرامجه التكوينية المعتمدة وتقييمات المتدربين.
          </p>
        </div>

        {/* 4 Platform Quality & Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 relative z-10">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="text-xl font-black text-[#06B6D4] font-mono">100%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">ضمان الدفعات والحساب الوسيط Escrow</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="text-xl font-black text-emerald-400 font-mono">99.4%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">متوسط رضا المتدربين</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="text-xl font-black text-purple-400 font-mono">+4,800</div>
            <div className="text-[11px] text-slate-400 mt-0.5">خريج بشارات المهارات الرسمية</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="text-xl font-black text-amber-300 font-mono">الماسي والذهبي</div>
            <div className="text-[11px] text-slate-400 mt-0.5">رتب جواز الثقة المعترف بها</div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 3. SEARCH & FILTER CONTROLS                                    */}
      {/* ============================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Filter Tabs: All vs Trainers vs Institutes */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterType === 'all'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              جميع الشركاء التدريبيين ({catalogProfiles.length})
            </button>

            <button
              onClick={() => setFilterType('trainer')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterType === 'trainer'
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>مكوّنون معتمدون (Trainers)</span>
            </button>

            <button
              onClick={() => setFilterType('institute')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterType === 'institute'
                  ? 'bg-slate-800 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>مؤسسات ومراكز تكوين (Institutes)</span>
            </button>
          </div>

          {/* Tier Filter: Diamond vs Gold */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-slate-400 font-bold hidden sm:inline">رتبة الثقة:</span>
            <div className="inline-flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setFilterTier('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterTier === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setFilterTier('diamond')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterTier === 'diamond' ? 'bg-cyan-950 text-[#06B6D4] border border-cyan-700/60' : 'text-slate-400 hover:text-white'
                }`}
              >
                الماسية 💎
              </button>
              <button
                onClick={() => setFilterTier('gold')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterTier === 'gold' ? 'bg-amber-950 text-amber-300 border border-amber-700/60' : 'text-slate-400 hover:text-white'
                }`}
              >
                الذهبية 🥇
              </button>
            </div>
          </div>

        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث باسم المكوّن، المعهد، المدينة، أو التخصص التدريبي..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 pr-11 pl-4 py-3 rounded-2xl border border-slate-800 focus:border-[#06B6D4] outline-none transition-all shadow-inner"
          />
          <Search className="w-5 h-5 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-4 top-3 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded-lg"
            >
              مسح
            </button>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. THE GENERAL CARDS GRID (بطائق المكوّنين ومؤسسات التكوين)     */}
      {/* ============================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
          <span>نتائج البحث المعروضة: ({filteredProfiles.length} شريك معتمد)</span>
          <span>اضغط على أي بطاقة لعرض الصفحة العامة والبرامج التدريبية</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => {
            const isInstitute = profile.role === 'institute_b2b' || profile.name.includes('أكاديمية') || profile.name.includes('معهد') || profile.name.includes('مركز');
            
            return (
              <div
                key={profile.id}
                onClick={() => onSelectInstructorForPublicView(profile)}
                className="group rounded-3xl p-6 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-[#06B6D4]/50 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Accent Top Ambient Line */}
                <div className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${
                  profile.trustTier === 'diamond' 
                    ? 'from-[#7C3AED] via-[#06B6D4] to-teal-400' 
                    : 'from-amber-500 via-amber-400 to-yellow-300'
                } opacity-80 group-hover:opacity-100 transition-opacity`}></div>

                <div className="space-y-4">
                  
                  {/* Card Header: Avatar + Type & Tier Badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="w-14 h-14 rounded-2xl object-cover bg-slate-800 border-2 border-slate-700 group-hover:border-[#06B6D4] transition-all shadow-md"
                      />
                      <div className="absolute -bottom-1 -left-1 p-0.5 rounded-full bg-emerald-500 text-slate-950 shadow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {getTierDisplay(profile.trustTier)}
                      
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isInstitute
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-800/60'
                          : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                      }`}>
                        {isInstitute ? 'مؤسسة تكوين معتمدة' : 'مكوّن معتمد'}
                      </span>
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {profile.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-1 line-clamp-2 leading-relaxed">
                      {profile.titleText}
                    </p>
                  </div>

                  {/* Rating & City Row */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                    <div className="flex items-center gap-1 text-amber-300 font-bold font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{profile.ratingScore}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({profile.reviewsCount} تقييم)</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                      <MapPin className="w-3 h-3 text-[#06B6D4]" />
                      <span>{profile.city}</span>
                    </div>
                  </div>

                  {/* Stats Metric Strip */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/70 text-center">
                    <div>
                      <div className="text-xs font-bold text-purple-300 font-mono">+{profile.graduatesCount}</div>
                      <div className="text-[10px] text-slate-400">خريج مؤهل</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#06B6D4] font-mono">99 / 100</div>
                      <div className="text-[10px] text-slate-400">مؤشر الجودة</div>
                    </div>
                  </div>

                  {/* Specializations Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {profile.specializationPills.slice(0, 2).map((pill, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {pill}
                      </span>
                    ))}
                    {profile.specializationPills.length > 2 && (
                      <span className="text-[10px] text-slate-400 font-mono px-1 self-center">
                        +{profile.specializationPills.length - 2}
                      </span>
                    )}
                  </div>

                </div>

                {/* Primary Action Button: Enter Public Profile */}
                <div className="pt-5 mt-4 border-t border-slate-800/80">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectInstructorForPublicView(profile);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-[#7C3AED] hover:to-[#06B6D4] text-slate-200 hover:text-white text-xs font-bold border border-slate-700/80 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md group-hover:shadow-cyan-500/20"
                  >
                    <span>عرض الملف والبرامج التكوينية</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#06B6D4] group-hover:text-white" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. REGISTRATION & PARTNERSHIP PROMOTION CARDS                  */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Card A: Trainer Accreditation */}
        <div className="rounded-3xl p-6 bg-slate-900/80 border border-purple-800/40 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-900/30 text-purple-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">انضم كمدرب معتمد (Trainer)</h3>
              <p className="text-xs text-slate-400 mt-0.5">احصل على جواز الثقة والاعتماد المهني وانشر دوراتك لآلاف المتدربين</p>
            </div>
          </div>
          <button
            onClick={() => onOpenRegistration('trainer')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>تقديم طلب اعتماد مكوّن فردي</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card B: Training Institute Accreditation */}
        <div className="rounded-3xl p-6 bg-slate-900/80 border border-cyan-800/40 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-900/30 text-cyan-300">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">اعتماد معهد أو مركز تكوين (Institute)</h3>
              <p className="text-xs text-slate-400 mt-0.5">شراكة مؤسسية B2B، حجز مقاعد مؤسسية، وإصدار شارات المركز الرسمية</p>
            </div>
          </div>
          <button
            onClick={() => onOpenRegistration('institute')}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-300 text-xs font-bold border border-cyan-700/60 hover:border-cyan-400 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>اعتماد معهد أو مركز تكوين شريك</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 6. MODAL: PRIVATE DASHBOARD LOGIN FOR INSTRUCTORS              */}
      {/* ============================================================== */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#06B6D4]/20 text-[#06B6D4]">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    دخول المكوّن إلى لوحة التحكم الخاصة 🔒
                  </h3>
                  <p className="text-xs text-slate-400">
                    الوصول مشفّر ومحمي لإدارة الدورات ورصد الحضور والوضعية المالية
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowLoginModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePrivateLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  اختر حساب المكوّن المعتمد:
                </label>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {catalogProfiles.map((acc) => {
                    const isSelected = selectedLoginId === acc.id;
                    return (
                      <div
                        key={acc.id}
                        onClick={() => setSelectedLoginId(acc.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-[#06B6D4] bg-cyan-950/50 text-white shadow-md'
                            : 'border-slate-800 bg-slate-950/50 hover:bg-slate-800/80 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={acc.avatarUrl}
                            alt={acc.name}
                            className="w-8 h-8 rounded-xl object-cover bg-slate-800 shrink-0"
                          />
                          <div>
                            <div className="text-xs font-bold line-clamp-1">{acc.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{acc.email}</div>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          {getTierDisplay(acc.trustTier)}
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:opacity-95 text-white text-xs sm:text-sm font-black shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-amber-300" />
                  <span>الدخول إلى لوحة إدارة التكوينات والمسجلين</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
