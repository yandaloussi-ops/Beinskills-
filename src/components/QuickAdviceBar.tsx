import React, { useState } from 'react';
import { Zap, Sparkles, Send, CheckCircle, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Language, translations } from '../translations';

interface QuickAdviceBarProps {
  onOpenFullChat: () => void;
  currentLang?: Language;
}

export const QuickAdviceBar: React.FC<QuickAdviceBarProps> = ({ 
  onOpenFullChat,
  currentLang = 'ar',
}) => {
  const [query, setQuery] = useState('');
  const [adviceResult, setAdviceResult] = useState<string | null>(null);
  const [latencyTime, setLatencyTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[currentLang];

  const QUICK_QUESTIONS_BY_LANG: Record<Language, string[]> = {
    ar: [
      'أي تكوين أبدأ به إذا كنت بدون خلفية برمجية؟',
      'ما هي متطلبات سوق العمل لمهندس الذكاء الاصطناعي 2026؟',
      'كيف تختار بين التكوين الحضوري والتكوين عن بعد؟',
      'ما هو جواز المهارات وكيف يثبت كفاءتي للمشغلين؟',
    ],
    en: [
      'Which training should I start with if I have no coding background?',
      'What are the 2026 market demands for an AI engineer?',
      'How to choose between in-person and remote training?',
      'How does the Skills Passport prove my readiness to employers?',
    ],
    fr: [
      'Par quelle formation débuter sans expérience en programmation ?',
      'Quelles sont les compétences requises en IA en 2026 ?',
      'Comment choisir entre formation présentielle et à distance ?',
      'Comment le passeport de compétences valorise mon profil ?',
    ],
    es: [
      '¿Por qué curso empezar si no tengo experiencia en programación?',
      '¿Cuáles son las competencias más demandadas en IA para 2026?',
      '¿Cómo elegir entre formación presencial y remota?',
      '¿Cómo valida el Pasaporte de Habilidades mi experiencia laboral?',
    ],
  };

  const questions = QUICK_QUESTIONS_BY_LANG[currentLang] || QUICK_QUESTIONS_BY_LANG.ar;

  const handleFetchQuickAdvice = async (targetQuery?: string) => {
    const q = targetQuery || query.trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setAdviceResult(null);
    const startTime = performance.now();

    try {
      const response = await fetch('/api/quick-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, lang: currentLang }),
      });

      const elapsed = Math.round(performance.now() - startTime);
      setLatencyTime(elapsed);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed response');
      }

      setAdviceResult(data.advice);
    } catch (err) {
      setAdviceResult(
        currentLang === 'en'
          ? 'Focus on one high-demand skill (like Data Analytics or AI) and build a real portfolio project immediately.'
          : currentLang === 'fr'
          ? 'Choisissez une compétence clé demandée sur le marché et commencez directement par un projet concret.'
          : currentLang === 'es'
          ? 'Elige una habilidad de alta demanda y comienza de inmediato con un proyecto práctico.'
          : 'اختر تخصصاً واحداً تطلبه السوق (كتحليل البيانات أو الذكاء الاصطناعي) وابدأ بمشروع تطبيقي مباشر.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-8 relative z-20">
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-[#06B6D4]/30 bg-slate-900/90 shadow-2xl space-y-3">
        
        {/* Header line with low-latency badge */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#06B6D4]/20 text-[#06B6D4]">
              <Zap className="w-4 h-4 animate-bounce" />
            </span>
            <span className="text-xs sm:text-sm font-bold text-white font-['Alexandria']">
              {t.quick_advice_title}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-[#06B6D4] border border-cyan-800 font-mono font-semibold">
              gemini-3.1-flash-lite
            </span>
          </div>

          <button
            onClick={onOpenFullChat}
            className="text-xs text-[#06B6D4] hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>{t.nav_advisor}</span>
            <CornerDownLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
          </button>
        </div>

        {/* Input & Instant Button */}
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetchQuickAdvice()}
            placeholder={t.quick_advice_input_placeholder}
            className="flex-1 bg-slate-950 text-xs sm:text-sm text-slate-100 placeholder-slate-400 px-4 py-2.5 rounded-xl border border-slate-700 focus:border-[#06B6D4] outline-none"
          />
          <button
            onClick={() => handleFetchQuickAdvice()}
            disabled={isLoading || !query.trim()}
            className="px-4 py-2.5 rounded-xl bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-[#06B6D4]/20 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{t.quick_advice_btn}</span>
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto text-[11px] pt-1">
          <span className="text-slate-400 shrink-0">{t.common_questions}</span>
          {questions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(q);
                handleFetchQuickAdvice(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 border border-slate-700/60 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Instant Response Box */}
        {adviceResult && (
          <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-[#06B6D4]/40 text-xs text-slate-200 leading-relaxed flex items-start gap-3 animate-in fade-in">
            <span className="p-1 rounded-md bg-[#06B6D4] text-slate-950 shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-bold text-[#06B6D4]">BeInSkills Instant Coaching</span>
                {latencyTime && (
                  <span className="font-mono text-emerald-400">
                    ultra-fast ({latencyTime}ms) • gemini-3.1-flash-lite
                  </span>
                )}
              </div>
              <p className="text-slate-100 font-medium">{adviceResult}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
