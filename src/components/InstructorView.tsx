import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  DollarSign, 
  Award, 
  Plus, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Calendar,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { Course, Transaction, TrustCertificate } from '../types';
import { Language, translations } from '../translations';
import { TrustPassportCard } from './TrustPassportCard';

interface InstructorViewProps {
  courses: Course[];
  transactions: Transaction[];
  onOpenCreateCourse: () => void;
  onRequestPayout: (courseTitle: string, amount: number) => void;
  onOpenCertificateModal?: (cert: TrustCertificate) => void;
  currentLang?: Language;
}

export const InstructorView: React.FC<InstructorViewProps> = ({
  courses,
  transactions,
  onOpenCreateCourse,
  onRequestPayout,
  onOpenCertificateModal,
  currentLang = 'ar',
}) => {
  const t = translations[currentLang];
  const [payoutRequestedMessage, setPayoutRequestedMessage] = useState<string | null>(null);

  // Instructor stats (based on active courses)
  const totalCourses = courses.length;
  const totalStudents = courses.reduce((acc, c) => acc + (c.enrolledStudentsCount || (c.totalSeats - c.remainingSeats)), 0);
  
  // Calculate total earnings & pending in escrow
  const totalGross = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalPlatformFees = transactions.reduce((acc, t) => acc + t.platformFee, 0);
  const netInstructorTotal = totalGross - totalPlatformFees;

  const pendingEscrow = transactions
    .filter((t) => t.escrowStatus === 'held_in_escrow')
    .reduce((acc, t) => acc + t.instructorPayout, 0);

  const releasedPayout = transactions
    .filter((t) => t.escrowStatus === 'released')
    .reduce((acc, t) => acc + t.instructorPayout, 0);

  const handleRequestPayoutClick = (courseTitle: string, amount: number) => {
    onRequestPayout(courseTitle, amount);
    setPayoutRequestedMessage(`تم إرسال طلب تحرير الدفعة بمبلغ ${amount} درهم للإدارة بنجاح!`);
    setTimeout(() => setPayoutRequestedMessage(null), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Instructor Banner Header */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#06B6D4]/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4 text-center sm:text-right">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt="Instructor"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-[#06B6D4] shadow-xl"
            />
            <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-slate-950 p-1 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                {t.instructor_portal_title}
              </h2>
              <span className="text-[10px] bg-cyan-950 text-[#06B6D4] px-2.5 py-0.5 rounded-full border border-cyan-800 font-bold">
                {t.instructor_verified_badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {t.instructor_banner_sub}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCreateCourse}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs sm:text-sm font-bold shadow-xl shadow-[#7C3AED]/20 hover:shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t.create_course_btn}</span>
        </button>
      </div>

      {/* Payout Notification Toast */}
      {payoutRequestedMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{payoutRequestedMessage}</span>
        </div>
      )}

      {/* Instructor Financial & Operational KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-950/60">
          <div className="text-[11px] text-slate-400 font-medium">{t.kpi_net_earnings}</div>
          <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
            {netInstructorTotal.toLocaleString()} <span className="text-xs">{t.currency}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">12% fee deducted</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-amber-500/30 bg-slate-950/60">
          <div className="text-[11px] text-slate-400 font-medium">{t.kpi_escrow_pending}</div>
          <div className="text-2xl font-black text-amber-300 mt-1 font-mono">
            {pendingEscrow.toLocaleString()} <span className="text-xs">{t.currency}</span>
          </div>
          <div className="text-[10px] text-amber-400/90 mt-1">{t.escrow_active}</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-950/60">
          <div className="text-[11px] text-slate-400 font-medium">{t.kpi_released_payouts}</div>
          <div className="text-2xl font-black text-[#06B6D4] mt-1 font-mono">
            {releasedPayout.toLocaleString()} <span className="text-xs">{t.currency}</span>
          </div>
          <div className="text-[10px] text-cyan-400 mt-1">Verified</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-950/60">
          <div className="text-[11px] text-slate-400 font-medium">{t.kpi_total_students}</div>
          <div className="text-2xl font-black text-purple-300 mt-1 font-mono">
            {totalStudents}
          </div>
          <div className="text-[10px] text-purple-400 mt-1">({totalCourses} courses)</div>
        </div>

      </div>

      {/* Trust & Accreditation Passport for Instructors & Institutes (مشابه لجواز المتدربين) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#06B6D4]" />
            <h3 className="text-base font-bold text-white font-['Alexandria']">
              {currentLang === 'ar' ? 'شهادة الثقة والاعتماد المؤسسي للمكوّن والمؤسسة (Trust Passport)' : 'Institutional & Instructor Trust Passport'}
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {currentLang === 'ar' ? 'مصادق عليها رسمياً من BeInSkills' : 'Officially Certified by BeInSkills'}
          </span>
        </div>

        <TrustPassportCard
          onOpenCertificateModal={(cert) => {
            if (onOpenCertificateModal) {
              onOpenCertificateModal(cert);
            }
          }}
          currentLang={currentLang}
        />
      </section>

      {/* Courses Managed by this Instructor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white font-['Alexandria']">
            تكويناتي النشطة ومتابعة المقاعد والتحصيل
          </h3>
          <span className="text-xs text-[#06B6D4] font-bold">
            {courses.length} دورات معتمدة
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => {
            const enrolledCount = course.enrolledStudentsCount || (course.totalSeats - course.remainingSeats);
            const courseRevenue = enrolledCount * course.price;
            const netCourseEarnings = Math.round(courseRevenue * 0.88);

            return (
              <div
                key={course.id}
                className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-[#06B6D4]/40 bg-slate-900/70 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{course.title}</h4>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        {course.category} • {course.mode === 'remote' ? 'عن بعد' : 'حضوري'}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold mt-0.5 inline-block">
                        السعر: {course.price} درهم/مقعد
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    معتمد ونشط
                  </span>
                </div>

                {/* Seats and Enrollment progress */}
                <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">حالة حجز المقاعد:</span>
                    <span className="text-white font-bold">
                      {enrolledCount} مسجلين من أصل {course.totalSeats} ({course.remainingSeats} مقاعد متبقية)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full"
                      style={{ width: `${Math.round((enrolledCount / course.totalSeats) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Financial Summary & Escrow Payout Request */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">صافي أرباح الدورة:</span>
                    <span className="text-sm font-black text-emerald-400 font-mono">
                      {netCourseEarnings.toLocaleString()} درهم
                    </span>
                  </div>

                  <button
                    onClick={() => handleRequestPayoutClick(course.title, netCourseEarnings)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white text-xs font-bold border border-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>طلب تحرير الدفعة</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
