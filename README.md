# Universal Converter

Static site for [unitconverter.life](https://unitconverter.life) — a unit converter that shows every
result in a category at once instead of making you pick a "to" unit. No build step required to run it;
`index.html` and friends work by just opening them or serving the folder statically. There's a small
build step only for generating the translated homepages (see below).

## Layout

```
convert-core.js       Pure conversion math + unit data. No DOM. Shared by the browser and tests/.
translations.js       UI strings + article/FAQ copy, one block per language.
script.js             DOM glue: renders the category/unit buttons, wires up the input, handles copy-to-clipboard.
style.css             All styling.
index.html            English homepage — generated, don't edit by hand (see scripts/build-locales.js).
es/ fr/ de/ pt/ it/ ja/  Localized homepages — also generated.
about.html, contact.html,
privacy.html, terms.html  Legal/info pages. English only, hand-maintained (not generated).
scripts/build-locales.js  Regenerates every localized index.html + sitemap.xml from translations.js.
tests/convert-core.test.js  Node assertions on the conversion math (no framework, no deps).
```

## Common tasks

```
npm run build   # regenerate index.html, es/index.html, ..., and sitemap.xml
npm test        # syntax-check the JS and run the conversion math tests
```

## Adding a unit or category

Edit `convert-core.js` only — add the unit under the right category's `units` object with its
conversion `factor` (in terms of that category's `base` unit) and a human-readable `name`. The UI picks
it up automatically. Run `npm test` after; if you're changing an existing factor, add or update a
`tests/convert-core.test.js` assertion so a future edit can't silently break it again.

## Adding a language

1. Add a block to `translations.js` under `I18N` (copy an existing locale as a starting point — every
   key in `en` needs a counterpart) and add the locale to the `LOCALES` array at the top of the file.
2. Run `npm run build`. This generates `/<code>/index.html` and updates the hreflang tags on every
   other locale page plus `sitemap.xml` automatically.
3. Unit abbreviations (km, kg, °F, KiB, ...) stay in their international form in every language — the
   interactive tool itself doesn't translate them, so the article text shouldn't either.
4. `about.html`, `contact.html`, `privacy.html`, and `terms.html` are not localized. Every language
   version links back to the English legal pages.

## Deployment

The site is deployed on Vercel from this repo's `main` branch — pushing to `main` ships it. Static
assets are served as-is; there's no server-side code.

## SEO/AdSense notes

- `ads.txt`, `robots.txt`, and `sitemap.xml` live at the root and need to keep resolving at those exact
  paths post-deploy.
- Every page carries the AdSense script tag, a canonical link, and (for homepages) hreflang alternates
  to every language version plus `x-default`.
- `privacy.html` discloses AdSense's use of cookies/personalization — keep that in sync with reality if
  analytics or other ad products get added later.
