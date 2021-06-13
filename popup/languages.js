/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Callback to ask background script whether popup should be opened.
 */
function handleResponse(aMsg) {
  if (!aMsg.shouldOpen) {
    window.close();
    return;
  }

  let langSubset = [];
  langSubset = aMsg.langSubset;
  langSubset.push("auto");
  return langSubset;
}
function handleError(error) {
  console.log("[enlight] Error:", error);
}

/*
 * Parse JSON file to load the names of supported languages.
 */
function loadJSON(aLangSubset) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "../options/languages-list_all.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      /*
       * Required use of an anonymous callback as .open will NOT return a value
       * but simply returns undefined in asynchronous mode.
       */
      generateList(xobj.responseText, aLangSubset);
    }
  };
  xobj.send(null);
}

/*
 * Print list of languages.
 */
function generateList(aResponse, aLangSubset) {
  var languageList = JSON.parse(aResponse);
  var keys = Object.keys(languageList);

  for (var l of keys) {
    if (!aLangSubset.includes(l))
      continue;

    var element = document.createElement("div");
    element.id = l;
    if (l == "auto") {
      element.className = "auto";
      element.appendChild(document.createTextNode("Auto-detect"));
    }
    else {
      element.className = "lang";
      element.textContent = languageList[l];
    }
    document.body.appendChild(element);
  }
}

/*
 * Check if popup should open, then load JSON and print list.
 */
browser.runtime.sendMessage({shouldOpenPopup: "query"})
  .then(handleResponse, handleError)
  .then(loadJSON, handleError)

/*
 * On user click, send selected language id to background script, then close
 * popup.
 */
window.addEventListener("click", function(event) {
  let t = event.target;
  if (t.nodeName == "DIV") {
    browser.runtime.sendMessage({"languageId": t.id}).then(() => {
      window.close();
    });
  }
}, false);
