export interface SpecializationItem {
  id: string;
  name: string;
  marketDemand: 'مرتفع جداً' | 'مرتفع' | 'واعد';
  description: string;
  subSkills: string[];
  coursesCount: number;
}

export interface SpecializationCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  specializations: SpecializationItem[];
}

export const ALL_SPECIALIZATIONS: SpecializationCategory[] = [
  // 1. الذكاء الاصطناعي والتكنولوجيا
  {
    id: 'tech-and-ai',
    title: 'الميادين التقنية والتكنولوجية والذكاء الاصطناعي',
    icon: 'Cpu',
    description: 'تخصصات العصر الرقمي، هندسة البرمجيات، النظم السحابية، والأمان الرقمي',
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
        name: 'الحوسبة السحابية وهندسة DevOps والـ CI/CD',
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

  // 2. الفنون الجميلة والأداء التعبيري (طلب المستخدم الخاص)
  {
    id: 'fine-and-performing-arts',
    title: 'ميادين الفنون الجميلة والتعبير الإبداعي والأداء الركحي',
    icon: 'Palette',
    description: 'الرسم، الموسيقى، فنون المسرح، الرقص الإيقاعي، السينما، والتصوير الفوتوغرافي',
    color: '#F43F5E',
    specializations: [
      {
        id: 'spec-classical-painting',
        name: 'الرسم التشكيلي، الصباغة الزيتية، والمائية (Fine Arts & Painting)',
        marketDemand: 'مرتفع',
        description: 'تقنيات التظليل، المنظور، نظرية الألوان، الرسم الزيتي والمائي والتجريدي المعاصر.',
        subSkills: ['Oil Painting', 'Watercolor', 'Color Theory', 'Perspective & Anatomy'],
        coursesCount: 6,
      },
      {
        id: 'spec-music-audio',
        name: 'الموسيقى، العزف على الآلات، والإنتاج الصوتي الرقمي',
        marketDemand: 'مرتفع',
        description: 'النظريات الموسيقية (الصولفيج)، العزف (بيانو، عود، جيتار)، والتوزيع الصوتي في الاستوديوهات.',
        subSkills: ['Music Theory', 'Piano/Oud Mastery', 'DAW (Logic/Ableton)', 'Audio Mixing'],
        coursesCount: 9,
      },
      {
        id: 'spec-theater-acting',
        name: 'فنون المسرح، التمثيل، والتعبير الدرامي الركحي',
        marketDemand: 'واعد',
        description: 'إعداد الممثل، النطق والإلقاء المسرحي، الارتجال، والتحكم في تعابير الجسد والصوت.',
        subSkills: ['Method Acting', 'Voice Projection', 'Improvisation', 'Stage Presence'],
        coursesCount: 5,
      },
      {
        id: 'spec-dance-movement',
        name: 'التعبير الحركي والرقص الإيقاعي والمعاصر (Choreography)',
        marketDemand: 'واعد',
        description: 'تناسق الحركة مع الإيقاع، المرونة الجسدية، تصميم اللوحات التعبيرية، والأداء الاستعراضي.',
        subSkills: ['Contemporary Movement', 'Rhythm Coordination', 'Choreography', 'Body Balance'],
        coursesCount: 4,
      },
      {
        id: 'spec-filmmaking-cinema',
        name: 'الإخراج السينمائي، التصوير الفوتوغرافي، وكتابة السيناريو',
        marketDemand: 'مرتفع جداً',
        description: 'بناء المشهد السينمائي، إضاءة الكاميرا الاحترافية، كتابة النصوص الدرامية، وإدارة التصوير.',
        subSkills: ['Cinematography', 'Screenplay Writing', 'Lighting & Lenses', 'Directing Actors'],
        coursesCount: 8,
      },
      {
        id: 'spec-sculpture-ceramics',
        name: 'فنون النحت، تشكيل الطين، والخزف الفني (Sculpture & Ceramics)',
        marketDemand: 'واعد',
        description: 'التشكيل ثلاثي الأبعاد، نحت الحجر والخشب، وتقنيات حرق وتلوين الخزف المعاصر.',
        subSkills: ['Clay Molding', 'Ceramic Glazing', '3D Form Studies', 'Relief Carving'],
        coursesCount: 3,
      },
    ],
  },

  // 3. تدريب المكونين والكوتشينغ (طلب المستخدم الخاص)
  {
    id: 'tot-and-coaching',
    title: 'تدريب المكوّنين (TOT) والكوتشينغ الاحترافي المعتمد',
    icon: 'Award',
    description: 'تأهيل المدربين المحترفين، الكوتشينغ القيادي والحياتي، وهندسة الحقائب التدريبية',
    color: '#8B5CF6',
    specializations: [
      {
        id: 'spec-tot-certified',
        name: 'تدريب المدربين المعتمد وتصميم الحقائب التدريبية (Certified TOT)',
        marketDemand: 'مرتفع جداً',
        description: 'منهجيات تدريب الكبار (Andragogy)، مهارات العرض والإلقاء المؤثر، وتصميم المناهج الاحترافية.',
        subSkills: ['Andragogy Principles', 'Instructional Design', 'Public Speaking', 'Training Kits'],
        coursesCount: 11,
      },
      {
        id: 'spec-executive-coaching-pro',
        name: 'الكوتشينغ التنفيذي والقيادي للمؤسسات (Executive Coaching)',
        marketDemand: 'مرتفع جداً',
        description: 'أدوات الكوتشينغ المعتمدة وفق معايير ICF، قيادة الفرق، وحل الصراعات الإدارية.',
        subSkills: ['ICF Core Competencies', 'GROW Model', 'Executive Presence', '360 Assessment'],
        coursesCount: 7,
      },
      {
        id: 'spec-life-transformation-coaching',
        name: 'كوتشينغ الحياة والتمكين الشخصي (Life & Transformational Coaching)',
        marketDemand: 'مرتفع',
        description: 'مساعدة الأفراد على رسم أهدافهم، التغلب على المعتقدات المقيدة، وتحقيق التوازن الحياتي.',
        subSkills: ['Active Listening', 'Powerful Questioning', 'Goal Architecture', 'Mindset Shifts'],
        coursesCount: 9,
      },
      {
        id: 'spec-workshop-facilitation',
        name: 'تيسير الورشات التفاعلية وديناميكية المجموعات (Facilitation Skills)',
        marketDemand: 'مرتفع',
        description: 'إدارة ورشات العصف الذهني، تقنيات Design Thinking، وتنشيط الجلسات الجماعية الكبرى.',
        subSkills: ['Design Thinking', 'Liberating Structures', 'Conflict Mitigation', 'Group Dynamics'],
        coursesCount: 6,
      },
      {
        id: 'spec-educational-mentoring',
        name: 'الكوتشينغ المدرسي والجامعي والتوجيه المهني للشباب',
        marketDemand: 'واعد',
        description: 'اكتشاف الذكاءات المتعددة والميول المهنية لدى الطلاب وتخطيط مساراتهم الأكاديمية.',
        subSkills: ['Multiple Intelligences', 'Career Counseling', 'Study Skills', 'Youth Mentoring'],
        coursesCount: 5,
      },
    ],
  },

  // 4. الأعمال والريادة والمالية
  {
    id: 'business-leadership',
    title: 'ميادين الأعمال والإدارة والريادة والمالية',
    icon: 'Briefcase',
    description: 'تخصصات قيادة الشركات، إدارة المنتجات، التسويق الحديث، والنمذجة المالية الاستثمارية',
    color: '#3B82F6',
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
        name: 'التسويق الرقمي وقمع النمو (Growth Marketing & Ads)',
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
        name: 'المالية للشركات والنمذجة المالية والاستثمار',
        marketDemand: 'مرتفع',
        description: 'إدارة التدفقات النقدية، تقييم الشركات، والتحليل المالي المتقدم.',
        subSkills: ['Financial Modeling', 'Valuation', 'Excel Advanced', 'Budgeting'],
        coursesCount: 4,
      },
    ],
  },

  // 5. الهندسة والصناعة والطاقات المتجددة
  {
    id: 'engineering-industry-energy',
    title: 'الهندسة والصناعة والطاقات المتجددة والميكاترونكس',
    icon: 'Zap',
    description: 'الطاقة الشمسية والريحية، الميكاترونكس، الهندسة الصناعية، وصيانة المعدات الحديثة',
    color: '#EAB308',
    specializations: [
      {
        id: 'spec-solar-renewable',
        name: 'هندسة الطاقة الشمسية والأنظمة الكهروضوئية (Photovoltaic Solar)',
        marketDemand: 'مرتفع جداً',
        description: 'تصميم وتركيب وصيانة المحطات الشمسية، وحساب الأحمال الطاقية والجدوى الاقتصادية.',
        subSkills: ['PVsyst', 'Solar Inverters', 'Grid Integration', 'Battery Storage Systems'],
        coursesCount: 7,
      },
      {
        id: 'spec-mechatronics-iot',
        name: 'الميكاترونكس وإنترنت الأشياء الصناعي (IIoT & Robotics)',
        marketDemand: 'مرتفع جداً',
        description: 'دمج الميكانيكا والإلكترونيات، برمجة المتحكمات الدقيقة PLC، والروبوتات الصناعية.',
        subSkills: ['PLC Programming', 'Sensors & Actuators', 'Arduino / Raspberry Pi', 'Industrial Automation'],
        coursesCount: 5,
      },
      {
        id: 'spec-industrial-maintenance',
        name: 'الصيانة الصناعية التنبؤية وإدارة الجودة (Lean Manufacturing)',
        marketDemand: 'مرتفع',
        description: 'تقنيات الصيانة الوقائية والتنبؤية، معايير كفاءة الإنتاج (TPM)، ومنهجيات Six Sigma.',
        subSkills: ['Six Sigma', 'TPM', 'Vibration Analysis', 'Root Cause Analysis'],
        coursesCount: 6,
      },
    ],
  },

  // 6. الصحة والسلامة والمهن الشبه طبية
  {
    id: 'healthcare-safety-paramedical',
    title: 'الصحة والسلامة المهنية والرعاية الشبه طبية',
    icon: 'HeartPulse',
    description: 'الإسعافات الأولية المتقدمة، السلامة المهنية HSE، التغذية السريرية، والإدارة الصحية',
    color: '#10B981',
    specializations: [
      {
        id: 'spec-hse-safety',
        name: 'السلامة والصحة المهنية وإدارة المخاطر (NEBOSH / OSHA / HSE)',
        marketDemand: 'مرتفع جداً',
        description: 'تقييم مخاطر بيئة العمل، خطط الإخلاء في الأوراش والمصانع، ومعايير السلامة الدولية.',
        subSkills: ['Risk Assessment', 'OSHA Standards', 'Emergency Protocols', 'HSE Auditing'],
        coursesCount: 8,
      },
      {
        id: 'spec-clinical-nutrition',
        name: 'التغذية العلاجية والحميات وتغذية الرياضيين',
        marketDemand: 'مرتفع',
        description: 'تخطيط البرامج الغذائية المخصصة، التغذية الوقائية، وإدارة الأيض الرياضي والصحي.',
        subSkills: ['Dietary Planning', 'Clinical Nutrition', 'Sports Metabolism', 'Weight Management'],
        coursesCount: 6,
      },
      {
        id: 'spec-healthcare-management',
        name: 'إدارة المنشآت الصحية والمستشفيات والجودة الطبية',
        marketDemand: 'واعد',
        description: 'إدارة تدفق المرضى، جودة الخدمات الاستشفائية، ونظم المعلومات الطبية.',
        subSkills: ['Hospital Administration', 'Healthcare Quality', 'Patient Safety', 'HIPAA Compliance'],
        coursesCount: 4,
      },
    ],
  },

  // 7. الفلاحة الذكية والصناعات الغذائية والتنمية المستدامة
  {
    id: 'agritech-food-industry',
    title: 'الفلاحة الذكية والصناعات الغذائية والتنمية المستدامة',
    icon: 'Sprout',
    description: 'الزراعة الدقيقة، تدبير الموارد المائية، سلاسل التوزيع، ومعايير الجودة الغذائية HACCP',
    color: '#84CC16',
    specializations: [
      {
        id: 'spec-smart-irrigation',
        name: 'الري الذكي وتدبير الموارد المائية (Precision Irrigation)',
        marketDemand: 'مرتفع جداً',
        description: 'برمجة نظم السقي بالتنقيط الذاتي، مجسات رطوبة التربة، وتحلية وتنقية المياه للأغراض الزراعية.',
        subSkills: ['Drip Irrigation Systems', 'Soil Sensors', 'Water Recycling', 'Automated Fertigation'],
        coursesCount: 6,
      },
      {
        id: 'spec-food-safety-haccp',
        name: 'سلامة الأغذية ومعايير الجودة والتصنيع (HACCP & ISO 22000)',
        marketDemand: 'مرتفع جداً',
        description: 'تطبيق نقاط المراقبة الحرجة في وحدات تصنيع الغذاء، التعبئة الصحية، والتصدير الزراعي.',
        subSkills: ['HACCP Protocol', 'ISO 22000', 'Food Microbiology', 'Traceability Systems'],
        coursesCount: 7,
      },
      {
        id: 'spec-organic-farming',
        name: 'الفلاحة البيولوجية المستدامة وتثمين المنتجات المجالية',
        marketDemand: 'واعد',
        description: 'التسميد العضوي، محاربة الآفات بطرق بيولوجية، وتسويق المنتجات الفلاحية المعتمدة.',
        subSkills: ['Biological Pest Control', 'Composting', 'Organic Certification', 'Terroir Marketing'],
        coursesCount: 5,
      },
    ],
  },

  // 8. البناء والأشغال العمومية والعمران (BTP)
  {
    id: 'construction-bim-btp',
    title: 'البناء والأشغال العمومية ونمذجة المنشآت (BTP & BIM)',
    icon: 'HardHat',
    description: 'نمذجة معلومات البناء BIM، إدارة المشاريع الإنشائية، الطبوغرافيا، والعمارة المستدامة',
    color: '#F97316',
    specializations: [
      {
        id: 'spec-bim-management',
        name: 'نمذجة معلومات البناء ثلاثية الأبعاد (BIM & Revit Architecture)',
        marketDemand: 'مرتفع جداً',
        description: 'التنسيق بين المخططات المعمارية والإنشائية والكهربائية (MEP) لتفادي التعارضات قبل التنفيذ.',
        subSkills: ['Autodesk Revit', 'Navisworks Clash Detection', 'BIM Level 2', 'Quantity Takeoff'],
        coursesCount: 7,
      },
      {
        id: 'spec-construction-project-mgmt',
        name: 'إدارة مشاريع البناء والأوراش ومراقبة التكاليف',
        marketDemand: 'مرتفع',
        description: 'تخطيط الجداول الزمنية عبر Primavera / MS Project، مراقبة الدفاتر التقنية، وتدبير مقاولي الباطن.',
        subSkills: ['Primavera P6', 'Site Safety', 'Bill of Quantities', 'Subcontractor Management'],
        coursesCount: 6,
      },
    ],
  },

  // 9. السياحة والفندقة وفنون الطهي والضيافة
  {
    id: 'hospitality-culinary-tourism',
    title: 'السياحة والفندقة وفنون الطهي والضيافة الراقية',
    icon: 'Utensils',
    description: 'الإدارة الفندقية، فنون الطبخ والحلويات العالمية، السياحة التراثية، وخدمات الضيافة',
    color: '#EC4899',
    specializations: [
      {
        id: 'spec-culinary-arts-pro',
        name: 'فنون الطهي الدولي والحلويات الفرنسية الراقية (Master Chef)',
        marketDemand: 'مرتفع جداً',
        description: 'تقنيات الطبخ الكلاسيكي والمعاصر، إعداد قوائم الطعام الراقية، وحفظ المعايير الصحية.',
        subSkills: ['Pastry Techniques', 'Food Plating', 'Menu Engineering', 'Kitchen Leadership'],
        coursesCount: 8,
      },
      {
        id: 'spec-hotel-management',
        name: 'إدارة الفنادق والإيرادات والضيافة (Revenue Management & PMS)',
        marketDemand: 'مرتفع',
        description: 'إدارة مكاتب الاستقبال، تعظيم إيرادات الغرف (RevPAR)، وإدارة جودة خدمة النزلاء.',
        subSkills: ['Opera PMS', 'Yield Management', 'Guest Experience', 'Housekeeping Supervision'],
        coursesCount: 5,
      },
    ],
  },

  // 10. الحرف اليدوية والصناعة التقليدية والفنون التراثية
  {
    id: 'crafts-traditional-arts',
    title: 'الحرف اليدوية والصناعة التقليدية وتصميم الأزياء',
    icon: 'Sparkles',
    description: 'الصناعة التقليدية التراثية، صياغة الحلي والمعادن، النقش على الخشب، وتصميم الأزياء الراقية',
    color: '#D97706',
    specializations: [
      {
        id: 'spec-fashion-haute-couture',
        name: 'تصميم الأزياء الراقية والباترون والخياطة التقليدية والمعاصرة',
        marketDemand: 'مرتفع جداً',
        description: 'رسم الكروكي، قص القماش وفق المقاسات الدقيقة، والتطريز اليدوي والصناعي المتقن.',
        subSkills: ['Pattern Making', 'Fashion Illustration', 'Haute Couture Sewing', 'Textile Selection'],
        coursesCount: 9,
      },
      {
        id: 'spec-jewelry-design',
        name: 'صياغة الحلي والمجوهرات والنقش الدقيق على المعادن',
        marketDemand: 'واعد',
        description: 'سباكة وتشكيل الفضة والذهب، ترصيع الأحجار الكريمة، والتصميم ثلاثي الأبعاد للمجوهرات (Matrix/Rhino).',
        subSkills: ['Metalsmithing', 'Gem Setting', 'CAD Jewelry (Rhino)', 'Traditional Engraving'],
        coursesCount: 4,
      },
    ],
  },

  // 11. اللوجستيك وسلاسل الإمداد والتجارة الدولية
  {
    id: 'logistics-supply-chain',
    title: 'اللوجستيك، النقل، وإدارة سلاسل الإمداد والتجارة الدولية',
    icon: 'Truck',
    description: 'الشحن الدولي والجمارك، إدارة المستودعات، وتخطيط عمليات التوزيع الإقليمي',
    color: '#0284C7',
    specializations: [
      {
        id: 'spec-intl-logistics-customs',
        name: 'اللوجستيك الدولي والملاحة والتخليص الجمركي (Incoterms 2020)',
        marketDemand: 'مرتفع جداً',
        description: 'إجراءات العبور المينائي والجوي، عقود النقل الدولية، وحساب الرسوم الجمركية والتأمين.',
        subSkills: ['Incoterms 2020', 'Customs Clearance', 'Bill of Lading', 'Freight Forwarding'],
        coursesCount: 6,
      },
      {
        id: 'spec-warehouse-inventory',
        name: 'إدارة المستودعات الذكية والتحكم في المخزون (WMS & ERP)',
        marketDemand: 'مرتفع',
        description: 'تنظيم تدفقات السلع، استخدام أنظمة الباركود و RFID، وخفض كلفة الاحتفاظ بالمخزون.',
        subSkills: ['WMS Systems', 'Inventory Turnover', 'Barcoding/RFID', 'Procurement Strategy'],
        coursesCount: 5,
      },
    ],
  },

  // 12. اللغات الحية والتواصل والتنمية الذاتية
  {
    id: 'languages-and-self-development',
    title: 'اللغات الحية والتواصل الإنساني والمهارات الذاتية (Soft Skills)',
    icon: 'BookOpen',
    description: 'اللغات المهنية للأعمال، الخطابة الجماهيرية، التفاوض الاستراتيجي، والذكاء العاطفي',
    color: '#14B8A6',
    specializations: [
      {
        id: 'spec-business-english-pro',
        name: 'الإنجليزية المهنية للأعمال واجتياز المقابلات الدولية',
        marketDemand: 'مرتفع جداً',
        description: 'إتقان التواصل المهني، العروض التقديمية بالإنجليزية، والتفاوض مع الشركاء الأجانب.',
        subSkills: ['Business Presentations', 'Executive Email Writing', 'IELTS/TOEFL Prep'],
        coursesCount: 12,
      },
      {
        id: 'spec-public-speaking-influence',
        name: 'فن الخطابة، التحدث أمام الجمهور، والتأثير الكاريزمي',
        marketDemand: 'مرتفع جداً',
        description: 'التغلب على رهبة المسرح، لغة الجسد الكاريزمية، وهيكلة الخطاب المقنع بأسلوب TEDx.',
        subSkills: ['Charismatic Body Language', 'Vocal Variety', 'Storytelling', 'TEDx Style Talks'],
        coursesCount: 7,
      },
      {
        id: 'spec-emotional-intel',
        name: 'الذكاء العاطفي والمرونة النفسية وإدارة الضغوط المهنية',
        marketDemand: 'مرتفع جداً',
        description: 'فهم المشاعر وإدارتها، بناء بيئات عمل إيجابية، والتفاوض المربح للطرفين (Win-Win).',
        subSkills: ['Stress Management', 'Empathy in Leadership', 'Conflict Resolution', 'Win-Win Negotiation'],
        coursesCount: 8,
      },
    ],
  },

  // 13. الاقتصاد الاجتماعي والتضامني وتسيير التعاونيات
  {
    id: 'social-economy-cooperatives',
    title: 'الاقتصاد الاجتماعي والتضامني وتسيير التعاونيات والجمعيات',
    icon: 'Users',
    description: 'تأسيس وتسيير التعاونيات النسائية والقروية، حوكمة المنظمات غير الربحية، والتمويل التشاركي',
    color: '#16A34A',
    specializations: [
      {
        id: 'spec-cooperative-management',
        name: 'التسيير المالي والإداري للتعاونيات وفق القانون المنظم',
        marketDemand: 'مرتفع',
        description: 'مسك الدفاتر المحاسبية البسيطة، إعداد التقارير الأدبية والمالية، وإدارة الجموع العامة.',
        subSkills: ['Cooperative Law', 'Simplified Accounting', 'General Assemblies', 'Member Governance'],
        coursesCount: 6,
      },
      {
        id: 'spec-ngo-project-funding',
        name: 'إدارة مشاريع المجتمع المدني وجذب المنح والتمويل التشاركي',
        marketDemand: 'واعد',
        description: 'صياغة مقترحات المشاريع التنموية، البحث عن ممولين دوليين ومحليين، وقياس الأثر الاجتماعي.',
        subSkills: ['Project Proposal Writing', 'Grant Scouting', 'Crowdfunding', 'Social Impact Assessment'],
        coursesCount: 4,
      },
    ],
  },
];
