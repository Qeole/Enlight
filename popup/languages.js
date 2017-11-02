/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Ask background script whether popup should be opened.
 */
function handleResponse(aMsg) {
  if (!aMsg.shouldOpen)
    window.close();
}
function handleError(error) {
  console.log("[enlight] Error:", error);
}
browser.runtime.sendMessage({shouldOpenPopup: "query"})
  .then(handleResponse, handleError);

/*
 * Parse JSON file to load the names of supported languages.
 */
function loadJSON(aCallback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "languages-list_all.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      /*
       * Required use of an anonymous callback as .open will NOT return a value
       * but simply returns undefined in asynchronous mode.
       */
      aCallback(xobj.responseText);
    }
  };
  xobj.send(null);
}

/*
 * Print list of languages.
 */
function generateList(aResponse) {
  var languageList = JSON.parse(aResponse);
  var keys = Object.keys(languageList);

  for (var i in keys) {
    var element = document.createElement("div");

    element.id = keys[i];
    if (keys[i] == "auto") {
      element.className = "auto";
      //element.setAttribute("data-l10n-id", "autodetect");
      element.appendChild(document.createTextNode("Auto-detect"));
    }
    else {
      element.className = "lang";
      element.textContent = languageList[keys[i]];
    }
    document.body.appendChild(element);
  }
}

/*
 * Do load JSON and print list now.
 */
loadJSON(generateList);

/*
 * On user click, send selected language id to background script, then close
 * popup.
 */
window.addEventListener("click", function(event) {
  let t = event.target;
  if (t.nodeName == "DIV") {
    browser.runtime.sendMessage({"languageId": t.id});
    window.close();
  }
}, false);
