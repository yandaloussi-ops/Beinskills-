import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Zap, 
  BrainCircuit, 
  Rocket, 
  User, 
  RefreshCw,
  HelpCircle,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { ChatMessage, GeminiModelType } from '../types';

interface GeminiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

const ROLES = [
  {
    id: 'career-advisor',
    name: 'مستشار التوجيه واختيار التكوين',
    icon: CompassIcon,
    systemInstruction:
      'أنت المستشار المهني الأقدم لمنصة BeInSkills. مهمتك تحليل أهداف المتدربين واقتراح التكوينات المثلى من منصتنا، ومساعدتهم على ترقية جواز مهاراتهم. ردودك مشجعة وواضحة ومنظمة باللغة العربية.',
    recommendedModel: 'gemini-3.8-flash' as GeminiModelType,
  },
  {
    id: 'fast-assistant',
    name: 'المجيب الفوري فائق السرعة',
    icon: Zap,
    systemInstruction:
      'أنت مساعد فوري خفيف السرعة لمنصة BeInSkills. تقدم إجابات مباشرة وسريعة جداً ومركزة في نقاط محددة دون إطالة. استخدم نماذج السرعة القصوى.',
    recommendedModel: 'gemini-3.1-flash-lite' as GeminiModelType,
  },
  {
    id: 'deep-architect',
    name: 'خبير التخطيط المهني وهندسة الكفاءات',
    icon: BrainCircuit,
    systemInstruction:
      'أنت خبير التخطيط الاستراتيجي المعمق في BeInSkills. تقوم بتحليل المسارات الوظيفية المعقدة، فجوات المهارات، وهندسة مسارات الانتقال الوظيفي التقني المتقدم بأسلوب تحليلي رصين.',
    recommendedModel: 'gemini-4-argon' as GeminiModelType,
  },
];

function CompassIcon(props: any) {
  return <Bot {...props} />;
}

export const GeminiChatbotModal: React.FC<GeminiChatbotModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
}) => {
  const [selectedModel, setSelectedModel] = useState<GeminiModelType>('gemini-3.8-flash');
  const [selectedRole, setSelectedRole] = useState(ROLES[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        'مرحباً بك في المستشار الذكي لمنصة BeInSkills! 🚀\n' +
        'شعارنا "انغمس في المهارة، أصنع المستقبل". كيف يمكنني مساعدتك اليوم في اختيار تكوينك القادم، فهم مسار تطورك، أو بناء شاراتك المهارية؟',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.8-flash',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const activeRoleConfig = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputValue.trim();
    if (!textToSend || isLoading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!customPrompt) setInputValue('');
    setIsLoading(true);

    try {
      // Send conversation history to backend Gemini endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          model: selectedModel,
          systemInstruction: activeRoleConfig.systemInstruction,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشلت معالجة الرد من الخادم');
      }

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMsg(err?.message || 'تعذر الاتصال بالمستشار الذكي');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: 'تم بدء محادثة جديدة! كيف يمكنني مساعدتك الآن؟',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
      },
    ]);
    setErrorMsg(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl h-[88vh] max-h-[780px] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header with Title & Close Button */}
        <div className="p-4 sm:px-6 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#06B6D4] to-[#7C3AED] text-slate-950 shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-['Alexandria']">
                  المستشار الذكي لمنصة BeInSkills
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-[#06B6D4] border border-cyan-800 font-bold">
                  مدعوم بنماذج Gemini
                </span>
              </div>
              <p className="text-xs text-slate-400">
                محادثة ذكية متعددة الأدوار لتنمية القدرات وتخطيط المسارات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="محادثة جديدة"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model Selection & Roles Bar (Required by prompt) */}
        <div className="p-3 bg-slate-950/40 border-b border-slate-800/80 space-y-2">
          
          {/* Models Selector Tabs */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-medium shrink-0">اختر نموذج Gemini:</span>
            
            <div className="flex items-center gap-1.5 shrink-0">
              {/* gemini-3.1-flash-lite: Fast & Low Latency */}
              <button
                onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedModel === 'gemini-3.1-flash-lite'
                    ? 'bg-[#06B6D4] text-slate-950 shadow-md shadow-[#06B6D4]/20'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title="استجابة فائقة السرعة للمهام الفورية"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>ردود فائقة السرعة (Flash-Lite)</span>
              </button>

              {/* gemini-3.8-flash: General Tasks */}
              <button
                onClick={() => setSelectedModel('gemini-3.8-flash')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedModel === 'gemini-3.8-flash'
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title="للمهام العامة والتوجيه الشامل"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>مستشار شامل (Gemini 3.8)</span>
              </button>

              {/* gemini-4-argon: Complex Reasoning Tasks */}
              <button
                onClick={() => setSelectedModel('gemini-4-argon')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedModel === 'gemini-4-argon'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title="تخطيط معمق وتحليل مسار معقد"
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>تحليل معمق (Argon 4)</span>
              </button>
            </div>
          </div>

          {/* Roles Selector */}
          <div className="flex items-center gap-2 overflow-x-auto text-[11px] pt-1">
            <span className="text-slate-400 font-medium shrink-0">دور المساعد:</span>
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setSelectedModel(role.recommendedModel);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all shrink-0 font-medium ${
                  selectedRole === role.id
                    ? 'bg-slate-700 text-[#06B6D4] border border-[#06B6D4]/40 font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {role.name}
              </button>
            ))}
          </div>

        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-[#7C3AED] text-white ring-2 ring-[#7C3AED]/40'
                    : 'bg-gradient-to-tr from-[#06B6D4] to-[#7C3AED] text-slate-950 ring-2 ring-[#06B6D4]/40'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-white" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#7C3AED] text-white rounded-tr-none shadow-md'
                    : 'bg-slate-800/90 text-slate-100 rounded-tl-none border border-slate-700/80 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1 text-[10px] opacity-75">
                  <span>{msg.role === 'user' ? 'أنت' : 'المستشار الذكي'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div>{msg.content}</div>

                {msg.modelUsed && msg.role === 'model' && (
                  <div className="mt-2 pt-1 border-t border-slate-700/60 text-[10px] text-cyan-400 font-mono">
                    النموذج: {msg.modelUsed}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#06B6D4] to-[#7C3AED] text-white flex items-center justify-center animate-spin">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#06B6D4] animate-ping" />
                <span>جاري صياغة الإجابة باستخدام {selectedModel}...</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/70 overflow-x-auto flex items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] shrink-0">اقتراحات سريعة:</span>
          <button
            onClick={() => handleSendMessage('ما هو التكوين الأنسب للبدء في الذكاء الاصطناعي التوليدي لمبتدئ؟')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] shrink-0 border border-slate-700 transition-colors"
          >
            تكوين الذكاء الاصطناعي للمبتدئ 🤖
          </button>
          <button
            onClick={() => handleSendMessage('كيف يساعدني جواز المهارات في التقديم على وظائف مرموقة؟')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] shrink-0 border border-slate-700 transition-colors"
          >
            فائدة جواز المهارات 🪪
          </button>
          <button
            onClick={() => handleSendMessage('قارن بين تكوينات الحضور والتكوينات عن بعد في BeInSkills')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] shrink-0 border border-slate-700 transition-colors"
          >
            حضوري vs عن بعد 🎓
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="اكتب سؤالك أو استفسارك المهني هنا..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-slate-900 text-sm text-slate-100 placeholder-slate-400 px-4 py-3 rounded-2xl border border-slate-700 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#7C3AED]/20 transition-all cursor-pointer"
              title="إرسال"
            >
              <Send className="w-5 h-5 rtl:rotate-180" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
