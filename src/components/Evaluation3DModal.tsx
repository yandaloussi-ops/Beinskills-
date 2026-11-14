import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  UserCheck, 
  Sparkles, 
  Sliders, 
  Layers, 
  GraduationCap, 
  Building2, 
  Laptop, 
  EyeOff, 
  Send,
  MessageSquare
} from 'lucide-react';
import { Language } from '../translations';
import { Course, Evaluation3DSubmission } from '../types';

interface Evaluation3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  currentLang?: Language;
  onEvaluationSubmitted?: (submission: Evaluation3DSubmission) => void;
}

export const Evaluation3DModal: React.FC<Evaluation3DModalProps> = ({
  isOpen,
  onClose,
  course,
  currentLang = 'ar',
  onEvaluationSubmitted,
}) => {
  const [lang, setLang] = useState<Language>(currentLang);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Dimension 1: Trainer Pedagogy (1 to 5)
  const [trainerPedagogy, setTrainerPedagogy] = useState(5);
  const [trainerInteractivity, setTrainerInteractivity] = useState(5);
  const [trainerPunctuality, setTrainerPunctuality] = useState(5);

  // Dimension 2: Content & Curriculum (1 to 5)
  const [contentPractical, setContentPractical] = useState(5);
  const [contentModernity, setContentModernity] = useState(5);
  const [contentClarity, setContentClarity] = useState(5);

  // Dimension 3: Logistics & Tech (1 to 5)
  const [logisticsEquipment, setLogisticsEquipment] = useState(5);
  const [logisticsPlatform, setLogisticsPlatform] = useState(5);

  // Written review
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  // Subtotals (Percentages 0-100)
  const trainerSubtotal = Math.round(((trainerPedagogy + trainerInteractivity + trainerPunctuality) / 15) * 100);
  const contentSubtotal = Math.round(((contentPractical + contentModernity + contentClarity) / 15) * 100);
  const logisticsSubtotal = Math.round(((logisticsEquipment + logisticsPlatform) / 10) * 100);

  // Overall Weighted Score: 40% Trainer + 40% Content + 20% Logistics
  const overallScore = Math.round(trainerSubtotal * 0.4 + contentSubtotal * 0.4 + logisticsSubtotal * 0.2);

  // Multi-lingual labels
  const t = {
    ar: {
      badge: 'التقييم ثلاثي الأبعاد المعتمد (3D Evaluation)',
      title: 'استمارة التقييم ثلاثي الأبعاد لجودة التكوين',
      sub: 'تقييمك مستقل، آمن، ومحمي. يساهم في تحديد رتبة الثقة المعتمدة للمكوّن ويحمي معايير المنصة.',
      courseInfo: 'التكوين المستهدف:',
      trainerInfo: 'المكوّن المؤطر:',
      dim1Title: 'البُعد الأول: أداء المكوّن البيداغوجي والتأطير',
      dim1Desc: 'تقييم تمكن المدرب، أسلوب إيصال المعلومة، والتفاعل الإيجابي مع المتدربين.',
      q1: 'التمكن المعرفي وبيداغوجيا الشرح والتبسيط:',
      q2: 'التفاعل، إشراك المتدربين والإجابة على الاستفسارات:',
      q3: 'الانضباط في المواعيد وإدارة وقت الحصص:',
      dim2Title: 'البُعد الثاني: جودة المحتوى والمنهج التدريبي (Syllabus)',
      dim2Desc: 'تقييم القيمة التطبيقية للتمارين والمشاريع وحداثة المادة التدريبية.',
      q4: 'جودة الورشات التطبيقية والمشاريع العملية:',
      q5: 'حداثة المنهج وملاءمته لسوق العمل الحديث:',
      q6: 'وضوح الملفات والمراجع والمصادر المرفقة:',
      dim3Title: 'البُعد الثالث: الظروف اللوجستية والتقنية للتكوين',
      dim3Desc: course.mode === 'in-person' 
        ? 'تقييم قاعة التكوين، التجهيزات، التكييف، وراحة الحضور.'
        : 'تقييم استقرار منصة البث، وضوح الصوت والصورة وسلاسة الربط.',
      q7: course.mode === 'in-person' ? 'ملاءمة القاعة، الشاشات، وراحة التجهيزات:' : 'استقرار بث الجلسات، جودة الصوت والصورة:',
      q8: 'الدعم اللوجستي والتنسيق والتنظيم العام:',
      overallScoreLabel: 'المؤشر الإجمالي الموزون لجودة التكوين:',
      anonymousLabel: 'تقديم التقييم بهوية محمية ومجهولة (Anonymous Protection)',
      anonymousDesc: 'لن يتم الكشف عن اسمك أو بريدك الإلكتروني للمدرب لحمايتك من أي حرج أو ضغط.',
      feedbackPlaceholder: 'أكتب ملاحظاتك وتوصياتك لتحسين هذا البرنامج مستقبلاً (اختياري)...',
      submitBtn: 'إرسال التقييم ثلاثي الأبعاد الآن',
      successTitle: 'تم تسجيل تقييمك بنجاح!',
      successDesc: 'شكراً لمساهمتك في حوكمة الجودة. تم تحديث مؤشر الاعتماد للمكوّن والبرنامج.',
      closeBtn: 'إغلاق',
      dimScore: 'النتيجة:',
    },
    en: {
      badge: 'Certified 3D Evaluation',
      title: '3-Dimensional Training Quality Assessment',
      sub: 'Your feedback is independent, secure, and protected. It shapes instructor trust tiers and enforces platform standards.',
      courseInfo: 'Target Program:',
      trainerInfo: 'Instructor / Institute:',
      dim1Title: 'Dimension 1: Instructor Pedagogical Performance',
      dim1Desc: 'Evaluation of teaching mastery, clarity, and interactive responsiveness.',
      q1: 'Domain expertise, instructional clarity & teaching pedagogy:',
      q2: 'Learner engagement, interactivity & Q&A support:',
      q3: 'Punctuality and professional session time management:',
      dim2Title: 'Dimension 2: Content & Curriculum Quality (Syllabus)',
      dim2Desc: 'Assessment of practical project relevance, syllabus freshness, and exercises.',
      q4: 'Hands-on workshops & practical project caliber:',
      q5: 'Curriculum modernity & real-world market relevance:',
      q6: 'Clarity of provided resources, codebooks & slides:',
      dim3Title: 'Dimension 3: Logistical & Technical Learning Environment',
      dim3Desc: course.mode === 'in-person' 
        ? 'Evaluation of physical venue amenities, climate, and screens.'
        : 'Evaluation of streaming reliability, audio/video clarity, and platform uptime.',
      q7: course.mode === 'in-person' ? 'Classroom amenities, seating & display quality:' : 'Streaming stability, audio/video fidelity:',
      q8: 'General logistical support, coordination & responsiveness:',
      overallScoreLabel: 'Overall Weighted 3D Quality Index:',
      anonymousLabel: 'Submit with Protected Anonymous Identity',
      anonymousDesc: 'Your personal name and email remain fully shielded from the instructor.',
      feedbackPlaceholder: 'Share any actionable feedback or suggestions for this program (optional)...',
      submitBtn: 'Submit 3D Evaluation Now',
      successTitle: '3D Evaluation Successfully Recorded!',
      successDesc: 'Thank you for upholding academic integrity. Trust indexes have been dynamically updated.',
      closeBtn: 'Close',
      dimScore: 'Score:',
    },
    fr: {
      badge: 'Évaluation 3D Certifiée',
      title: 'Évaluation Tridimensionnelle de la Qualité de Formation',
      sub: 'Votre avis est indépendant, sécurisé et anonyme. Il contribue au classement officiel et aux garanties de la plateforme.',
      courseInfo: 'Programme concerné :',
      trainerInfo: 'Formateur / Établissement :',
      dim1Title: 'Dimension 1 : Performance Pédagogique du Formateur',
      dim1Desc: 'Maîtrise scientifique, clarté didactique et interactivité bienveillante.',
      q1: 'Expertise scientifique, clarté pédagogique et pédagogie :',
      q2: 'Interactivité, écoute active et réponses aux questions :',
      q3: 'Ponctualité et respect rigoureux du temps des séances :',
      dim2Title: 'Dimension 2 : Qualité du Contenu et du Syllabus',
      dim2Desc: 'Pertinence des ateliers pratiques, modernité et adéquation métier.',
      q4: 'Valeur pratique des ateliers et projets appliqués :',
      q5: 'Modernité du programme et adéquation au marché de l’emploi :',
      q6: 'Clarté des supports de cours, slides et ressources :',
      dim3Title: 'Dimension 3 : Conditions Logistiques et Environnement',
      dim3Desc: course.mode === 'in-person' 
        ? 'Confort de la salle, climatisation, écrans et logistique.'
        : 'Stabilité de la diffusion en direct, netteté vidéo et son.',
      q7: course.mode === 'in-person' ? 'Confort de la salle, équipement et visibilité :' : 'Stabilité du flux streaming, clarté audio/vidéo :',
      q8: 'Coordination logistique et organisation générale :',
      overallScoreLabel: 'Indice Qualité Global Pondéré (3D Score) :',
      anonymousLabel: 'Soumission sous identité protégée et anonyme',
      anonymousDesc: 'Votre identité et email sont totalement masqués vis-à-vis du formateur.',
      feedbackPlaceholder: 'Partagez vos remarques ou suggestions constructives (optionnel)...',
      submitBtn: 'Valider l’Évaluation 3D',
      successTitle: 'Évaluation 3D enregistrée avec succès !',
      successDesc: 'Merci pour votre contribution. Les indicateurs du passeport de confiance ont été actualisés.',
      closeBtn: 'Fermer',
      dimScore: 'Note :',
    },
    es: {
      badge: 'Evaluación Tridimensional Certificada',
      title: 'Cuestionario de Evaluación 3D de Calidad Formativa',
      sub: 'Su valoración es independiente, segura y protegida. Determina el rango de confianza del formador.',
      courseInfo: 'Programa evaluado:',
      trainerInfo: 'Formador / Centro:',
      dim1Title: 'Dimensión 1: Rendimiento Pedagógico del Formador',
      dim1Desc: 'Dominio de la materia, claridad expositiva e interacción constructiva.',
      q1: 'Dominio técnico, claridad didáctica y pedagogía:',
      q2: 'Interacción con el alumnado y resolución de dudas:',
      q3: 'Puntualidad y gestión profesional del tiempo lectivo:',
      dim2Title: 'Dimensión 2: Calidad de Contenidos y Plan Formativo',
      dim2Desc: 'Relevancia práctica de talleres, actualidad del temario y proyectos.',
      q4: 'Calidad de los talleres y proyectos prácticos aplicados:',
      q5: 'Actualización del temario y pertinencia para el mercado laboral:',
      q6: 'Claridad de los manuales, diapositivas y recursos compartidos:',
      dim3Title: 'Dimensión 3: Condiciones Logísticas y Entorno Técnico',
      dim3Desc: course.mode === 'in-person'
        ? 'Instalaciones, climatización, proyectores y comodidad del aula.'
        : 'Estabilidad de la retransmisión, nitidez de audio y vídeo.',
      q7: course.mode === 'in-person' ? 'Confort del aula, proyectores y equipamiento:' : 'Estabilidad del streaming, calidad de audio y vídeo:',
      q8: 'Coordinación logística, soporte y atención organizativa:',
      overallScoreLabel: 'Índice de Calidad 3D Ponderado:',
      anonymousLabel: 'Enviar bajo anonimato protegido',
      anonymousDesc: 'Su nombre y correo electrónico quedan completamente ocultos para el docente.',
      feedbackPlaceholder: 'Escriba sugerencias o comentarios para optimizar el curso (opcional)...',
      submitBtn: 'Enviar Evaluación 3D',
      successTitle: '¡Evaluación 3D Registrada con Éxito!',
      successDesc: 'Gracias por promover la excelencia formativa. Los índices de confianza se han actualizado.',
      closeBtn: 'Cerrar',
      dimScore: 'Puntuación:',
    },
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission: Evaluation3DSubmission = {
      id: `eval-${Date.now()}`,
      courseId: course.id,
      courseTitle: course.title,
      instructorName: course.instructor.name,
      learnerName: isAnonymous ? 'متدرب معتمد (هوية محمية)' : 'ياسمين بن علي',
      isAnonymous,
      submittedAt: new Date().toISOString(),
      trainerPedagogyScore: trainerPedagogy,
      trainerInteractivityScore: trainerInteractivity,
      trainerPunctualityScore: trainerPunctuality,
      trainerSubtotal,
      contentPracticalScore: contentPractical,
      contentModernityScore: contentModernity,
      contentClarityScore: contentClarity,
      contentSubtotal,
      logisticsEquipmentScore: logisticsEquipment,
      logisticsPlatformScore: logisticsPlatform,
      logisticsSubtotal,
      overall3DScore: overallScore,
      writtenFeedback: feedback.trim(),
    };

    onEvaluationSubmitted?.(submission);
    setSubmitted(true);
  };

  const StarRating = ({
    value,
    onChange,
    label,
  }: {
    value: number;
    onChange: (v: number) => void;
    label: string;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
      <span className="text-xs text-slate-300">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 text-slate-600 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <Star
              className={`w-4 h-4 ${
                star <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
              }`}
            />
          </button>
        ))}
        <span className="text-xs font-mono font-bold text-amber-300 ml-1.5 min-w-[20px] text-center">
          {value}/5
        </span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in font-['Alexandria']">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        
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

        {submitted ? (
          /* Submission Success State */
          <div className="p-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">{t.successTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {t.successDesc}
            </p>

            <div className="p-4 max-w-md mx-auto rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{t.dim1Title.split(':')[0]}:</span>
                <span className="font-bold text-emerald-400 font-mono">{trainerSubtotal}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t.dim2Title.split(':')[0]}:</span>
                <span className="font-bold text-cyan-300 font-mono">{contentSubtotal}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t.dim3Title.split(':')[0]}:</span>
                <span className="font-bold text-purple-400 font-mono">{logisticsSubtotal}%</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white text-sm">
                <span>{t.overallScoreLabel}</span>
                <span className="font-mono text-[#06B6D4]">{overallScore}%</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold text-xs cursor-pointer shadow-lg"
            >
              {t.closeBtn}
            </button>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header Info */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED]/20 text-purple-300 border border-purple-500/30">
                <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>{t.badge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{t.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{t.sub}</p>

              <div className="flex items-center gap-3 pt-2 text-xs flex-wrap">
                <span className="text-slate-400">
                  {t.courseInfo} <strong className="text-white">{course.title}</strong>
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">
                  {t.trainerInfo} <strong className="text-cyan-300">{course.instructor.name}</strong>
                </span>
              </div>
            </div>

            {/* DIMENSION 1 */}
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#06B6D4]" />
                  <h4 className="text-sm font-bold text-white">{t.dim1Title}</h4>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700 font-bold font-mono">
                  {t.dimScore} {trainerSubtotal}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{t.dim1Desc}</p>
              
              <div className="space-y-2 pt-1">
                <StarRating value={trainerPedagogy} onChange={setTrainerPedagogy} label={t.q1} />
                <StarRating value={trainerInteractivity} onChange={setTrainerInteractivity} label={t.q2} />
                <StarRating value={trainerPunctuality} onChange={setTrainerPunctuality} label={t.q3} />
              </div>
            </div>

            {/* DIMENSION 2 */}
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">{t.dim2Title}</h4>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700 font-bold font-mono">
                  {t.dimScore} {contentSubtotal}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{t.dim2Desc}</p>
              
              <div className="space-y-2 pt-1">
                <StarRating value={contentPractical} onChange={setContentPractical} label={t.q4} />
                <StarRating value={contentModernity} onChange={setContentModernity} label={t.q5} />
                <StarRating value={contentClarity} onChange={setContentClarity} label={t.q6} />
              </div>
            </div>

            {/* DIMENSION 3 */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">{t.dim3Title}</h4>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-bold font-mono">
                  {t.dimScore} {logisticsSubtotal}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{t.dim3Desc}</p>
              
              <div className="space-y-2 pt-1">
                <StarRating value={logisticsEquipment} onChange={setLogisticsEquipment} label={t.q7} />
                <StarRating value={logisticsPlatform} onChange={setLogisticsPlatform} label={t.q8} />
              </div>
            </div>

            {/* OVERALL WEIGHTED KPI BAR */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/40 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-bold text-slate-300 block">{t.overallScoreLabel}</span>
                <span className="text-[11px] text-slate-400">
                  (40% {t.dim1Title.split(':')[0]} + 40% {t.dim2Title.split(':')[0]} + 20% {t.dim3Title.split(':')[0]})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-black text-[#06B6D4] font-mono">{overallScore}%</div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                  overallScore >= 95 
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-800' 
                    : overallScore >= 85 
                    ? 'bg-amber-950 text-amber-300 border-amber-800' 
                    : 'bg-purple-950 text-purple-300 border-purple-800'
                }`}>
                  {overallScore >= 95 ? 'الماسي الفائق' : overallScore >= 85 ? 'الذهبي المعتمد' : 'الفضي'}
                </span>
              </div>
            </div>

            {/* ANONYMOUS TOGGLE & COMMENTS */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-[#06B6D4] focus:ring-[#06B6D4] w-4 h-4 bg-slate-900"
                />
                <div>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.anonymousLabel}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{t.anonymousDesc}</span>
                </div>
              </label>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>ملاحظات وتوصيات تطويرية:</span>
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={t.feedbackPlaceholder}
                  rows={3}
                  className="w-full bg-slate-950 text-xs text-white p-3 rounded-xl border border-slate-800 outline-none focus:border-[#06B6D4] transition-all resize-none"
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 text-xs font-bold transition-all cursor-pointer"
              >
                {t.closeBtn}
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:opacity-95 text-white text-xs font-black shadow-lg shadow-purple-900/30 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.submitBtn}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
