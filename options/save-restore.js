/* SPDX-License-Identifier: MPL-2.0 */

import { DefaultOptions } from "./defaults.js";
import { FullLanguageList } from "./list-languages.js";
import { FullStyleList } from "./list-styles.js";

const AddonName = browser.runtime.getManifest().name;

/*
 * Retrieve the list of checked languages in the list.
 */
function getLangList () {
    const table = document.getElementById("langlist");
    const res = [];

    for (const row of table.children) {
        const cell = row.children[0];
        const input = cell.children[0];
        const l = input.id.substring("langlist-".length);
        if (input.checked) {
            res.push(l);
        }
    }

    return res;
}

/*
 * Save options to browser storage.
 */
function saveOptions (e) {
    /* e is undefined when calling for shortcuts for languages checkboxes */
    if (e) {
        e.preventDefault();
    }

    let tabsize = Number(document.getElementById("tabsize").value);
    if (!Number.isInteger(tabsize) || tabsize <= 0) {
        tabsize = DefaultOptions.tabsize;
    }

    const selectedLanguages = getLangList();

    browser.storage.local.set({
        hlstyle: document.getElementById("hlstyle").value,
        autohl: document.getElementById("autohl").checked,
        fileext: document.getElementById("fileext").checked,
        linenumbers: document.getElementById("linenumbers").checked,
        tabsize: tabsize,
        langlist: selectedLanguages,
    });
}

/*
 * Callback for errors: Log an error message.
 */
function onError (error) {
    console.error(`[${AddonName}] Error:`, error);
}

/*
 * Check boxes for languages saved in pref (or from default).
 */
function restoreLangList () {
    const gettingItem = browser.storage.local.get("langlist");
    gettingItem.then((res) => {
        const table = document.getElementById("langlist");
        const opts = res.langlist ? res.langlist : DefaultOptions.langlist;

        for (const row of table.children) {
            const cell = row.children[0];
            const input = cell.children[0];
            const l = input.id.substring("langlist-".length);
            if (opts.includes(l)) {
                input.checked = true;
            }
        }
    }, onError);
}

/*
 * Restore a "simple" option (one value to restore, for example checkbox or
 * "select" inputs.
 */
function restoreOption (aId, aDefault) {
    const gettingItem = browser.storage.local.get(aId);
    gettingItem.then((res) => {
        const element = document.getElementById(aId);
        if (element.type && element.type.toLowerCase() === "checkbox") {
            element.checked = res[aId] || aDefault;
        } else {
            element.value = res[aId] || aDefault;
        }
    }, onError);
}

/*
 * Call functions to restore all options at once.
 */
function restoreAllOptions () {
    restoreOption("hlstyle", DefaultOptions.hlstyle);
    restoreOption("autohl", DefaultOptions.autohl);
    restoreOption("fileext", DefaultOptions.fileext);
    restoreOption("linenumbers", DefaultOptions.linenumbers);
    restoreOption("tabsize", DefaultOptions.tabsize);
    restoreLangList();
}

/*
 * Create list of languages.
 */
function populateLanguageList () {
    const langList = document.getElementById("langlist");
    for (const l of FullLanguageList) {
        if (l.class === "auto") {
            continue;
        }
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        const input = document.createElement("input");
        const label = document.createElement("label");
        const id = "langlist-" + l.class;
        input.type = "checkbox";
        input.id = id;
        label.for = id;
        label.textContent = l.name;
        cell.appendChild(input);
        cell.appendChild(label);
        row.appendChild(cell);
        langList.appendChild(row);
    }
}

/*
 * Populate list of CSS styles.
 */
function populateStyleList () {
    const styleList = document.getElementById("hlstyle");
    for (const s of FullStyleList) {
        const item = document.createElement("option");
        item.value = s.file;
        item.textContent = s.name;
        styleList.appendChild(item);
    }
}

/*
 * Create/populate the lists, and once that all the content is ready, mark the
 * selected values for the options.
 */
function fillPage () {
    populateLanguageList();
    populateStyleList();

    /* Only after language and style lists have been populated. */
    restoreAllOptions();
}

document.addEventListener("DOMContentLoaded", fillPage);
document.getElementById("hlstyle").addEventListener("change", saveOptions);
document.getElementById("autohl").addEventListener("change", saveOptions);
document.getElementById("fileext").addEventListener("change", saveOptions);
document.getElementById("linenumbers").addEventListener("change", saveOptions);
document.getElementById("tabsize").addEventListener("change", saveOptions);
document.getElementById("langlist").addEventListener("change", saveOptions);

export { saveOptions };
