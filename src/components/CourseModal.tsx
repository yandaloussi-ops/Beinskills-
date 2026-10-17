import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Video, 
  Clock, 
  Calendar, 
  Star, 
  CheckCircle2, 
  Users, 
  Award, 
  ShieldCheck, 
  Check, 
  ArrowLeft,
  CreditCard,
  Lock,
  Wallet
} from 'lucide-react';
import { Course } from '../types';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEnrollConfirm: (courseId: string, studentName: string) => void;
  onOpenCheckout: (course: Course) => void;
  isAlreadyEnrolled: boolean;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  isOpen,
  onClose,
  onEnrollConfirm,
  onOpenCheckout,
  isAlreadyEnrolled,
}) => {
  if (!isOpen || !course) return null;

  const isAlmostFull = course.remainingSeats <= 4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Image Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Mode & Urgency Badges */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {course.mode === 'remote' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#06B6D4] text-slate-950 shadow-md">
                <Video className="w-3.5 h-3.5" />
                <span>عن بعد (Online)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED] text-white shadow-md">
                <MapPin className="w-3.5 h-3.5" />
                <span>حضوري (In-Person)</span>
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-amber-300 border border-amber-500/30">
              {course.remainingSeats} مقاعد متبقية
            </span>
          </div>

          <div className="absolute bottom-3 right-4 left-4">
            <span className="text-xs text-[#06B6D4] font-bold block mb-1">
              {course.category} • المستوى: {course.level}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white leading-snug line-clamp-2">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Instructor Bio */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#7C3AED]"
              />
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-bold text-white">
                    {course.instructor.name}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
                  {course.instructor.trustTier === 'diamond' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-[#06B6D4] border border-cyan-800 font-bold flex items-center gap-1 shadow-sm">
                      <span>💎</span>
                      <span>الشهادة الماسية</span>
                    </span>
                  )}
                  {course.instructor.trustTier === 'gold' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-bold flex items-center gap-1 shadow-sm">
                      <span>🥇</span>
                      <span>الشهادة الذهبية</span>
                    </span>
                  )}
                  {course.instructor.trustTier === 'silver' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-bold flex items-center gap-1 shadow-sm">
                      <span>🥈</span>
                      <span>الشهادة الفضية</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{course.instructor.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 text-xs">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white">{course.instructor.rating}</span>
              <span className="text-slate-500 text-[10px]">({course.instructor.reviewsCount})</span>
            </div>
          </div>

          {/* Description & Location */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white">نبذة عن البرنامج التدريبي:</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {course.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <MapPin className="w-4 h-4 text-[#06B6D4]" />
              <span>مكان الإجراء: {course.location}</span>
            </div>
          </div>

          {/* Syllabus / Key Modules */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold text-white">محاور التكوين الرئيسية (Syllabus):</h4>
            <div className="grid grid-cols-1 gap-2">
              {course.syllabus.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-200"
                >
                  <span className="w-5 h-5 rounded-full bg-[#7C3AED]/30 text-[#06B6D4] font-black flex items-center justify-center shrink-0 text-[11px]">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Passport Reward Badge */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20 border border-[#06B6D4]/40 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-[#06B6D4] shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                تمنحك هذه الدورة: {course.badgeName}
              </div>
              <p className="text-[11px] text-slate-300">
                يتم تثبيت هذه الشارة تلقائياً في جواز مهاراتك عند إتمام المسار!
              </p>
            </div>
          </div>

          {/* Monetization / Checkout Trigger Section */}
          {!isAlreadyEnrolled ? (
            <div className="pt-3 border-t border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-slate-400 block">رسوم التكوين الرسمية:</span>
                  <div className="text-xl font-black text-white">
                    {course.price}{' '}
                    <span className="text-xs font-bold text-[#06B6D4]">{course.currency}</span>
                  </div>
                </div>

                <div className="text-left text-[11px] text-emerald-400 flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>دفع محمي 100% عبر الحساب الوسيط Escrow</span>
                </div>
              </div>

              {/* Supported payment options mini bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-300 text-center">
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">حساب وسيط آمن</div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">أقساط شهرية ميسرة</div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">كاشباك المحفظة</div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">حجز شركات B2B (-15%)</div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout(course);
                }}
                disabled={course.remainingSeats <= 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] text-white font-black text-sm shadow-xl shadow-[#7C3AED]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CreditCard className="w-4 h-4" />
                <span>الانتقال لبوابة الدفع والتحصيل الآمن (Checkout)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/60 text-center space-y-1">
              <div className="text-sm font-bold text-emerald-300 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-5 h-5" />
                <span>أنت مسجل ومحجوز مسبقاً في هذا التكوين</span>
              </div>
              <p className="text-xs text-emerald-400/80">
                يمكنك الاطلاع على حالة حجزك ومستحقاتك في جواز مهاراتك.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
