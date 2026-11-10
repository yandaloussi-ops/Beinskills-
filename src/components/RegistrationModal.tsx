import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  GraduationCap, 
  UserCheck, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  ArrowLeft,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileCheck,
  Upload,
  PlusCircle,
  FileText,
  BadgeCheck,
  Globe
} from 'lucide-react';
import { UserProfile } from '../types';
import { ALL_SPECIALIZATIONS, SpecializationCategory } from '../data/specializationsData';

export type RegistrationRole = 'institute' | 'trainer' | 'learner';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: RegistrationRole;
  onLearnerRegistered?: (newProfileData: Partial<UserProfile>) => void;
  onInstituteRegistered?: (instituteData: any) => void;
  onTrainerRegistered?: (trainerData: any) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'trainer',
  onLearnerRegistered,
  onInstituteRegistered,
  onTrainerRegistered,
}) => {
  const [selectedRole, setSelectedRole] = useState<RegistrationRole>(defaultRole);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Categories list from taxonomy
  const [categories] = useState<SpecializationCategory[]>(ALL_SPECIALIZATIONS);

  // --- Institute Form State ---
  const [instName, setInstName] = useState('');
  const [instRegNo, setInstRegNo] = useState('');
  const [instCity, setInstCity] = useState('');
  const [instCategory, setInstCategory] = useState(categories[0]?.id || '');
  const [instSpecialty, setInstSpecialty] = useState('');
  const [instCustomSpecialty, setInstCustomSpecialty] = useState('');
  const [isInstCustomActive, setIsInstCustomActive] = useState(false);
  const [instContact, setInstContact] = useState('');
  const [instEmail, setInstEmail] = useState('');
  const [instPhone, setInstPhone] = useState('');
  const [instWebsite, setInstWebsite] = useState('');
  const [instRcUploaded, setInstRcUploaded] = useState(false);
  const [instPortfolioUploaded, setInstPortfolioUploaded] = useState(false);

  // --- Trainer Form State ---
  const [trainerName, setTrainerName] = useState('');
  const [trainerTitle, setTrainerTitle] = useState('');
  const [trainerCategory, setTrainerCategory] = useState(categories[0]?.id || '');
  const [trainerSpecialty, setTrainerSpecialty] = useState('');
  const [trainerCustomSpecialty, setTrainerCustomSpecialty] = useState('');
  const [isTrainerCustomActive, setIsTrainerCustomActive] = useState(false);
  const [trainerExpYears, setTrainerExpYears] = useState('5');
  const [trainerMode, setTrainerMode] = useState<'remote' | 'in-person' | 'both'>('both');
  const [trainerBio, setTrainerBio] = useState('');
  const [trainerLinkedIn, setTrainerLinkedIn] = useState('');
  const [trainerEmail, setTrainerEmail] = useState('');
  const [trainerPhone, setTrainerPhone] = useState('');
  const [trainerIdUploaded, setTrainerIdUploaded] = useState(false);
  const [trainerCvUploaded, setTrainerCvUploaded] = useState(false);
  const [trainerDegreeUploaded, setTrainerDegreeUploaded] = useState(false);

  // --- Learner Form State ---
  const [learnerName, setLearnerName] = useState('');
  const [learnerGoal, setLearnerGoal] = useState('الحصول على وظيفة مرموقة');
  const [learnerField, setLearnerField] = useState('الذكاء الاصطناعي والتكنولوجيا');
  const [learnerMode, setLearnerMode] = useState<'remote' | 'in-person' | 'any'>('any');
  const [learnerEmail, setLearnerEmail] = useState('');
  const [learnerPhone, setLearnerPhone] = useState('');

  // Get active sub-specializations based on selected category
  const activeTrainerCategoryObj = categories.find((c) => c.id === trainerCategory) || categories[0];
  const activeInstCategoryObj = categories.find((c) => c.id === instCategory) || categories[0];

  useEffect(() => {
    setSelectedRole(defaultRole);
    setIsSubmitted(false);
  }, [isOpen, defaultRole]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === 'institute') {
      const finalSpec = isInstCustomActive && instCustomSpecialty.trim()
        ? instCustomSpecialty.trim()
        : instSpecialty || activeInstCategoryObj.specializations[0]?.name;

      const data = {
        name: instName || 'مؤسسة تكوين معتمدة',
        regNo: instRegNo,
        city: instCity,
        category: activeInstCategoryObj.title,
        specialty: finalSpec,
        isCustomSpecialty: isInstCustomActive,
        contactPerson: instContact,
        email: instEmail,
        phone: instPhone,
        website: instWebsite,
        hasUploadedDocuments: instRcUploaded || instPortfolioUploaded,
        trustTier: 'silver',
        date: new Date().toISOString(),
      };
      onInstituteRegistered?.(data);
      setSuccessMessage('تم تسجيل ملف مؤسسة التكوين بنجاح! سيتم فحص السجل التجاري والوثائق لتفعيل رتبة الاعتماد خلال 24 ساعة.');
    } else if (selectedRole === 'trainer') {
      const finalSpec = isTrainerCustomActive && trainerCustomSpecialty.trim()
        ? trainerCustomSpecialty.trim()
        : trainerSpecialty || activeTrainerCategoryObj.specializations[0]?.name;

      const data = {
        name: trainerName || 'المكوّن المعتمد',
        title: trainerTitle || 'خبير تكوين وتدريب',
        category: activeTrainerCategoryObj.title,
        specialty: finalSpec,
        isCustomSpecialty: isTrainerCustomActive,
        expYears: trainerExpYears,
        mode: trainerMode,
        bio: trainerBio,
        linkedin: trainerLinkedIn,
        email: trainerEmail,
        phone: trainerPhone,
        hasUploadedDocuments: trainerIdUploaded || trainerCvUploaded || trainerDegreeUploaded,
        trustTier: 'silver',
        date: new Date().toISOString(),
      };
      onTrainerRegistered?.(data);
      setSuccessMessage('تم تسجيل ملفك كمكوّن معتمد بنجاح! تم ربط تخصصك وسيتم إشعارك فور تدقيق الوثائق لمنحك شارة الثقة.');
    } else {
      const data = {
        name: learnerName || 'متدرب BeInSkills الجديد',
        headline: `باحث عن التميز في ${learnerField}`,
      };
      onLearnerRegistered?.(data);
      setSuccessMessage('تهانينا! تم تفعيل حسابك كباحث عن التكوين، وتم شحن جواز مهاراتك بـ +200 XP ترحيبية! 🚀');
    }

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[94vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:px-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#06B6D4] text-white shadow-md">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white font-['Alexandria']">
                بوابة انضمام واعتماد المكوّنين ومراكز التكوين
              </h3>
              <p className="text-xs text-slate-400">
                منظومة موثقة بالوثائق والشارات المعتمدة للربط بين خبراء التدريب والمتدربين
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selection Tabs */}
        <div className="p-3 sm:p-4 bg-slate-950/50 border-b border-slate-800">
          <div className="grid grid-cols-3 gap-2">
            
            {/* 1. المكون الفرد */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('trainer');
                setIsSubmitted(false);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'trainer'
                  ? 'bg-gradient-to-r from-[#7C3AED]/30 to-[#06B6D4]/30 border-[#06B6D4] text-white shadow-lg shadow-cyan-500/20 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#06B6D4]" />
                <span className="text-xs sm:text-sm font-bold">مكوّن / مدرب خاص</span>
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:inline">خبير تدريب، كوتش، ومستشار</span>
            </button>

            {/* 2. مؤسسات التكوين */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('institute');
                setIsSubmitted(false);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'institute'
                  ? 'bg-gradient-to-r from-[#7C3AED]/30 to-[#9333EA]/30 border-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/20 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#9333EA]" />
                <span className="text-xs sm:text-sm font-bold">مؤسسة / مركز تكوين</span>
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:inline">معاهد، أكاديميات، ومراكز معتمدة</span>
            </button>

            {/* 3. المتدرب */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('learner');
                setIsSubmitted(false);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'learner'
                  ? 'bg-gradient-to-r from-emerald-600/30 to-teal-600/30 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-bold">باحث عن التكوين</span>
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:inline">جواز المهارات واكتساب القدرات</span>
            </button>

          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {isSubmitted ? (
            <div className="py-12 px-4 text-center space-y-4 max-w-md mx-auto animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white font-['Alexandria']">
                تم استلام طلب التسجيل بنجاح!
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {successMessage}
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-bold hover:shadow-lg transition-all"
                >
                  الدخول للمنصة واستكشاف التكوينات
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* ================= FORM: TRAINER (المكون الخاص) ================= */}
              {selectedRole === 'trainer' && (
                <div className="space-y-5">
                  <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-800/50 flex items-center gap-3 text-xs text-cyan-200">
                    <BadgeCheck className="w-5 h-5 text-[#06B6D4] shrink-0" />
                    <span>
                      انضمامك كمكوّن معتمد يمنحك رتبة <strong>Silver Trainer</strong> فور التحقق من وثائقك مع إمكانية نشر الدورات واستقبال المدفوعات عبر نظام الضمان Escrow.
                    </span>
                  </div>

                  {/* Personal & Professional Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">الاسم الكامل: *</label>
                      <input
                        type="text"
                        required
                        value={trainerName}
                        onChange={(e) => setTrainerName(e.target.value)}
                        placeholder="الأستاذ / المدرب..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">الصفة واللقب المهني: *</label>
                      <input
                        type="text"
                        required
                        value={trainerTitle}
                        onChange={(e) => setTrainerTitle(e.target.value)}
                        placeholder="مثال: مدرب معتمد في TOT / خبير طاقات متجددة"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">البريد الإلكتروني: *</label>
                      <input
                        type="email"
                        required
                        value={trainerEmail}
                        onChange={(e) => setTrainerEmail(e.target.value)}
                        placeholder="trainer@domain.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">رقم الهاتف / الواتساب: *</label>
                      <input
                        type="tel"
                        required
                        value={trainerPhone}
                        onChange={(e) => setTrainerPhone(e.target.value)}
                        placeholder="+212 6..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">سنوات الخبرة التدريبية:</label>
                      <select
                        value={trainerExpYears}
                        onChange={(e) => setTrainerExpYears(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                      >
                        <option value="1-3">1 إلى 3 سنوات</option>
                        <option value="3-5">3 إلى 5 سنوات</option>
                        <option value="5-10">5 إلى 10 سنوات</option>
                        <option value="+10">أكثر من 10 سنوات (خبير أول)</option>
                      </select>
                    </div>
                  </div>

                  {/* KNOWLEDGE TAXONOMY POLES & SPECIALTIES */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#06B6D4]" />
                        <span>اختيار قطب التكوين والتخصص الدقيق</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsTrainerCustomActive(!isTrainerCustomActive)}
                        className="text-[11px] font-bold text-[#06B6D4] hover:underline cursor-pointer"
                      >
                        {isTrainerCustomActive ? 'اختر من القائمة المتاحة' : '+ لم تجد تخصصك؟ اقترح تخصصاً جديداً'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">القطاع التكويني الأكبر:</label>
                        <select
                          value={trainerCategory}
                          onChange={(e) => {
                            setTrainerCategory(e.target.value);
                            setTrainerSpecialty('');
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">
                          {isTrainerCustomActive ? 'اكتب التخصص الجديد:' : 'التخصص الفرعي المعتمد:'}
                        </label>
                        {isTrainerCustomActive ? (
                          <input
                            type="text"
                            required
                            value={trainerCustomSpecialty}
                            onChange={(e) => setTrainerCustomSpecialty(e.target.value)}
                            placeholder="اكتب التخصص الدقيق الذي تدرّبه..."
                            className="w-full bg-slate-900 border border-[#06B6D4] rounded-xl px-3 py-2 text-slate-100 outline-none"
                          />
                        ) : (
                          <select
                            value={trainerSpecialty}
                            onChange={(e) => setTrainerSpecialty(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                          >
                            {activeTrainerCategoryObj.specializations.map((s) => (
                              <option key={s.id} value={s.name}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mode & LinkedIn */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">صيغة التكوين المتاحة لديك:</label>
                      <select
                        value={trainerMode}
                        onChange={(e) => setTrainerMode(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                      >
                        <option value="both">حضوري وعن بُعد (Live / In-Person)</option>
                        <option value="remote">عن بُعد فقط (تفاعلي عبر الويب)</option>
                        <option value="in-person">حضوري بالقاعات فقط</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">رابط LinkedIn أو معرض الأعمال:</label>
                      <input
                        type="url"
                        value={trainerLinkedIn}
                        onChange={(e) => setTrainerLinkedIn(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="text-xs">
                    <label className="block text-slate-300 font-bold mb-1">نبذة عن مسارك وإنجازاتك التدريبية:</label>
                    <textarea
                      rows={2}
                      value={trainerBio}
                      onChange={(e) => setTrainerBio(e.target.value)}
                      placeholder="شاركنا أبرز الدورات التي قدمتها والجهات التي دربت فيها..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4] resize-none"
                    />
                  </div>

                  {/* DOCUMENTS UPLOAD FOR TRAINER */}
                  <div className="space-y-2 text-xs">
                    <span className="block font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>الوثائق المطلوبة للتحقق والاعتماد (KYC Verification):</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Doc 1: ID Card */}
                      <div 
                        onClick={() => setTrainerIdUploaded(!trainerIdUploaded)}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          trainerIdUploaded 
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Upload className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                        <div className="font-bold text-[11px]">بطاقة التعريف / جواز السفر</div>
                        <div className="text-[9px] mt-0.5">{trainerIdUploaded ? '✓ تم الرفع' : 'اضغط للرفع (PDF/JPG)'}</div>
                      </div>

                      {/* Doc 2: CV */}
                      <div 
                        onClick={() => setTrainerCvUploaded(!trainerCvUploaded)}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          trainerCvUploaded 
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <FileText className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                        <div className="font-bold text-[11px]">السيرة الذاتية (CV)</div>
                        <div className="text-[9px] mt-0.5">{trainerCvUploaded ? '✓ تم الرفع' : 'اضغط للرفع (PDF)'}</div>
                      </div>

                      {/* Doc 3: Certifications */}
                      <div 
                        onClick={() => setTrainerDegreeUploaded(!trainerDegreeUploaded)}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          trainerDegreeUploaded 
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Award className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                        <div className="font-bold text-[11px]">شهادات الدبلوم أو TOT</div>
                        <div className="text-[9px] mt-0.5">{trainerDegreeUploaded ? '✓ تم الرفع' : 'اضغط للرفع'}</div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ================= FORM: INSTITUTE (مؤسسة / مركز التكوين) ================= */}
              {selectedRole === 'institute' && (
                <div className="space-y-5">
                  <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-800/50 flex items-center gap-3 text-xs text-purple-200">
                    <Building2 className="w-5 h-5 text-[#9333EA] shrink-0" />
                    <span>
                      اعتماد المؤسسة يتيح لك إنشاء ملف شريك رسمي، نشر تكوينات متعددة تحت اسم المركز، وإصدار شهادات معتمدة بشعار مؤسستك.
                    </span>
                  </div>

                  {/* Institute Basic Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">اسم المؤسسة أو المركز التدريبي: *</label>
                      <input
                        type="text"
                        required
                        value={instName}
                        onChange={(e) => setInstName(e.target.value)}
                        placeholder="أكاديمية / معهد..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#7C3AED]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">رقم السجل التجاري أو ترخيص الوزارة (RC / Agrément): *</label>
                      <input
                        type="text"
                        required
                        value={instRegNo}
                        onChange={(e) => setInstRegNo(e.target.value)}
                        placeholder="RC 123456 / رخصة رقم..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>

                  {/* City & Representative */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">المدينة ومقر المركز:</label>
                      <input
                        type="text"
                        required
                        value={instCity}
                        onChange={(e) => setInstCity(e.target.value)}
                        placeholder="مثال: الدار البيضاء، الرباط، طنجة، فاس..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#7C3AED]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">اسم الممثل القانوني أو المسؤول: *</label>
                      <input
                        type="text"
                        required
                        value={instContact}
                        onChange={(e) => setInstContact(e.target.value)}
                        placeholder="المدير العام / مدير التكوين"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">البريد الإلكتروني الرسمي: *</label>
                      <input
                        type="email"
                        required
                        value={instEmail}
                        onChange={(e) => setInstEmail(e.target.value)}
                        placeholder="contact@institute.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#7C3AED]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">رقم الهاتف المؤسسي: *</label>
                      <input
                        type="tel"
                        required
                        value={instPhone}
                        onChange={(e) => setInstPhone(e.target.value)}
                        placeholder="+212 5..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#7C3AED]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">الموقع الإلكتروني الرسمي:</label>
                      <input
                        type="url"
                        value={instWebsite}
                        onChange={(e) => setInstWebsite(e.target.value)}
                        placeholder="https://institute.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#7C3AED]"
                      />
                    </div>
                  </div>

                  {/* KNOWLEDGE TAXONOMY POLES FOR INSTITUTES */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#7C3AED]" />
                        <span>قطب التكوين المعتمد في المركز</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsInstCustomActive(!isInstCustomActive)}
                        className="text-[11px] font-bold text-[#7C3AED] hover:underline cursor-pointer"
                      >
                        {isInstCustomActive ? 'اختر من القائمة' : '+ أضف تخصصاً أو قطباً جديداً'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">القطاع التدريبي الرئيسي:</label>
                        <select
                          value={instCategory}
                          onChange={(e) => {
                            setInstCategory(e.target.value);
                            setInstSpecialty('');
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#7C3AED]"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">
                          {isInstCustomActive ? 'اكتب المجال أو التخصص الجديد:' : 'التخصص الدقيق:'}
                        </label>
                        {isInstCustomActive ? (
                          <input
                            type="text"
                            required
                            value={instCustomSpecialty}
                            onChange={(e) => setInstCustomSpecialty(e.target.value)}
                            placeholder="اكتب التخصص أو الشعبة التدريبية..."
                            className="w-full bg-slate-900 border border-[#7C3AED] rounded-xl px-3 py-2 text-slate-100 outline-none"
                          />
                        ) : (
                          <select
                            value={instSpecialty}
                            onChange={(e) => setInstSpecialty(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#7C3AED]"
                          >
                            {activeInstCategoryObj.specializations.map((s) => (
                              <option key={s.id} value={s.name}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* DOCUMENTS UPLOAD FOR INSTITUTE */}
                  <div className="space-y-2 text-xs">
                    <span className="block font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>الوثائق القانونية والمؤسساتية (Company Verification):</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Doc 1: RC / Agrément */}
                      <div 
                        onClick={() => setInstRcUploaded(!instRcUploaded)}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          instRcUploaded 
                            ? 'bg-purple-950/60 border-[#7C3AED] text-purple-300' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <FileText className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                        <div className="font-bold text-[11px]">مستخرج السجل التجاري أو رخصة الوزارة (RC)</div>
                        <div className="text-[9px] mt-0.5">{instRcUploaded ? '✓ تم الرفع بنجاح' : 'اضغط لرفع المستند (PDF)'}</div>
                      </div>

                      {/* Doc 2: Portfolio */}
                      <div 
                        onClick={() => setInstPortfolioUploaded(!instPortfolioUploaded)}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          instPortfolioUploaded 
                            ? 'bg-purple-950/60 border-[#7C3AED] text-purple-300' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Globe className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                        <div className="font-bold text-[11px]">الملف التعريفي وسوابق الأعمال (Portfolio)</div>
                        <div className="text-[9px] mt-0.5">{instPortfolioUploaded ? '✓ تم الرفع بنجاح' : 'اضغط لرفع الملف (PDF)'}</div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ================= FORM: LEARNER (المتدرب) ================= */}
              {selectedRole === 'learner' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">الاسم الكامل: *</label>
                    <input
                      type="text"
                      required
                      value={learnerName}
                      onChange={(e) => setLearnerName(e.target.value)}
                      placeholder="اسمك الكامل..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">البريد الإلكتروني: *</label>
                      <input
                        type="email"
                        required
                        value={learnerEmail}
                        onChange={(e) => setLearnerEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">رقم الهاتف:</label>
                      <input
                        type="tel"
                        value={learnerPhone}
                        onChange={(e) => setLearnerPhone(e.target.value)}
                        placeholder="+212 6..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">المجال الأساسي الذي تريد تعلمه:</label>
                      <select
                        value={learnerField}
                        onChange={(e) => setLearnerField(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">صيغة التعلم المفضلة لديك:</label>
                      <select
                        value={learnerMode}
                        onChange={(e) => setLearnerMode(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-emerald-500"
                      >
                        <option value="any">لا فرق (حضوري أو عن بعد)</option>
                        <option value="remote">عن بعد تفاعلي (Online Live)</option>
                        <option value="in-person">حضوري في مدينتي</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 text-xs font-bold"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className={`px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg transition-all cursor-pointer ${
                    selectedRole === 'trainer'
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:shadow-cyan-500/25'
                      : selectedRole === 'institute'
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:shadow-[#7C3AED]/25'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-500/25'
                  }`}
                >
                  {selectedRole === 'trainer'
                    ? 'إرسال طلب اعتماد المكوّن'
                    : selectedRole === 'institute'
                    ? 'إرسال ملف المؤسسة للاعتماد'
                    : 'تفعيل حساب المتدرب وجواز المهارات'}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
