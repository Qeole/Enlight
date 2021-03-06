 ![Add-on icon](icons/spot64.png) Enlight
=========================================

Enlight is a Firefox add-on providing syntax highlighting for raw source code
files, based on the highlight.js project.

Syntax highlighting relies on the highlight.js library (see [project
homepage][hljs]). Currently packaged with the add-on is the version
11.0.1 <!-- HLJS_VERSION --> of highlight.js, which provides
242    color themes and syntax for
191    languages.

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

Or to compile an add-on `.zip` file, use instead:

    web-ext build

See the [documentation for web-ext tool][webext-ref] if you need more
information about the available commands and options.

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
* Set the width for tab characters (_default: 8-space long_): choose a size for
  displaying tabulation characters.
* Select the programming languages to use in the add-on pop-up and for
  auto-detection. Using many languages tends to slow down auto-detection and to
  make it less accurate. Defaults to the list of “common” languages as offered
  by the highlight.js library on [its download page](hljs-download).

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

The code for highlight.js (_i.e._ everything under the `hljs` directory)
was released under the BSD License (see relative [LICENSE][bsd] file for
details).

## Miscellaneous

Other than on the [highlight.js homesite][hljs], you can find a list of
supported languages in [options/list-languages.js][languages], and of
available color schemes in [options/list-styles.js][styles].

[hljs]: https://highlightjs.org
[hljs-download]: https://highlightjs.org/download/
[policy]: https://blog.mozilla.org/addons/2015/02/10/extension-signing-safer-experience
[signing]: https://wiki.mozilla.org/Add-ons/Extension_Signing
[amo]: https://addons.mozilla.org/firefox/addon/enlight
[webext-start]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext
[webext-ref]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference
[mpl]: LICENSE
[bsd]: https://github.com/highlightjs/highlight.js/blob/master/LICENSE
[languages]: options/list-languages.js
[styles]: options/list-styles.js
