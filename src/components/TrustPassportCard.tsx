import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Share2, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Building2,
  GraduationCap,
  Star,
  Layers,
  ArrowUpRight,
  QrCode,
  Check,
  Info
} from 'lucide-react';
import { TrustCertificate, TrustCertificateTier } from '../types';
import { TRUST_TIERS_CONFIG, SAMPLE_TRUST_CERTIFICATES, getOrCreateTrustCertificate } from '../data/trustCertificatesData';
import { LOGO_IMAGE_URL } from './BrandLogo';
import { Language, translations } from '../translations';

interface TrustPassportCardProps {
  initialCertificate?: TrustCertificate;
  instructorName?: string;
  instructorTitle?: string;
  isInstitute?: boolean;
  onOpenCertificateModal: (cert: TrustCertificate) => void;
  currentLang?: Language;
}

export const TrustPassportCard: React.FC<TrustPassportCardProps> = ({
  initialCertificate,
  instructorName = 'د. يونس التازي',
  instructorTitle = 'خبير ذكاء اصطناعي وباحث في التعلم العميق',
  isInstitute = false,
  onOpenCertificateModal,
  currentLang = 'ar',
}) => {
  const t = translations[currentLang];
  const [selectedTier, setSelectedTier] = useState<TrustCertificateTier>(
    initialCertificate?.tier || 'diamond'
  );
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showStandards, setShowStandards] = useState(false);
  const [upgradeRequested, setUpgradeRequested] = useState(false);

  // Active certificate computed from selected tier
  const activeCertificate: TrustCertificate = React.useMemo(() => {
    if (initialCertificate && initialCertificate.tier === selectedTier) {
      return initialCertificate;
    }
    // Check sample
    if (selectedTier === 'diamond') {
      return SAMPLE_TRUST_CERTIFICATES['usr-2'];
    } else if (selectedTier === 'gold') {
      return SAMPLE_TRUST_CERTIFICATES['usr-3'];
    } else {
      return SAMPLE_TRUST_CERTIFICATES['usr-5'];
    }
  }, [initialCertificate, selectedTier]);

  const tierConfig = TRUST_TIERS_CONFIG[selectedTier];

  const handleExport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(`https://beinskills.ma/verify/${activeCertificate.certificateNumber}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleRequestUpgrade = () => {
    setUpgradeRequested(true);
    setTimeout(() => setUpgradeRequested(false), 5000);
  };

  return (
    <div className={`relative glass-card rounded-3xl p-6 sm:p-7 border ${tierConfig.borderClass} bg-gradient-to-br ${tierConfig.cardGradient} shadow-2xl overflow-hidden space-y-6 transition-all duration-300`}>
      
      {/* Holographic Glowing Orbs based on Tier */}
      <div className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl pointer-events-none ${
        selectedTier === 'diamond' ? 'bg-[#06B6D4]/20' : selectedTier === 'gold' ? 'bg-amber-500/20' : 'bg-slate-400/15'
      }`}></div>
      <div className={`absolute bottom-0 left-0 w-44 h-44 rounded-full blur-3xl pointer-events-none ${
        selectedTier === 'diamond' ? 'bg-[#7C3AED]/25' : selectedTier === 'gold' ? 'bg-yellow-500/20' : 'bg-slate-300/15'
      }`}></div>

      {/* Top Header: Trust Passport Identity & Live Tier Swapper */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        
        {/* Passport Title & Seal */}
        <div className="flex items-center gap-3">
          <div className={`relative rounded-2xl p-0.5 bg-gradient-to-tr ${tierConfig.sealBorder} shadow-lg shrink-0`}>
            <img
              src={LOGO_IMAGE_URL}
              alt="BeInSkills Trust Seal"
              className="w-11 h-11 rounded-[14px] object-cover bg-[#0F172A]"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                {currentLang === 'ar' ? 'جواز الثقة والاعتماد المؤسسي' : 'Trust & Accreditation Passport'}
              </h2>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-bold ${tierConfig.badgeBgClass}`}>
                {tierConfig.badgeLabelAr}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              BeInSkills Certified Trust Passport • #{activeCertificate.certificateNumber}
            </p>
          </div>
        </div>

        {/* Interactive 3-Tier Switcher (Diamond, Gold, Silver) */}
        <div className="flex items-center gap-1.5 self-start lg:self-auto bg-slate-950/80 p-1 rounded-2xl border border-slate-800 text-xs">
          <span className="text-[11px] text-slate-400 font-bold px-2 hidden sm:inline">
            {currentLang === 'ar' ? 'مستوى الشهادة:' : 'Tier:'}
          </span>
          
          {/* Diamond Tier Tab */}
          <button
            type="button"
            onClick={() => setSelectedTier('diamond')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedTier === 'diamond'
                ? 'bg-[#06B6D4] text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>💎</span>
            <span>{currentLang === 'ar' ? 'الماسية' : 'Diamond'}</span>
          </button>

          {/* Gold Tier Tab */}
          <button
            type="button"
            onClick={() => setSelectedTier('gold')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedTier === 'gold'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🥇</span>
            <span>{currentLang === 'ar' ? 'الذهبية' : 'Gold'}</span>
          </button>

          {/* Silver Tier Tab */}
          <button
            type="button"
            onClick={() => setSelectedTier('silver')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedTier === 'silver'
                ? 'bg-slate-300 text-slate-950 shadow-md shadow-slate-300/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🥈</span>
            <span>{currentLang === 'ar' ? 'الفضية' : 'Silver'}</span>
          </button>
        </div>

      </div>

      {/* Main Passport Credential Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
        
        {/* Recipient Details & Badges (2 columns) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt={activeCertificate.recipientName}
              className={`w-20 h-20 rounded-2xl object-cover ring-2 ${
                selectedTier === 'diamond' ? 'ring-[#06B6D4]' : selectedTier === 'gold' ? 'ring-amber-400' : 'ring-slate-400'
              } shadow-xl`}
            />
            <div className={`absolute -bottom-2 -left-2 p-1 rounded-lg text-slate-950 font-black shadow-md ${
              selectedTier === 'diamond' ? 'bg-[#06B6D4]' : selectedTier === 'gold' ? 'bg-amber-400' : 'bg-slate-300'
            }`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-right space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-lg font-black text-white font-['Alexandria']">
                {activeCertificate.recipientName}
              </h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${tierConfig.badgeBgClass}`}>
                {tierConfig.titleAr}
              </span>
            </div>

            <p className="text-xs text-slate-300">
              {activeCertificate.recipientTitle}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">{currentLang === 'ar' ? 'مؤشر الجودة' : 'Quality'}</span>
                <span className="text-sm font-black text-emerald-400 font-mono">{activeCertificate.score}/100</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">{currentLang === 'ar' ? 'نسبة الرضا' : 'Satisfaction'}</span>
                <span className="text-sm font-black text-cyan-400 font-mono">%{activeCertificate.satisfactionRate}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">{currentLang === 'ar' ? 'حماية الضمان' : 'Escrow'}</span>
                <span className="text-sm font-black text-amber-300 font-mono">%{activeCertificate.escrowReliabilityRate}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block">{currentLang === 'ar' ? 'المتخرجون' : 'Graduates'}</span>
                <span className="text-sm font-black text-purple-300 font-mono">+{activeCertificate.totalStudentsTrained}</span>
              </div>
            </div>

            {/* Accredited Domains List */}
            <div className="pt-2">
              <span className="text-[10px] text-slate-400 font-semibold block mb-1">
                {currentLang === 'ar' ? 'الميادين المصادق عليها:' : 'Accredited Fields:'}
              </span>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1">
                {activeCertificate.accreditedDomains.map((dom, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    ✓ {dom}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Certificate Actions & Verification Box (1 column) */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold">{currentLang === 'ar' ? 'حالة الاعتماد:' : 'Status:'}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                ✓ {currentLang === 'ar' ? 'موثق وساري المفعول' : 'Active & Certified'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 space-y-1">
              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>{currentLang === 'ar' ? 'تاريخ التجديد:' : 'Renew By:'}</span>
                <span className="font-mono text-slate-200">{activeCertificate.expiryDate}</span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>{currentLang === 'ar' ? 'رقم السجل:' : 'Cert No:'}</span>
                <span className="font-mono text-[#06B6D4] text-[9px]">{activeCertificate.certificateNumber}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug">
              {currentLang === 'ar'
                ? 'شهادة رسمية مصادق عليها تمنح حامليها الثقة المطلقة لدى الطلاب والمؤسسات والشركات B2B.'
                : 'Official certificate providing complete trust for students, institutes, and B2B clients.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            
            {/* View Official Certificate */}
            <button
              onClick={() => onOpenCertificateModal(activeCertificate)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-bold shadow-lg shadow-[#7C3AED]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>{currentLang === 'ar' ? 'معاينة وطباعة الشهادة الرسمية' : 'View Official Certificate'}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              {/* Quick Download */}
              <button
                onClick={handleExport}
                className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>{downloadSuccess ? (currentLang === 'ar' ? 'تم التحميل!' : 'Saved!') : (currentLang === 'ar' ? 'تحميل' : 'Export')}</span>
              </button>

              {/* Share Verification */}
              <button
                onClick={handleShare}
                className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-purple-400" />}
                <span>{copiedLink ? (currentLang === 'ar' ? 'تم النسخ!' : 'Copied!') : (currentLang === 'ar' ? 'مشاركة' : 'Share')}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Upgrade Notification Toast */}
      {upgradeRequested && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>
            {currentLang === 'ar'
              ? 'تم تقديم طلب التدقيق والترقية للمستوى الأعلى إلى إدارة الجودة بـ BeInSkills بنجاح!'
              : 'Audit & tier upgrade request submitted to BeInSkills Quality Board successfully!'}
          </span>
        </div>
      )}

      {/* Toggle Tier Comparison & Standards Accordion */}
      <div className="pt-2 border-t border-slate-800/80 relative z-10">
        <button
          onClick={() => setShowStandards(!showStandards)}
          className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>
            {showStandards 
              ? (currentLang === 'ar' ? 'إخفاء دليل معايير المستويات الثلاثة' : 'Hide Tier Standards Guide')
              : (currentLang === 'ar' ? 'عرض دليل معايير وامتيازات المستويات الثلاثة (الماسية - الذهبية - الفضية)' : 'View 3-Tier Standards & Privileges Guide (Diamond - Gold - Silver)')}
          </span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showStandards ? 'rotate-90' : ''}`} />
        </button>

        {showStandards && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in">
            
            {/* Diamond Guide Card */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-[#06B6D4]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-[#06B6D4] flex items-center gap-1.5">
                  <span>💎</span>
                  <span>الشهادة الماسية</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  أعلى اعتماد
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                مخصصة لنخبة المكونين والمؤسسات التدريبية الكبرى.
              </p>
              <div className="space-y-1 text-[10px] text-slate-400">
                <div className="text-white font-bold">المعايير المطلوبة:</div>
                <div>• نسبة رضا متدربين 98%+</div>
                <div>• 10+ تكوينات مكتملة و 500+ متدرب</div>
                <div>• فحص بيداغوجي وقانوني وتجاري شامل</div>
              </div>
              <div className="space-y-1 text-[10px] text-slate-400 pt-1">
                <div className="text-[#06B6D4] font-bold">الامتيازات:</div>
                <div>• أولوية الظهور في قمة البحث</div>
                <div>• عمولة مخفضة 10% للمنصة</div>
                <div>• شارة 4K تفاعلية وعقود B2B مباشرة</div>
              </div>
            </div>

            {/* Gold Guide Card */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-amber-400 flex items-center gap-1.5">
                  <span>🥇</span>
                  <span>الشهادة الذهبية</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                  مستوى متميز
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                للمكونين ذوي الخبرة العالية ومؤسسات التدريب المعتمدة.
              </p>
              <div className="space-y-1 text-[10px] text-slate-400">
                <div className="text-white font-bold">المعايير المطلوبة:</div>
                <div>• نسبة رضا متدربين 92%+</div>
                <div>• 5+ تكوينات مكتملة و 150+ متدرب</div>
                <div>• صفر شكاوى نزاع مالي في Escrow</div>
              </div>
              <div className="space-y-1 text-[10px] text-slate-400 pt-1">
                <div className="text-amber-400 font-bold">الامتيازات:</div>
                <div>• تثبيت في الدورات المميزة Featured</div>
                <div>• تحرير دفعات سريع خلال 24 ساعة</div>
                <div>• ختم التميز الذهبي الرسمي</div>
              </div>
            </div>

            {/* Silver Guide Card */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-600/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-slate-200 flex items-center gap-1.5">
                  <span>🥈</span>
                  <span>الشهادة الفضية</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-bold">
                  توثيق مهني
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                للمكونين الجدد المؤهلين والمؤسسات الناشئة.
              </p>
              <div className="space-y-1 text-[10px] text-slate-400">
                <div className="text-white font-bold">المعايير المطلوبة:</div>
                <div>• توثيق الهوية الوطنية والسيرة الذاتية</div>
                <div>• دورة واحدة على الأقل مكتملة بنجاح</div>
                <div>• الالتزام بميثاق حماية المتدربين والوساطة</div>
              </div>
              <div className="space-y-1 text-[10px] text-slate-400 pt-1">
                <div className="text-slate-300 font-bold">الامتيازات:</div>
                <div>• شارة Verified الرسمية</div>
                <div>• تحصيل الرسوم عبر الضمان الوسيط</div>
                <div>• أدوات إدارة الحضور والتقييمات</div>
              </div>
            </div>

            {/* Request Upgrade Button */}
            <div className="md:col-span-3 pt-2 text-center">
              <button
                onClick={handleRequestUpgrade}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>
                  {currentLang === 'ar'
                    ? 'طلب ترقية مستوى الاعتماد وتدقيق الشواهد لدى إدارة BeInSkills'
                    : 'Request Tier Upgrade & Quality Audit from BeInSkills'}
                </span>
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
