import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/site";

export function JsonLd() {
  const url = getSiteUrl();
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: SITE_NAME,
        url,
        jobTitle: "Full-Stack & Applied-AI Engineer",
        description: SITE_DESCRIPTION,
        email: "mailto:tonysaleeb23@gmail.com",
        image: `${url}/as-avatar.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cairo",
          addressCountry: "EG",
        },
        sameAs: [
          "https://github.com/tony-saleeb",
          "https://www.linkedin.com/in/antony-saleeb-2588a625a",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}/#profile`,
        url,
        name: SITE_TITLE,
        isPartOf: { "@id": `${url}/#website` },
        about: { "@id": `${url}/#person` },
        mainEntity: { "@id": `${url}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
