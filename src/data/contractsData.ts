import { Language } from '../translations';

export interface ContractArticle {
  id: string;
  articleNumber: number;
  title: Record<Language, string>;
  content: Record<Language, string>;
  keyHighlight?: Record<Language, string>;
}

export interface ElectronicContractTemplate {
  contractType: 'trainer_institute_sla' | 'learner_protection_agreement';
  contractCodePrefix: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  legalFramework: Record<Language, string>;
  preamble: Record<Language, string>;
  articles: ContractArticle[];
  signatureClause: Record<Language, string>;
}

// ============================================================================
// 1. CONTRACT 1: TRAINER & TRAINING INSTITUTE ACCREDITATION & ESCROW SLA
// ============================================================================
export const TRAINER_INSTITUTE_CONTRACT: ElectronicContractTemplate = {
  contractType: 'trainer_institute_sla',
  contractCodePrefix: 'BIS-SLA-TRAINER',
  title: {
    ar: 'عقد الاعتماد المهني والشراكة وقواعد الضمان المالي Escrow للمكوّنين والمراكز',
    en: 'Accredited Trainer & Institute SLA and Escrow Guarantee Agreement',
    fr: "Contrat d'Agrément, de Partenariat et de Garantie Escrow pour Formateurs et Établissements",
    es: 'Contrato de Acreditación, Asociación y Garantía Escrow para Formadores e Institutos',
  },
  subtitle: {
    ar: 'اتفاقية رقمية ملزمة تحدد معايير التأطير، انتفاء علاقة الشغل، عمولة المنصة (20%)، المسؤوليات الحصرية، وحصانة الضمان المالي',
    en: 'Binding digital agreement governing non-employment status, 20% platform commission, exclusive liabilities, and escrow vault rules',
    fr: "Convention numérique obligatoire régissant le statut indépendant, la commission de 20%, les responsabilités exclusives et le séquestre Escrow",
    es: 'Acuerdo digital vinculante que rige el régimen independiente, comisión del 20%, responsabilidades exclusivas y custodia Escrow',
  },
  legalFramework: {
    ar: 'محرر وفق مقتضيات القانون رقم 53-05 المتعلق بالتبادل الإلكتروني للمعطيات القانونية وقانون حماية المعطيات 09-08 وقواعد التجارة الرقمية الدولية',
    en: 'Executed pursuant to Law 53-05 on Electronic Legal Data Exchange, Personal Data Protection Law 09-08, and international digital commerce standards',
    fr: "Rédigé conformément à la Loi 53-05 sur l'échange électronique des données juridiques, la Loi 09-08 sur les données personnelles et le droit du commerce numérique",
    es: 'Redactado de conformidad con la Ley 53-05 sobre Intercambio Electrónico de Datos Jurídicos, la Ley 09-08 de Protección de Datos y estándares de comercio digital',
  },
  preamble: {
    ar: 'بين منصة BeInSkills الدولية لتنمية القدرات (الطرف الأول)، والمكوّن المعتمد أو الممثل القانوني لمركز التكوين المسجل (الطرف الثاني)، تم الاتفاق بالتراضي التام وبصيغة التوقيع الرقمي المؤرخ على البنود والالتزامات النظامية التالية:',
    en: 'Between BeInSkills Global Platform for Skills Development (First Party), and the Registered Trainer or Authorized Institute Representative (Second Party), it is mutually agreed via timestamped digital consent to the following regulatory articles:',
    fr: "Entre la plateforme BeInSkills pour le développement des compétences (Première Partie), et le Formateur Agréé ou Représentant Légal de l'Établissement (Seconde Partie), il est mutuellement convenu ce qui suit par consentement numérique horodaté :",
    es: 'Entre la plataforma BeInSkills para el desarrollo de capacidades (Primera Parte), y el Formador Acreditado o Representante Legal del Instituto (Segunda Parte), se acuerda mutuamente lo siguiente mediante consentimiento digital fehaciente:',
  },
  articles: [
    {
      id: 'art-1-scope',
      articleNumber: 1,
      title: {
        ar: 'المادة 1: موضوع العقد ونيل رتبة الثقة المعتمدة',
        en: 'Article 1: Scope of Agreement & Trust Tier Accreditation',
        fr: "Article 1 : Objet du contrat et Agrément du niveau de confiance",
        es: 'Artículo 1: Objeto del contrato y Nivel de Confianza Acreditado',
      },
      content: {
        ar: 'يحدد هذا العقد الشروط المنظمة لاعتماد الطرف الثاني كشريك تدريبي مرخص في المنصة، ونيل رتبة الثقة (الماسية أو الذهبية) المدرجة في جواز الثقة المهني، ونشر التكوينات وقبول تسجيل المتدربين عبر القنوات الرسمية للمنصة.',
        en: 'This contract defines the terms governing the accreditation of the Second Party as an approved training partner, granting the verified Trust Tier (Diamond or Gold) recorded in the Trust Passport to publish syllabi and receive enrollments through platform channels.',
        fr: "Le présent contrat définit les conditions d'agrément de la Seconde Partie en tant que partenaire de formation certifié, lui attribuant le niveau de confiance (Diamant ou Or) inscrit sur le Passeport de Confiance pour publier des cours et accueillir des apprenants.",
        es: 'Este contrato define las condiciones de acreditación de la Segunda Parte como formador autorizado, otorgando el Nivel de Confianza (Diamante u Oro) registrado en el Pasaporte de Confianza para impartir cursos y gestionar inscripciones.',
      },
      keyHighlight: {
        ar: 'اعتماد رسمي موثق برقم ترخيص رقمي مسجل',
        en: 'Official accreditation backed by digital certification ID',
        fr: 'Agrément officiel garanti par un identifiant numérique vérifié',
        es: 'Acreditación oficial respaldada por identificador digital verificado',
      },
    },
    {
      id: 'art-2-independent-status',
      articleNumber: 2,
      title: {
        ar: 'المادة 2: الطبيعة المستقلة للتعاقد وانتفاء علاقة الشغل أو التزامات المشغل',
        en: 'Article 2: Independent Contractor Status & Non-Applicability of Labor Law',
        fr: 'Article 2 : Statut de prestataire indépendant et inapplicabilité du Code du travail',
        es: 'Artículo 2: Condición de Prestador Independiente y No Aplicabilidad de la Ley Laboral',
      },
      content: {
        ar: 'يقر الطرف الثاني ويوافق صراحة على أن هذا العقد هو عقد تقديم خدمات وتعاون مهني مستقل، ولا يُعد بأي حال من الأحوال عقد شغل أو عقد عمل يخضع لمقتضيات مدونة الشغل أو قوانين العمل. لا ينشأ عن هذه الاتفاقية أي رابط تبعية قانونية أو إدارية أو تسلسلية (Lien de subordination) بين المنصة والطرف الثاني. وتتنصل منصة BeInSkills تماماً من أي صفة كمشغل أو صاحب عمل، ولا تتحمل أي التزامات تتعلق بالأجور الثابتة، أو التعويضات، أو الضمان الاجتماعي، أو التأمين، أو حوادث الشغل، أو الإجازات، أو مكافآت نهاية الخدمة.',
        en: 'The Second Party expressly acknowledges and agrees that this agreement is an independent professional services and collaboration contract, and shall under no circumstances be construed as an employment contract governed by the Labor Code or labor laws. No legal, administrative, or hierarchical subordination (lien de subordination) exists between BeInSkills and the Second Party. BeInSkills disclaims all employer status, obligations, and liabilities, including fixed wages, severance pay, social security, paid leave, workplace injury coverage, or termination benefits.',
        fr: "La Seconde Partie reconnaît et accepte expressément que le présent contrat constitue une convention de prestation de services professionnels indépendante, et ne saurait en aucun cas être assimilé ou requalifié en contrat de travail régi par le Code du travail. Aucun lien de subordination juridique, hiérarchique ou administrative n'existe entre BeInSkills et la Seconde Partie. BeInSkills décline formellement toute qualité d'employeur et toute obligation afférente : salaire fixe, indemnités de licenciement, sécurité sociale, congés payés ou couverture des accidents du travail.",
        es: 'La Segunda Parte reconoce y acepta expresamente que este acuerdo constituye un contrato de prestación de servicios profesionales independientes y bajo ninguna circunstancia se interpretará como contrato laboral regido por el Código del Trabajo o leyes laborales. No existe relación de subordinación jurídica o jerárquica entre BeInSkills y la Segunda Parte. BeInSkills queda exonerada de toda condición de empleador y de obligaciones relativas a salarios fijos, seguridad social, indemnizaciones por despido o accidentes laborales.',
      },
      keyHighlight: {
        ar: 'عقد خدمات مستقلة ينتفي معه أي رابط تبعية قانونية أو التزام كمشغل',
        en: 'Strict B2B independent services: zero employer liabilities or subordination',
        fr: 'Prestation indépendante : absence totale de lien de subordination et d’obligations patronales',
        es: 'Servicios independientes: ausencia absoluta de subordinación y obligaciones patronales',
      },
    },
    {
      id: 'art-3-content-liability',
      articleNumber: 3,
      title: {
        ar: 'المادة 3: المسؤولية الحصرية للمكوّن عن المحتوى وحقوق الملكية الفكرية',
        en: 'Article 3: Sole Trainer Liability for Course Content & Intellectual Property',
        fr: 'Article 3 : Responsabilité exclusive du formateur quant aux contenus et à la propriété intellectuelle',
        es: 'Artículo 3: Responsabilidad Exclusiva del Formador sobre Contenidos y Propiedad Intelectual',
      },
      content: {
        ar: 'يتحمل المكوّن أو المؤسسة التدريبية وحده دون سواه كامل المسؤولية القانونية، البيداغوجية، والمهنية عن محتوى الدورات التكوينية، والمذكرات والمواد العلمية، والبرمجيات والمصادر المقدمة للمتدربين. ويقر بملكيته الفكرية التامة لهذه المواد أو حيازته للتراخيص القانونية اللازمة، ويتعهد بعدم خرق حقوق الغير أو نشر أي محتوى مضلل أو مخالف للنظام العام والآداب. وتخلي منصة BeInSkills مسؤوليتها التامة عن أي خطأ علمي، أو نقص معرفي، أو انتهاك لحقوق التأليف يصدر عن المكوّن.',
        en: 'The instructor or training institute assumes sole and exclusive legal, pedagogical, and professional liability for all course content, syllabi, instructional materials, software, and resources provided to trainees. The Second Party warrants that it holds full intellectual property ownership or requisite legal licenses, and strictly guarantees non-infringement of third-party rights and compliance with public order. BeInSkills expressly disclaims all liability for any pedagogical errors, omissions, or copyright infringements committed by the trainer.',
        fr: "Le formateur ou l'établissement assume l'entière et exclusive responsabilité légale, pédagogique et professionnelle relative aux contenus dispensés, supports didactiques, logiciels et ressources fournies. Il garantit détenir l'intégralité des droits de propriété intellectuelle ou les licences légales nécessaires et s'engage à ne violer aucun droit de tiers ni l'ordre public. BeInSkills décline formellement toute responsabilité quant aux erreurs matérielles, scientifiques ou contrefaçons éventuelles imputables au formateur.",
        es: 'El formador o centro formativo asume la exclusiva y total responsabilidad legal, pedagógica y profesional respecto a los contenidos de los cursos, manuales, software y recursos didácticos facilitados. Garantiza ser titular de los derechos de propiedad intelectual o poseer las licencias pertinentes, eximiendo íntegramente a BeInSkills de cualquier reclamación por infracción de derechos, inexactitudes científicas o daños derivados del temario.',
      },
      keyHighlight: {
        ar: 'المسؤولية القانونية والبيداغوجية والملكية الفكرية تقع حصراً على عاتق المكوّن',
        en: 'Full content, IP, and pedagogical liabilities rest solely with the instructor',
        fr: 'Responsabilité pédagogique et propriété intellectuelle portées exclusivement par le formateur',
        es: 'Responsabilidad pedagógica y propiedad intelectual imputable únicamente al formador',
      },
    },
    {
      id: 'art-4-platform-intermediary',
      articleNumber: 4,
      title: {
        ar: 'المادة 4: المنصة وسيط تقني محايد وإخلاء المسؤولية عن النزاعات المباشرة',
        en: 'Article 4: Platform as Neutral Intermediary & Complete Disclaimer of Direct Disputes',
        fr: "Article 4 : Rôle d'intermédiaire technique neutre et exonération des litiges entre parties",
        es: 'Artículo 4: Plataforma como Intermediario Técnico Neutro y Exoneración de Disputas',
      },
      content: {
        ar: 'تعتبر منصة BeInSkills وسيطاً تقنياً وتكنولوجياً محايداً يوفر بيئة الربط والفوترة وضمان المعاملات بين المكوّنين والمتدربين. وبناءً عليه، لا تتحمل المنصة أي مسؤولية مدنية أو قانونية أو تعويضية عن أي نزاع أو خلاف ينشأ بين المكوّن والمتدرب قبل التدريب، أثنائه، أو بعد انتهائه، أياً كانت طبيعة النزاع (شخصية، مهنية، تجارية، أو لوجستية). ويتحمل الطرفان مسؤوليتهما المباشرة في تسوية أي خلافات شخصية خارج إطار المنصة.',
        en: 'BeInSkills acts strictly as a neutral technological and digital intermediary facilitating matching, transaction escrow, and workflow coordination between instructors and learners. Consequently, the platform disclaims all civil, legal, or compensatory liability for any dispute, conflict, or claim arising between trainer and trainee prior to, during, or following the training program, regardless of its legal or factual nature. Both parties bear sole responsibility for resolving direct bilateral controversies.',
        fr: "BeInSkills intervient exclusivement en tant qu'intermédiaire technique et technologique neutre fournissant les outils de mise en relation, de séquestre et de traçabilité. Par conséquent, la plateforme décline toute responsabilité civile ou juridique quant aux contestations, différends ou litiges opposant le formateur à l'apprenant, survenant avant, pendant ou après la formation, quelle qu'en soit la cause. Les parties assument la résolution directe de leurs différends.",
        es: 'BeInSkills actúa exclusivamente como plataforma tecnológica intermediaria neutra que facilita la conexión y el aseguramiento de transacciones entre formadores y estudiantes. En consecuencia, la plataforma queda exonerada de toda responsabilidad civil o indemnizatoria por disputas o desavenencias surgidas entre formador y alumno antes, durante o después de la formación, cualquiera que sea su naturaleza.',
      },
      keyHighlight: {
        ar: 'المنصة وسيط تقني محايد غير مسؤول عن أي خلافات مباشرة بين المكون والمتدرب',
        en: 'Neutral technological broker: platform disclaims all direct user-to-user disputes',
        fr: 'Intermédiaire technique neutre : aucune responsabilité pour les différends directs formateur-apprenant',
        es: 'Intermediario tecnológico neutro: exención total en conflictos directos entre usuarios',
      },
    },
    {
      id: 'art-5-escrow-fee-20',
      articleNumber: 5,
      title: {
        ar: 'المادة 5: نظام الضمان المالي Escrow، عمولة المنصة (20%) وصافي المكوّن (80%)',
        en: 'Article 5: Escrow Financial Vault, 20% Platform Fee & 80% Net Instructor Disbursement',
        fr: 'Article 5 : Séquestre financier Escrow, commission plateforme (20%) et net formateur (80%)',
        es: 'Artículo 5: Custodia Escrow, Comisión de Plataforma (20%) y Liquidación Neta (80%)',
      },
      content: {
        ar: 'تُحصل كافة رسوم التسجيل وتُحفظ في حساب الضمان الوسيط المؤمن (Escrow Protected Vault). تقتطع منصة BeInSkills عمولة تشغيلية ووساطة تقنية قدرها عشرون بالمائة (20%) من إجمالي الرسوم، ويُصرف صافي ثمانون بالمائة (80%) للمكوّن أو المؤسسة التدريبية عبر نظام الدفعات المرحلية المرتبط بالتقدم الفعلي للساعات التدريبية، ونسبة حضور المتدربين، ومؤشرات التقييم المعتمدة.',
        en: 'All tuition fees collected from trainees are secured within the Escrow Protected Vault. BeInSkills retains an operational and brokerage fee of twenty percent (20%), and the net eighty percent (80%) is released to the trainer or institute across progressive milestone tranches conditioned upon verified session completion, learner attendance logs, and quality metrics.',
        fr: "L'intégralité des frais d'inscription est sécurisée sur le compte séquestre fiduciaire (Escrow Protected Vault). BeInSkills prélève une commission de vingt pour cent (20%) sur le montant brut, et le solde net de quatre-vingts pour cent (80%) est débloqué au profit du formateur par tranches progressives subordonnées à la réalisation effective des heures, aux feuilles de présence et aux évaluations.",
        es: 'La totalidad de las tasas formativas se asegura en la cuenta custodia fiduciaria (Escrow Protected Vault). BeInSkills deduce una comisión de intermediación del veinte por ciento (20%), y el ochenta por ciento (80%) neto restante se liquida al formador o instituto por tramos progresivos condicionados a la impartición efectiva de horas, registros de asistencia y calidad.',
      },
      keyHighlight: {
        ar: 'عمولة المنصة 20%، وصافي استحقاق المكوّن 80% محمي وموثق في Escrow',
        en: '20% Platform fee, net 80% instructor payout safeguarded via Escrow tranches',
        fr: 'Commission de 20% fixe, net formateur de 80% garanti sous séquestre Escrow',
        es: 'Comisión fija del 20%, neto del 80% para el formador protegido en Escrow',
      },
    },
    {
      id: 'art-6-refund-governance',
      articleNumber: 6,
      title: {
        ar: 'المادة 6: ضوابط ومعايير استرجاع المبالغ وسلطة قرارات المنصة الحصرية',
        en: 'Article 6: Sole Platform Jurisdiction Over Partial and Full Refund Determinations',
        fr: 'Article 6 : Réglementation exclusive des remboursements et autorité de la plateforme',
        es: 'Artículo 6: Criterios Exclusivos de Reembolso y Autoridad Resolutiva de la Plataforma',
      },
      content: {
        ar: 'تخضع جميع طلبات الاسترجاع الجزئي أو الكلي لرسوم التكوين حصراً للمعايير والمؤشرات الموضوعية التي تقرها إدارة منصة BeInSkills وللقرارات النهائية الصادرة عن فريقها ولجنة التحكيم التابعة لها (بما يشمل التحقق من نسب الحضور، ومطابقة الساعات المنفذة، وشكاوى الإخلال بالمنهج). لا يحق للمكوّن أو المتدرب فرض أي استرداد مالي أو تسوية منفردة من أموال الضمان Escrow دون مصادقة كتابية صريحة وقرار قطعي من فريق المنصة.',
        en: 'All requests for full or partial tuition refunds are subject strictly and exclusively to the objective standards, criteria, and metrics established by BeInSkills administration, and to the final decisions rendered by its internal arbitration and support team (evaluating biometric/digital attendance, logged hours, and curriculum conformity). Neither the instructor nor the trainee may unilaterally enforce refund deductions or claims against Escrow funds without explicit written approval and final determination from the BeInSkills review panel.',
        fr: "Toute demande de remboursement partiel ou total des frais de formation relève de la compétence exclusive et souveraine de l'administration BeInSkills et des décisions de sa commission d'arbitrage (fondées sur les données objectives d'assiduité, les heures effectives et le respect du programme). Ni le formateur ni l'apprenant ne peuvent convenir d'un remboursement unilatéral imputé sur les fonds sous séquestre Escrow sans l'approbation formelle de la plateforme.",
        es: 'Toda solicitud de reembolso total o parcial de los importes formativos está sujeta con carácter exclusivo a los baremos, directrices y comprobaciones fijadas por BeInSkills y a las resoluciones finales de su comisión de arbitraje (verificación de horas lectivas y cumplimiento del temario). Queda prohibido cualquier acuerdo unilateral entre formador y alumno sobre los fondos en custodia Escrow sin autorización expresa del equipo de BeInSkills.',
      },
      keyHighlight: {
        ar: 'قرارات الاسترجاع تخضع حصراً لمعايير المنصة وتحكيم فريقها المختص',
        en: 'Refunds are adjudicated exclusively according to BeInSkills metrics and arbitration',
        fr: 'Les remboursements sont régis exclusivement par les critères et l’arbitrage BeInSkills',
        es: 'Las resoluciones de reembolso corresponden exclusivamente al comité de BeInSkills',
      },
    },
    {
      id: 'art-7-disciplinary-sanctions',
      articleNumber: 7,
      title: {
        ar: 'المادة 7: الطبيعة التأديبية الإدارية لقرارات المنصة واستقلالها عن النزاع القضائي',
        en: 'Article 7: Administrative Disciplinary Scope of Platform Sanctions & Judicial Independence',
        fr: 'Article 7 : Nature disciplinaire interne des sanctions de la plateforme et indépendance judiciaire',
        es: 'Artículo 7: Carácter Disciplinario de las Sanciones de la Plataforma e Independencia Judicial',
      },
      content: {
        ar: 'يقر الطرف الثاني بأن كافة الجزاءات، العقوبات والتدابير الإدارية التي تتخذها المنصة (مثل تجميد الحساب، تخفيض رتبة الثقة، تعليق الصرف المؤقت، أو الحظر النهائي وسحب الاعتماد) هي قرارات داخلية ذات طبيعة تأديبية وتنظيمية محضة تهدف لصيانة جودة المنصة ومصداقيتها. ولا علاقة لهذه الإجراءات بأي نزاع قضائي قد يترتب عن مسؤولية مدنية أو جنائية بين الأطراف المتنازعة، كما أنها لا تشكل مانعاً من اللجوء إلى القضاء المختص أو بديلاً عنه.',
        en: 'The Second Party acknowledges that all sanctions, penalties, and administrative measures enacted by the platform (such as account suspension, trust tier demotion, escrow payout holds, or permanent badge de-accreditation) are internal regulatory and disciplinary measures designed solely to preserve platform integrity. These administrative measures bear no relationship to, nor do they prejudice, substitute for, or interfere with any judicial proceedings resulting in civil damages or criminal liability between private parties before competent courts.',
        fr: "La Seconde Partie reconnaît que toutes les mesures disciplinaires et sanctions prises par BeInSkills (gel de compte, rétrogradation du passeport de confiance, suspension temporaire de déboursement ou radiation définitive) sont d'ordre strictement interne, administratif et disciplinaire pour garantir l'intégrité de l'écosystème. Elles n'ont aucun lien avec d'éventuelles poursuites judiciaires civiles ou pénales entre usagers et ne se substituent d'aucune manière aux tribunaux compétents.",
        es: 'La Segunda Parte reconoce que todas las sanciones, bloqueos y medidas administrativas impuestas por BeInSkills (suspensión de cuenta, descenso de rango en el pasaporte de confianza o retención cautelar) son disposiciones disciplinarias internas para salvaguardar la calidad del ecosistema. Dichas medidas no guardan vinculación con eventuales acciones judiciales civiles o penales entre particulares ni sustituyen a la jurisdicción ordinaria.',
      },
      keyHighlight: {
        ar: 'تدابير المنصة تأديبية تنظيمية خاصة بعضوية المنصة ولا تحل محل التقاضي القضائي',
        en: 'Platform sanctions are internal disciplinary policies, independent of civil/penal judicial actions',
        fr: 'Mesures disciplinaires internes relatives à l’adhésion, totalement indépendantes du judiciaire',
        es: 'Medidas disciplinarias internas que no sustituyen ni interfieren con acciones judiciales',
      },
    },
    {
      id: 'art-8-pedagogical',
      articleNumber: 8,
      title: {
        ar: 'المادة 8: الالتزام بالمنهج التدريبي وجودة التأطير البيداغوجي',
        en: 'Article 8: Syllabus Fidelity, Hands-on Training & Pedagogical Hours',
        fr: 'Article 8 : Respect du syllabus, travaux pratiques et volume horaire',
        es: 'Artículo 8: Fidelidad al Plan de Estudios y Calidad Pedagógica',
      },
      content: {
        ar: 'يلتزم الطرف الثاني بالتقيد الصارم بالجدول الزمني، عدد الساعات التطبيقية المعلنة، والمنهج (Syllabus) المعتمد عند نشر الدورة، مع توفير التمارين والمشاريع التطبيقية اللازمة لتمكين المتدربين من نيل الكفاءات المعلنة.',
        en: 'The Second Party strictly commits to observing the scheduled timeline, declared practical training hours, and accredited syllabus, providing the necessary hands-on workshops and real-world project assignments.',
        fr: "La Seconde Partie s'engage rigoureusement à respecter le calendrier, le volume horaire pratique annoncé et le syllabus validé, en fournissant les ateliers et projets nécessaires à l'acquisition des compétences.",
        es: 'La Segunda Parte se compromete estrictamente a respetar el calendario, las horas prácticas anunciadas y el plan de estudios validado, facilitando los talleres y proyectos requeridos.',
      },
      keyHighlight: {
        ar: 'حظر تقليص الساعات أو تعديل المنهج دون إذن مسبق',
        en: 'No curriculum alteration or hours reduction without prior written notice',
        fr: 'Interdiction de réduire le volume horaire ou de modifier le syllabus sans accord préalable',
        es: 'Prohibida la reducción de horas o modificación del plan sin aprobación previa',
      },
    },
    {
      id: 'art-9-circumvention',
      articleNumber: 9,
      title: {
        ar: 'المادة 9: حظر الالتفاف والتعامل المالي خارج المنصة (Non-Circumvention)',
        en: 'Article 9: Non-Circumvention & Anti-Bypassing Integrity Clause',
        fr: 'Article 9 : Clause de non-contournement et intégrité financière',
        es: 'Artículo 9: Cláusula de No Elusión e Integridad Transaccional',
      },
      content: {
        ar: 'يُحظر تماماً على المكوّن أو المركز تحويل المتدربين المسجلين أو المتعرف عليهم عبر BeInSkills إلى دفعات نقدية أو بنكية خارجية للتهرب من عمولة المنصة (20%). يعتبر هذا الفعل خرقاً جسيماً يترتب عليه الإلغاء الفوري لرتبة الاعتماد وتجميد الأرصدة والمطالبة بالتعويض القانوني الكامل.',
        en: 'The instructor or training institute is strictly forbidden from diverting platform-acquired learners to off-platform direct transactions to evade the 20% platform fee. Such conduct constitutes a severe material breach triggering immediate license termination, funds freezing, and legal damages claims.',
        fr: "Il est strictement interdit de détourner les apprenants acquis sur la plateforme vers des paiements externes hors-plateforme pour éluder la commission de 20%. Tout manquement entraîne la révocation immédiate de l'agrément, le gel des avoirs et des poursuites en dédommagement.",
        es: 'Queda estrictamente prohibido desviar a los estudiantes adquiridos en la plataforma hacia pagos externos para evitar la comisión del 20%. Cualquier infracción provocará la cancelación inmediata de la licencia, congelación de saldos y acciones indemnizatorias.',
      },
      keyHighlight: {
        ar: 'حماية تعاقدية صارمة تضمن استدامة وعدالة النظام التدريبي',
        en: 'Strict contractual safeguards ensuring marketplace fairness',
        fr: 'Garanties contractuelles strictes assurant la pérennité et l’équité du système',
        es: 'Protección contractual estricta que asegura la equidad del ecosistema',
      },
    },
    {
      id: 'art-10-badges',
      articleNumber: 10,
      title: {
        ar: 'المادة 10: معايير إصدار شارات جواز المهارات الرسمية (حضور 80% كحد أدنى)',
        en: 'Article 10: Verified Skills Passport Badge Issuance Criteria (80% Attendance Minimum)',
        fr: "Article 10 : Critères de délivrance des badges officiels du Passeport (80% d'assiduité)",
        es: 'Artículo 10: Criterios de Emisión de Insignias Oficiales del Pasaporte (Mínimo 80% Asistencia)',
      },
      content: {
        ar: 'تُمنح شارات التخرج الرقمية الرسمية حصراً للمتدربين الذين حققوا نسبة حضور لا تقل عن 80% في التكوين الحضوري أو عن بُعد واجتازوا بنجاح تقييم المشروع العملي. يحظر منح الشارات بطريقة عشوائية أو صورية تحت طائلة سحب صلاحية الاعتماد فورياً.',
        en: 'Digital graduation badges shall be granted exclusively to students who attain at least 80% attendance in live/online sessions and successfully validate their final practical capstone project. Issuing unearned badges will forfeit accreditation privileges immediately.',
        fr: "Les badges numériques officiels sont décernés exclusivement aux apprenants justifiant d'au moins 80% d'assiduité et ayant validé le projet pratique. Toute complaisance entraînera le retrait immédiat des droits d'agrément.",
        es: 'Las insignias digitales se concederán exclusivamente a los estudiantes con un mínimo del 80% de asistencia que hayan validado el proyecto práctico final. La concesión complaciente anulará la acreditación de inmediato.',
      },
      keyHighlight: {
        ar: 'نسبة الحضور الإلزامية: 80% كحد أدنى لنيل الشارة المعتمدة',
        en: 'Mandatory minimum attendance: 80% to qualify for certified badge',
        fr: 'Assiduité minimale obligatoire : 80% pour débloquer le badge certifié',
        es: 'Asistencia mínima obligatoria: 80% para desbloquear la insignia',
      },
    },
  ],
  signatureClause: {
    ar: 'بالموافقة الإلكترونية أدناه، يقر الطرف الثاني بأنه قرأ وفهم كافة البنود ويلتزم بها قانونياً وأخلاقياً بصفته الممثل الرسمي، مؤكداً استقلالية التعاقد ومسؤوليته الحصرية عن المحتوى وخضوع الاسترجاع لقرارات المنصة.',
    en: 'By checking digital consent below, the Second Party certifies full comprehension and legally binding agreement to all terms, affirming independent contractor status, sole content liability, and sole platform refund jurisdiction.',
    fr: "Par l'accord numérique ci-dessous, la Seconde Partie certifie avoir lu, compris et accepté l'ensemble des clauses, confirmant son statut d'indépendant, sa responsabilité exclusive sur le contenu et la compétence exclusive de BeInSkills pour les remboursements.",
    es: 'Mediante la aceptación digital, la Segunda Parte certifica haber leído, comprendido y aceptado legalmente todas las cláusulas, ratificando su condición independiente, responsabilidad exclusiva sobre contenidos y la autoridad de BeInSkills sobre reembolsos.',
  },
};

// ============================================================================
// 2. CONTRACT 2: LEARNER PROTECTION & ESCROW CHARTER
// ============================================================================
export const LEARNER_PROTECTION_CONTRACT: ElectronicContractTemplate = {
  contractType: 'learner_protection_agreement',
  contractCodePrefix: 'BIS-LP-LEARNER',
  title: {
    ar: 'ميثاق التدريب والضمان المالي وحماية حقوق المتدرب عبر Escrow',
    en: 'Learner Protection Charter, Escrow Guarantee & Training Terms',
    fr: "Charte de Protection de l'Apprenant, Garantie Escrow et Conditions de Formation",
    es: 'Carta de Protección del Estudiante, Garantía Escrow y Condiciones Formativas',
  },
  subtitle: {
    ar: 'وثيقة تضمن حماية أموالك بنسبة 100%، سياسة الاسترجاع وفق ضوابط المنصة، وسيط تقني محايد، وحصانة شارات الاعتماد',
    en: 'Official charter guaranteeing 100% funds safety, platform-governed refund criteria, neutral broker status, and certified badge integrity',
    fr: 'Document garantissant la sécurité à 100% de vos fonds, des remboursements régis par la plateforme et la certification officielle',
    es: 'Documento que garantiza el 100% de seguridad de fondos, reembolsos según baremos de la plataforma y acreditación oficial',
  },
  legalFramework: {
    ar: 'وثيقة رسمية صادرة عن منصة BeInSkills لحماية المستهلك التدريبي وتطبيق معايير الشفافية المالية وفق القوانين المعمول بها',
    en: 'Official consumer protection document enforced by BeInSkills ensuring ethical training transactions under applicable laws',
    fr: 'Document officiel émis par BeInSkills garantissant la protection du consommateur et la transparence financière',
    es: 'Documento oficial emitido por BeInSkills que garantiza la protección del estudiante y transparencia financiera',
  },
  preamble: {
    ar: 'مرحباً بك في منصة BeInSkills. نلتزم تجاهك بتوفير بيئة تدريبية ذات جودة عالية ومحمية بالكامل. يوضح هذا الميثاق حقوقك وواجباتك وضمانات أموالك ودور المنصة كوسيط تقني محايد:',
    en: 'Welcome to BeInSkills. We are dedicated to providing you with a high-caliber, fully protected training environment. This charter outlines your rights, obligations, financial protections, and the platform’s role as a neutral broker:',
    fr: "Bienvenue sur BeInSkills. Nous nous engageons à vous offrir un environnement d'apprentissage de haute qualité et totalement sécurisé. Cette charte précise vos droits, obligations et le rôle d'intermédiaire neutre de la plateforme :",
    es: 'Bienvenido a BeInSkills. Nos comprometemos a proporcionarle un entorno formativo riguroso y protegido. Esta carta define sus derechos, obligaciones y el papel de la plataforma como intermediario neutro:',
  },
  articles: [
    {
      id: 'art-l1-vault',
      articleNumber: 1,
      title: {
        ar: 'المادة 1: ضمان الرسوم بنسبة 100% في الحساب الوسيط Escrow',
        en: 'Article 1: 100% Fee Safeguard in Escrow Holding Vault',
        fr: "Article 1 : Garantie des frais à 100% sur le compte séquestre Escrow",
        es: 'Artículo 1: Garantía del 100% de las Tasas en Cuenta de Custodia Escrow',
      },
      content: {
        ar: 'توضع أموال تسجيلك في حساب وسيط معزول وآمن (Escrow Protected) ولا تسلّم للمكوّن مقدماً، بل تُحفظ حتى بدء الدورة والتأكد من التزامه بالمنهج وجودة الساعات التدريبية المقررة ونسب الحضور.',
        en: 'Your tuition payments are kept in a segregated, secure Escrow account and are never disbursed to the trainer in advance; funds remain protected until training milestones and quality are verified.',
        fr: "Vos frais sont conservés sur un compte séquestre Escrow sécurisé et ne sont jamais versés d'avance au formateur ; ils demeurent protégés jusqu'à validation de la formation.",
        es: 'Sus tasas se custodian en una cuenta Escrow segregada y no se entregan por adelantado al formador; permanecen protegidas hasta verificar el cumplimiento del curso.',
      },
      keyHighlight: {
        ar: 'حماية كاملة لأموالك ضد الإلغاء المفاجئ أو عدم الالتزام بالمنهج',
        en: 'Full financial immunity against unexpected course cancellation or poor delivery',
        fr: 'Protection financière intégrale contre les annulations ou le non-respect du programme',
        es: 'Protección financiera integral frente a cancelaciones o incumplimiento de temarios',
      },
    },
    {
      id: 'art-l2-refund-rules',
      articleNumber: 2,
      title: {
        ar: 'المادة 2: سياسة الاسترجاع الكلي أو الجزئي الخاضعة حصراً لمعايير وقرارات المنصة',
        en: 'Article 2: Fair Refund Determinations Exclusively Subject to Platform Rules & Arbitration',
        fr: 'Article 2 : Règles de remboursement partiel ou total régies exclusivement par la plateforme',
        es: 'Artículo 2: Reembolsos Parciales o Totales Sujetos Exclusivamente a Criterios de la Plataforma',
      },
      content: {
        ar: 'تخضع طلبات الاسترجاع الكلي أو الجزئي للرسوم حصراً للمعايير والمؤشرات الموضوعية المعتمدة لدى منصة BeInSkills ولقرارات فريق التحكيم الخاص بها. يحق للمتدرب استرداد 100% عند الإلغاء قبل 48 ساعة على الأقل من بدء أول حصة، أو استرجاع عادل تقرره المنصة في حال إخلال المكوّن بجدول الساعات أو المنهج، ولا يُعتد بأي تسوية منفردة خارج قرار المنصة.',
        en: 'All requests for full or partial tuition refunds are strictly governed by BeInSkills objective standards and the determinations of its arbitration desk. Trainees are eligible for a 100% refund upon cancellation at least 48 hours before course start, or fair arbitration-directed refunds if the trainer breaches scheduled hours or syllabus requirements.',
        fr: "Toute demande de remboursement partiel ou total est régie exclusivement par les barèmes objectifs de BeInSkills et les décisions de sa commission d'arbitrage. Remboursement à 100% pour toute annulation au moins 48 heures avant le début, ou remboursement équitable fixé par la plateforme en cas de défaillance prouvée du formateur.",
        es: 'Cualquier solicitud de reembolso total o parcial está sujeta exclusivamente a los baremos de BeInSkills y a las resoluciones de su equipo de arbitraje. Reembolso del 100% si se cancela al menos 48 horas antes del inicio, o compensación fijada por la plataforma si el formador incumple el temario u horario pactado.',
      },
      keyHighlight: {
        ar: 'البت في الاسترجاع خاضع حصراً لضوابط المنصة وفريق التحكيم الرسمي',
        en: 'Refund adjudication lies exclusively with BeInSkills arbitration team',
        fr: 'Remboursements tranchés souverainement par l’équipe d’arbitrage BeInSkills',
        es: 'Resolución de reembolsos competencia exclusiva del arbitraje de BeInSkills',
      },
    },
    {
      id: 'art-l3-neutral-intermediary',
      articleNumber: 3,
      title: {
        ar: 'المادة 3: دور المنصة كوسيط تقني محايد وإخلاء المسؤولية عن النزاعات المباشرة',
        en: 'Article 3: Platform as Neutral Technological Intermediary & Direct Disputes Disclaimer',
        fr: "Article 3 : Rôle d'intermédiaire technique neutre et exonération des litiges directs",
        es: 'Artículo 3: Intermediario Técnico Neutro y Exoneración de Conflictos Directos',
      },
      content: {
        ar: 'تؤكد المنصة أنها وسيط تقني ورقمي يربط المتدرب بالمكوّن، وليست طرفاً شخصياً في العلاقة البيداغوجية. وبالتالي، لا تتحمل المنصة أي مسؤولية عن أي نزاع شخصي أو مادي أو سلوكي ينشأ بين المكوّن والمتدرب قبل، أثناء، أو بعد التدريب، ويتحمل الطرفان التبعات القانونية لتصرفاتهما الفردية.',
        en: 'BeInSkills confirms its status as a neutral technological broker facilitating access and payments, and is not a direct party to the pedagogical interaction. Consequently, the platform disclaims liability for any personal, factual, or behavioral disputes between trainer and learner before, during, or after training.',
        fr: "BeInSkills rappelle qu'elle agit en qualité d'intermédiaire technique neutre facilitant l'accès et les paiements. La plateforme décline toute responsabilité en cas de litige direct personnel ou comportemental entre formateur et apprenant avant, pendant ou après la formation.",
        es: 'BeInSkills actúa como intermediario técnico neutro facilitador de pagos y acceso, sin ser parte en la relación pedagógica. La plataforma no asume responsabilidad en desavenencias directas de carácter personal entre formador y alumno antes, durante o después del curso.',
      },
      keyHighlight: {
        ar: 'المنصة وسيط تقني يوفر الضمان المالي ولا يتحمل النزاعات الفردية المباشرة',
        en: 'Technological broker providing escrow protection without personal dispute liability',
        fr: 'Intermédiaire technique garant du séquestre, exonéré des litiges interpersonnels',
        es: 'Intermediario técnico garante de custodia, exento de disputas interpersonales',
      },
    },
    {
      id: 'art-l4-content-responsibility',
      articleNumber: 4,
      title: {
        ar: 'المادة 4: المسؤولية الحصرية للمدرب عن المحتوى البيداغوجي والملكية الفكرية',
        en: 'Article 4: Sole Trainer Liability for Course Content, Quality & Copyrights',
        fr: 'Article 4 : Responsabilité exclusive du formateur quant au contenu didactique et droits d’auteur',
        es: 'Artículo 4: Responsabilidad Exclusiva del Formador sobre Calidad y Propiedad Intelectual',
      },
      content: {
        ar: 'يتحمل المكوّن أو المعهد وحده كامل المسؤولية عن صحة المعلومات، وجودة المحتوى المعرفي، واحترام حقوق الملكية الفكرية للمواد الموزعة. وتعفى المنصة من أي مسؤولية ناتجة عن مضامين التكوين أو الآراء المعبر عنها من طرف المكوّنين.',
        en: 'The trainer or institute bears full and exclusive responsibility for the accuracy, pedagogical quality, and copyright compliance of all delivered instructional content. BeInSkills is held harmless from any claims regarding course materials or opinions expressed by instructors.',
        fr: "Le formateur ou l'établissement assume la pleine responsabilité de l'exactitude pédagogique et du respect des droits d'auteur relatifs aux supports fournis. BeInSkills est dégagée de toute responsabilité quant aux contenus dispensés.",
        es: 'El formador o centro formativo asume la total responsabilidad respecto a la exactitud pedagógica y respeto a la propiedad intelectual de los materiales impartidos. BeInSkills queda exenta de toda responsabilidad sobre los contenidos.',
      },
      keyHighlight: {
        ar: 'جودة المحتوى وحقوقه تقع على عاتق المكوّن حصراً',
        en: 'Content quality and copyright compliance reside solely with the trainer',
        fr: 'Qualité du contenu et droits d’auteur sous la responsabilité unique du formateur',
        es: 'Calidad del temario y derechos de autor bajo responsabilidad del formador',
      },
    },
    {
      id: 'art-l5-attendance',
      articleNumber: 5,
      title: {
        ar: 'المادة 5: التزام الحضور (80%) واستحقاق شارة جواز المهارات الرسمية',
        en: 'Article 5: Attendance Obligation (80%) & Verified Badge Unlock',
        fr: "Article 5 : Obligation d'assiduité (80%) et déblocage du badge certifié",
        es: 'Artículo 5: Obligación de Asistencia (80%) y Desbloqueo de Insignia',
      },
      content: {
        ar: 'لضمان المصداقية العالية أمام أرباب العمل وسوق الشغل، يشترط حضور ما لا يقل عن 80% من ساعات التكوين (سواء الحضورية أو عن بُعد) وإتمام التطبيق العملي لنيل الشارة الرقمية في جواز المهارات.',
        en: 'To uphold premium credibility with employers and industry recruiters, a minimum attendance threshold of 80% and capstone validation are mandatory to unlock the official digital badge in your Skills Passport.',
        fr: "Pour garantir une crédibilité maximale auprès des recruteurs, un seuil d'assiduité minimal de 80% et la validation du projet final sont requis pour débloquer votre badge sur le Passeport.",
        es: 'Para garantizar la máxima credibilidad ante empleadores, se exige un 80% de asistencia mínima y validación del proyecto para desbloquear la insignia en su Pasaporte de Habilidades.',
      },
      keyHighlight: {
        ar: 'الشارة الرقمية موثقة برمز تشفير QR قابل للتحقق الخارجي',
        en: 'Tamper-proof badge backed by verifiable cryptographic QR verification',
        fr: 'Badge numérique infalsifiable muni d’un QR code de vérification externe',
        es: 'Insignia infalsificable equipada con código QR de verificación externa',
      },
    },
    {
      id: 'art-l6-3d-eval-disciplinary',
      articleNumber: 6,
      title: {
        ar: 'المادة 6: حق التقييم ثلاثي الأبعاد والتدابير الإدارية والتأديبية للمنصة',
        en: 'Article 6: Transparent 3D Evaluation & Internal Disciplinary Platform Measures',
        fr: 'Article 6 : Évaluation 3D transparente et mesures disciplinaires de la plateforme',
        es: 'Artículo 6: Evaluación Tridimensional y Medidas Disciplinarias de la Plataforma',
      },
      content: {
        ar: 'يمتلك المتدرب حقاً أصيلاً ومستقلاً في تقييم أداء المكوّن، جودة المحتوى، والظروف اللوجستية دون أي ضغط. وتعتبر التدابير والقرارات التي تتخذها المنصة بناءً على هذه التقييمات إجراءات إدارية وتأديبية داخلية خاصة بعضوية المنصة ورتب الثقة، ولا علاقة لها بأي نزاع قضائي مدني أو جنائي قد يثور بين الأطراف.',
        en: 'The trainee possesses an independent right to evaluate trainer pedagogy, content quality, and logistical conditions. Platform decisions and sanctions stemming from these evaluations represent internal administrative and disciplinary actions governing platform standing, and are strictly distinct from any civil or criminal litigation between private parties.',
        fr: "L'apprenant dispose du droit inaliénable d'évaluer la pédagogie, le contenu et les conditions matérielles. Les décisions et sanctions prises par la plateforme constituent des mesures disciplinaires et administratives internes relatives à l'adhésion, sans lien ni interférence avec d'éventuels litiges judiciaires entre usagers.",
        es: 'El estudiante ostenta el derecho inalienable de evaluar la pedagogía, contenidos e instalaciones. Las medidas y sanciones de la plataforma derivadas de estas valoraciones son de índole administrativa y disciplinaria interna, independientes de cualquier proceso judicial entre las partes.',
      },
      keyHighlight: {
        ar: 'تقييم شفاف وتدابير تأديبية داخلية لصيانة جودة وتصنيف المنصة',
        en: 'Transparent feedback driving internal disciplinary quality governance',
        fr: 'Évaluation transparente et gouvernance disciplinaire interne de la plateforme',
        es: 'Evaluación transparente y gobernanza disciplinaria interna de la plataforma',
      },
    },
  ],
  signatureClause: {
    ar: 'بالموافقة أدناه، يقر المتدرب بالتزامه بميثاق الحضور وبنود الحماية والضمان المالي المعتمدة، واعترافه بدور المنصة كوسيط تقني محايد وخضوع قرارات الاسترجاع للضوابط الرسمية للمنصة.',
    en: 'By confirming digital consent below, the learner commits to attendance standards, acknowledges escrow protections, accepts the platform’s neutral broker role, and confirms sole platform jurisdiction over refund determinations.',
    fr: "En confirmant ci-dessous, l'apprenant s'engage à respecter les règles d'assiduité, reconnaît les garanties Escrow, accepte le rôle d'intermédiaire neutre de la plateforme et la souveraineté de ses décisions de remboursement.",
    es: 'Al confirmar digitalmente, el estudiante se compromete con la asistencia, reconoce la protección Escrow, acepta el rol de intermediario neutro de la plataforma y la autoridad exclusiva de BeInSkills sobre reembolsos.',
  },
};
