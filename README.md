 ![Add-on icon](misc/spot64.png) Enlight
========================================

Firefox add-on providing syntax highlighting for raw code, based on the
highlight.js project.

Syntax highlighting relies on highlight.js project (see [project
homepage][hljs]. Currently packaged with the add-on is the version
9.12.0 of highlight.js, which provides
78    color themes <!-- darkula is an alias, doesn't count --> and syntax for
175   languages.

## Install

\>>> [Get it from Mozilla add-ons platform][amo]. <<<

As a general rule, it is no longer possible to manually install the version
provided here with the vanilla Firefox release. See [Mozilla policy on add-ons
signature][signing] for details. On some specific Firefox versions where add-on
signing has been disabled (_Developer Edition_ or _Nightly_ with the option
manually deactivated, or on special stable releases), it may be possible to use
a version of the add-on coming from this repository.

If you run one of those specific versions: just open the
`enlight_highlightjs@jetpack-<version>.xpi` file (`File->Open`) in Firefox.
Confirm you want to install, and you're done.

To build the add-on, one needs the `jpm` tool ([documentation][jpm]). If you
wish to build from sources, the `xpi` add-on file itself can easily be
generated with a `jpm xpi` command from the Mozilla add-on SDK (see
[documentation on MDN][sdk]).

Building with `cfx` is no longer supported. I intend to work on a version based
on WebExtensions, … when I can find some spare time!

## Usage

### Basics

On install, a new button with a ~~spotlight~~ light bulb
![buttonOff](data/lightbulb_off-32.png) (yes, it's supposed to be a
~~spotlight~~ light bulb − but the magnificent spotlight remains the add-on
icon in the add-on manager tab for now) should appear in Firefox toolbar.

To highlight raw source code in the active tab, click on this button and select
the language syntax you want to use (or “Autodetect” for automatic detection).
If you want to undo highlighting, just click again on the button
![buttonOn](data/lightbulb_on-32.png) (reloading the page also works).

### Options

You can also customize some options through Firefox add-on manager tab:
* Color theme selection (_default: Solarized Dark_): change the CSS theme in
  use for syntax highlight.
* Automatic highlighting (_default: off_): check it to automatically trigger
  syntax highlighting for all plain text files.
* Alternate icon set (_default: off_): use white icons; useful if you use a
  dark theme for Firefox, such as the default theme for Developer Edition
* Adapt background body color (_default: on_): remove white border due to
  body background color. There is no reason to deactivate this, unless you try
  to highlight non-plain text pages and get strange background modification.
* Add line numbers (_default: off_): add line numbers on the left of file
  content. Line numbers are created with CSS and are not part of the file
  contents.

When line numbering is enabled, it is possible to jump to line passed through
URL (_default: on_): scroll to e.g. line 27 and select it if a suffix such as
`#Line27` or `#line27` or `#L27` or `#l27` is appended to the URL **before**
the script loads (this does not relies on HTML anchors and cannot be triggered
by simple URL modification; reload the script for current page if you added the
suffix afterward).

## License

The code relative to the add-on itself is placed under the Mozilla Public
License v. 2.0 (see file [LICENSE][mpl]).

The code for highlight.js (_i.e._ everything under the `data/highlightjs`
directory) was released under the BSD License (see relative [LICENSE][bsd] file
for details).

## Miscellaneous

Other than on the [hilight.js homesite][hljs], you can find a list of supported
languages in [data/languages-all.json][languages], and of available color schemes in
[package.json][package].

[hljs]: https://highlightjs.org
[signing]: https://blog.mozilla.org/addons/2015/02/10/extension-signing-safer-experience
[amo]: https://addons.mozilla.org/firefox/addon/enlight
[sdk]: https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Getting_started
[mpl]: https://github.com/Qeole/Enlight/blob/master/LICENSE
[bsd]: https://github.com/isagalaev/highlight.js/blob/master/LICENSE
[languages]: https://github.com/Qeole/Enlight/blob/master/data/languages-all.json
[package]: https://github.com/Qeole/Enlight/blob/master/package.json
[jpm]: https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm
