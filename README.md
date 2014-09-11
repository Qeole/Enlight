 ![Add-on icon](misc/spot64.png) Enlight
========================================


Firefox add-on providing syntax highlighting for raw code, based on the highlight.js project.

Syntax highlighting relies on highlight.js project (see [project homepage][1]. Currently packaged with the add-on is the version 8.2 of highlight.js, which provides 49 color themes and syntax for 92 languages.

## Install

Just open the enlight.xpi file (`File->Open`) in Firefox. Confirm you want to install, and you're done.

The `xpi` add-on file itself can easily be generated with a `cfx xpi` command from the Mozilla add-on SDK (see [documentation on MDN][2]).

## Usage

On install, a new button with a ~~spotlight~~ light bulb ![buttonOff](data/lightbulb_off-32.png) (yes, it's supposed to be a ~~spotlight~~ light bulb − but the magnificent spotlight remains the add-on icon in the add-on manager tab for now) should appear in Firefox toolbar.

To highlight raw source code in the active tab, click on this button and select the language syntax you want to use (or “Autodetect” for automatic detection).
If you want to undo highlighting, just click again on the button ![buttonOn](data/lightbulb_on-32.png) (reloading the page also works).

You can also select the color theme you want to use in the add-on preferences, through Firefox add-on manager tab.

## License

The code relative to the add-on itself is placed under the Mozilla Public License v. 2.0 (see file [LICENSE][3]).

The code for highlight.js (_i.e._ everything under the `data/highlightjs` directory) was released under the BSD License (see relative [LICENSE][4] file for details).

## Miscellaneous

Other than on the [hilight.js homesite][1], you can find a list of supported languages in [data/panel.html][5], and of available color schemes in [package.json][6].

[1]: https://highlightjs.org
[2]: https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Getting_started)
[3]: https://github.com/Qeole/Enlight/blob/master/LICENSE
[4]: https://github.com/isagalaev/highlight.js/blob/master/LICENSE
[5]: https://github.com/Qeole/Enlight/blob/master/data/panel.html
[6]: https://github.com/Qeole/Enlight/blob/master/package.json
