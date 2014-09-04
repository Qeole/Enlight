/* Vim: set ts=8 sts=2 et sw=2 tw=80: */

function enlight() {
  if (document.body.getElementsByTagName("pre").length == 0) {
    return;
  }

  var css = document.getElementById("enlightStylesheet");
  var initBody = document.getElementById("enlightInitBody");

  css === null ? dohl() : undohl(css, initBody);
}

function dohl() {
  /*
   * Add link to CSS stylesheet
   */
  css = document.createElement("link");
  var style = self.options.stylesheet;
  css.setAttribute("href",  style != undefined ? style : "");
  css.setAttribute("rel",  "stylesheet");
  css.setAttribute("type", "text/css");
  css.setAttribute("id",   "enlightStylesheet");
  document.head.appendChild(css);

  initBody = document.createElement("div");
  initBody.style.display = "none";
  initBody.setAttribute("id", "enlightInitBody");
  initBody.innerHTML = document.body.innerHTML;

  var lang = (self.options.language != "") ? ' class=' + self.options.language : "";

  var i;
  for (i in document.getElementsByTagName("pre")) {
    codeBlock = document.getElementsByTagName("pre")[i];
    codeBlock.innerHTML = '<code' + lang + '>' + codeBlock.innerHTML + '</code>';
  }

  hljs.initHighlighting(); // from highlight.pack.js

  /*
   * Save previous body in a hidden div to restore it on undohl()
   */
  document.body.appendChild(initBody);
}

function undohl(css, initBody) {
  document.head.removeChild(css);
  document.body.innerHTML = initBody.innerHTML;
  /*
   * Another solution:
   * window.location.reload(false);
   */
}

enlight();
