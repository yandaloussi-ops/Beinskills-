import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  ArrowLeft, 
  BookOpen, 
  Briefcase, 
  Cpu, 
  Palette, 
  Compass, 
  CheckCircle2,
  Bot
} from 'lucide-react';
import { ALL_SPECIALIZATIONS, SpecializationCategory } from '../data/specializationsData';

interface AllSpecializationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpecialization: (specName: string) => void;
  onConsultAiAboutSpec: (specName: string) => void;
}

export const AllSpecializationsModal: React.FC<AllSpecializationsModalProps> = ({
  isOpen,
  onClose,
  onSelectSpecialization,
  onConsultAiAboutSpec,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatId, setSelectedCatId] = useState<string>('all');

  const filteredCategories = useMemo(() => {
    return ALL_SPECIALIZATIONS.map((cat) => {
      const isCatMatch = selectedCatId === 'all' || cat.id === selectedCatId;
      if (!isCatMatch) return null;

      const matchingSpecs = cat.specializations.filter((spec) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          spec.name.toLowerCase().includes(q) ||
          spec.description.toLowerCase().includes(q) ||
          spec.subSkills.some((s) => s.toLowerCase().includes(q))
        );
      });

      if (matchingSpecs.length === 0) return null;

      return {
        ...cat,
        specializations: matchingSpecs,
      };
    }).filter(Boolean) as SpecializationCategory[];
  }, [searchQuery, selectedCatId]);

  if (!isOpen) return null;

  const totalSpecializationsCount = ALL_SPECIALIZATIONS.reduce(
    (acc, cat) => acc + cat.specializations.length,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:px-6 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] text-white shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-['Alexandria']">
                  دليل كافة التخصصات والميادين المعرفية والمهنية
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-[#06B6D4] border border-cyan-800 font-bold">
                  {totalSpecializationsCount} تخصصاً شاملاً
                </span>
              </div>
              <p className="text-xs text-slate-400">
                استكشف كافة ميادين التكنولوجيا، ريادة الأعمال، التصميم، المعارف الأكاديمية، والتنمية الذاتية
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

        {/* Search & Category Filter Pills */}
        <div className="p-4 bg-slate-950/50 border-b border-slate-800 space-y-3">
          
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أي تخصص، مهارة فرعية، أو مجال (مثل: الذكاء الاصطناعي، الخطابة، Figma، السحابة...)"
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

          {/* Categories Tab Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            <button
              onClick={() => setSelectedCatId('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCatId === 'all'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              كافة الميادين (الكل)
            </button>

            {ALL_SPECIALIZATIONS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCatId === cat.id
                    ? 'bg-slate-800 text-[#06B6D4] border border-[#06B6D4]/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <div key={cat.id} className="space-y-4">
                
                {/* Pillar Header */}
                <div className="flex items-center gap-2.5 border-b border-slate-800 pb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  ></div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-['Alexandria']">
                    {cat.title}
                  </h4>
                  <span className="text-xs text-slate-400">
                    ({cat.specializations.length} تخصص)
                  </span>
                </div>

                {/* Grid of Specializations */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.specializations.map((spec) => (
                    <div
                      key={spec.id}
                      className="glass-card p-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:border-[#06B6D4]/40 hover:bg-slate-800/60 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        
                        {/* Demand Badge */}
                        <div className="flex items-center justify-between text-[10px]">
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold ${
                              spec.marketDemand === 'مرتفع جداً'
                                ? 'bg-rose-950/80 text-rose-300 border border-rose-800/40'
                                : spec.marketDemand === 'مرتفع'
                                ? 'bg-cyan-950/80 text-[#06B6D4] border border-cyan-800/40'
                                : 'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                            }`}
                          >
                            طلب السوق: {spec.marketDemand}
                          </span>
                          <span className="text-slate-500 font-mono">
                            {spec.coursesCount} برامج متاحة
                          </span>
                        </div>

                        {/* Specialization Name */}
                        <h5 className="text-sm font-bold text-white group-hover:text-[#06B6D4] transition-colors leading-snug">
                          {spec.name}
                        </h5>

                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {spec.description}
                        </p>

                        {/* Sub-skills pills */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {spec.subSkills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-300 border border-slate-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                      </div>

                      {/* Action Triggers */}
                      <div className="pt-4 border-t border-slate-800/60 mt-3 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            onSelectSpecialization(spec.name);
                            onClose();
                          }}
                          className="flex items-center gap-1 text-xs font-bold text-[#06B6D4] hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>عرض التكوينات</span>
                        </button>

                        <button
                          onClick={() => {
                            onConsultAiAboutSpec(spec.name);
                            onClose();
                          }}
                          className="flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
                          title="خطة تعلم بالذكاء الاصطناعي"
                        >
                          <Bot className="w-3.5 h-3.5 text-[#7C3AED]" />
                          <span>خطة ذكية</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            ))
          ) : (
            <div className="py-12 text-center space-y-3">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400">لا توجد تخصصات مطابقة لبحثك</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-[#06B6D4]"
              >
                إعادة ضبط البحث
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
