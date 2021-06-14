/* SPDX-License-Identifier: MPL-2.0 */

import { FullLanguageList } from "../options/list-languages.js";

const AddonName = browser.runtime.getManifest().name;

/*
 * Callback to ask background script whether popup should be opened.
 */
function handleResponse (aMsg) {
    if (!aMsg.shouldOpen) {
        window.close();
        return;
    }

    let langSubset = [];
    langSubset = aMsg.langSubset;
    langSubset.push("auto");
    return langSubset;
}

/*
 * Callback for errors: Log an error message.
 */
function handleError (error) {
    console.error(`[${AddonName}] Error:`, error);
}

/*
 * Print list of languages.
 */
function generateList (aLangSubset) {
    /*
     * If user clicked to remove highlighting, return.
     * Otherwise, aLangSubset contains at least "auto".
     */
    if (!aLangSubset) {
        return;
    }

    for (const l of FullLanguageList) {
        if (!aLangSubset.includes(l.class)) {
            continue;
        }

        const element = document.createElement("div");
        element.id = l.class;
        if (l.class === "auto") {
            element.className = "auto";
            element.appendChild(document.createTextNode("Auto-detect"));
        } else {
            element.className = "lang";
            element.textContent = l.name;
        }
        document.body.appendChild(element);
    }
}

/*
 * Check if popup should open, then print list.
 */
browser.runtime.sendMessage({ shouldOpenPopup: "query" })
    .then(handleResponse, handleError)
    .then(generateList, handleError);

/*
 * On user click, send selected language id to background script, then close
 * popup.
 */
window.addEventListener("click", function (event) {
    const t = event.target;
    if (t.nodeName === "DIV") {
        browser.runtime.sendMessage({ languageId: t.id }).then(() => {
            window.close();
        });
    }
}, false);
