 ![Add-on icon](misc/spot64.png) Enlight
========================================


Firefox add-on providing syntax highlighting for raw code, based on the highlight.js project.

Syntax highlighting relies on highlight.js project (see [project homepage][1]. Currently packaged with the add-on is the version 8.5 of highlight.js, which provides 54 color themes and syntax for 22 languages.

## Install

Theory: just open the enlight.xpi file (`File->Open`) in Firefox. Confirm you want to install, and you're done.
Note that this is or will soon become impossible due to [Mozilla policy on add-ons signature][2]; so unless you use Firefox Developer Edition or Nightly, the preferred way is to install through [the add-on page on Mozilla add-ons platform][3].

If you wish to build from sources, the `xpi` add-on file itself can easily be generated with a `cfx xpi` command from the Mozilla add-on SDK (see [documentation on MDN][4]).

Building with `jpm` is not supported yet, should arrive soon.

## Usage

On install, a new button with a ~~spotlight~~ light bulb ![buttonOff](data/lightbulb_off-32.png) (yes, it's supposed to be a ~~spotlight~~ light bulb − but the magnificent spotlight remains the add-on icon in the add-on manager tab for now) should appear in Firefox toolbar.

To highlight raw source code in the active tab, click on this button and select the language syntax you want to use (or “Autodetect” for automatic detection).
If you want to undo highlighting, just click again on the button ![buttonOn](data/lightbulb_on-32.png) (reloading the page also works).

You can also select the color theme you want to use in the add-on preferences, through Firefox add-on manager tab.

## Supporting more languages

The highlight.js minimal script included in this module provides support for 22 languages, while the project theoretically offers support for up to 118 languages. I had to restrict it because of Mozilla add-on platform review policy. To get support for more languages, you can use one of the two following methods:
* Use branch `all_languages` of this repository − it contains a binary `xpi` file not approved by Mozilla, but containing support for all languages. NOTE: `all_languages` branch was not verified by Mozilla, so you are _not_ expected to do this unless you trust me for not altering code from highlight.js, or you verified by yourself.
* Add support yourself by reproducing following steps:
  1. download an archive containing all languages you want from https://highlightjs.org/download;
  2. extract the archive;
  3. get the source of the add-on;
  4. overwrite add-on file `data/highlightjs/highlight.min.js` with file `highlight.pack.js` from the archive you obtained;
  5. uncomment lines relative to added languages in `data/panel.html`;
  6. repack the add-on (with command `cfx xpi` from add-on SDK) and install add-on in Firefox.

## License

The code relative to the add-on itself is placed under the Mozilla Public License v. 2.0 (see file [LICENSE][5]).

The code for highlight.js (_i.e._ everything under the `data/highlightjs` directory) was released under the BSD License (see relative [LICENSE][6] file for details).

## Miscellaneous

Other than on the [hilight.js homesite][1], you can find a list of supported languages in [data/languages.json][7], and of available color schemes in [package.json][8].

[1]: https://highlightjs.org
[2]: https://blog.mozilla.org/addons/2015/02/10/extension-signing-safer-experience
[3]: https://addons.mozilla.org/firefox/addon/enlight
[4]: https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Getting_started
[5]: https://github.com/Qeole/Enlight/blob/master/LICENSE
[6]: https://github.com/isagalaev/highlight.js/blob/master/LICENSE
[7]: https://github.com/Qeole/Enlight/blob/master/data/languages.json
[8]: https://github.com/Qeole/Enlight/blob/master/package.json
