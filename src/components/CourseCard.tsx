import React from 'react';
import { 
  Users, 
  MapPin, 
  Video, 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowLeft,
  Sparkles,
  Zap
} from 'lucide-react';
import { Course } from '../types';
import { Language, translations } from '../translations';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  onSelectCourse: (course: Course) => void;
  onEnroll: (course: Course) => void;
  currentLang?: Language;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled,
  onSelectCourse,
  onEnroll,
  currentLang = 'ar',
}) => {
  const t = translations[currentLang];
  const seatsOccupied = course.totalSeats - course.remainingSeats;
  const percentageTaken = Math.round((seatsOccupied / course.totalSeats) * 100);
  const isAlmostFull = course.remainingSeats <= 4;

  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col border border-slate-800/80 bg-slate-900/60 shadow-xl relative group">
      
      {/* Course Cover Image & Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent"></div>

        {/* Top Floating Badges */}
        <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
          {/* Mode Badge: Remote vs In-Person */}
          {course.mode === 'remote' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#06B6D4]/90 text-slate-950 shadow-md backdrop-blur-md">
              <Video className="w-3.5 h-3.5" />
              <span>{t.mode_remote}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED]/90 text-white shadow-md backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.mode_in_person}</span>
            </span>
          )}

          {/* Category Pill */}
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
            {course.category}
          </span>
        </div>

        {/* Floating Urgency Seat Badge */}
        <div className="absolute bottom-3 right-3 rtl:right-3 ltr:left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold shadow-md backdrop-blur-md ${
              isAlmostFull
                ? 'bg-rose-500/90 text-white animate-pulse'
                : 'bg-slate-900/85 text-amber-300 border border-amber-500/30'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>
              {course.remainingSeats > 0
                ? `${course.remainingSeats} ${t.seats_remaining}`
                : t.seats_full}
            </span>
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title & Description */}
        <div className="space-y-2">
          <h3 
            onClick={() => onSelectCourse(course)}
            className="text-base sm:text-lg font-bold text-white hover:text-[#06B6D4] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {course.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Instructor Info */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#7C3AED]/50"
            />
            <div>
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-xs font-bold text-slate-200">
                  {course.instructor.name}
                </span>
                {course.instructor.verified && (
                  <CheckCircle className="w-3.5 h-3.5 text-[#06B6D4]" />
                )}
                {course.instructor.trustTier === 'diamond' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-cyan-950/90 text-[#06B6D4] border border-cyan-800/80 font-bold inline-flex items-center gap-0.5 shadow-sm">
                    <span>💎</span>
                    <span>ماسي</span>
                  </span>
                )}
                {course.instructor.trustTier === 'gold' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-950/90 text-amber-300 border border-amber-800/80 font-bold inline-flex items-center gap-0.5 shadow-sm">
                    <span>🥇</span>
                    <span>ذهبي</span>
                  </span>
                )}
                {course.instructor.trustTier === 'silver' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700 font-bold inline-flex items-center gap-0.5 shadow-sm">
                    <span>🥈</span>
                    <span>فضي</span>
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 block max-w-[150px] truncate">
                {course.instructor.title}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700/50">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-slate-200">
              {course.instructor.rating}
            </span>
          </div>
        </div>

        {/* Location & Duration Metadata */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
            <span className="truncate">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
            <span className="truncate">{t.starts_on} {course.startDate}</span>
          </div>
        </div>

        {/* Urgency Progress Bar for Seats */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">{t.seats_progress}</span>
            <span className={`font-semibold ${isAlmostFull ? 'text-rose-400' : 'text-[#06B6D4]'}`}>
              {percentageTaken}% ({seatsOccupied}/{course.totalSeats})
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isAlmostFull
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                  : 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]'
              }`}
              style={{ width: `${percentageTaken}%` }}
            ></div>
          </div>
        </div>

        {/* Price & Join Button */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-medium">{t.course_fee}</div>
            <div className="text-lg font-black text-white">
              {course.price}{' '}
              <span className="text-xs font-normal text-[#06B6D4]">{t.currency}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCourse(course)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer"
            >
              {t.details}
            </button>

            {isEnrolled ? (
              <span className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-600/50">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{t.enrolled_badge}</span>
              </span>
            ) : (
              <button
                onClick={() => onEnroll(course)}
                disabled={course.remainingSeats <= 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:from-[#6D28D9] hover:to-[#0891B2] text-white shadow-md shadow-[#7C3AED]/20 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{t.join_course}</span>
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
