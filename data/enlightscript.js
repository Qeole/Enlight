/* Vim: set ts=8 sts=2 et sw=2 tw=80: */

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

/*
 * Execute this at startup
 */
var enlight = function () {
  if (!document.body || document.body.getElementsByTagName("pre").length == 0) {
    return;
  }

  var initDocumentDiv = document.getElementById("enlightInitDocument");
  /*
   * If div is found, we already got syntax highlighting: let's undo it.
   * Else, launch highlighting.
   */
  initDocumentDiv === null ? dohl() : undohl(initDocumentDiv.firstChild);
} ();

function dohl() {
  /*
   * If there is no <pre></pre> HTML block,
   * there's nothing to highlight: get out of here
   */
  var preList = document.getElementsByTagName("pre");
  if (preList.item(0) == null) {
    // TODO: tell it to add-on core so that we can toggle button off
    return;
  }

  /*
   * Add link to CSS stylesheet
   */
  var css = document.createElement("link");
  var style = self.options.stylesheet;
  css.setAttribute("href",  style != undefined ? style : "");
  css.setAttribute("rel",  "stylesheet");
  css.setAttribute("type", "text/css");
  css.setAttribute("id",   "enlightStylesheet");
  document.head.appendChild(css);

  /*
   * Back up initial document
   */
  var clone = document.documentElement.cloneNode(true);
  var idoc  = document.createElement("div");
  idoc.style.display = "none";
  idoc.setAttribute("id", "enlightInitDocument");
  idoc.appendChild(clone);

  /*
   * Deal with language
   */
  var setLanguage = (self.options.language != "") ?
    function (element) { element.setAttribute("class", self.options.language); } :
    function (element) {};

  /*
   * Enclose <pre></pre> blocks content in <code></code> blocks
   */
  var i;
  for (i in preList) {
    if (i == "item") { break; }
    var pre = preList[i];
    var firstChild = pre.firstChild;
    var code = document.createElement("code");
    setLanguage(code);
    code.appendChild(firstChild);
    pre.appendChild(code);
  }

  hljs.initHighlighting(); // from highlight.pack.js

  /*
   * Save previous document in a hidden div to restore it on undohl()
   */
  document.body.appendChild(idoc);
}

function undohl(idoc) {
  document.replaceChild(idoc, document.documentElement);
  /*
   * Another solution:
   * window.location.reload(false);
   */
}
