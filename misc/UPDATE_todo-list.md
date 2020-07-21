# Things to do when upgrading embedded Highlight.js version

## Master branch

- Get `highlightjs.zip` archive with all languages from highlight.js website
- Replace `highlightjs/highligh.pack.js` with the version extracted from the archive
- Add new supported languages into `options/languages-list_all.json` (get ids with `./misc/extractLanguages.sh highlightjs/highlight.pack.js`
- Delete `highlightjs/styles` and replace from `styles` from the archive to update CSS stylesheets
- Add name of new CSS stylesheets to `options/fill-css-list.js`
- Update version number in `manifest.json`
- Update highlight.js version number   in `README.md`
- Update number of supported languages in `README.md`
- Update number of supported styles    in `README.md`
- Run tests
