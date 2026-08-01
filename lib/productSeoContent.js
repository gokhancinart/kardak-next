import { products } from '../data/products.mjs';
import { productSeoContent } from '../data/productSeoContent.mjs';

const SECTION_LABELS = {
  tr: {
    sectionAbout: 'Ürün Hakkında',
    sectionAdvantages: 'Avantajları',
    sectionUseCases: 'Kullanım Alanları',
    sectionTechnical: 'Teknik Özellikler',
    sectionFaq: 'Sık Sorulan Sorular',
  },
  en: {
    sectionAbout: 'About the Product',
    sectionAdvantages: 'Advantages',
    sectionUseCases: 'Use Cases',
    sectionTechnical: 'Technical Specifications',
    sectionFaq: 'Frequently Asked Questions',
  },
};

const LEAK_FAQ_TR = {
  cup: {
    questions: [
      (name) => `${name} sızdırır mı?`,
      (name) => `${name} kullanımda sıvı sızdırması yapar mı?`,
      (name) => `${name} taşırken veya servis sırasında sızdırır mı?`,
      (name) => `${name} için sızdırma riski var mı?`,
      (name) => `Bu karton bardak modeli (${name}) sızdırma yapar mı?`,
    ],
    answers: [
      (name) =>
        `Hayır. ${name}, gıda uyumlu PE iç kaplama ve kontrollü üretim süreçleriyle üretilir; sevkiyat öncesi sızdırmazlık testlerinden geçirilir. Normal dolum ve servis koşullarında sıvı sızdırması beklenmez.`,
      (name) =>
        `${name} sızdırma yapmaz. Birleşim noktalarında güçlendirilmiş yapı ve gıda uyumlu kaplama, sıcak-soğuk içecek servisinde güvenilir performans sağlar. Her parti üretim sonrası kalite kontrol testleriyle doğrulanır.`,
      (name) =>
        `Profesyonel kullanımda sızdırma yaşanmaz. ${name} için uygulanan iç kaplama teknolojisi sıvı tutuşunu destekler; uygun kapak kullanımı ve önerilen dolum sıcaklığına uygun servis ile birlikte güvenle tercih edilebilir.`,
      (name) =>
        `Kardak üretiminde ${name} lot bazında sızdırmazlık kontrolünden geçirilir. Gıda uyumlu malzeme ve standartlara uygun üretim sayesinde rutin servis koşullarında sıvı kaçağı oluşmaz.`,
    ],
  },
  soup: {
    questions: [
      (name) => `${name} çorba servisinde sızdırır mı?`,
      (name) => `${name} sıcak çorba kullanımında sıvı kaçağı yapar mı?`,
      (name) => `${name} taşınırken sızdırma riski taşır mı?`,
      (name) => `${name} için sızdırma endişesi gerekir mi?`,
    ],
    answers: [
      (name) =>
        `Hayır. ${name}, sıcak sıvı servisine uygun gıda uyumlu iç kaplama ile üretilir ve sevkiyat öncesi sızdırmazlık testlerinden geçirilir. Standart çorba dolumu ve paket servis koşullarında sızdırma beklenmez.`,
      (name) =>
        `${name} sızdırma yapmaz. Gövde birleşimlerinde dayanıklı yapı ve PE tabanlı kaplama, sıcak çorba servisinde güvenilir performans sunar. Üretim sonrası kalite kontrol süreçleriyle her parti doğrulanır.`,
      (name) =>
        `Profesyonel kullanımda ${name} için sızdırma riski bulunmaz. Gıda uyumlu malzemeler ve kontrollü üretim sayesinde normal servis sıcaklıklarında sıvı kaçağı oluşmaz; uygun kapak ile taşıma güvenliğini destekler.`,
    ],
  },
};

const LEAK_FAQ_EN = {
  cup: {
    questions: [
      (name) => `Does the ${name} leak?`,
      (name) => `Will the ${name} leak during normal use?`,
      (name) => `Can the ${name} leak while carrying or serving drinks?`,
      (name) => `Is there a leak risk with the ${name}?`,
    ],
    answers: [
      (name) =>
        `No. The ${name} is manufactured with food-grade PE inner lining and controlled production processes, and each batch passes leak testing before shipment. Under normal filling and service conditions, liquid leakage is not expected.`,
      (name) =>
        `The ${name} does not leak. Reinforced seams and food-grade coating deliver reliable performance for hot and cold beverage service. Every batch is verified through post-production quality control tests.`,
      (name) =>
        `Leakage does not occur in professional use. The inner coating technology applied to the ${name} supports liquid retention; it can be used safely with a compatible lid and recommended fill temperatures.`,
      (name) =>
        `At Kardak, every lot of ${name} undergoes leak-resistance checks. Food-grade materials and standards-compliant production prevent liquid seepage under routine service conditions.`,
    ],
  },
  soup: {
    questions: [
      (name) => `Does the ${name} leak when serving soup?`,
      (name) => `Will the ${name} leak with hot soup?`,
      (name) => `Is there a leak risk when carrying the ${name}?`,
    ],
    answers: [
      (name) =>
        `No. The ${name} is produced with food-grade inner lining suitable for hot liquids and passes leak testing before shipment. Under standard soup filling and takeaway conditions, leakage is not expected.`,
      (name) =>
        `The ${name} does not leak. Durable wall construction and PE-based coating provide reliable performance for hot soup service. Each batch is validated through post-production quality control.`,
      (name) =>
        `There is no leak risk with the ${name} in professional use. Food-grade materials and controlled manufacturing prevent liquid seepage at normal service temperatures; a compatible lid further supports safe transport.`,
    ],
  },
};

function hasLeakFaq(faqItems) {
  return faqItems.some((item) => /sızdır|leak/i.test(item.question));
}

function buildLeakFaq(product, locale) {
  const name = product.name[locale];
  const isSoup = product.type === 'soup';
  const templates = locale === 'tr' ? LEAK_FAQ_TR : LEAK_FAQ_EN;
  const group = isSoup ? templates.soup : templates.cup;
  const index = Number(product.id) % group.questions.length;

  return {
    question: group.questions[index](name),
    answer: group.answers[index % group.answers.length](name),
  };
}

function appendLeakFaq(faqItems, product, locale) {
  if (!faqItems?.length || hasLeakFaq(faqItems)) {
    return faqItems;
  }

  if (!product) {
    return faqItems;
  }

  return [...faqItems, buildLeakFaq(product, locale)];
}

export function getProductSeoContent(productId, locale) {
  const content = productSeoContent[productId]?.[locale];
  if (!content) return null;

  const product = products.find((item) => String(item.id) === String(productId));

  return {
    ...SECTION_LABELS[locale],
    ...content,
    faq: appendLeakFaq(content.faq, product, locale),
  };
}

export function getProductMetaDescription(productId, locale, fallback) {
  return productSeoContent[productId]?.[locale]?.metaDescription ?? fallback;
}
