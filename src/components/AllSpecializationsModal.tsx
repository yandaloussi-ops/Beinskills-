import React, { useState, useMemo, useEffect } from 'react';
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
  Bot,
  PlusCircle,
  Plus,
  FolderPlus,
  Zap,
  Tag,
  Check
} from 'lucide-react';
import { 
  ALL_SPECIALIZATIONS, 
  SpecializationCategory, 
  SpecializationItem 
} from '../data/specializationsData';

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

  // Dynamic Categories state (persisted locally & expandable)
  const [categories, setCategories] = useState<SpecializationCategory[]>(() => {
    try {
      const saved = localStorage.getItem('beinskills_dynamic_categories_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read saved categories', e);
    }
    return ALL_SPECIALIZATIONS;
  });

  // Save changes whenever categories update
  const saveCategories = (updated: SpecializationCategory[]) => {
    setCategories(updated);
    try {
      localStorage.setItem('beinskills_dynamic_categories_v1', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save categories', e);
    }
  };

  // Add Item / Domain Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<'specialization' | 'category'>('specialization');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State for Adding Specialization
  const [targetCatId, setTargetCatId] = useState<string>('');
  const [specName, setSpecName] = useState('');
  const [specDemand, setSpecDemand] = useState<'مرتفع جداً' | 'مرتفع' | 'واعد'>('مرتفع جداً');
  const [specDesc, setSpecDesc] = useState('');
  const [specSkills, setSpecSkills] = useState('');

  // Form State for Adding Category
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatColor, setNewCatColor] = useState('#8B5CF6');

  // Trigger Toast
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Handle Add Specialization
  const handleAddSpecialization = (e: React.FormEvent) => {
    e.preventDefault();
    if (!specName.trim()) return;

    const chosenCatId = targetCatId || categories[0]?.id;
    const skillsArray = specSkills
      .split(/[,،]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const newSpec: SpecializationItem = {
      id: `spec-custom-${Date.now()}`,
      name: specName.trim(),
      marketDemand: specDemand,
      description: specDesc.trim() || 'تخصص مهاري مضاف حديثاً للمنصة يلبي احتياجات سوق الشغل.',
      subSkills: skillsArray.length > 0 ? skillsArray : ['مهارة تطبيقية', 'كفاءة مهنية'],
      coursesCount: 1,
    };

    const updated = categories.map((cat) => {
      if (cat.id === chosenCatId) {
        return {
          ...cat,
          specializations: [newSpec, ...cat.specializations],
        };
      }
      return cat;
    });

    saveCategories(updated);
    triggerToast(`تمت إضافة تخصص "${specName}" بنجاح!`);
    // Reset
    setSpecName('');
    setSpecDesc('');
    setSpecSkills('');
    setIsAddModalOpen(false);
  };

  // Handle Add Category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatTitle.trim()) return;

    const newCategory: SpecializationCategory = {
      id: `cat-custom-${Date.now()}`,
      title: newCatTitle.trim(),
      icon: 'Layers',
      description: newCatDesc.trim() || 'مجال تكويني جديد تم اعتماده في منصة BeInSkills.',
      color: newCatColor,
      specializations: [],
    };

    const updated = [newCategory, ...categories];
    saveCategories(updated);
    triggerToast(`تم تأسيس قطاع "${newCatTitle}" بنجاح! يمكنك الآن إضافة فروع تابعة له.`);
    setNewCatTitle('');
    setNewCatDesc('');
    setIsAddModalOpen(false);
  };

  const filteredCategories = useMemo(() => {
    return categories
      .map((cat) => {
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

        if (matchingSpecs.length === 0 && searchQuery.trim()) return null;

        return {
          ...cat,
          specializations: matchingSpecs,
        };
      })
      .filter(Boolean) as SpecializationCategory[];
  }, [searchQuery, selectedCatId, categories]);

  if (!isOpen) return null;

  const totalSpecializationsCount = categories.reduce(
    (acc, cat) => acc + cat.specializations.length,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Toast Notification */}
        {toastMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Header */}
        <div className="p-4 sm:px-6 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#06B6D4] text-white shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-white font-['Alexandria']">
                  أطلس التكوينات والبنية التحتية المعرفية
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950/90 text-[#06B6D4] border border-cyan-800 font-bold">
                  {categories.length} قطاعات كبرى • {totalSpecializationsCount} تخصصاً معتمداً
                </span>
              </div>
              <p className="text-xs text-slate-400">
                خريطة الكفاءات الشاملة: الفنون الجميلة، TOT، التكنولوجيا، الفلاحة، الصحة، الصناعة، واللغات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* ADD DOMAIN / BRANCH BUTTON */}
            <button
              onClick={() => {
                setTargetCatId(categories[0]?.id || '');
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#6D28D9] hover:to-cyan-500 shadow-md transition-all cursor-pointer transform hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة محور أو تخصص جديد</span>
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

        {/* Search & Category Filter Pills */}
        <div className="p-4 bg-slate-950/50 border-b border-slate-800 space-y-3">
          
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أي قطاع أو فرع تكويني (مثل: الفنون الجميلة، تدريب المدربين TOT، الموسيقى، الطاقة الشمسية، الري الذكي...)"
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
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedCatId('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCatId === 'all'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              كافة القطاعات ({categories.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCatId === cat.id
                    ? 'bg-slate-800 text-[#06B6D4] border border-[#06B6D4]/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                <span>{cat.title}</span>
                <span className="text-[10px] text-slate-500">({cat.specializations.length})</span>
              </button>
            ))}
          </div>

        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <div key={cat.id} className="space-y-4">
                
                {/* Pillar Header with inline Quick Add button */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full shadow-sm"
                      style={{ backgroundColor: cat.color }}
                    ></div>
                    <h4 className="text-base sm:text-lg font-bold text-white font-['Alexandria']">
                      {cat.title}
                    </h4>
                    <span className="text-xs text-slate-400">
                      ({cat.specializations.length} تخصص فرعي)
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setTargetCatId(cat.id);
                      setAddMode('specialization');
                      setIsAddModalOpen(true);
                    }}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#06B6D4] transition-colors bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/60 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>إضافة فرع لهذا المجال</span>
                  </button>
                </div>

                {/* Grid of Specializations */}
                {cat.specializations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat.specializations.map((spec) => (
                      <div
                        key={spec.id}
                        className="glass-card p-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:border-[#06B6D4]/40 hover:bg-slate-800/60 transition-all flex flex-col justify-between group shadow-lg"
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
                ) : (
                  <div className="p-6 rounded-2xl border border-dashed border-slate-800 text-center space-y-2">
                    <p className="text-xs text-slate-400">لا توجد فروع مضافة لهذا المجال بعد</p>
                    <button
                      onClick={() => {
                        setTargetCatId(cat.id);
                        setAddMode('specialization');
                        setIsAddModalOpen(true);
                      }}
                      className="text-xs font-bold text-[#06B6D4] hover:underline"
                    >
                      + أضف أول تخصص فرعي الآن
                    </button>
                  </div>
                )}

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

      {/* --- ADD NEW SPECIALIZATION / CATEGORY SUB-MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#06B6D4]" />
                <h4 className="text-base font-bold text-white font-['Alexandria']">
                  إضافة بنية معرفية وتكوينية جديدة
                </h4>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Switch between Specialization or Category */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setAddMode('specialization')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  addMode === 'specialization'
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                إضافة تخصص فرعي
              </button>
              <button
                type="button"
                onClick={() => setAddMode('category')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  addMode === 'category'
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                إضافة قطاع تكويني كامل
              </button>
            </div>

            {/* FORM 1: ADD SPECIALIZATION */}
            {addMode === 'specialization' ? (
              <form onSubmit={handleAddSpecialization} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    القطاع التكويني التابع له:
                  </label>
                  <select
                    value={targetCatId}
                    onChange={(e) => setTargetCatId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    اسم التخصص الفرعي: *
                  </label>
                  <input
                    type="text"
                    required
                    value={specName}
                    onChange={(e) => setSpecName(e.target.value)}
                    placeholder="مثال: فن الرقص الإيقاعي المعاصر، كوتشينغ القيادة، هندسة الميكاترونكس..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      طلب سوق الشغل:
                    </label>
                    <select
                      value={specDemand}
                      onChange={(e) => setSpecDemand(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                    >
                      <option value="مرتفع جداً">مرتفع جداً</option>
                      <option value="مرتفع">مرتفع</option>
                      <option value="واعد">واعد</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      المهارات الفرعية (مفصولة بفواصل):
                    </label>
                    <input
                      type="text"
                      value={specSkills}
                      onChange={(e) => setSpecSkills(e.target.value)}
                      placeholder="مهارة 1، مهارة 2، تقنية 3"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    الوصف المهاري المختصر:
                  </label>
                  <textarea
                    rows={3}
                    value={specDesc}
                    onChange={(e) => setSpecDesc(e.target.value)}
                    placeholder="أهداف التكوين والمهارات التطبيقية المكتسبة..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4] resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:shadow-lg shadow-[#06B6D4]/20"
                  >
                    حفظ وإضافة للمنصة
                  </button>
                </div>
              </form>
            ) : (
              /* FORM 2: ADD CATEGORY */
              <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    اسم القطاع أو المجال التكويني الجديد: *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCatTitle}
                    onChange={(e) => setNewCatTitle(e.target.value)}
                    placeholder="مثال: قطاع النقل الذكي والملاحة، قطاع الطيران، قطاع الإعلام والصحافة..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    الوصف العام للقطاع:
                  </label>
                  <textarea
                    rows={3}
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="المجالات والتخصصات التابعة لهذا القطاع..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 outline-none focus:border-[#06B6D4] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    اللون المميز للقطاع في الدليل:
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={newCatColor}
                      onChange={(e) => setNewCatColor(e.target.value)}
                      className="w-10 h-10 rounded-lg bg-transparent cursor-pointer border border-slate-700"
                    />
                    <span className="text-slate-400 font-mono">{newCatColor}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:shadow-lg shadow-[#06B6D4]/20"
                  >
                    تأسيس القطاع الجديد
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
