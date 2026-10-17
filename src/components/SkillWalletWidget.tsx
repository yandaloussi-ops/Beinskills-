import React from 'react';
import { Wallet, Sparkles, TrendingUp, ArrowDownLeft, ArrowUpRight, Gift, ShieldCheck } from 'lucide-react';
import { SkillWallet } from '../types';
import { Language, translations } from '../translations';

interface SkillWalletWidgetProps {
  wallet?: SkillWallet;
  onExploreCourses: () => void;
  currentLang?: Language;
}

export const SkillWalletWidget: React.FC<SkillWalletWidgetProps> = ({
  wallet,
  onExploreCourses,
  currentLang = 'ar',
}) => {
  const t = translations[currentLang];
  const balance = wallet?.balance ?? 380;
  const currency = t.currency;
  const history = wallet?.history ?? [];

  return (
    <div className="glass-card rounded-2xl p-5 border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 shadow-xl space-y-4">
      
      {/* Wallet Balance Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white font-['Alexandria']">
              {t.wallet_title}
            </h4>
            <p className="text-[10px] text-slate-400">
              {t.wallet_sub}
            </p>
          </div>
        </div>

        <div className="text-left">
          <span className="text-xl font-black text-amber-400 font-mono">
            {balance}
          </span>
          <span className="text-xs text-amber-300 mr-1">{currency}</span>
        </div>
      </div>

      {/* Quick Perks */}
      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{t.cashback_perk_1}</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-1.5">
          <Gift className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
          <span>{t.cashback_perk_2}</span>
        </div>
      </div>

      {/* Transaction History Snippet */}
      {history.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <div className="text-[10px] text-slate-400 font-bold">{t.recent_transactions}</div>
          <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
            {history.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-center justify-between text-[10px]"
              >
                <div className="flex items-center gap-1.5 truncate">
                  {item.type === 'earned' ? (
                    <ArrowDownLeft className="w-3 h-3 text-emerald-400 shrink-0" />
                  ) : (
                    <ArrowUpRight className="w-3 h-3 text-rose-400 shrink-0" />
                  )}
                  <span className="text-slate-300 truncate">{item.reason}</span>
                </div>
                <span
                  className={`font-bold font-mono shrink-0 mr-2 ${
                    item.type === 'earned' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.type === 'earned' ? `+${item.amount}` : `-${item.amount}`} {currency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action */}
      <button
        onClick={onExploreCourses}
        className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-amber-500/30"
      >
        <span>{t.use_wallet_btn}</span>
      </button>

    </div>
  );
};
