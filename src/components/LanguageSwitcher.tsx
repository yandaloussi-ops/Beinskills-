import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language, LANGUAGES } from '../translations';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLangOption = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700/80 hover:border-[#06B6D4]/50 transition-all cursor-pointer shadow-sm"
        title="تغيير لغة التطبيق / Change Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#06B6D4]" />
        <span className="text-sm leading-none">{activeLangOption.flag}</span>
        <span className="hidden sm:inline">{activeLangOption.name}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-44 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="text-[10px] text-slate-400 font-bold px-2 py-1 border-b border-slate-800/80">
            اللغات المتاحة / Languages:
          </div>

          <div className="space-y-0.5 mt-1">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#7C3AED]/25 to-[#06B6D4]/25 text-[#06B6D4] border border-[#06B6D4]/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-[#06B6D4]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
