 ![Add-on icon](icons/spot64.png) Enlight
=========================================

Enlight is a Firefox add-on providing syntax highlighting for raw source code
files, based on the highlight.js project.

Syntax highlighting relies on the highlight.js library (see [project
homepage][hljs]). Currently packaged with the add-on is the version
9.14.2 of highlight.js, which provides
88    color themes <!-- darkula is an alias, doesn't count --> and syntax for
184   languages.

## Install

▶▶▶ [Get it from Mozilla add-ons platform][amo]! ◀◀◀

As a general rule, it is no longer possible to manually install the version
provided here with the vanilla Firefox release. See [Mozilla policy on add-ons
signature][policy] for details. On some specific Firefox versions where add-on
signing has been disabled (_Developer Edition_ or _Nightly_ with the option
manually deactivated, or on special stable releases), it may be possible to use
a version of the add-on coming from this repository ([see also Mozilla's
wiki][signing]).

If you run one of those specific versions and want to run or build the add-on,
use the [web-ext tool][webext-start]. To test it with a temporary Firefox
profile, use:

    web-ext run

Or to compile an add-on `.xpi` file, use instead:

    web-ext build

See the [documentation for web-ext tool][webext-ref] if you need more
information about the available commands and options.

Building with `cfx` or `jpm` (used for older versions) is no longer supported.

## Usage

### Basics

On install, a new button with a light bulb
![button](icons/lightbulb-dark-19x32.png) should appear in Firefox toolbar.

To highlight raw source code in the active tab, click on this button and select
the language syntax you want to use (or “Autodetect” for automatic detection).
If you want to undo highlighting, just click again on the button. Reloading the
page also works.

### Options

You can also customize some options through Firefox add-on manager tab:

* Color theme selection (_default: Solarized Dark_): change the CSS theme in
  use for syntax highlight.
* Automatic highlighting (_default: off_): check it to automatically trigger
  syntax highlighting for all plain text files.
* Add line numbers (_default: off_): add line numbers on the left of file
  content. Line numbers are created with CSS and are not part of the file
  contents.

When line numbering is enabled, it is possible to jump to the line passed
through URL: e.g. scroll to line 27 and select it if a suffix such as
`#Line27` or `#line27` or `#L27` or `#l27` is appended to the URL **before**
the script loads (this does not relies on HTML anchors and cannot be triggered
by simple URL modification; reload syntax highlighting for current page if you
added the suffix afterward).

### New languages, color schemes

Enlight relies on highlight.js library for coloring the code. It does not
modify this library, nor does it add support for additional languages or color
schemes. Therefore, fixes for language syntax and auto-detection accuracy,
suggestions or contributions to new languages and styles should be addressed to
the [highlight.js project community][hljs].

## License

The code relative to the add-on itself is placed under the Mozilla Public
License v. 2.0 (see file [LICENSE][mpl]).

The code for highlight.js (_i.e._ everything under the `data/highlightjs`
directory) was released under the BSD License (see relative [LICENSE][bsd] file
for details).

## Miscellaneous

Other than on the [hilight.js homesite][hljs], you can find a list of supported
languages in [popup/languages-list_all.json][languages], and of available color
schemes in [options/fill-css-list.js][package].

[hljs]: https://highlightjs.org
[policy]: https://blog.mozilla.org/addons/2015/02/10/extension-signing-safer-experience
[signing]: https://wiki.mozilla.org/Add-ons/Extension_Signing
[amo]: https://addons.mozilla.org/firefox/addon/enlight
[webext-start]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext
[webext-ref]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference
[mpl]: https://github.com/Qeole/Enlight/blob/master/LICENSE
[bsd]: https://github.com/isagalaev/highlight.js/blob/master/LICENSE
[languages]: https://github.com/Qeole/Enlight/blob/master/popup/languages-list_all.json
[package]: https://github.com/Qeole/Enlight/blob/master/options/fill-css-list.js
