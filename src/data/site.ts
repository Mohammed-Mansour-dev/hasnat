import { dedicationOptions } from "./dedication";
import { faqItems } from "./faq";
import { legalItems, navItems } from "./navigation";
import { packages, UNIT_PRICE_SAR } from "./packages";

import { trust } from "./trust";
import type { BrandInfo, ContactInfo, HeroData } from "./types";

export const brand: BrandInfo = {
  name: "حسنات",
  englishName: "Hasanat",
  logo: "/images/hasanat-logo.png",
  mark: "/images/hasanat-mark.jpg",
};

export const contact: ContactInfo = {
  phone: "+966560233438",
  whatsapp: "+966560233438",
  email: "store.hasnatsa@gmail.com",
};

export const hero: HeroData = {
  eyebrow: "حسنات",
  title: "أهدِ مصحفًا... واترك أثرًا لا ينقطع",
  description: "صدقة تهديها لضيوف الرحمن، ويبقى أثرها مع كل حرف يُتلى.",
  primaryCta: "اهدِ مصحفًا الآن",
  secondaryCta: "اكتشف الفكرة",
  video: "/videos/heroBg.mp4",
  poster: "/images/hero-poster.jpg",
};

export const seo = {
  title: "حسنات | أهدِ مصحفًا واترك أثرًا لا ينقطع",
  description:
    "متجر حسنات يتيح لك إهداء المصاحف وتوزيعها على ضيوف الرحمن في الحرم، مع توثيق عملية التوزيع عبر WhatsApp.",
};

export const images = {
  quranCloseup: "/images/resting-quran.webp",
  distribution: "/images/distribution.webp",
  quranHands: "/images/quran-hands.jpg",
};

export const copy = {
  idea: {
    id: "idea",
    eyebrow: "الأثر",
    title: "لماذا مصحف؟",
    hadith:
      "من قرأ حرفاً من كتاب الله فله به حسنة، والحسنة بعشر أمثالها، لا أقول الم حرف، ولكن ألف حرف ولام حرف وميم حرف",
    body: "كل حرف يُقرأ من المصحف قد يكون بابًا من أبواب الأجر بإذن الله، ولذلك فإن إهداء المصحف ليس مجرد هدية، بل أثر قد يمتد مع صاحبه.",
    note: "نسأل الله أن يكتب الأجر، وأن يجعل هذا العمل صدقة جارية.",
  },
  how: {
    id: "how",
    eyebrow: "المسار",
    title: "بضع خطوات... وأثر عظيم",
    subtitle: "تجربة بسيطة، من اختيار العدد حتى توثيق التوزيع في الحرم.",
  },
  packages: {
    id: "packages",
    eyebrow: "الإهداء",
    title: "اختر عدد المصاحف",
    subtitle: "اختر العدد الذي ترغب في إهدائه، وسنتولى عنك التوزيع والتوثيق.",
    unitLabel: "ريال للمصحف",
    cta: "أكمل الطلب",
  },
  dedication: {
    id: "dedication",
    eyebrow: "النية",
    title: "لمن تهدي هذا الأثر؟",
    subtitle: "اختر نية الإهداء بهدوء. كل خيار بابٌ مختلف من أبواب المعنى.",
  },
  documentation: {
    id: "documentation",
    eyebrow: "الاطمئنان",
    title: "لن نكتفي بأن نقول لك... سنوثّق لك",
    body: "بعد توزيع المصاحف نرسل إليك توثيقًا عبر واتساب: رسالة واضحة، وصورة من لحظة التسليم. حتى يبقى الأثر مرئيًا، لا مجرد وعد.",
    mockSender: "حسنات",
    mockTime: "اليوم",
    mockMessage: "تم توثيق توزيع المصاحف الخاصة بطلبك. نسأل الله أن يتقبل وأن يجعله في ميزان حسناتك.",
    mockCaption: "توثيق التوزيع — المسجد الحرام",
  },
  trust: {
    id: "trust",
    eyebrow: "الشفافية",
    title: "موثوقية تليق بثقتك",
    subtitle:
      "حسنات متجر سعودي مسجّل. نعرض بيانات التسجيل كما هي، بوضوح ودون مبالغة.",
  },
  contact: {
    id: "contact",
    eyebrow: "التواصل",
    title: "يسعدنا تواصلك",
    subtitle: "للأسئلة، للطلبات الخاصة، أو لمجرد الاطمئنان قبل الإهداء.",
  },
  faq: {
    id: "faq",
    eyebrow: "أسئلتكم",
    title: "الأسئلة الشائعة",
    subtitle: "إجابات مباشرة حول التوزيع، التوثيق، والإهداء.",
  },
  finalCta: {
    title: "ربما يكون مصحفك بداية قصة تمتد لأجيال.",
    subtitle: "ابدأ الآن، واترك أثرًا لا تعرف إلى أين يصل.",
    cta: "اهدِ مصحفًا الآن",
  },
  footer: {
    description: "أهدِ مصحفًا... واترك أثرًا لا ينقطع.",
  },
  order: {
    title: "إهداء المصحف",
    subtitle: "ثلاث خطوات هادئة: العدد، النية، ثم بياناتك.",
    steps: ["الباقة", "الإهداء", "التأكيد"],
    submit: "إرسال الطلب",
    edit: "تعديل الطلب",
    summaryTitle: "ملخص طلبك",
    notesLabel: "ملاحظات (اختياري)",
    notesPlaceholder: "أي تفصيل تودّ أن نعرفه قبل التنفيذ",
    nameLabel: "الاسم",
    namePlaceholder: "اسمك الكريم",
    phoneLabel: "رقم الجوال / واتساب",
    phonePlaceholder: "05xxxxxxxx",
    successTitle: "تم استلام طلبك",
    successBody: "جزاك الله خيرًا، تم استلام بيانات طلبك.",
    successHint: "سنتواصل معك عبر WhatsApp لتأكيد التفاصيل واستكمال الطلب.",
    whatsappCta: "التواصل عبر WhatsApp",
    homeCta: "العودة للرئيسية",
  },
};

export const siteData = {
  brand,
  contact,
  hero,
  seo,
  images,
  copy,
  packages,
  unitPrice: UNIT_PRICE_SAR,
  dedicationOptions,
  faq: faqItems,
  trust,
  navigation: navItems,
  legal: legalItems,
};

export type SiteData = typeof siteData;
