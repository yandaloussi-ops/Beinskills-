export interface SpecializationCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  specializations: {
    id: string;
    name: string;
    marketDemand: 'مرتفع جداً' | 'مرتفع' | 'واعد';
    description: string;
    subSkills: string[];
    coursesCount: number;
  }[];
}

export const ALL_SPECIALIZATIONS: SpecializationCategory[] = [
  {
    id: 'tech-and-ai',
    title: 'الميادين التقنية والتكنولوجية والذكاء الاصطناعي',
    icon: 'Cpu',
    description: 'تخصصات العصر الرقمي وهندسة البرمجيات والنظم السحابية والأمان الرقمي',
    color: '#06B6D4',
    specializations: [
      {
        id: 'spec-genai',
        name: 'الذكاء الاصطناعي التوليدي وهندسة الأوامر (Prompt Engineering)',
        marketDemand: 'مرتفع جداً',
        description: 'بناء تطبيقات النماذج اللغوية الكبيرة LLMs وأتمتة المهام بالذكاء الاصطناعي.',
        subSkills: ['Gemini API', 'LangChain', 'Prompt Tuning', 'RAG Systems'],
        coursesCount: 8,
      },
      {
        id: 'spec-fullstack',
        name: 'هندسة البرمجيات الشاملة (Full-Stack Web Development)',
        marketDemand: 'مرتفع جداً',
        description: 'تطوير تطبيقات الويب الحديثة من الواجهة إلى قواعد البيانات والسحابة.',
        subSkills: ['React 19', 'Node.js', 'PostgreSQL', 'Docker'],
        coursesCount: 14,
      },
      {
        id: 'spec-cybersecurity',
        name: 'الأمن السيبراني والدفاع الرقمي واختبار الاختراق',
        marketDemand: 'مرتفع جداً',
        description: 'حماية الشبكات، كشف الثغرات، ومطابقة معايير الأمان الدولية ISO 27001.',
        subSkills: ['Ethical Hacking', 'OWASP Top 10', 'SOC Analysis', 'Kali Linux'],
        coursesCount: 6,
      },
      {
        id: 'spec-cloud-devops',
        name: 'الحوسبة السحابية وهندسة الـ DevOps والـ CI/CD',
        marketDemand: 'مرتفع جداً',
        description: 'إدارة البنى التحتية السحابية، أتمتة النشر المستمر، ونظم Kubernetes.',
        subSkills: ['AWS', 'GCP', 'Kubernetes', 'Terraform'],
        coursesCount: 5,
      },
      {
        id: 'spec-data-engineering',
        name: 'هندسة البيانات الضخمة وذكاء الأعمال (Big Data & BI)',
        marketDemand: 'مرتفع',
        description: 'بناء خطوط معالجة البيانات، ونظم تخزين البيانات السحابية ولوحات التحليل.',
        subSkills: ['Python', 'SQL', 'Power BI', 'Apache Spark'],
        coursesCount: 9,
      },
      {
        id: 'spec-mobile-apps',
        name: 'تطوير تطبيقات الهواتف الذكية (iOS & Android)',
        marketDemand: 'مرتفع',
        description: 'بناء تطبيقات هاتفية هجينة وأصلية ذات تجربة مستخدم سلسة.',
        subSkills: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
        coursesCount: 7,
      },
    ],
  },
  {
    id: 'business-leadership',
    title: 'ميادين الأعمال والإدارة والريادة',
    icon: 'Briefcase',
    description: 'تخصصات قيادة الشركات، إدارة المنتجات الرقمية، والتسويق الحديث والمالية',
    color: '#7C3AED',
    specializations: [
      {
        id: 'spec-product-mgmt',
        name: 'إدارة المنتجات الرقمية (Digital Product Management)',
        marketDemand: 'مرتفع جداً',
        description: 'قيادة دورة حياة المنتج الرقمي من الفكرة إلى النمو وملاءمة السوق.',
        subSkills: ['Agile / Scrum', 'User Research', 'Product Analytics', 'Roadmapping'],
        coursesCount: 5,
      },
      {
        id: 'spec-digital-marketing',
        name: 'التسويق الرقمي المتقدم وقمع النمو (Growth Marketing)',
        marketDemand: 'مرتفع جداً',
        description: 'إدارة الحملات الإعلانية المدفوعة، السيو SEO، وقمع التحويل الرقمي.',
        subSkills: ['SEO & SEM', 'Meta Ads', 'Google Analytics 4', 'Email Funnels'],
        coursesCount: 11,
      },
      {
        id: 'spec-entrepreneurship',
        name: 'ريادة الأعمال وبناء الشركات الناشئة (Startups Incubation)',
        marketDemand: 'مرتفع',
        description: 'بناء نماذج الأعمال، إعداد دراسات الجدوى، وجذب التمويل الاستثماري.',
        subSkills: ['Business Model Canvas', 'Pitch Decks', 'Venture Capital', 'Go-to-Market'],
        coursesCount: 6,
      },
      {
        id: 'spec-corporate-finance',
        name: 'المالية للشركات والنمذجة المالية الاستثمارية',
        marketDemand: 'مرتفع',
        description: 'إدارة التدفقات النقدية، تقييم الشركات، والتحليل المالي المتقدم.',
        subSkills: ['Financial Modeling', 'Valuation', 'Excel Advanced', 'Budgeting'],
        coursesCount: 4,
      },
      {
        id: 'spec-supply-chain',
        name: 'إدارة سلاسل الإمداد والخدمات اللوجستية والتجارة الدولية',
        marketDemand: 'واعد',
        description: 'تخطيط العمليات اللوجستية، إدارة المستودعات، والتجارة الإلكترونية العابرة للحدود.',
        subSkills: ['Supply Planning', 'ERP Systems', 'Procurement', 'Inventory Management'],
        coursesCount: 4,
      },
    ],
  },
  {
    id: 'design-creativity',
    title: 'ميادين التصميم الرقمي وصناعة المحتوى والإبداع',
    icon: 'Palette',
    description: 'تخصصات تجربة المستخدم، الهويات البصرية، الرسوم المتحركة، والمونتاج',
    color: '#EC4899',
    specializations: [
      {
        id: 'spec-ui-ux',
        name: 'تصميم تجربة وواجهة المستخدم (UX/UI Design & Systems)',
        marketDemand: 'مرتفع جداً',
        description: 'أبحاث المستخدم، تصميم الواجهات التفاعلية، وبناء Design Systems.',
        subSkills: ['Figma', 'Wireframing', 'Prototyping', 'Usability Testing'],
        coursesCount: 9,
      },
      {
        id: 'spec-motion-graphics',
        name: 'الموشن جرافيك والتحريك ثنائي وثلاثي الأبعاد',
        marketDemand: 'مرتفع',
        description: 'صناعة الإعلانات المتحركة، المؤثرات البصرية، ونمذجة 3D.',
        subSkills: ['After Effects', 'Blender', 'Cinema 4D', 'Animation Principles'],
        coursesCount: 5,
      },
      {
        id: 'spec-video-editing',
        name: 'المونتاج السينمائي وصناعة الفيديو للمنصات الرقمية',
        marketDemand: 'مرتفع جداً',
        description: 'تحرير الفيديوهات الاحترافية، تصحيح الألوان، وتصميم الصوت الإبداعي.',
        subSkills: ['Premiere Pro', 'DaVinci Resolve', 'Color Grading', 'Sound Design'],
        coursesCount: 8,
      },
      {
        id: 'spec-copywriting',
        name: 'الكتابة الإعلانية وسرد القصص للعلامات التجارية (Copywriting)',
        marketDemand: 'مرتفع',
        description: 'صياغة النصوص الإعلانية المؤثرة واستراتيجيات المحتوى الرقمي.',
        subSkills: ['Direct Response Copy', 'Brand Storytelling', 'Content Strategy'],
        coursesCount: 4,
      },
    ],
  },
  {
    id: 'academic-cognitive',
    title: 'الميادين المعرفية والأكاديمية واللغات',
    icon: 'BookOpen',
    description: 'تخصصات العلوم التطبيقية، اللغات الحية للأعمال، القانون، والتربية الحديثة',
    color: '#F59E0B',
    specializations: [
      {
        id: 'spec-business-english',
        name: 'اللغة الإنجليزية المهنية واجتياز المقابلات الدولية',
        marketDemand: 'مرتفع جداً',
        description: 'إتقان التواصل المهني، العروض التقديمية بالإنجليزية، والتفاوض.',
        subSkills: ['Business Presentations', 'Email Writing', 'IELTS/TOEFL Prep'],
        coursesCount: 12,
      },
      {
        id: 'spec-digital-pedagogy',
        name: 'هندسة التعليم الرقمي وتصميم المناهج التفاعلية (EdTech)',
        marketDemand: 'واعد',
        description: 'تصميم المقررات الإلكترونية واستخدام الذكاء الاصطناعي في التدريس.',
        subSkills: ['Instructional Design', 'LMS Platforms', 'Gamification'],
        coursesCount: 3,
      },
      {
        id: 'spec-business-law',
        name: 'قانون الأعمال والعقود التجارية والملكية الفكرية',
        marketDemand: 'واعد',
        description: 'صياغة العقود التجارية، حماية الابتكارات، والامتثال القانوني للشركات.',
        subSkills: ['Commercial Contracts', 'IP Protection', 'Corporate Compliance'],
        coursesCount: 3,
      },
      {
        id: 'spec-data-stats',
        name: 'الإحصاء التطبيقي والمنهجيات العلمية لصناع القرار',
        marketDemand: 'مرتفع',
        description: 'تحليل البيانات البحثية والاستدلال الإحصائي واتخاذ القرارات.',
        subSkills: ['SPSS / R', 'Hypothesis Testing', 'Statistical Modeling'],
        coursesCount: 4,
      },
    ],
  },
  {
    id: 'self-development',
    title: 'ميادين التنمية الذاتية وبناء القدرات الشخصية (Soft Skills)',
    icon: 'Sparkles',
    description: 'مهارات القيادة الفعالة، الذكاء العاطفي، الخطابة، والتفاوض، وإدارة الذات',
    color: '#10B981',
    specializations: [
      {
        id: 'spec-public-speaking',
        name: 'فن الخطابة والتحدث أمام الجمهور والتأثير القيادي',
        marketDemand: 'مرتفع جداً',
        description: 'التغلب على رهبة المسرح، لغة الجسد الكاريزمية، وهيكلة الخطاب المقنع.',
        subSkills: ['Body Language', 'Vocal Variety', 'Storytelling', 'TEDx Style Talks'],
        coursesCount: 7,
      },
      {
        id: 'spec-emotional-intelligence',
        name: 'الذكاء العاطفي والاجتماعي وإدارة الضغوط المهنية',
        marketDemand: 'مرتفع جداً',
        description: 'فهم المشاعر الذاتية وإدارتها، بناء بيئات عمل إيجابية، والمرونة النفسية.',
        subSkills: ['Stress Management', 'Empathy', 'Self-Awareness', 'Conflict Resolution'],
        coursesCount: 6,
      },
      {
        id: 'spec-negotiation',
        name: 'فن التفاوض المتقدم وإقناع أصحاب المصلحة (Win-Win Negotiation)',
        marketDemand: 'مرتفع جداً',
        description: 'منهجيات هارفارد للتفاوض، إغلاق الصفقات، وحل النزاعات المعقدة.',
        subSkills: ['Principled Negotiation', 'Persuasion', 'BATNA Strategy'],
        coursesCount: 5,
      },
      {
        id: 'spec-productivity-habits',
        name: 'إدارة الوقت فائقة الإنتاجية وبناء العادات الذرية',
        marketDemand: 'مرتفع',
        description: 'هندسة اليوم المثالي، القضاء على التسويف، وأنظمة التركيز العميق (Deep Work).',
        subSkills: ['Deep Work', 'Atomic Habits', 'Time Blocking', 'Notion Systems'],
        coursesCount: 8,
      },
      {
        id: 'spec-executive-coaching',
        name: 'الإرشاد والتوجيه القيادي (Executive Coaching & Mentorship)',
        marketDemand: 'واعد',
        description: 'أدوات الكوتشينج المعتمدة دولياً لمساعدة الأفراد والفرق على النمو.',
        subSkills: ['Active Listening', 'GROW Model', 'Leadership Development'],
        coursesCount: 4,
      },
    ],
  },
];
