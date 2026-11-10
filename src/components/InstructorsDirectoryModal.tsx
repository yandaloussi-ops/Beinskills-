import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Award, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Star, 
  Users, 
  BookOpen, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  Filter,
  BadgeCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TrustCertificateTier } from '../types';
import { ALL_SPECIALIZATIONS } from '../data/specializationsData';

export interface VerifiedTrainerOrInstitute {
  id: string;
  name: string;
  title: string;
  type: 'trainer' | 'institute';
  avatar: string;
  category: string;
  specializations: string[];
  city: string;
  trustTier: TrustCertificateTier;
  rating: number;
  reviewsCount: number;
  totalStudentsTrained: number;
  completedCoursesCount: number;
  bio: string;
  verifiedBadge: boolean;
  activeCoursesCount: number;
}

export const INITIAL_INSTRUCTORS_DIRECTORY: VerifiedTrainerOrInstitute[] = [
  {
    id: 'inst-1',
    name: 'أكاديمية المستقبل للطاقات المتجددة والتكنولوجيا',
    title: 'مركز تدريب مهني معتمد - ترخيص وزاري رقم 2024/09',
    type: 'institute',
    avatar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=300&q=80',
    category: 'الهندسة والصناعة والطاقات المتجددة والميكاترونكس',
    specializations: ['هندسة الطاقة الشمسية والأنظمة الكهروضوئية', 'الميكاترونكس وإنترنت الأشياء الصناعي'],
    city: 'الدار البيضاء',
    trustTier: 'diamond',
    rating: 4.96,
    reviewsCount: 142,
    totalStudentsTrained: 1250,
    completedCoursesCount: 24,
    bio: 'معهد رائد في تأهيل المهندسين والتقنيين في الطاقات النظيفة وإدارة المحطات الشمسية والأنظمة الذكية.',
    verifiedBadge: true,
    activeCoursesCount: 4,
  },
  {
    id: 'tr-1',
    name: 'د. ياسمين المرابط',
    title: 'كبير ممارسي الكوتشينغ ومدربة مدربين دولية (Master TOT & ICF Coach)',
    type: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    category: 'تدريب المكوّنين (TOT) والكوتشينغ الاحترافي المعتمد',
    specializations: ['تدريب المدربين المعتمد وتصميم الحقائب التدريبية', 'الكوتشينغ التنفيذي والقيادي للمؤسسات'],
    city: 'الرباط',
    trustTier: 'diamond',
    rating: 4.98,
    reviewsCount: 215,
    totalStudentsTrained: 1840,
    completedCoursesCount: 38,
    bio: 'خبير دولي معتمد من الاتحاد الدولي للكوتشينغ ICF، دربت أكثر من 1800 مدرب وقائد مؤسسي في المغرب والعالم العربي.',
    verifiedBadge: true,
    activeCoursesCount: 3,
  },
  {
    id: 'tr-2',
    name: 'أ. طارق الشاوي',
    title: 'فنان تشكيلي وأستاذ الفنون الجميلة والسينوغرافيا',
    type: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    category: 'ميادين الفنون الجميلة والتعبير الإبداعي والأداء الركحي',
    specializations: ['الرسم التشكيلي، الصباغة الزيتية، والمائية', 'فنون المسرح، التمثيل، والتعبير الدرامي الركحي'],
    city: 'مراكش',
    trustTier: 'gold',
    rating: 4.92,
    reviewsCount: 94,
    totalStudentsTrained: 520,
    completedCoursesCount: 16,
    bio: 'خريج المعهد العالي للفنون الجميلة، عارض دولي ومدرب لتقنيات الصباغة الكلاسيكية والتشخيص المسرحي.',
    verifiedBadge: true,
    activeCoursesCount: 2,
  },
  {
    id: 'inst-2',
    name: 'معهد الابتكار الفلاحي والري الذكي (AgriTech Institute)',
    title: 'مؤسسة متخصصة في الزراعة الدقيقة وتثمين الموارد المائية',
    type: 'institute',
    avatar: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=300&q=80',
    category: 'الفلاحة الذكية والصناعات الغذائية والتنمية المستدامة',
    specializations: ['الري الذكي وتدبير الموارد المائية', 'سلامة الأغذية ومعايير الجودة والتصنيع (HACCP)'],
    city: 'أكادير / مكناس',
    trustTier: 'gold',
    rating: 4.88,
    reviewsCount: 78,
    totalStudentsTrained: 680,
    completedCoursesCount: 19,
    bio: 'تكوينات تطبيقية ميدانية للفلاحين والمهندسين الزراعيين في برمجة الري بالاستشعار عن بعد ومطابقة معايير التصدير.',
    verifiedBadge: true,
    activeCoursesCount: 3,
  },
  {
    id: 'tr-3',
    name: 'م. سفيان البوعناني',
    title: 'مهندس حلول السحابة والذكاء الاصطناعي التوليدي',
    type: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    category: 'الميادين التقنية والتكنولوجية والذكاء الاصطناعي',
    specializations: ['الذكاء الاصطناعي التوليدي وهندسة الأوامر', 'الحوسبة السحابية وهندسة DevOps'],
    city: 'طنجة',
    trustTier: 'diamond',
    rating: 4.95,
    reviewsCount: 160,
    totalStudentsTrained: 1420,
    completedCoursesCount: 22,
    bio: 'مطور أول وخبير أنظمة الذكاء الاصطناعي، أشرف على تدريب مئات المبرمجين على بناء تطبيقات LLMs المتقدمة.',
    verifiedBadge: true,
    activeCoursesCount: 3,
  },
  {
    id: 'inst-3',
    name: 'المركز الدولي للسلامة المهنية وإدارة المخاطر (SafeWork Pro)',
    title: 'مركز تدقيق وتأهيل معتمد لمعايير OSHA و NEBOSH',
    type: 'institute',
    avatar: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=300&q=80',
    category: 'الصحة والسلامة المهنية والرعاية الشبه طبية',
    specializations: ['السلامة والصحة المهنية وإدارة المخاطر (NEBOSH / OSHA / HSE)'],
    city: 'الدار البيضاء',
    trustTier: 'silver',
    rating: 4.85,
    reviewsCount: 46,
    totalStudentsTrained: 380,
    completedCoursesCount: 11,
    bio: 'تأهيل المشرفين والمسؤولين عن السلامة في المصانع والأوراش الإنشائية وفق أحدث المعايير الدولية.',
    verifiedBadge: true,
    activeCoursesCount: 2,
  },
];

interface InstructorsDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInstructorCourses?: (instructorName: string) => void;
  onOpenRegistrationForTrainer?: () => void;
}

export const InstructorsDirectoryModal: React.FC<InstructorsDirectoryModalProps> = ({
  isOpen,
  onClose,
  onSelectInstructorCourses,
  onOpenRegistrationForTrainer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'trainer' | 'institute'>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredDirectory = useMemo(() => {
    return INITIAL_INSTRUCTORS_DIRECTORY.filter((item) => {
      // Type match
      const typeMatch = selectedType === 'all' || item.type === selectedType;
      // Tier match
      const tierMatch = selectedTier === 'all' || item.trustTier === selectedTier;
      // Category match
      const catMatch = selectedCategory === 'all' || item.category === selectedCategory;

      // Text query
      if (!searchQuery.trim()) return typeMatch && tierMatch && catMatch;

      const q = searchQuery.toLowerCase();
      const textMatch =
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.specializations.some((s) => s.toLowerCase().includes(q)) ||
        item.bio.toLowerCase().includes(q);

      return typeMatch && tierMatch && catMatch && textMatch;
    });
  }, [searchQuery, selectedType, selectedTier, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:px-6 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#06B6D4] text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white font-['Alexandria']">
                  دليل المكوّنين ومراكز التكوين المعتمدة
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950 text-[#06B6D4] border border-cyan-800 font-bold">
                  {INITIAL_INSTRUCTORS_DIRECTORY.length} جهات معتمدة
                </span>
              </div>
              <p className="text-xs text-slate-400">
                استكشف نخبة الخبراء والمؤسسات التدريبية الموثقة بسلم الثقة (Diamond • Gold • Silver)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenRegistrationForTrainer?.();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:shadow-cyan-500/25 shadow-md transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>طلب اعتماد كمكوّن أو مركز</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 space-y-3">
          
          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، المدينة، التخصص (مثل: كوتشينغ، طاقات متجددة، فنون تشكيلية، ري ذكي...)"
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-400 pr-10 pl-4 py-2.5 rounded-xl border border-slate-700 focus:border-[#06B6D4] outline-none shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-2.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded-full"
              >
                مسح
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Type selector */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedType === 'all' ? 'bg-[#7C3AED] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setSelectedType('trainer')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  selectedType === 'trainer' ? 'bg-[#06B6D4] text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>المدربون المستقلون</span>
              </button>
              <button
                onClick={() => setSelectedType('institute')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  selectedType === 'institute' ? 'bg-[#9333EA] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>مراكز التكوين المعتمدة</span>
              </button>
            </div>

            {/* Trust Tier selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px] font-bold">درجة الاعتماد:</span>
              <button
                onClick={() => setSelectedTier('all')}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold ${
                  selectedTier === 'all' ? 'border-[#06B6D4] text-[#06B6D4] bg-cyan-950/40' : 'border-slate-800 text-slate-400'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setSelectedTier('diamond')}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 ${
                  selectedTier === 'diamond' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/50' : 'border-slate-800 text-slate-400'
                }`}
              >
                💎 ألماسي
              </button>
              <button
                onClick={() => setSelectedTier('gold')}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 ${
                  selectedTier === 'gold' ? 'border-amber-400 text-amber-300 bg-amber-950/50' : 'border-slate-800 text-slate-400'
                }`}
              >
                🥇 ذهبي
              </button>
              <button
                onClick={() => setSelectedTier('silver')}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 ${
                  selectedTier === 'silver' ? 'border-slate-400 text-slate-300 bg-slate-800' : 'border-slate-800 text-slate-400'
                }`}
              >
                🥈 فضي
              </button>
            </div>

          </div>

        </div>

        {/* Directory Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredDirectory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDirectory.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-5 rounded-3xl border border-slate-800/80 bg-slate-900/70 hover:border-[#06B6D4]/40 hover:bg-slate-850/80 transition-all flex flex-col justify-between shadow-xl group space-y-4"
                >
                  
                  {/* Top: Avatar, Name, Tier Badge */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#06B6D4]/40 group-hover:ring-[#06B6D4] transition-all"
                          />
                          {item.verifiedBadge && (
                            <div className="absolute -bottom-1 -left-1 bg-emerald-500 text-slate-950 p-0.5 rounded-md">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-sm font-bold text-white group-hover:text-[#06B6D4] transition-colors leading-tight">
                              {item.name}
                            </h4>
                          </div>
                          <span className="text-[11px] text-slate-400 block mt-0.5 line-clamp-1">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span>{item.city}</span>
                          </span>
                        </div>
                      </div>

                      {/* Trust Tier Badge */}
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-xl font-bold shrink-0 border ${
                          item.trustTier === 'diamond'
                            ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                            : item.trustTier === 'gold'
                            ? 'bg-amber-950/80 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {item.trustTier === 'diamond'
                          ? '💎 ألماسي'
                          : item.trustTier === 'gold'
                          ? '🥇 ذهبي'
                          : '🥈 فضي معتمد'}
                      </span>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {item.bio}
                    </p>

                    {/* Specializations Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.specializations.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950/90 text-cyan-200 border border-slate-800"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats Bar: Rating, Learners, Courses */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center bg-slate-950/60 p-2 rounded-xl border border-slate-850">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-300">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{item.rating}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 block">({item.reviewsCount} تقييم)</span>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-white font-mono">
                          {item.totalStudentsTrained}+
                        </div>
                        <span className="text-[9px] text-slate-500 block">متدرب تخرج</span>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-[#06B6D4] font-mono">
                          {item.activeCoursesCount}
                        </div>
                        <span className="text-[9px] text-slate-500 block">دورات نشطة</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => {
                        onClose();
                        onSelectInstructorCourses?.(item.name);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-[#7C3AED] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>استعراض تكوينات {item.type === 'trainer' ? 'المدرب' : 'المركز'}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center space-y-3">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400">لا توجد جهات تدريبية مطابقة لمعايير البحث</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                  setSelectedTier('all');
                  setSelectedCategory('all');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-[#06B6D4]"
              >
                إعادة ضبط عوامل التصفية
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
