function buildFaqSchema(faqItems) {
  if (!faqItems?.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getProductFaqSchema(seoContent) {
  return buildFaqSchema(seoContent?.faq);
}

export default function ProductDetailSeoBody({
  seoContent,
  technicalDetails,
  technicalLabels,
  hideTechnical = false,
}) {
  if (!seoContent) return null;

  return (
    <div className="mt-12 space-y-10 border-t border-gray-100 pt-10">
      <section>
        <h2 className="text-2xl font-bold text-kardak mb-4">{seoContent.sectionAbout}</h2>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
          {seoContent.about.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-kardak mb-4">{seoContent.sectionAdvantages}</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {seoContent.advantages.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700"
            >
              <span className="mt-0.5 text-kardak font-bold">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-kardak mb-4">{seoContent.sectionUseCases}</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {seoContent.useCases.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700"
            >
              <span className="mt-0.5 text-kardak font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {technicalDetails && !hideTechnical && (
        <section>
          <h2 className="text-2xl font-bold text-kardak mb-4">{seoContent.sectionTechnical}</h2>
          <table className="w-full border-collapse rounded-lg overflow-hidden border border-gray-200">
            <tbody>
              {Object.entries(technicalDetails).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200 last:border-0">
                  <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 w-1/3">
                    {technicalLabels[key]}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold text-kardak mb-4">{seoContent.sectionFaq}</h2>
        <div className="space-y-3">
          {seoContent.faq.map((item) => (
            <details
              key={item.question}
              className="rounded-lg border border-gray-200 p-4 group"
            >
              <summary className="font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                {item.question}
                <span className="text-kardak ml-4 group-open:rotate-45 transition-transform text-xl">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
