import React, { useState } from 'react';
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
  FileCheck
} from 'lucide-react';
import { UserProfile } from '../types';

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
  defaultRole = 'learner',
  onLearnerRegistered,
  onInstituteRegistered,
  onTrainerRegistered,
}) => {
  const [selectedRole, setSelectedRole] = useState<RegistrationRole>(defaultRole);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Institute Form State
  const [instName, setInstName] = useState('');
  const [instRegNo, setInstRegNo] = useState('');
  const [instCity, setInstCity] = useState('');
  const [instDomain, setInstDomain] = useState('الذكاء الاصطناعي والبرمجيات');
  const [instContact, setInstContact] = useState('');
  const [instEmail, setInstEmail] = useState('');
  const [instPhone, setInstPhone] = useState('');

  // Trainer Form State
  const [trainerName, setTrainerName] = useState('');
  const [trainerSpecialty, setTrainerSpecialty] = useState('');
  const [trainerExpYears, setTrainerExpYears] = useState('5');
  const [trainerMode, setTrainerMode] = useState<'remote' | 'in-person' | 'both'>('both');
  const [trainerBio, setTrainerBio] = useState('');
  const [trainerLinkedIn, setTrainerLinkedIn] = useState('');
  const [trainerEmail, setTrainerEmail] = useState('');

  // Learner Form State
  const [learnerName, setLearnerName] = useState('');
  const [learnerGoal, setLearnerGoal] = useState('الحصول على وظيفة مرموقة');
  const [learnerField, setLearnerField] = useState('الذكاء الاصطناعي والتكنولوجيا');
  const [learnerMode, setLearnerMode] = useState<'remote' | 'in-person' | 'any'>('any');
  const [learnerEmail, setLearnerEmail] = useState('');
  const [learnerPhone, setLearnerPhone] = useState('');

  // Reset when open or role changes
  React.useEffect(() => {
    setSelectedRole(defaultRole);
    setIsSubmitted(false);
  }, [isOpen, defaultRole]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === 'institute') {
      const data = {
        name: instName || 'معهد التميز التكنولوجي',
        regNo: instRegNo,
        city: instCity,
        domain: instDomain,
        contactPerson: instContact,
        email: instEmail,
        phone: instPhone,
        date: new Date().toISOString(),
      };
      onInstituteRegistered?.(data);
      setSuccessMessage('تم تسجيل طلب اعتماد مؤسسة التكوين بنجاح! سيتواصل فريق الشراكات معك خلال 24 ساعة.');
    } else if (selectedRole === 'trainer') {
      const data = {
        name: trainerName || 'المكوّن الخبير',
        specialty: trainerSpecialty,
        expYears: trainerExpYears,
        mode: trainerMode,
        bio: trainerBio,
        linkedin: trainerLinkedIn,
        email: trainerEmail,
        date: new Date().toISOString(),
      };
      onTrainerRegistered?.(data);
      setSuccessMessage('تم تسجيل ملفك كمكوّن خاص بنجاح! سيتم مراجعة الاعتماد وتفعيل نشر دوراتك على المنصة.');
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
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:px-6 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] text-white shadow-md">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-['Alexandria']">
                بوابة التسجيل والانضمام لمنظومة BeInSkills
              </h3>
              <p className="text-xs text-slate-400">
                اختر فئتك للانضمام إلى أكبر سوق تكوينات وتنمية قدرات في المنطقة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Role Selection Buttons (Required explicitly by user prompt) */}
        <div className="p-3 sm:p-4 bg-slate-950/50 border-b border-slate-800">
          <div className="grid grid-cols-3 gap-2">
            
            {/* 1. مؤسسات التكوين */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('institute');
                setIsSubmitted(false);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'institute'
                  ? 'bg-gradient-to-r from-[#7C3AED]/30 to-[#9333EA]/30 border-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/20 font-bold'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Building2 className={`w-5 h-5 ${selectedRole === 'institute' ? 'text-purple-400' : 'text-slate-400'}`} />
              <span className="text-xs sm:text-sm font-bold">مؤسسة تكوين</span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">مراكز ومعاهد التدريب</span>
            </button>

            {/* 2. المكونون الخواص */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('trainer');
                setIsSubmitted(false);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'trainer'
                  ? 'bg-gradient-to-r from-[#06B6D4]/30 to-cyan-700/30 border-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/20 font-bold'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <GraduationCap className={`w-5 h-5 ${selectedRole === 'trainer' ? 'text-[#06B6D4]' : 'text-slate-400'}`} />
              <span className="text-xs sm:text-sm font-bold">مكوّن خاص</span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">خبراء ومدربون مستقلون</span>
            </button>

            {/* 3. باحث عن التكوين */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('learner');
                setIsSubmitted(false);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'learner'
                  ? 'bg-gradient-to-r from-emerald-600/30 to-teal-700/30 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Award className={`w-5 h-5 ${selectedRole === 'learner' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-xs sm:text-sm font-bold">باحث عن تكوين</span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">متدربون ومهنيون</span>
            </button>

          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-lg font-black text-white font-['Alexandria']">
                تم استلام طلب التسجيل بنجاح!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {successMessage}
              </p>
              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs sm:text-sm font-bold shadow-lg"
                >
                  العودة للمنصة
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Form 1: مؤسسات التكوين */}
              {selectedRole === 'institute' && (
                <div className="space-y-3.5 animate-in fade-in">
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>
                      انضم كشريك تكويني معتمد، وانشر دوراتك وبرامجك الحضورية وعن بعد لآلاف الباحثين عن تطوير المهارات.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">اسم المؤسسة أو المركز التدريبي:</label>
                      <input
                        type="text"
                        required
                        value={instName}
                        onChange={(e) => setInstName(e.target.value)}
                        placeholder="مثال: أكاديمية المستقبل للتقنيات"
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#7C3AED] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">رقم السجل التجاري أو الاعتماد:</label>
                      <input
                        type="text"
                        required
                        value={instRegNo}
                        onChange={(e) => setInstRegNo(e.target.value)}
                        placeholder="مثال: RC-78492 / اعتمـاد رقم 14-2024"
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#7C3AED] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">المدينة والمقر الرئيسي:</label>
                      <input
                        type="text"
                        required
                        value={instCity}
                        onChange={(e) => setInstCity(e.target.value)}
                        placeholder="مثال: الدار البيضاء - تكنوبارك"
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#7C3AED] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">الميدان التكويني الأبرز:</label>
                      <select
                        value={instDomain}
                        onChange={(e) => setInstDomain(e.target.value)}
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#7C3AED] outline-none"
                      >
                        <option>الذكاء الاصطناعي وهندسة البرمجيات</option>
                        <option>الأمن السيبراني والبنى السحابية</option>
                        <option>إدارة الأعمال والقيادة التنفيذية</option>
                        <option>التصميم الرقمي والميديا</option>
                        <option>اللغات الحية والتواصل المهني</option>
                        <option>تكوينات متعددة المجالات</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">المسؤول عن التواصل:</label>
                      <input
                        type="text"
                        required
                        value={instContact}
                        onChange={(e) => setInstContact(e.target.value)}
                        placeholder="الاسم والصفة"
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#7C3AED] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">البريد المؤسسي:</label>
                      <input
                        type="email"
                        required
                        value={instEmail}
                        onChange={(e) => setInstEmail(e.target.value)}
                        placeholder="contact@institute.ma"
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#7C3AED] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">الهاتف المباشر:</label>
                      <input
                        type="text"
                        required
                        value={instPhone}
                        onChange={(e) => setInstPhone(e.target.value)}
                        placeholder="+212 5..."
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#7C3AED] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form 2: المكونون الخواص */}
              {selectedRole === 'trainer' && (
                <div className="space-y-3.5 animate-in fade-in">
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#06B6D4] shrink-0" />
                    <span>
                      إذا كنت خبيراً ممارساً أو مدرباً معتمداً، سوق BeInSkills يتيح لك تحقيق دخل مجزٍ وإصدار شارات رقمية رسمية لطلابك.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">اسم المكوّن الكامل واللقب المهني:</label>
                      <input
                        type="text"
                        required
                        value={trainerName}
                        onChange={(e) => setTrainerName(e.target.value)}
                        placeholder="مثال: د. سمير العمراني - مستشار أول"
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#06B6D4] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">التخصص التكويني الدقيق:</label>
                      <input
                        type="text"
                        required
                        value={trainerSpecialty}
                        onChange={(e) => setTrainerSpecialty(e.target.value)}
                        placeholder="مثال: هندسة البيانات الضخمة وبايثون"
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#06B6D4] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">سنوات الخبرة العملية:</label>
                      <select
                        value={trainerExpYears}
                        onChange={(e) => setTrainerExpYears(e.target.value)}
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#06B6D4] outline-none"
                      >
                        <option value="2">سنتان إلى 4 سنوات</option>
                        <option value="5">5 إلى 8 سنوات (خبير)</option>
                        <option value="10">أكثر من 10 سنوات (كبير استشاريين)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">صيغة تقديم التكوينات المفضلة:</label>
                      <select
                        value={trainerMode}
                        onChange={(e: any) => setTrainerMode(e.target.value)}
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#06B6D4] outline-none"
                      >
                        <option value="both">كلاهما (حضوري وعن بعد)</option>
                        <option value="remote">عن بعد فقط (Online)</option>
                        <option value="in-person">حضوري فقط</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">رابط LinkedIn أو معرض الأعمال:</label>
                      <input
                        type="url"
                        value={trainerLinkedIn}
                        onChange={(e) => setTrainerLinkedIn(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#06B6D4] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">البريد الإلكتروني المباشر:</label>
                      <input
                        type="email"
                        required
                        value={trainerEmail}
                        onChange={(e) => setTrainerEmail(e.target.value)}
                        placeholder="trainer@domain.com"
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-[#06B6D4] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1 font-bold">نبذة مختصرة وفكرة الورشات التي ترغب بتقديمها:</label>
                    <textarea
                      rows={2}
                      value={trainerBio}
                      onChange={(e) => setTrainerBio(e.target.value)}
                      placeholder="صف محتوى الورشات وقيمتها المضافة للمتدربين..."
                      className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-700 focus:border-[#06B6D4] outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Form 3: باحث عن التكوين */}
              {selectedRole === 'learner' && (
                <div className="space-y-3.5 animate-in fade-in">
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      سجل الآن كباحث عن التكوين لتحصل على <strong>جواز مهارات رقمي مفعل مجاناً</strong> ورصيد +200 XP ترحيبي، واستشارات ذكية فورية!
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">الاسم الكامل:</label>
                      <input
                        type="text"
                        required
                        value={learnerName}
                        onChange={(e) => setLearnerName(e.target.value)}
                        placeholder="مثال: ياسمين بن علي"
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">الميدان أو المهارة المستهدفة:</label>
                      <select
                        value={learnerField}
                        onChange={(e) => setLearnerField(e.target.value)}
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-emerald-500 outline-none"
                      >
                        <option>الذكاء الاصطناعي والبرمجة</option>
                        <option>التصميم الرقمي والـ UX/UI</option>
                        <option>الأمن السيبراني والسحابة</option>
                        <option>إدارة الأعمال وريادة المشاريع</option>
                        <option>التنمية الذاتية والقيادة</option>
                        <option>تحليل البيانات والإحصاء</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">هدفك التكويني الأساسي:</label>
                      <select
                        value={learnerGoal}
                        onChange={(e) => setLearnerGoal(e.target.value)}
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-emerald-500 outline-none"
                      >
                        <option>الحصول على وظيفة مرموقة</option>
                        <option>ترقية وظيفية وزيادة في الراتب</option>
                        <option>تغيير المسار المهني (Career Switch)</option>
                        <option>العمل الحر وخدمات الفريلانس الدولية</option>
                        <option>إطلاق مشروع تجاري أو تقني خاص</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">صيغة التكوين المفضلة لديك:</label>
                      <select
                        value={learnerMode}
                        onChange={(e: any) => setLearnerMode(e.target.value)}
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-emerald-500 outline-none"
                      >
                        <option value="any">لا مانع لدي (عن بعد أو حضوري)</option>
                        <option value="remote">عن بعد فقط (مرونة المواعيد)</option>
                        <option value="in-person">حضوري فقط (تفاعل مباشر)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">البريد الإلكتروني لتفعيل الجواز:</label>
                      <input
                        type="email"
                        required
                        value={learnerEmail}
                        onChange={(e) => setLearnerEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">رقم الهاتف / واتساب لتأكيد الحجوزات:</label>
                      <input
                        type="text"
                        required
                        value={learnerPhone}
                        onChange={(e) => setLearnerPhone(e.target.value)}
                        placeholder="+212 6..."
                        className="w-full bg-slate-950 text-xs text-white px-3 py-2.5 rounded-xl border border-slate-700 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] text-white font-black text-sm shadow-xl shadow-[#7C3AED]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {selectedRole === 'institute' && 'تقديم طلب تسجيل المؤسسة واعتمادها'}
                    {selectedRole === 'trainer' && 'تقديم ملف الانضمام كمكوّن معتمد'}
                    {selectedRole === 'learner' && 'تأكيد التسجيل وتفعيل جواز المهارات (+200 XP)'}
                  </span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
