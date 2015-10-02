# Things to do when upgrading embedded Highlight.js version

## Master branch

- Replace `highlight.min.js` with new version from CDN
- Get `highligh.pack.js` with all languages from highlight.js website
- Add new supported languages into `data/languages-all.json` (get ids with `misc/extractLanguages.sh`, name on website or `CHANGES.md` file)
- Add new/modified CSS stylesheets to `data/highlightjs/styles`
- Add name of new CSS stylesheets to `package.json`
- Update version number in `package.json`
- Update highlight.js version number   in `README.md`
- Update number of supported languages in `README.md`
- Update number of supported styles    in `README.md`
- Run tests

## All-languages branch

- Replace `highlight.pack.js` with downloaded version
- Remove `highlight.min.js`
- Rename xpi file
- Update highlight.js version number   in `README.md`
- Update number of supported languages in `README.md`
- Run tests
