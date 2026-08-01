import { getProductDescription, getProductName } from './localizedContent';
import { TYPE_CAPACITY_AR } from './productMeasurements';

const TYPE_INFO = {
  '4oz': {
    ...TYPE_CAPACITY_AR['4oz'],
    segment: 'الإسبريسو والقهوة التركية والحصص الصغيرة',
  },
  '7oz': {
    ...TYPE_CAPACITY_AR['7oz'],
    segment: 'المقاهي والمخابز وخدمات التيك أواي',
  },
  '8oz': {
    ...TYPE_CAPACITY_AR['8oz'],
    segment: 'اللاتيه والكابتشينو والمشروبات متوسطة الحجم',
  },
  soup: {
    ...TYPE_CAPACITY_AR.soup,
    segment: 'المطاعم والتموين وتقديم الشوربة الساخنة',
  },
};

const ABOUT_TEMPLATES = [
  (name, info, desc) =>
    `${name} من Kardak حل عملي للشركات التي تبحث عن ${info.keyword} بالجملة في ${info.segment}. ${desc} نُنتج كل دفعة وفق معايير جودة صارمة ونُجري اختبارات السلامة قبل الشحن.`,
  (name, info) =>
    `يُعد ${name} خياراً موثوقاً لتجار الجملة في تركيا والأسواق الإقليمية. بسعة ${info.volumeLabel} (${info.volume}) يلبي احتياجات ${info.segment} مع توازن بين التكلفة والمظهر الاحترافي.`,
  (name, info) =>
    `Kardak تُوفّر ${name} للعلامات التجارية التي تحتاج توريداً منتظماً ومتسقاً. الطبقة الداخلية الآمنة للأغذية تدعم المشروبات الساخنة والباردة، بينما يُمكن تخصيص الطباعة وفق هوية علامتكم.`,
  (name) =>
    `عند طلب ${name} بالجملة، يقدّم فريق Kardak استشارة في الأحجام والأغلفة والطباعة. نُخطّط للإنتاج والتسليم بما يتوافق مع ذروة موسمكم التشغيلي.`,
];

const ADVANTAGE_POOL = {
  cup: [
    'طبقة داخلية آمنة للأغذية مناسبة للمشروبات الساخنة والباردة',
    'جودة طباعة متسقة تناسب العلامة التجارية في نقاط البيع',
    'تصميم يسهّل التخزين والتكديس في المستودع',
    'خيارات توريد بالجملة بأسعار تنافسية للشركات',
    'إمكانية الطباعة المخصصة بشعاركم أو رسالة حملتكم',
    'اختبارات جودة تشمل السلامة الهيكلية قبل الشحن',
  ],
  soup: [
    'مناسبة لتقديم الشوربة الساخنة في المطاعم والتيك أواي',
    'بنية متينة تحافظ على الشكل أثناء النقل',
    'مواد آمنة للأغذية وفق متطلبات الخدمة اليومية',
    'توريد بالجملة مع جداول تسليم مرنة',
    'خيارات طباعة مخصصة للعلامات والسلاسل',
    'تقليل عبء الغسيل وتكاليف التشغيل في المطبخ',
  ],
};

const USE_CASE_POOL = {
  cup: [
    'المقاهي المتخصصة وسلاسل القهوة',
    'المخابز ومحلات المعجنات',
    'فنادق الإفطار وخدمة الغرف',
    'بوفيهات الشركات والفعاليات',
    'نقاط البيع في المولات ومراكز التسوق',
    'عربات الشارع وخدمات التيك أواي',
  ],
  soup: [
    'مطاعم الوجبات السريعة ومحطات الشوربة',
    'شركات التموين والإعاشة',
    'المطابخ المركزية للسلاسل',
    'المستشفيات ومراكز الرعاية',
    'المدارس وبوفيهات الموظفين',
    'أسواق الطعام الموسمية والفعاليات',
  ],
};

function pickItems(pool, count, seed) {
  const items = [];
  for (let i = 0; i < count; i += 1) {
    items.push(pool[(seed + i) % pool.length]);
  }
  return items;
}

function buildFaqs(name, info, seed, isSoup) {
  const base = isSoup
    ? [
        {
          question: `هل ${name} مناسب للشوربة الساخنة؟`,
          answer: `نعم، ${name} مصمم لتقديم الشوربة الساخنة بسعة ${info.volume} مع طبقة داخلية آمنة للأغذية.`,
        },
        {
          question: `ما سعة ${name}؟`,
          answer: `السعة ${info.volumeLabel} أي ${info.volume}، مناسبة لحصة الشوربة القياسية.`,
        },
        {
          question: 'ما الحد الأدنى لطلب الجملة؟',
          answer: 'يختلف حسب التصميم والكمية. تواصلوا مع فريق المبيعات للحصول على عرض مخصص.',
        },
        {
          question: 'هل يمكن طباعة الشعار على الوعاء؟',
          answer: 'نعم، Kardak توفر طباعة مخصصة بالألوان والشعار وفق مواصفات علامتكم.',
        },
      ]
    : [
        {
          question: `ما سعة ${name}؟`,
          answer: `سعة ${info.volumeLabel} (${info.volume})، مناسبة لـ ${info.segment}.`,
        },
        {
          question: `هل ${name} يصلح للمشروبات الساخنة؟`,
          answer: 'نعم، الطبقة الداخلية الآمنة للأغذية تدعم القهوة والشاي والمشروبات الساخنة الأخرى.',
        },
        {
          question: 'هل تتوفر طباعة مخصصة بالجملة؟',
          answer: `نعم، Kardak تُنتج ${name} بشعاركم أو تصميمكم مع معاينة قبل الإنتاج.`,
        },
        {
          question: 'ما مدة التسليم للطلبات بالجملة؟',
          answer: 'المنتجات المتوفرة تشحن بسرعة؛ الطلبات المطبوعة تُجدول بعد اعتماد التصميم.',
        },
      ];

  if (seed % 2 === 0) {
    base.push({
      question: 'هل تُشحنون إلى دول الخليج؟',
      answer: 'Kardak تُنسّق الشحن الدولي حسب حجم الطلب والوجهة. اطلبوا تفاصيل الشحن في عرض السعر.',
    });
  }

  return base;
}

export function buildArabicProductSeo(product) {
  const name = getProductName(product, 'ar');
  const desc = getProductDescription(product, 'ar');
  const info = TYPE_INFO[product.type] ?? TYPE_INFO['7oz'];
  const seed = Number(String(product.id).replace(/\D/g, '')) || 1;
  const isSoup = product.type === 'soup';
  const poolKey = isSoup ? 'soup' : 'cup';

  const about = [
    ABOUT_TEMPLATES[0](name, info, desc),
    ABOUT_TEMPLATES[1](name, info),
    ABOUT_TEMPLATES[2](name, info),
    ABOUT_TEMPLATES[3](name),
  ].slice(0, 3 + (seed % 2));

  return {
    metaDescription: `${name} — Kardak ${info.keyword} بالجملة. ${info.volumeLabel} (${info.volume}) للشركات في ${info.segment}. اطلب عرض سعر B2B.`,
    about,
    advantages: pickItems(ADVANTAGE_POOL[poolKey], 5, seed),
    useCases: pickItems(USE_CASE_POOL[poolKey], 5, seed + 2),
    faq: buildFaqs(name, info, seed, isSoup),
  };
}

export function buildArabicProductMetaDescription(product) {
  return buildArabicProductSeo(product).metaDescription;
}
