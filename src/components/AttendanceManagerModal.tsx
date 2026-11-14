import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Sparkles, 
  Users, 
  Laptop, 
  ShieldCheck, 
  RefreshCw,
  Search,
  KeyRound,
  FileCheck,
  Check,
  Award
} from 'lucide-react';
import { Language } from '../translations';
import { Course, CourseSession, LearnerAttendanceRecord } from '../types';

interface AttendanceManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  currentLang?: Language;
  onIssueBadgeToLearner?: (learnerId: string, learnerName: string) => void;
}

export const AttendanceManagerModal: React.FC<AttendanceManagerModalProps> = ({
  isOpen,
  onClose,
  course,
  currentLang = 'ar',
  onIssueBadgeToLearner,
}) => {
  const [lang, setLang] = useState<Language>(currentLang);
  const [activeTab, setActiveTab] = useState<'sessions' | 'roster'>('sessions');
  const [activeQrSessionId, setActiveQrSessionId] = useState<string | null>(null);
  const [pinCode, setPinCode] = useState('8492');
  const [searchLearner, setSearchLearner] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock sessions list for the course
  const [sessions, setSessions] = useState<CourseSession[]>([
    {
      id: 'sess-1',
      courseId: course.id,
      sessionNumber: 1,
      title: 'الجلسة 1: التدشين والمفاهيم التأسيسية للمهارة',
      date: '2026-11-01',
      time: '18:00 - 20:30',
      durationMinutes: 150,
      mode: course.mode,
      locationOrLink: course.mode === 'in-person' ? 'القاعة الكبرى A1 - مركز الأعمال والتكوين' : 'https://meet.beinskills.ma/room-ai-mastery',
      qrSecurityToken: 'BIS-QR-SEC-9481',
      sessionPin: '8492',
      completed: true,
    },
    {
      id: 'sess-2',
      courseId: course.id,
      sessionNumber: 2,
      title: 'الجلسة 2: التطبيقات العملية الأولى وورشات العمل',
      date: '2026-11-04',
      time: '18:00 - 20:30',
      durationMinutes: 150,
      mode: course.mode,
      locationOrLink: course.mode === 'in-person' ? 'المختبر التطبيقي B3 - مجمع الابتكار' : 'https://meet.beinskills.ma/room-ai-mastery',
      qrSecurityToken: 'BIS-QR-SEC-9482',
      sessionPin: '6105',
      completed: true,
    },
    {
      id: 'sess-3',
      courseId: course.id,
      sessionNumber: 3,
      title: 'الجلسة 3: المشاريع المعمقة والمحاكاة الاحترافية',
      date: '2026-11-08',
      time: '18:00 - 21:00',
      durationMinutes: 180,
      mode: course.mode,
      locationOrLink: course.mode === 'in-person' ? 'المختبر التطبيقي B3' : 'https://meet.beinskills.ma/room-ai-mastery',
      qrSecurityToken: 'BIS-QR-SEC-9483',
      sessionPin: '7394',
      completed: true,
    },
    {
      id: 'sess-4',
      courseId: course.id,
      sessionNumber: 4,
      title: 'الجلسة 4: دراسات الحالة ونمذجة الحلول الواقعية',
      date: '2026-11-11',
      time: '18:00 - 20:30',
      durationMinutes: 150,
      mode: course.mode,
      locationOrLink: course.mode === 'in-person' ? 'القاعة الكبرى A1' : 'https://meet.beinskills.ma/room-ai-mastery',
      qrSecurityToken: 'BIS-QR-SEC-9484',
      sessionPin: '5218',
      completed: true,
    },
    {
      id: 'sess-5',
      courseId: course.id,
      sessionNumber: 5,
      title: 'الجلسة 5: ورشة المشروع الختامي الفردي والجماعي (Capstone)',
      date: '2026-11-15',
      time: '18:00 - 21:30',
      durationMinutes: 210,
      mode: course.mode,
      locationOrLink: course.mode === 'in-person' ? 'المختبر B3' : 'https://meet.beinskills.ma/room-ai-mastery',
      qrSecurityToken: 'BIS-QR-SEC-9485',
      sessionPin: '9341',
      completed: false, // Active current session
    },
  ]);

  // Mock enrolled learners with calculated attendance
  const [learners, setLearners] = useState<LearnerAttendanceRecord[]>([
    {
      learnerId: 'lrn-1',
      learnerName: 'أحمد التازي',
      learnerEmail: 'a****.tazi@gmail.com',
      attendedSessionsCount: 4,
      totalSessionsCount: 5,
      attendanceRate: 85, // >= 80% (Eligible)
      watchtimeMinutes: 620,
      verifiedByQr: true,
      badgeEligible: true,
      badgeIssued: false,
    },
    {
      learnerId: 'lrn-2',
      learnerName: 'سناء بناني',
      learnerEmail: 's****.b@yahoo.fr',
      attendedSessionsCount: 5,
      totalSessionsCount: 5,
      attendanceRate: 100, // >= 80% (Eligible)
      watchtimeMinutes: 690,
      verifiedByQr: true,
      badgeEligible: true,
      badgeIssued: true,
    },
    {
      learnerId: 'lrn-3',
      learnerName: 'عمر القاسمي',
      learnerEmail: 'o****.q@outlook.com',
      attendedSessionsCount: 4,
      totalSessionsCount: 5,
      attendanceRate: 82, // >= 80% (Eligible)
      watchtimeMinutes: 580,
      verifiedByQr: true,
      badgeEligible: true,
      badgeIssued: false,
    },
    {
      learnerId: 'lrn-4',
      learnerName: 'طارق الحسني',
      learnerEmail: 't****.h@gmail.com',
      attendedSessionsCount: 2,
      totalSessionsCount: 5,
      attendanceRate: 48, // < 80% (Blocked by Anti-Fraud Safety Lock)
      watchtimeMinutes: 280,
      verifiedByQr: false,
      badgeEligible: false,
      badgeIssued: false,
    },
    {
      learnerId: 'lrn-5',
      learnerName: 'لبنى الشريف',
      learnerEmail: 'l****.c@gmail.com',
      attendedSessionsCount: 3,
      totalSessionsCount: 5,
      attendanceRate: 68, // < 80% (Blocked)
      watchtimeMinutes: 410,
      verifiedByQr: true,
      badgeEligible: false,
      badgeIssued: false,
    },
  ]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRefreshPin = () => {
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    setPinCode(newPin);
    showToast(`تم تجديد رمز PIN الحضور الآمن: ${newPin}`);
  };

  const handleIssueBadge = (learner: LearnerAttendanceRecord) => {
    if (learner.attendanceRate < 80) {
      showToast('⚠️ تحذير أمان: لا يمكن منح الشارة لمتدرب نسبة حضوره أقل من 80% وفق العقد الإلكتروني!');
      return;
    }

    setLearners((prev) =>
      prev.map((l) => (l.learnerId === learner.learnerId ? { ...l, badgeIssued: true } : l))
    );
    onIssueBadgeToLearner?.(learner.learnerId, learner.learnerName);
    showToast(`🎓 تم إصدار واعتماد شارة التخرج للمتدرب "${learner.learnerName}" بنجاح!`);
  };

  const filteredLearners = learners.filter(
    (l) => l.learnerName.includes(searchLearner) || l.learnerEmail.includes(searchLearner)
  );

  const t = {
    ar: {
      title: 'نظام إدارة الحضور الذكي وجلسات التكوين (Attendance Engine)',
      subtitle: 'رصد دقيق للحضور الحضوري وعن بُعد، وتطبيق عتبة الـ 80% الإلزامية لحصانة الشارات الرقمية.',
      tabSessions: 'جلسات وحصص التكوين',
      tabRoster: 'سجل المتدربين ونسب الحضور',
      attendanceRuleBadge: 'عتبة 80% إلزامية لنيل الشارة',
      liveQrButton: 'فتح شاشة الحضور بالـ QR والـ PIN للقاعة',
      liveStreamButton: 'رصد الحضور التلقائي عن بُعد (Watchtime)',
      sessionPinLabel: 'رمز PIN السري للجلسة:',
      qrInstruction: 'وجه الكاميرا أو امسح الرمز لتأكيد الحضور الفوري بالقاعة',
      geoVerified: 'التحقق المكاني للقاعة نشط (Geofenced)',
      watchtimeTracker: 'رصد مدة الاتصال المتزامن التلقائي',
      eligibleBadge: 'مؤهل للشارة الرسمية (>= 80%)',
      ineligibleBadge: 'غير مؤهل: دون عتبة 80%',
      issueBadgeBtn: 'منح الشارة الرسمية',
      issuedBadge: 'تم التوثيق بالجواز ✓',
      lockedBadge: 'محظور أوتوماتيكياً (حضور < 80%)',
      closeBtn: 'إغلاق',
      searchPlaceholder: 'ابحث عن اسم المتدرب أو بريده...',
    },
    en: {
      title: 'Smart Attendance Tracking & Session Engine',
      subtitle: 'Audited attendance logs for in-person and online courses, enforcing the mandatory 80% badge threshold.',
      tabSessions: 'Course Sessions & Venues',
      tabRoster: 'Learners Roster & Attendance Rates',
      attendanceRuleBadge: 'Mandatory 80% Minimum Attendance',
      liveQrButton: 'Open Classroom QR & PIN Attendance Screen',
      liveStreamButton: 'Virtual Session Watchtime Tracker',
      sessionPinLabel: 'Session Security PIN:',
      qrInstruction: 'Scan this rotating QR code or enter PIN to confirm classroom presence',
      geoVerified: 'Geofenced Venue Verification Active',
      watchtimeTracker: 'Automated Live Stream Connection Time',
      eligibleBadge: 'Badge Eligible (>= 80%)',
      ineligibleBadge: 'Ineligible (< 80%)',
      issueBadgeBtn: 'Issue Official Badge',
      issuedBadge: 'Badge Issued ✓',
      lockedBadge: 'Locked: Attendance < 80%',
      closeBtn: 'Close',
      searchPlaceholder: 'Search learner name or email...',
    },
    fr: {
      title: 'Système Intelligent d’Émargement et de Présence',
      subtitle: 'Contrôle certifié des séances présentielles et à distance, avec application stricte du seuil d’assiduité de 80%.',
      tabSessions: 'Séances et Calendrier',
      tabRoster: 'Registre des Apprenants et Assiduité',
      attendanceRuleBadge: 'Seuil d’assiduité 80% obligatoire',
      liveQrButton: 'Ouvrir l’émargement QR Code & PIN de salle',
      liveStreamButton: 'Suivi du temps de connexion en ligne',
      sessionPinLabel: 'Code PIN sécurisé de la séance :',
      qrInstruction: 'Scannez le QR Code dynamique ou saisissez le PIN pour valider votre présence',
      geoVerified: 'Géolocalisation certifiée de la salle active',
      watchtimeTracker: 'Durée de connexion synchrone vérifiée',
      eligibleBadge: 'Éligible au Badge (>= 80%)',
      ineligibleBadge: 'Non éligible (< 80%)',
      issueBadgeBtn: 'Délivrer le Badge Officiel',
      issuedBadge: 'Badge Délivré ✓',
      lockedBadge: 'Bloqué : Assiduité < 80%',
      closeBtn: 'Fermer',
      searchPlaceholder: 'Rechercher un apprenant...',
    },
    es: {
      title: 'Gestor Inteligente de Asistencia y Sesiones',
      subtitle: 'Seguimiento fehaciente presencial y remoto, garantizando el umbral obligatorio del 80% de asistencia.',
      tabSessions: 'Sesiones y Calendario',
      tabRoster: 'Registro de Asistencia y Alumnos',
      attendanceRuleBadge: 'Umbral de 80% de Asistencia Obligatoria',
      liveQrButton: 'Pantalla de Asistencia QR y PIN en Aula',
      liveStreamButton: 'Control de tiempo de conexión remota',
      sessionPinLabel: 'PIN de seguridad de la sesión:',
      qrInstruction: 'Escanee el código QR dinámico o introduzca el PIN para confirmar asistencia',
      geoVerified: 'Verificación de ubicación en aula activa',
      watchtimeTracker: 'Tiempo de conexión en directo verificado',
      eligibleBadge: 'Apto para Insignia (>= 80%)',
      ineligibleBadge: 'No Apto (< 80%)',
      issueBadgeBtn: 'Emitir Insignia Oficial',
      issuedBadge: 'Insignia Otorgada ✓',
      lockedBadge: 'Bloqueado: Asistencia < 80%',
      closeBtn: 'Cerrar',
      searchPlaceholder: 'Buscar alumno o correo...',
    },
  }[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in font-['Alexandria']">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-950 to-cyan-950 border border-cyan-500/60 text-white font-bold text-xs shadow-2xl animate-in fade-in flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Language Toggles */}
        <div className="flex items-center gap-1.5 pb-2">
          {[
            { code: 'ar', label: 'العربية', flag: '🇲🇦' },
            { code: 'en', label: 'English', flag: '🇬🇧' },
            { code: 'fr', label: 'Français', flag: '🇫🇷' },
            { code: 'es', label: 'Español', flag: '🇪🇸' },
          ].map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code as Language)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                lang === l.code
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Header */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED]/20 text-purple-300 border border-purple-500/30">
              <QrCode className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{t.attendanceRuleBadge}</span>
            </div>

            <span className="text-xs text-cyan-300 font-bold bg-cyan-950/60 px-3 py-1 rounded-xl border border-cyan-800">
              {course.mode === 'in-person' ? '🏛️ تكوين حضوري بالقاعة' : '💻 تكوين عن بُعد تفاعلي'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">{t.title}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sessions'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.tabSessions} ({sessions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('roster')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'roster'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.tabRoster} ({learners.length})</span>
          </button>
        </div>

        {/* ================= TAB 1: SESSIONS & LIVE QR ================= */}
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            
            {/* Dynamic QR Classroom Projector View if selected */}
            {activeQrSessionId && (
              <div className="p-6 rounded-3xl bg-slate-950 border-2 border-cyan-500/50 shadow-2xl space-y-4 animate-in zoom-in-95">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                    <QrCode className="w-5 h-5" />
                    <span>شاشة العرض المباشر لتسجيل الحضور بالقاعة (Live Classroom Screen)</span>
                  </div>
                  <button
                    onClick={() => setActiveQrSessionId(null)}
                    className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1 rounded-lg"
                  >
                    إغلاق شاشة العرض ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
                  {/* Rotating QR Box */}
                  <div className="p-6 rounded-2xl bg-white text-slate-950 text-center space-y-2 shadow-inner mx-auto max-w-xs">
                    <div className="w-48 h-48 mx-auto bg-slate-100 rounded-xl flex items-center justify-center border-4 border-slate-900 p-2">
                      {/* Stylized QR Mock */}
                      <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-slate-950 rounded-lg">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-sm ${
                              (i % 2 === 0 || i % 7 === 0) ? 'bg-white' : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-600 font-bold font-mono">
                      TOKEN: {sessions.find(s => s.id === activeQrSessionId)?.qrSecurityToken}
                    </div>
                  </div>

                  {/* Room Verification Details */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-xs text-slate-400 block">{t.sessionPinLabel}</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-3xl font-black text-amber-300 font-mono tracking-widest">
                          {pinCode}
                        </span>
                        <button
                          type="button"
                          onClick={handleRefreshPin}
                          className="flex items-center gap-1 text-[11px] text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800 hover:bg-cyan-900"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>تجديد الرمز</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>{t.geoVerified}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t.qrInstruction}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sessions List */}
            <div className="space-y-3">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-[#7C3AED]/20 text-purple-300 border border-purple-700/50">
                        حصة #{sess.sessionNumber}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{sess.title}</h4>
                      {sess.completed && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>مكتملة وموثقة</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#06B6D4]" />
                        <span>{sess.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{sess.time} ({sess.durationMinutes} دقيقة)</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-300">
                        {sess.mode === 'in-person' ? <MapPin className="w-3 h-3 text-purple-400" /> : <Video className="w-3 h-3 text-cyan-400" />}
                        <span>{sess.locationOrLink}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {sess.mode === 'in-person' ? (
                      <button
                        onClick={() => setActiveQrSessionId(sess.id)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-800 hover:to-indigo-800 text-purple-200 text-xs font-bold border border-purple-600/50 cursor-pointer shadow-md"
                      >
                        <QrCode className="w-3.5 h-3.5 text-cyan-300" />
                        <span>{t.liveQrButton}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => showToast('بدأت جلسة البث ورصد دقائق الاتصال بنجاح!')}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-900 to-teal-900 hover:from-cyan-800 hover:to-teal-800 text-cyan-200 text-xs font-bold border border-cyan-600/50 cursor-pointer shadow-md"
                      >
                        <Laptop className="w-3.5 h-3.5 text-emerald-300" />
                        <span>{t.liveStreamButton}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB 2: ROSTER & 80% THRESHOLD ================= */}
        {activeTab === 'roster' && (
          <div className="space-y-4">
            
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                value={searchLearner}
                onChange={(e) => setSearchLearner(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-slate-950 text-xs text-white pr-9 pl-4 py-2.5 rounded-xl border border-slate-800 outline-none focus:border-[#06B6D4]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-right text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">اسم المتدرب والبريد</th>
                    <th className="p-3">الحصص المكتملة</th>
                    <th className="p-3">نسبة الحضور التراكمية</th>
                    <th className="p-3">حالة الأهلية للشارة (عتبة 80%)</th>
                    <th className="p-3 text-center">إصدار شارة التخرج</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {filteredLearners.map((learner) => {
                    const isEligible = learner.attendanceRate >= 80;
                    return (
                      <tr key={learner.learnerId} className="hover:bg-slate-900/40">
                        <td className="p-3 font-bold text-white">
                          {learner.learnerName}
                          <span className="block text-[10px] text-slate-500 font-mono">
                            {learner.learnerEmail}
                          </span>
                        </td>

                        <td className="p-3 font-mono">
                          {learner.attendedSessionsCount} / {learner.totalSessionsCount} حصص
                          {learner.watchtimeMinutes && (
                            <span className="block text-[10px] text-slate-400">
                              ({learner.watchtimeMinutes} دقيقة بث)
                            </span>
                          )}
                        </td>

                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono font-bold text-sm ${
                              isEligible ? 'text-emerald-400' : 'text-rose-400'
                            }`}>
                              {learner.attendanceRate}%
                            </span>
                            <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isEligible ? 'bg-emerald-400' : 'bg-rose-500'
                                }`}
                                style={{ width: `${learner.attendanceRate}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="p-3">
                          {isEligible ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>{t.eligibleBadge}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800">
                              <AlertTriangle className="w-3 h-3 text-rose-400" />
                              <span>{t.ineligibleBadge}</span>
                            </span>
                          )}
                        </td>

                        <td className="p-3 text-center">
                          {learner.badgeIssued ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-xl border border-cyan-700">
                              <Award className="w-3.5 h-3.5" />
                              <span>{t.issuedBadge}</span>
                            </span>
                          ) : isEligible ? (
                            <button
                              onClick={() => handleIssueBadge(learner)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:opacity-95 text-white text-[11px] font-bold shadow-md cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                              <span>{t.issueBadgeBtn}</span>
                            </button>
                          ) : (
                            <button
                              disabled
                              title="مغلق بقفل الأمان: نسبة الحضور أقل من 80% وفق العقد الإلكتروني"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 text-slate-500 text-[10px] font-bold border border-slate-700/50 cursor-not-allowed opacity-75"
                            >
                              <Lock className="w-3 h-3 text-rose-400" />
                              <span>{t.lockedBadge}</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>نظام الحضور مؤمن بسجلات مشفرة غير قابلة للتعديل العشوائي</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
