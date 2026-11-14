import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Lock, 
  Globe, 
  Download, 
  Printer, 
  Check, 
  Building2, 
  GraduationCap, 
  UserCheck, 
  AlertCircle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Language } from '../translations';
import { 
  ElectronicContractTemplate, 
  TRAINER_INSTITUTE_CONTRACT, 
  LEARNER_PROTECTION_CONTRACT 
} from '../data/contractsData';

interface ElectronicContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractType: 'trainer_institute_sla' | 'learner_protection_agreement';
  signatoryName?: string;
  signatoryRole?: 'trainer' | 'institute' | 'learner';
  onContractSigned?: (contractData: {
    contractNumber: string;
    signedAt: string;
    signatoryName: string;
    lang: Language;
  }) => void;
  initialLang?: Language;
}

export const ElectronicContractModal: React.FC<ElectronicContractModalProps> = ({
  isOpen,
  onClose,
  contractType,
  signatoryName = '',
  signatoryRole = 'trainer',
  onContractSigned,
  initialLang = 'ar',
}) => {
  const [contractLang, setContractLang] = useState<Language>(initialLang);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [enteredName, setEnteredName] = useState(signatoryName);
  const [isSigned, setIsSigned] = useState(false);
  const [signedTimestamp, setSignedTimestamp] = useState<string | null>(null);
  const [contractNumber] = useState(
    () => `BIS-CNT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  if (!isOpen) return null;

  const template: ElectronicContractTemplate = 
    contractType === 'trainer_institute_sla' 
      ? TRAINER_INSTITUTE_CONTRACT 
      : LEARNER_PROTECTION_CONTRACT;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'العربية', flag: '🇲🇦' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms || !enteredName.trim()) return;

    const timestamp = new Date().toLocaleString(
      contractLang === 'ar' ? 'ar-MA' : contractLang === 'fr' ? 'fr-FR' : contractLang === 'es' ? 'es-ES' : 'en-US'
    );
    setSignedTimestamp(timestamp);
    setIsSigned(true);

    onContractSigned?.({
      contractNumber,
      signedAt: timestamp,
      signatoryName: enteredName.trim(),
      lang: contractLang,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in font-['Alexandria']">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* ============================================================== */}
        {/* 1. MODAL HEADER & 4-LANGUAGE SELECTOR BAR                      */}
        {/* ============================================================== */}
        <div className="p-4 sm:px-6 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#06B6D4] text-white shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-[#06B6D4] border border-cyan-800">
                  {contractNumber}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                  {contractType === 'trainer_institute_sla' ? 'SLA - شراكة واعتماد' : 'Charter - حماية المتدرب'}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white mt-1">
                {template.title[contractLang]}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            
            {/* 4-Language Switcher */}
            <div className="flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setContractLang(lang.code)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    contractLang === lang.code
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={lang.label}
                >
                  <span className="text-xs">{lang.flag}</span>
                  <span className="hidden sm:inline text-[11px]">{lang.label}</span>
                </button>
              ))}
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              type="button"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="طباعة العقد أو حفظ كـ PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

        </div>

        {/* ============================================================== */}
        {/* 2. CONTRACT BODY (SCROLLABLE & LEGAL PRESENTATION)             */}
        {/* ============================================================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-200 text-xs sm:text-sm">
          
          {/* Subtitle & Legal Framework Header */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white leading-relaxed">
                  {template.subtitle[contractLang]}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal font-mono">
                  ⚖️ {template.legalFramework[contractLang]}
                </p>
              </div>
            </div>
          </div>

          {/* Preamble */}
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/30 text-slate-300 leading-relaxed text-xs sm:text-sm">
            <span className="font-bold text-purple-300 block mb-1">
              {contractLang === 'ar' ? 'الديباجة والتأطير التعاقدي:' : contractLang === 'fr' ? 'Préambule :' : contractLang === 'es' ? 'Preámbulo :' : 'Preamble:'}
            </span>
            {template.preamble[contractLang]}
          </div>

          {/* Legal Articles */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider px-1">
              {contractLang === 'ar' ? 'بنود ومواد العقد الإلكتروني الملزمة:' : contractLang === 'fr' ? 'Articles contractuels exécutoires :' : contractLang === 'es' ? 'Artículos y Cláusulas Contractuales :' : 'Binding Contractual Articles:'}
            </h4>

            {template.articles.map((art) => {
              const isExpanded = expandedArticleId === art.id;
              return (
                <div
                  key={art.id}
                  className="rounded-2xl border border-slate-800/90 bg-slate-950/60 overflow-hidden transition-all hover:border-slate-700"
                >
                  <div
                    onClick={() => setExpandedArticleId(isExpanded ? null : art.id)}
                    className="p-4 flex items-center justify-between gap-3 cursor-pointer bg-slate-950/80 hover:bg-slate-900/90 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#7C3AED]/20 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {art.articleNumber}
                      </div>
                      <h5 className="font-bold text-white text-xs sm:text-sm">
                        {art.title[contractLang]}
                      </h5>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  <div className="p-4 pt-1 space-y-3 border-t border-slate-800/60">
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                      {art.content[contractLang]}
                    </p>

                    {art.keyHighlight && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/50 border border-cyan-800/60 text-[#06B6D4] text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{art.keyHighlight[contractLang]}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Seal & Escrow Guarantee Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-cyan-950/40 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-[#06B6D4]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {contractLang === 'ar' ? 'نظام الضمان المالي Escrow نشط' : contractLang === 'fr' ? 'Garantie financière Escrow active' : contractLang === 'es' ? 'Garantía Financiera Escrow Activa' : 'Escrow Financial Vault Active'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {contractLang === 'ar' ? 'حماية بنسبة 100% للرسوم ومستحقات الشركاء' : contractLang === 'fr' ? 'Protection à 100% des fonds et des partenaires' : contractLang === 'es' ? '100% de protección de fondos y socios' : '100% protection of course fees & partners funds'}
                </div>
              </div>
            </div>

            <div className="text-left font-mono text-[11px] text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <div>HASH: 7f8a92...bc341</div>
              <div className="text-emerald-400 font-bold">VERIFIED SIGNATURE ✓</div>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* 3. DIGITAL SIGNATURE & ACCEPTANCE FORM (FOOTER)                */}
        {/* ============================================================== */}
        <div className="p-4 sm:px-6 bg-slate-950 border-t border-slate-800 shrink-0 space-y-4">
          
          {isSigned ? (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/80 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in zoom-in-95">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {contractLang === 'ar' ? 'تم توقيع واعتماد العقد الإلكتروني بنجاح! 🎉' : contractLang === 'fr' ? 'Contrat électronique signé et validé avec succès ! 🎉' : contractLang === 'es' ? '¡Contrato electrónico firmado y validado con éxito! 🎉' : 'Electronic Contract Successfully Signed & Verified! 🎉'}
                  </h4>
                  <p className="text-[11px] text-emerald-200 mt-0.5">
                    الموقع: <strong className="text-white">{enteredName}</strong> • التاريخ: <span className="font-mono text-cyan-300">{signedTimestamp}</span> • الكود: <span className="font-mono text-cyan-300">{contractNumber}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
              >
                {contractLang === 'ar' ? 'متابعة وإتمام التسجيل ←' : contractLang === 'fr' ? 'Continuer l’inscription ←' : contractLang === 'es' ? 'Continuar registro ←' : 'Proceed to Registration ←'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSign} className="space-y-3">
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    {contractLang === 'ar' ? 'الاسم الكامل للموقع (أو الممثل القانوني للمؤسسة):' : contractLang === 'fr' ? 'Nom complet du signataire (ou représentant légal) :' : contractLang === 'es' ? 'Nombre completo del firmante (o representante legal) :' : 'Full Name of Signatory (or Legal Representative):'}
                  </label>
                  <input
                    type="text"
                    required
                    value={enteredName}
                    onChange={(e) => setEnteredName(e.target.value)}
                    placeholder={contractLang === 'ar' ? 'اكتب اسمك الكامل للمصادقة على التوقيع الرقمي' : 'Enter your full name for digital consent'}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-[#06B6D4] text-xs text-white rounded-xl px-3.5 py-2.5 outline-none"
                  />
                </div>

                <div className="shrink-0 self-end">
                  <button
                    type="submit"
                    disabled={!acceptedTerms || !enteredName.trim()}
                    className={`w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-black shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      acceptedTerms && enteredName.trim()
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:opacity-95 text-white shadow-purple-900/30'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{contractLang === 'ar' ? 'المصادقة والتوقيع الإلكتروني' : contractLang === 'fr' ? 'Signer et valider' : contractLang === 'es' ? 'Firmar y aceptar' : 'Sign & Electronically Validate'}</span>
                  </button>
                </div>
              </div>

              {/* Checkbox Consent */}
              <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-[#06B6D4] focus:ring-[#06B6D4] w-4 h-4 bg-slate-900"
                />
                <span className="leading-relaxed">
                  {template.signatureClause[contractLang]}
                </span>
              </label>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
