/* SPDX-License-Identifier: MPL-2.0 */

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

  for (var l of languageList) {
    if (!aLangSubset.includes(l.class))
      continue;

    var element = document.createElement("div");
    element.id = l.class;
    if (l.class == "auto") {
      element.className = "auto";
      element.appendChild(document.createTextNode("Auto-detect"));
    }
    else {
      element.className = "lang";
      element.textContent = l.name;
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
