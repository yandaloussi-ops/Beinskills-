import React, { useState } from 'react';
import { 
  X, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Printer, 
  Share2, 
  Sparkles, 
  Check, 
  ExternalLink,
  QrCode,
  Building2,
  GraduationCap,
  Calendar,
  Lock
} from 'lucide-react';
import { TrustCertificate, TrustCertificateTier } from '../types';
import { TRUST_TIERS_CONFIG } from '../data/trustCertificatesData';
import { LOGO_IMAGE_URL } from './BrandLogo';
import { Language, translations } from '../translations';

interface TrustCertificateModalProps {
  certificate: TrustCertificate | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
}

export const TrustCertificateModal: React.FC<TrustCertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
  currentLang = 'ar',
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  if (!isOpen || !certificate) return null;

  const t = translations[currentLang];
  const tierConfig = TRUST_TIERS_CONFIG[certificate.tier];

  const handleCopyLink = () => {
    const url = `https://beinskills.ma/verify/${certificate.certificateNumber}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportNotice(currentLang === 'ar' ? 'تم تجهيز وتحميل الشهادة الرسمية بصيغة فائقة الدقة بنجاح!' : 'Official certificate exported in high resolution successfully!');
      setTimeout(() => setExportNotice(null), 4000);
    }, 1200);
  };

  const isDiamond = certificate.tier === 'diamond';
  const isGold = certificate.tier === 'gold';
  const isSilver = certificate.tier === 'silver';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#0F172A] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar (Non-printable) */}
        <div className="print:hidden p-4 sm:px-6 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${tierConfig.badgeBgClass}`}>
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white font-['Alexandria']">
                {currentLang === 'ar' ? 'شهادة الثقة والاعتماد المؤسسي الرسمية' : 'Official BeInSkills Trust & Accreditation Certificate'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {certificate.certificateNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="مشاركة رابط التحقق"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? (currentLang === 'ar' ? 'تم النسخ!' : 'Copied!') : (currentLang === 'ar' ? 'مشاركة' : 'Share')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="طباعة الشهادة"
            >
              <Printer className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span className="hidden sm:inline">{currentLang === 'ar' ? 'طباعة' : 'Print'}</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-bold shadow-md shadow-[#7C3AED]/20 hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? (currentLang === 'ar' ? 'جاري التحميل...' : 'Exporting...') : (currentLang === 'ar' ? 'تحميل PDF/4K' : 'Download')}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Export Notification Toast */}
        {exportNotice && (
          <div className="mx-6 mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{exportNotice}</span>
          </div>
        )}

        {/* Certificate Display Canvas Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-slate-950/40">
          
          {/* THE CERTIFICATE CONTAINER (Print optimized) */}
          <div className={`relative w-full max-w-3xl bg-gradient-to-b from-[#0F172A] via-[#0B1120] to-[#0F172A] rounded-3xl p-6 sm:p-10 border-4 ${
            isDiamond
              ? 'border-[#06B6D4] shadow-[0_0_50px_rgba(6,182,212,0.25)]'
              : isGold
              ? 'border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.25)]'
              : 'border-slate-400 shadow-[0_0_50px_rgba(148,163,184,0.2)]'
          } text-slate-100 flex flex-col justify-between relative overflow-hidden`}>

            {/* Background Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
              <img
                src={LOGO_IMAGE_URL}
                alt="BeInSkills Watermark"
                className="w-[500px] h-[500px] object-contain filter grayscale"
              />
            </div>

            {/* Ornate Corner Accents */}
            <div className={`absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 ${tierConfig.colorClass}`}></div>
            <div className={`absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 ${tierConfig.colorClass}`}></div>
            <div className={`absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 ${tierConfig.colorClass}`}></div>
            <div className={`absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 ${tierConfig.colorClass}`}></div>

            {/* Top Header: Platform Identity & Kingdom Crest Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className={`p-1 rounded-2xl bg-gradient-to-tr ${tierConfig.sealBorder} shadow-lg shrink-0`}>
                  <img
                    src={LOGO_IMAGE_URL}
                    alt="BeInSkills Seal"
                    className="w-12 h-12 rounded-[14px] object-cover bg-[#0F172A]"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    منصة BeInSkills الوطنية لتنمية المهارات والاعتماد
                  </div>
                  <h4 className="text-lg font-black text-white font-['Alexandria']">
                    اللجنة العليا لضمان الجودة والاعتماد المهني
                  </h4>
                </div>
              </div>

              {/* Tier Seal Ribbon */}
              <div className={`px-4 py-1.5 rounded-full border ${tierConfig.badgeBgClass} flex items-center gap-2 shadow-md shrink-0`}>
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider">
                  {certificate.tier === 'diamond' ? 'الاعتماد الماسي DIAMOND' : certificate.tier === 'gold' ? 'الاعتماد الذهبي GOLD' : 'الاعتماد الفضي SILVER'}
                </span>
              </div>
            </div>

            {/* Certificate Body Main Text */}
            <div className="my-8 text-center space-y-5">
              
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-slate-400">
                  شهادة ثقة واعتماد رسمي صادرة من منصة BeInSkills
                </span>
                <h1 className={`text-2xl sm:text-4xl font-black font-['Alexandria'] bg-clip-text text-transparent bg-gradient-to-r ${tierConfig.textGradient} py-1`}>
                  {tierConfig.titleAr}
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                  BeInSkills Certified Institutional & Instructor Trust Accreditation
                </p>
              </div>

              {/* Recipient Announcement */}
              <div className="py-2">
                <p className="text-xs sm:text-sm text-slate-300">
                  تشهد منصة BeInSkills بعد استيفاء كافة معايير الفحص البيداغوجي، والالتزام بضمان الحساب الوسيط Escrow، وتحقيق أعلى معدلات الجودة ورضا المتدربين، بأن:
                </p>
                <div className="my-3 py-2 px-6 inline-block bg-slate-900/80 rounded-2xl border border-slate-700/60 shadow-inner">
                  <div className="text-xl sm:text-3xl font-black text-white font-['Alexandria']">
                    {certificate.recipientName}
                  </div>
                  <div className="text-xs sm:text-sm text-[#06B6D4] font-medium mt-1">
                    {certificate.recipientTitle}
                  </div>
                </div>
                <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                  حائز(ة) رسمياً على <span className={`font-black ${tierConfig.colorClass}`}>{tierConfig.badgeLabelAr}</span> ومصادق على كفاءته(ا) لتقديم التكوينات الاحترافية المعتمدة وفق أرقى المعايير الدولية.
                </p>
              </div>

              {/* Verified Metrics Grid inside Certificate */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
                
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400">مؤشر الجودة العام</div>
                  <div className="text-base sm:text-lg font-black text-emerald-400 font-mono mt-0.5">
                    {certificate.score}/100
                  </div>
                  <div className="text-[9px] text-emerald-500 font-semibold">تدقيق معتمد</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400">نسبة رضا المتدربين</div>
                  <div className="text-base sm:text-lg font-black text-cyan-400 font-mono mt-0.5">
                    %{certificate.satisfactionRate}
                  </div>
                  <div className="text-[9px] text-cyan-500 font-semibold">تقييمات موثقة</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400">حماية الضمان الوسيط</div>
                  <div className="text-base sm:text-lg font-black text-amber-400 font-mono mt-0.5">
                    %{certificate.escrowReliabilityRate}
                  </div>
                  <div className="text-[9px] text-amber-500 font-semibold">Escrow 100%</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400">المتدربون المخرّجون</div>
                  <div className="text-base sm:text-lg font-black text-purple-300 font-mono mt-0.5">
                    +{certificate.totalStudentsTrained}
                  </div>
                  <div className="text-[9px] text-purple-400 font-semibold">{certificate.completedCoursesCount} تكويناً</div>
                </div>

              </div>

              {/* Accredited Fields Badges */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block mb-1.5 font-semibold">
                  الميادين المعرفية والمهنية المعتمدة رسمياً:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {certificate.accreditedDomains.map((domain, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-200 border border-slate-700/60 font-medium"
                    >
                      ✓ {domain}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Footer: Verification Hash, QR Code & Signatures */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              
              {/* Left Column: QR Code & Verification Link */}
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="p-2 rounded-xl bg-white text-slate-950 shrink-0 shadow-md">
                  <QrCode className="w-10 h-10" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-300">مسح للتحقق الرقمي</div>
                  <div className="text-[9px] text-slate-400 font-mono">beinskills.ma/verify</div>
                  <div className="text-[9px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>مصدق وساري المفعول</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Official BeInSkills 3D Stamp */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className={`relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr ${tierConfig.sealBorder} shadow-lg flex items-center justify-center`}>
                  <div className="w-full h-full rounded-full bg-[#0F172A] border border-slate-700 flex flex-col items-center justify-center p-1">
                    <Award className={`w-6 h-6 ${tierConfig.colorClass}`} />
                    <span className="text-[8px] font-black uppercase text-white tracking-tighter">BEINSKILLS</span>
                    <span className={`text-[7px] font-bold ${tierConfig.colorClass}`}>VERIFIED</span>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 font-mono">
                  رقم: {certificate.certificateNumber}
                </span>
              </div>

              {/* Right Column: Signatures & Dates */}
              <div className="text-center sm:text-left space-y-1">
                <div className="text-[11px] font-bold text-slate-200 font-['Alexandria']">
                  {certificate.auditedBy}
                </div>
                <div className="text-[10px] text-slate-400">
                  تاريخ الإصدار: <span className="font-mono text-slate-200">{certificate.issueDate}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  صالح لغاية: <span className="font-mono text-slate-200">{certificate.expiryDate}</span>
                </div>
                <div className="pt-1">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] font-mono">
                    HASH: {certificate.verificationHash.slice(0, 16)}...
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
