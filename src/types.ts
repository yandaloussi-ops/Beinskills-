export type CourseMode = 'remote' | 'in-person';
export type CourseApprovalStatus = 'approved' | 'pending' | 'rejected';
export type ActiveViewRole = 'student' | 'instructor' | 'admin';
export type PaymentType = 'escrow-full' | 'installments' | 'wallet' | 'b2b-group';
export type EscrowStatus = 'held_in_escrow' | 'released' | 'refunded';
export type UserAccountRole = 'student' | 'instructor' | 'institute_b2b';
export type UserAccountStatus = 'active' | 'suspended' | 'blocked';

export type TrustCertificateTier = 'diamond' | 'gold' | 'silver';

export interface TrustCertificate {
  id: string;
  recipientName: string;
  recipientTitle: string;
  recipientType: 'instructor' | 'institute';
  tier: TrustCertificateTier;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  verificationHash: string;
  qrCodeUrl?: string;
  score: number; // e.g. 98/100
  satisfactionRate: number; // e.g. 99%
  completedCoursesCount: number;
  totalStudentsTrained: number;
  escrowReliabilityRate: number; // e.g. 100%
  accreditedDomains: string[];
  auditedBy: string;
  features: string[];
}

export interface Instructor {
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  trustTier?: TrustCertificateTier;
  trustCertificate?: TrustCertificate;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  instructor: Instructor;
  mode: CourseMode;
  location: string;
  remainingSeats: number;
  totalSeats: number;
  price: number;
  currency: string;
  duration: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم' | 'جميع المستويات';
  image: string;
  syllabus: string[];
  features: string[];
  badgeName: string;
  badgeIcon: string;
  startDate: string;
  featured?: boolean;
  status?: CourseApprovalStatus;
  enrolledStudentsCount?: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  dateEarned: string;
  isCustomAi?: boolean;
  imageUrl?: string;
  resolution?: '1K' | '2K' | '4K';
  rarity: 'برونزي' | 'فضي' | 'ذهبي' | 'ألماسي' | 'خاص بالذكاء الاصطناعي';
}

export interface WalletTransaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  reason: string;
  date: string;
}

export interface SkillWallet {
  balance: number;
  currency: string;
  history: WalletTransaction[];
}

export interface UserProfile {
  name: string;
  headline: string;
  avatar: string;
  level: number;
  levelTitle: string;
  xp: number;
  nextLevelXp: number;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  badges: AchievementBadge[];
  wallet?: SkillWallet;
}

export interface Transaction {
  id: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  payerName: string;
  payerEmail: string;
  amount: number;
  currency: string;
  platformFee: number; // 10-15% platform commission
  instructorPayout: number;
  seatsCount: number;
  paymentType: PaymentType;
  escrowStatus: EscrowStatus;
  date: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserAccountRole;
  status: UserAccountStatus;
  verified: boolean;
  coursesCount: number;
  joinedDate: string;
  balance: number;
  trustTier?: TrustCertificateTier;
  trustCertificate?: TrustCertificate;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

export type GeminiModelType = 'gemini-3.1-flash-lite' | 'gemini-3.8-flash' | 'gemini-4-argon';
