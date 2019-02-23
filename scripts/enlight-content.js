/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Syntax highlighting addition/removal handlers (content scripts).
 *
 * First we need to decide whether we do or undo highlight.
 *
 * To do it, we have to add a CSS stylesheet and to enclose <pre></pre> blocks
 * content to highlight with <code></code> tags so that it looks like
 * <pre><code lang="cpp"> int a = 3 + b; </code></pre> (see highlightjs doc).
 * We perform a backup of original document by putting it in a hidden div.
 *
 * Undoing highlight consists in getting saved document back from the div.
 */

/*****************************************************************************/
var options = {};

/*
 * Run the main function at startup.
 */
var enlight = function () {
  /*
   * Get options attached as window.enlightContentScriptOptions by previous
   * content script.
   */
  options = enlightContentScriptOptions;

  /*
   * If there is no <pre></pre> HTML block, there's nothing to work on: get
   * out of here.
   */
  if (!document.body ||
       document.body.getElementsByTagName("pre").item(0) === null)
    return;

  var initDocumentDiv = document.getElementById("enlightInitDocument");
  /*
   * If div is found, we already got syntax highlighting: let's undo it.
   * Else, launch highlighting.
   */
  initDocumentDiv === null ? dohl() : undohl(initDocumentDiv.firstChild);

  /*
   * If option is set, activate “gotoline” functionality.
   */
  if (options && options.lineNumbers)
    gotoline();
} ();

/*****************************************************************************/

function dohl() {
  var preList = document.getElementsByTagName("pre");
  /*
   * If options is empty we shouldn't be there. Page has probably been changed
   * since a former highlight: get out as well.
   * If options.language is "undo", we want to undo highlighting. If we
   * triggered dohl() in that case, we probably messed up somewhere in keeping
   * track of page status. Stop the mess here and return.
   */
  if (!options || options == {} || options.language == "undo")
    return;

  /*
   * Back up initial document
   */
  var clone = document.documentElement.cloneNode(true);
  var idoc  = document.createElement("div");
  idoc.style.display = "none";
  idoc.setAttribute("id", "enlightInitDocument");
  idoc.appendChild(clone);

  /*
   * If needed, add CSS rules for line numbering
   */
  addLineNumberStyle();

  /*
   * Deal with language
   */
  var language = "";

  if (options.language != "" && options.language != "auto") {
    language = " " + options.language;
  } else if (options.language == "auto" && options.fileExt) {
    /* Try to guess language based on file extension */
    let extension = window.location.toString().split('.').pop().toLowerCase();
    switch (extension) {
    case "sh":
      language = " bash";
      break;
    case "c":
    case "cc":
    case "h":
      language = " cpp";
      break;
    case "diff":
    case "patch":
      language = " diff";
    case "js":
      language = " javascript";
      break;
    case "md":
      language = " markdown";
      break;
    case "pl":
      language = " perl";
      break;
    case "py":
      language = " python";
      break;
    case "rb":
      language = " ruby";
      break;
    case "cs":
    case "css":
    case "xml":
    case "ini":
    case "json":
    case "java":
    case "php":
      language = " " + extension;
      break;
    case "txt":
      language = " nohighlight";
      break;
    default:
      break;
    }
  }
  /*
   * Else if (options.language == "auto"), we leave language to "" so
   * highlihgt.sh attempts auto-detection
   */

  /*
   * Enclose <pre></pre> blocks content in <code></code> blocks
   */
  for (var pre of preList) {
    var firstChild = pre.firstChild;
    var code = document.createElement("code");
    code.setAttribute("class", "hljs" + language);
    code.style = "padding: 0;";
    code.appendChild(firstChild);
    pre.appendChild(code);
  }

  /*
   * Call highlighting function: hljs is defined in highlight.js library.
   */
  hljs.initHighlighting();

  /*
   * Add line numbers if needed.
   */
  if (options.lineNumbers)
    for (var pre of preList) {
      var code = pre.firstChild;
      addLineNumbers(code);
    }

  /*
   * There's a remaining white border because of body background color. Remove
   * it by copying background color of highlighted code area.
   */
  setTimeout(function () { // Wait for CSS to be computed
    let codeBG = getComputedStyle(preList[0].firstChild)["background-color"];
    if (codeBG &&
        codeBG!="white" &&
        codeBG!="#FFFFFF" &&
        codeBG!="#ffffff")
      document.body.style.backgroundColor = codeBG;
  }, 50);

  /*
   * If we launched language auto-detection, tell main script about detected
   * language
   */
  if (options.language == "" || options.language == "auto") {
    let languageClass = document.querySelectorAll("pre code")[0].className;
    let languageId = languageClass.slice("hljs ".length);
    let port = browser.runtime.connect({name: "detectedLanguage"});
    port.postMessage({language: languageId});
    port.disconnect();
  }

  /*
   * Save previous document in a hidden div to restore it on undohl()
   */
  document.body.appendChild(idoc);
}

/*****************************************************************************/

function undohl(idoc) {
  document.replaceChild(idoc, document.documentElement);
  /*
   * Another solution:
   * window.location.reload(false);
   */
}

/*****************************************************************************/

/*
 * Add line numbers to argument code block if option is set
 */
function addLineNumbers(aCode) {
  /*
   * Enclose each line of highlighted content into a "line" span.
   * Text has already been highlighted at this point (it's a mix of text
   * and of spans for coloring), so I can't see any easy way to do this
   * without assigning to innerHTML.
   */
  var lines = aCode.innerHTML
    .replace(/^.*?(\n|.$)/gm, '<span class="line hljs-comment"></span>$&');
  aCode.innerHTML = lines;
}

/*****************************************************************************/

/*
 * Numbering is performed with CSS. We add it to head of document. From
 * https://github.com/isagalaev/highlight.js/compare/master...line-numbers
 */
function addLineNumberStyle() {
  if (!options.lineNumbers)
    return;

  var styleContent = " \
    pre { \
      counter-reset: lines; \
    } \
    pre .line { \
      counter-increment: lines; \
    } \
    pre .line::before { \
      -moz-user-select: none; \
      \
      content: counter(lines); text-align: right; \
      display: inline-block; min-width: 2.5em; \
      padding-right: 0.5em; margin-right: 0.5em; \
      font-weight: bold; \
      border-right: solid 1px; \
    }";
  var style = document.createElement("style");
  style.setAttribute("type", "text/css");
  var styleTextNode = document.createTextNode(styleContent);
  style.appendChild(styleTextNode);
  document.head.appendChild(style);
}

/*****************************************************************************/

/*
 * If user added an anchor to the URL, go to line number and select this line.
 * NOTE: there is no event triggered by URL edit that we could listen to, so
 * the anchor must be present when the script loads. If user adds it afterward,
 * they should manually reload the script (or the page if using autodetection).
 */
function gotoline() {
  /*
   * Get "#line27" or "#Line27" or "#L27" or "#l27" -like sequence from URL
   */
  let nb = (window.location + "").match(/#(?:[Ll](?:ine)?)?(\d+)/i)
  if (nb === null)
    return;

  /*
   * Fetch associated line. Note that we fetch the “absolute” nth line of
   * highlighted code in the file, which is not necessarily the nth line of its
   * block if there are several highlighted blocks of code.
   */
  let target = document.getElementsByClassName("line")[nb[1]-1]
  if (target === undefined)
    return;

  /*
   * Scroll to that line
   */
  target.scrollIntoView();

  /*
   * Select this line
   */
  let selection = window.getSelection();
  let range = document.createRange();
  range.setStartAfter(target);
  let next = document.getElementsByClassName("line")[nb[1]];
  next !== undefined ?
    range.setEndBefore(next) :
    range.setEndAfter(target.parentNode);
  selection.addRange(range);
}
