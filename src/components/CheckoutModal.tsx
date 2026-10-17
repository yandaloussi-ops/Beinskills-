import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Wallet, 
  Layers, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft,
  Lock,
  Percent,
  Calendar,
  Users
} from 'lucide-react';
import { Course, PaymentType, UserProfile, Transaction } from '../types';

interface CheckoutModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onPaymentSuccess: (transaction: Transaction, updatedWalletBalance: number) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  course,
  isOpen,
  onClose,
  userProfile,
  onPaymentSuccess,
}) => {
  const [paymentType, setPaymentType] = useState<PaymentType>('escrow-full');
  const [b2bSeatsCount, setB2bSeatsCount] = useState<number>(5);
  const [useWalletCashback, setUseWalletCashback] = useState<boolean>(false);
  const [payerName, setPayerName] = useState(userProfile.name);
  const [payerEmail, setPayerEmail] = useState('yassine.student@beinskills.ma');
  const [companyName, setCompanyName] = useState('شركة النظم المبتكرة B2B');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen || !course) return null;

  const walletBalance = userProfile.wallet?.balance || 0;
  const basePrice = course.price;

  // Calculation logic based on chosen payment type
  let finalAmount = basePrice;
  let seatsBooked = 1;
  let discountAmount = 0;
  let installmentInfo = '';

  if (paymentType === 'b2b-group') {
    seatsBooked = b2bSeatsCount;
    const rawTotal = basePrice * b2bSeatsCount;
    discountAmount = Math.round(rawTotal * 0.15); // 15% B2B corporate discount
    finalAmount = rawTotal - discountAmount;
  } else if (paymentType === 'installments') {
    // 3 installments
    finalAmount = Math.round(basePrice / 3);
    installmentInfo = `الدفعة الأولى اليوم: ${finalAmount} درهم (متبقي دفعتان شهريتان بقيمة ${finalAmount} درهم/شهر)`;
  } else if (paymentType === 'wallet') {
    // Deduct full available wallet balance
    const deductible = Math.min(walletBalance, basePrice);
    discountAmount = deductible;
    finalAmount = Math.max(0, basePrice - deductible);
  }

  // If user checked additional cashback deduction in full or installment mode
  let walletDeductionApplied = 0;
  if (useWalletCashback && paymentType !== 'wallet' && walletBalance > 0) {
    walletDeductionApplied = Math.min(walletBalance, finalAmount);
    finalAmount = finalAmount - walletDeductionApplied;
  }

  const platformFee = Math.round(finalAmount * 0.12); // 12% Platform Commission
  const instructorPayout = finalAmount - platformFee;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Calculate updated wallet
      let newBalance = walletBalance;
      if (paymentType === 'wallet') {
        newBalance = Math.max(0, walletBalance - discountAmount);
      } else if (useWalletCashback && walletDeductionApplied > 0) {
        newBalance = Math.max(0, walletBalance - walletDeductionApplied);
      }
      // Add 5% cashback reward for payment
      const earnedCashback = Math.round(finalAmount * 0.05);
      newBalance += earnedCashback;

      const newTx: Transaction = {
        id: `TRX-${Date.now().toString().slice(-4)}`,
        courseId: course.id,
        courseTitle: course.title,
        instructorName: course.instructor.name,
        payerName: paymentType === 'b2b-group' ? `${companyName} (${payerName})` : payerName,
        payerEmail,
        amount: finalAmount,
        currency: 'درهم',
        platformFee,
        instructorPayout,
        seatsCount: seatsBooked,
        paymentType,
        escrowStatus: 'held_in_escrow',
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      };

      onPaymentSuccess(newTx, newBalance);
      setIsProcessing(false);
      setIsDone(true);

      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:px-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] text-white shadow-md">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-['Alexandria']">
                  بوابة التحصيل المالي والحجز الآمن
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  حساب وسيط محمي (Escrow)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                أموالك محفوظة في حساب الضمان حتى بدء التكوين والتأكد من الجودة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {isDone ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-black text-white font-['Alexandria']">
                تم التحصيل المالي وحجز المقعد بنجاح!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                تم إيداع المبلغ بأمان في الحساب الوسيط (Escrow Protected)، وتأكيد حجزك في <strong>{course.title}</strong>. كما تم إضافة كاشباك لمكافأة محفظتك!
              </p>
            </div>
          ) : (
            <form onSubmit={handleProcessPayment} className="space-y-5">
              
              {/* Selected Course Summary */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white max-w-sm truncate">{course.title}</h4>
                    <span className="text-[11px] text-slate-400">
                      المكوّن: {course.instructor.name} • {course.mode === 'remote' ? 'عن بعد' : 'حضوري'}
                    </span>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <div className="text-[10px] text-slate-400">السعر الأساسي</div>
                  <div className="text-sm font-black text-[#06B6D4]">{course.price} درهم</div>
                </div>
              </div>

              {/* 4 Payment Types (Required explicitly by user) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  اختر آلية التحصيل والدفع المناسبة لك:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Option A: الدفع الكامل مع الحجز الوسيط */}
                  <div
                    onClick={() => setPaymentType('escrow-full')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentType === 'escrow-full'
                        ? 'bg-gradient-to-r from-[#7C3AED]/25 to-[#06B6D4]/25 border-[#06B6D4] text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
                        الدفع الكامل مع الضمان الوسيط (Escrow)
                      </span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                        الأكثر أماناً
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      حجز فوري، ويبقى المبلغ معلقاً بأمان حتى بدء الدورة ورضاك عن التدريب.
                    </p>
                  </div>

                  {/* Option B: الدفع المجزأ / الأقساط */}
                  <div
                    onClick={() => setPaymentType('installments')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentType === 'installments'
                        ? 'bg-gradient-to-r from-[#7C3AED]/25 to-[#06B6D4]/25 border-[#7C3AED] text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-[#7C3AED]" />
                        الدفع المجزأ / الأقساط (Pay-per-Module)
                      </span>
                      <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded font-bold">
                        3 دفعات
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      قسّم الرسوم على 3 دفعات شهرية ميسرة بدون فوائد إضافية.
                    </p>
                  </div>

                  {/* Option C: الدفع عبر محفظة المهارات */}
                  <div
                    onClick={() => setPaymentType('wallet')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentType === 'wallet'
                        ? 'bg-gradient-to-r from-amber-500/20 to-teal-500/20 border-amber-400 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Wallet className="w-4 h-4 text-amber-400" />
                        محفظة المهارات (Skill Wallet Cashback)
                      </span>
                      <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                        رصيدك: {walletBalance} درهم
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      استخدم رصيد الكاشباك المكتسب من إنجازاتك ودوراتك السابقة.
                    </p>
                  </div>

                  {/* Option D: حجز مجموعات للمؤسسات B2B */}
                  <div
                    onClick={() => setPaymentType('b2b-group')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentType === 'b2b-group'
                        ? 'bg-gradient-to-r from-cyan-600/25 to-blue-600/25 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-cyan-400" />
                        حجز مجموعات للشركات (B2B Group Booking)
                      </span>
                      <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded font-bold">
                        خصم 15% للشركات
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      تسجيل متعدد لموظفي شركتك مع فاتورة ضريبية رسمية.
                    </p>
                  </div>

                </div>
              </div>

              {/* Sub-inputs if B2B is chosen */}
              {paymentType === 'b2b-group' && (
                <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-3 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">اسم الشركة أو المؤسسة:</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="اسم الشركة"
                        className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-300 block mb-1 font-bold">عدد المقاعد المطلوبة:</label>
                      <select
                        value={b2bSeatsCount}
                        onChange={(e) => setB2bSeatsCount(Number(e.target.value))}
                        className="w-full bg-slate-900 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                      >
                        <option value={3}>3 مقاعد (-15% خصم)</option>
                        <option value={5}>5 مقاعد (-15% خصم)</option>
                        <option value={10}>10 مقاعد (-15% خصم)</option>
                        <option value={20}>20 مقعداً (-15% خصم خاص)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Wallet Cashback deduction affordance if learner has balance and isn't using pure wallet mode */}
              {walletBalance > 0 && paymentType !== 'wallet' && (
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                    <input
                      type="checkbox"
                      checked={useWalletCashback}
                      onChange={(e) => setUseWalletCashback(e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <span>
                      استخدام رصيد الكاشباك المتاح ({walletBalance} درهم) كخصم إضافي من الفاتورة
                    </span>
                  </label>
                  <span className="font-bold text-amber-300">-{Math.min(walletBalance, finalAmount)} درهم</span>
                </div>
              )}

              {/* Installment Info if selected */}
              {installmentInfo && (
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/50 text-xs text-purple-200 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{installmentInfo}</span>
                </div>
              )}

              {/* Payer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1 font-bold">الاسم الكامل لشهادة الحجز:</label>
                  <input
                    type="text"
                    required
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1 font-bold">البريد الإلكتروني للإيصال والضمان:</label>
                  <input
                    type="email"
                    required
                    value={payerEmail}
                    onChange={(e) => setPayerEmail(e.target.value)}
                    className="w-full bg-slate-950 text-xs text-white p-2.5 rounded-xl border border-slate-700 outline-none"
                  />
                </div>
              </div>

              {/* Final Invoice Summary */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>المبلغ الإجمالي للمقاعد ({seatsBooked} مقعد)</span>
                  <span>{basePrice * seatsBooked} درهم</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>خصم مطبق (شركات / محفظة)</span>
                    <span>-{discountAmount} درهم</span>
                  </div>
                )}

                {walletDeductionApplied > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>خصم رصيد كاشباك المحفظة</span>
                    <span>-{walletDeductionApplied} درهم</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-black text-white">
                  <span>المبلغ المستحق الآن للدفع:</span>
                  <span className="text-lg text-[#06B6D4] font-black">{finalAmount} درهم</span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>حماية الضمان الوسيط: 100% Escrow Protected</span>
                  <span className="text-emerald-400 font-semibold">ستكسب +{Math.round(finalAmount * 0.05)} درهم كاشباك فوري</span>
                </div>
              </div>

              {/* Submit Payment CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] text-white font-black text-sm shadow-xl shadow-[#7C3AED]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>جاري تأكيد التحصيل والإيداع في الحساب الوسيط...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>تأكيد الدفع ({finalAmount} درهم) وحجز المقاعد الآن</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
