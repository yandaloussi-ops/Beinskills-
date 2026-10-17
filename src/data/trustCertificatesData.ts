import { TrustCertificate, TrustCertificateTier } from '../types';

export interface TierConfig {
  id: TrustCertificateTier;
  titleAr: string;
  titleEn: string;
  titleFr: string;
  titleEs: string;
  badgeLabelAr: string;
  colorClass: string;
  badgeBgClass: string;
  borderClass: string;
  glowClass: string;
  textGradient: string;
  cardGradient: string;
  sealBorder: string;
  minSatisfaction: number;
  minCourses: number;
  minStudents: number;
  qualityScore: number;
  criteria: string[];
  privileges: string[];
}

export const TRUST_TIERS_CONFIG: Record<TrustCertificateTier, TierConfig> = {
  diamond: {
    id: 'diamond',
    titleAr: 'الشهادة الماسية للاعتماد والجودة الفائقة',
    titleEn: 'Diamond Certificate of Quality & Trust',
    titleFr: 'Certificat Diamant de Qualité et Confiance',
    titleEs: 'Certificado Diamante de Calidad y Confianza',
    badgeLabelAr: 'اعتماد ماسي BeInSkills',
    colorClass: 'text-[#06B6D4]',
    badgeBgClass: 'bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/40',
    borderClass: 'border-[#06B6D4]/60',
    glowClass: 'shadow-[#06B6D4]/30',
    textGradient: 'from-white via-[#06B6D4] to-[#7C3AED]',
    cardGradient: 'from-slate-900/95 via-[#0F172A] to-cyan-950/40',
    sealBorder: 'from-[#06B6D4] via-cyan-300 to-[#7C3AED]',
    minSatisfaction: 98,
    minCourses: 10,
    minStudents: 500,
    qualityScore: 99,
    criteria: [
      'نسبة رضا متدربين تفوق 98% عبر 300+ تقييم معتمد',
      'إنجاز أكثر من 10 تكوينات ناجحة مع حماية Escrow بنسبة 100%',
      'اجتياز تدقيق المحتوى البيداغوجي والفحص القانوني والتجاري',
      'توفير مشاريع عملية ومتابعة مستمرة بعد التخرج',
    ],
    privileges: [
      'وسام الثقة الماسي البارز على جميع التكوينات والملف التعريفي',
      'أولوية الظهور في أعلى نتائج محرك البحث واستعراض المنصة',
      'عمولة منصة مخفضة تفضيلية (10% بدلاً من 15%)',
      'دعم تسويقي وترويجي مميز ودعوات لفعاليات الشراكة المؤسسية',
    ],
  },
  gold: {
    id: 'gold',
    titleAr: 'الشهادة الذهبية للتميز المهني والأكاديمي',
    titleEn: 'Gold Certificate of Professional Excellence',
    titleFr: 'Certificat Or d’Excellence Professionnelle',
    titleEs: 'Certificado Oro de Excelencia Profesional',
    badgeLabelAr: 'اعتماد ذهبي BeInSkills',
    colorClass: 'text-amber-400',
    badgeBgClass: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    borderClass: 'border-amber-500/60',
    glowClass: 'shadow-amber-500/30',
    textGradient: 'from-amber-200 via-yellow-400 to-amber-500',
    cardGradient: 'from-slate-900/95 via-[#0F172A] to-amber-950/40',
    sealBorder: 'from-amber-400 via-yellow-200 to-amber-600',
    minSatisfaction: 92,
    minCourses: 5,
    minStudents: 150,
    qualityScore: 94,
    criteria: [
      'نسبة رضا لا تقل عن 92% من الطلاب المسجلين',
      'تقديم 5 تكوينات مكتملة مع التزام تام بمواعيد الجلسات',
      'توثيق الخبرة المهنية والسجل التجاري أو الشواهد الأكاديمية',
      'صفر شكاوى نزاع مالي في الحساب الوسيط Escrow',
    ],
    privileges: [
      'شارة الثقة الذهبية الرسمية بجانب الاسم والدورات',
      'تثبيت في قائمة الدورات المقترحة والمميزة (Featured)',
      'سرعة تحرير دفعات الحساب الوسيط خلال 24 ساعة',
    ],
  },
  silver: {
    id: 'silver',
    titleAr: 'الشهادة الفضية للمصداقية والتوثيق المعتمد',
    titleEn: 'Silver Certificate of Verified Reliability',
    titleFr: 'Certificat Argent de Fiabilité Vérifiée',
    titleEs: 'Certificado Plata de Fiabilidad Verificada',
    badgeLabelAr: 'اعتماد فضي BeInSkills',
    colorClass: 'text-slate-200',
    badgeBgClass: 'bg-slate-300/15 text-slate-200 border-slate-400/40',
    borderClass: 'border-slate-400/50',
    glowClass: 'shadow-slate-400/20',
    textGradient: 'from-white via-slate-200 to-slate-400',
    cardGradient: 'from-slate-900/95 via-[#0F172A] to-slate-800/40',
    sealBorder: 'from-slate-300 via-white to-slate-500',
    minSatisfaction: 85,
    minCourses: 1,
    minStudents: 30,
    qualityScore: 88,
    criteria: [
      'توثيق الهوية الوطنية والسيرة الذاتية الرسمية للمكوّن',
      'إكمال دورة واحدة على الأقل بنجاح داخل منصة BeInSkills',
      'الموافقة على ميثاق حماية المتدرب وضمان التحصيل الوسيط',
      'تحديث المناهج ومطابقتها للمتطلبات البيداغوجية',
    ],
    privileges: [
      'شارة الاعتماد الفضي الرسمية BeInSkills Verified',
      'إمكانية تحصيل رسوم التكوين مباشرة عبر الحساب الوسيط',
      'وصول كامل لأدوات استوديو المكوّن وإدارة المقاعد',
    ],
  },
};

export const SAMPLE_TRUST_CERTIFICATES: Record<string, TrustCertificate> = {
  'usr-2': {
    id: 'cert-dia-001',
    recipientName: 'د. يونس التازي',
    recipientTitle: 'خبير ذكاء اصطناعي وباحث في التعلم العميق',
    recipientType: 'instructor',
    tier: 'diamond',
    certificateNumber: 'BIS-TRUST-DIA-2026-9042',
    issueDate: '2026-06-15',
    expiryDate: '2027-06-15',
    verificationHash: '0x8f92a10b4c893ef2d7a6e4b1c8f3948572b9a103',
    score: 99,
    satisfactionRate: 99.4,
    completedCoursesCount: 16,
    totalStudentsTrained: 620,
    escrowReliabilityRate: 100,
    accreditedDomains: ['الذكاء الاصطناعي التوليدي', 'التعلم الآلي', 'Prompt Engineering', 'علوم البيانات'],
    auditedBy: 'اللجنة الوطنية للاعتماد الأكاديمي وضمان الجودة - BeInSkills',
    features: ['معتمد لتقديم شهادات 4K', 'حماية Escrow من الدرجة الأولى', 'مدرب معتمد للشركات B2B'],
  },
  'usr-3': {
    id: 'cert-gold-002',
    recipientName: 'المهندس كريم المنصوري',
    recipientTitle: 'كبير مهندسي النظم بشركة حلول التقنية',
    recipientType: 'instructor',
    tier: 'gold',
    certificateNumber: 'BIS-TRUST-GLD-2026-7814',
    issueDate: '2026-07-01',
    expiryDate: '2027-07-01',
    verificationHash: '0x4d71b3e8c9a02f6a5b8e91c742f883901ba63211',
    score: 95,
    satisfactionRate: 96.8,
    completedCoursesCount: 9,
    totalStudentsTrained: 380,
    escrowReliabilityRate: 100,
    accreditedDomains: ['تطوير الويب الحديث Full-Stack', 'السحابة والحاويات Cloud & DevOps', 'React 19 & Node.js'],
    auditedBy: 'هيئة التدقيق البيداغوجي والتقني - BeInSkills',
    features: ['مشاريع SaaS حقيقية', 'شهادات رقمية معتمدة', 'إشراف تطبيقي مباشر'],
  },
  'usr-4': {
    id: 'cert-dia-b2b-003',
    recipientName: 'أكاديمية تكنوبارك الرقمية (Technopark B2B)',
    recipientTitle: 'مؤسسة تدريب معتمدة ومسرعة كفاءات رقمية',
    recipientType: 'institute',
    tier: 'diamond',
    certificateNumber: 'BIS-TRUST-INST-DIA-2026-3199',
    issueDate: '2026-05-20',
    expiryDate: '2027-05-20',
    verificationHash: '0x1c98e4f203891ab54e7d983021fba893427c5410',
    score: 99,
    satisfactionRate: 98.9,
    completedCoursesCount: 28,
    totalStudentsTrained: 1450,
    escrowReliabilityRate: 100,
    accreditedDomains: ['الأمن السيبراني', 'الذكاء الاصطناعي', 'التسويق الرقمي', 'إدارة المشاريع Agile'],
    auditedBy: 'المجلس الاستشاري للشراكات المؤسسية وضمان الجودة - BeInSkills',
    features: ['حجوزات جماعية B2B', 'فصول ذكية مجهزة', 'عقود ضمان وإرجاع محمية'],
  },
  'usr-5': {
    id: 'cert-slv-004',
    recipientName: 'م. طارق الفاسي',
    recipientTitle: 'استشاري أمن المعلومات واختبار الاختراق',
    recipientType: 'instructor',
    tier: 'silver',
    certificateNumber: 'BIS-TRUST-SLV-2026-4402',
    issueDate: '2026-08-10',
    expiryDate: '2027-08-10',
    verificationHash: '0x7e29b15c48920fe1d84a3298c763910245a819b2',
    score: 89,
    satisfactionRate: 91.2,
    completedCoursesCount: 3,
    totalStudentsTrained: 75,
    escrowReliabilityRate: 100,
    accreditedDomains: ['الأمن السيبراني المتقدم', 'Ethical Hacking', 'حماية الخوادم'],
    auditedBy: 'قسم التوثيق والتحقق من الهوية المهنية - BeInSkills',
    features: ['مختبرات تطبيقية', 'شهادة إتمام معتمدة', 'ضمان بنكي للرسوم'],
  },
};

/**
 * Helper to generate or get a trust certificate for an instructor or institute
 */
export function getOrCreateTrustCertificate(
  name: string,
  title: string,
  type: 'instructor' | 'institute',
  tier: TrustCertificateTier = 'diamond'
): TrustCertificate {
  const cfg = TRUST_TIERS_CONFIG[tier];
  const certPrefix = tier === 'diamond' ? 'DIA' : tier === 'gold' ? 'GLD' : 'SLV';
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  
  return {
    id: `cert-${tier}-${Date.now()}`,
    recipientName: name,
    recipientTitle: title,
    recipientType: type,
    tier,
    certificateNumber: `BIS-TRUST-${certPrefix}-2026-${randomSuffix}`,
    issueDate: '2026-06-15',
    expiryDate: '2027-06-15',
    verificationHash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
    score: cfg.qualityScore,
    satisfactionRate: cfg.minSatisfaction + 0.8,
    completedCoursesCount: cfg.minCourses + 4,
    totalStudentsTrained: cfg.minStudents + 85,
    escrowReliabilityRate: 100,
    accreditedDomains: ['تكنولوجيا المعلومات والبرمجة', 'الذكاء الاصطناعي', 'إدارة الأعمال والمشاريع'],
    auditedBy: 'اللجنة الوطنية للاعتماد الأكاديمي وضمان الجودة - BeInSkills',
    features: cfg.privileges,
  };
}
