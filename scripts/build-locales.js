/*
 * Generates the localized homepages (index.html at the root for English,
 * plus /es/index.html, /fr/index.html, ...) from a single template so the
 * seven language versions can't drift out of sync with each other.
 *
 * The legal pages (about/contact/privacy/terms) aren't run through this —
 * they only exist in English for now, so they're plain hand-written HTML.
 *
 * Usage: node scripts/build-locales.js
 */
const fs = require("fs");
const path = require("path");
const { I18N, LOCALES } = require("../translations.js");

const ROOT = path.join(__dirname, "..");
const SITE = "https://unitconverter.life";
const ADSENSE_CLIENT = "ca-pub-9089745408689623";

function outputPath(localeCode) {
  const locale = LOCALES.find((l) => l.code === localeCode);
  return locale.path === "/"
    ? path.join(ROOT, "index.html")
    : path.join(ROOT, locale.path, "index.html");
}

function canonicalUrl(localeCode) {
  const locale = LOCALES.find((l) => l.code === localeCode);
  return SITE + locale.path;
}

// How far the generated file sits below the project root — "" for the
// English homepage (index.html), "../" for everything under /es/, /fr/,
// etc. Used to build relative links/asset paths so the site works when
// opened straight from disk (file://) and not just when served from a
// domain root.
function relativePrefix(localeCode) {
  const locale = LOCALES.find((l) => l.code === localeCode);
  return locale.path === "/" ? "" : "../";
}

// A relative href to another locale's homepage file, from the page
// currently being rendered.
function relativeLocaleHref(fromCode, toCode) {
  const toLocale = LOCALES.find((l) => l.code === toCode);
  const toFile = toLocale.path === "/" ? "index.html" : `${toLocale.path.slice(1)}index.html`;
  return relativePrefix(fromCode) + toFile;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hreflangLinks() {
  const lines = LOCALES.map(
    (l) => `    <link rel="alternate" hreflang="${l.code}" href="${SITE}${l.path}">`
  );
  lines.push(`    <link rel="alternate" hreflang="x-default" href="${SITE}/">`);
  return lines.join("\n");
}

function faqJsonLd(t) {
  const mainEntity = t.faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a }
  }));
  return JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity }, null, 2);
}

function webAppJsonLd(localeCode, t) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Universal Unit Converter",
      url: canonicalUrl(localeCode),
      description: t.meta.description,
      inLanguage: localeCode,
      applicationCategory: "Utility",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
    },
    null,
    2
  );
}

function navLinks(t, localeCode) {
  const rel = relativePrefix(localeCode);
  return `
      <a class="navbar-brand fw-bold" href="${rel}index.html">Universal Converter</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarMain">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="${rel}index.html">${escapeHtml(t.nav.home)}</a></li>
          <li class="nav-item"><a class="nav-link" href="${rel}about.html">${escapeHtml(t.nav.about)}</a></li>
          <li class="nav-item"><a class="nav-link" href="${rel}contact.html">${escapeHtml(t.nav.contact)}</a></li>
          <li class="nav-item"><a class="nav-link" href="${rel}privacy.html">${escapeHtml(t.nav.privacy)}</a></li>
          <li class="nav-item"><a class="nav-link" href="${rel}terms.html">${escapeHtml(t.nav.terms)}</a></li>
        </ul>
        <details class="lang-switch">
          <summary>🌐 ${escapeHtml(t.nav.lang)}</summary>
          <div class="lang-menu">
            ${LOCALES.map(
              (l) =>
                `<a href="${relativeLocaleHref(localeCode, l.code)}"${l.code === localeCode ? ' aria-current="true"' : ""}>${escapeHtml(l.label)}</a>`
            ).join("\n            ")}
          </div>
        </details>
      </div>`;
}

function articleSections(t) {
  return t.article.sections
    .map(
      (section) => `
        <div class="col-md-6 mb-4">
          <h3 class="h5 text-secondary">${escapeHtml(section.title)}</h3>
          <p>${escapeHtml(section.body)}</p>
          <ul>
            ${section.list.map((item) => `<li>${item}</li>`).join("\n            ")}
          </ul>
        </div>`
    )
    .join("\n");
}

function faqMarkup(t) {
  return t.faq
    .map(
      (item, i) => `
        <details class="faq-item"${i === 0 ? " open" : ""}>
          <summary>${escapeHtml(item.q)}</summary>
          <p>${escapeHtml(item.a)}</p>
        </details>`
    )
    .join("\n");
}

function renderPage(localeCode) {
  const t = I18N[localeCode];
  const url = canonicalUrl(localeCode);
  const rel = relativePrefix(localeCode);

  return `<!DOCTYPE html>
<html lang="${localeCode}" dir="${t.dir}">
<head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>${escapeHtml(t.meta.title)}</title>
    <meta name="description" content="${escapeHtml(t.meta.description)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${url}">

${hreflangLinks()}

    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${escapeHtml(t.meta.title)}">
    <meta property="og:description" content="${escapeHtml(t.meta.description)}">
    <meta property="og:locale" content="${localeCode}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${escapeHtml(t.meta.title)}">
    <meta name="twitter:description" content="${escapeHtml(t.meta.description)}">

    <script type="application/ld+json">
${webAppJsonLd(localeCode, t)}
    </script>
    <script type="application/ld+json">
${faqJsonLd(t)}
    </script>

    <link href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/minty/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="${rel}style.css">
    <link rel="icon" href="${rel}favicon.svg" type="image/svg+xml">
</head>
<body>
<div class="d-flex flex-column min-vh-100">

  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4 shadow-sm">
    <div class="container">${navLinks(t, localeCode)}
    </div>
  </nav>

  <div class="container main mt-4 flex-grow-1">

    <section class="text-center mb-4">
      <h1 class="h2 fw-bold mb-2">${escapeHtml(t.hero.h1)}</h1>
      <p class="lead text-muted mx-auto" style="max-width:720px;">${escapeHtml(t.hero.lead)}</p>
    </section>

    <div id="categories" class="d-flex flex-wrap justify-content-center gap-2 mb-3"></div>

    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card converter-card">
          <h2 class="h5 card-title text-center">${escapeHtml(t.ui.fromTitle)}</h2>
          <label class="visually-hidden" for="inputValue">${escapeHtml(t.ui.inputAria)}</label>
          <input id="inputValue" type="number" class="form-control mb-3" value="1" aria-label="${escapeHtml(t.ui.inputAria)}">
          <div id="fromUnits" class="unit-grid"></div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card converter-card">
          <h2 class="h5 card-title text-center">${escapeHtml(t.ui.resultsTitle)}</h2>
          <div id="results" class="results-grid"></div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center mb-4">
      <div class="card quick-access-card p-3">
        <h2 class="h5 card-title text-center">${escapeHtml(t.ui.quickAccessTitle)}</h2>
        <div class="d-flex justify-content-center mb-3">
          <label class="visually-hidden" for="allUnitsSearch">${escapeHtml(t.ui.searchPlaceholder)}</label>
          <input id="allUnitsSearch" type="text" class="form-control form-control-sm" style="max-width:300px; width:100%;" placeholder="${escapeHtml(t.ui.searchPlaceholder)}">
        </div>
        <div id="allUnits" class="unit-grid"></div>
      </div>
    </div>

    <noscript>
      <div class="alert alert-info text-center mt-3">${escapeHtml(t.ui.noscript)}</div>
    </noscript>

    <section class="guide-section mt-5 p-4 rounded shadow-sm border">
      <h2 class="h3 mb-3">${escapeHtml(t.article.heading)}</h2>
      <p class="lead text-muted">${escapeHtml(t.article.intro)}</p>
      <hr class="my-4">
      <div class="row">${articleSections(t)}
      </div>
      <p class="mt-3 mb-0">${escapeHtml(t.article.categoriesNote)}</p>
    </section>

    <section class="guide-section mt-4 p-4 rounded shadow-sm border">
      <h2 class="h3 mb-3">${escapeHtml(t.article.faqHeading)}</h2>
      ${faqMarkup(t)}
    </section>

  </div>

  <footer class="footer mt-5 py-4 bg-primary text-white text-center">
    <div class="container">
      <div class="mb-2">
        <a href="${rel}about.html" class="text-white mx-2 text-decoration-underline">${escapeHtml(t.nav.about)}</a> |
        <a href="${rel}contact.html" class="text-white mx-2 text-decoration-underline">${escapeHtml(t.nav.contact)}</a> |
        <a href="${rel}privacy.html" class="text-white mx-2 text-decoration-underline">${escapeHtml(t.nav.privacy)}</a> |
        <a href="${rel}terms.html" class="text-white mx-2 text-decoration-underline">${escapeHtml(t.nav.terms)}</a>
      </div>
      <small>&copy; <span id="year"></span> Universal Converter. ${escapeHtml(t.footer.rights)}</small>
    </div>
  </footer>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="${rel}convert-core.js"></script>
<script src="${rel}translations.js"></script>
<script src="${rel}script.js"></script>
</body>
</html>
`;
}

const STATIC_PAGES = ["about.html", "contact.html", "privacy.html", "terms.html"];

function buildSitemap() {
  const homeEntries = LOCALES.map((locale) => {
    const altLinks = LOCALES.map(
      (l) => `      <xhtml:link rel="alternate" hreflang="${l.code}" href="${SITE}${l.path}"/>`
    ).join("\n");
    return `  <url>
    <loc>${SITE}${locale.path}</loc>
${altLinks}
      <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>
  </url>`;
  }).join("\n");

  const staticEntries = STATIC_PAGES.map(
    (page) => `  <url>
    <loc>${SITE}/${page}</loc>
  </url>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${homeEntries}
${staticEntries}
</urlset>
`;
}

function main() {
  LOCALES.forEach((locale) => {
    const html = renderPage(locale.code);
    const dest = outputPath(locale.code);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, html, "utf8");
    console.log("wrote", path.relative(ROOT, dest));
  });

  const sitemapPath = path.join(ROOT, "sitemap.xml");
  fs.writeFileSync(sitemapPath, buildSitemap(), "utf8");
  console.log("wrote", path.relative(ROOT, sitemapPath));
}

main();
