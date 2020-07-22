/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ts=8 sts=4 et sw=4 tw=80: */

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Retrieve the list of checked languages in the list.
 */
function getLangList() {
    let table = document.getElementById("langlist");
    let res = [];

    for (let row of table.children) {
        let cell = row.children[0];
        let input = cell.children[0];
        let l = input.id.substring("langlist-".length);
        if (input.checked)
            res.push(l);
    }

    return res;
}

/*
 * Check boxes for languages saved in pref (or from default).
 */
function restoreLangList(aDefault) {
    let gettingItem = browser.storage.local.get("langlist");
    gettingItem.then((res) => {
        let table = document.getElementById("langlist");
        let opts = res.langlist ? res.langlist : aDefault;

        for (let row of table.children) {
            let cell = row.children[0];
            let input = cell.children[0];
            let l = input.id.substring("langlist-".length);
            if (opts.includes(l))
                input.checked = true;
        }
    }, onError);
}

function saveOptions(e) {
    if (e) /* Undefined when calling for shortcuts for languages checkboxes */
        e.preventDefault();

    selectedLanguages = getLangList();

    browser.storage.local.set({
        hlstyle: document.getElementById("hlstyle").value,
        autohl: document.getElementById("autohl").checked,
        fileext: document.getElementById("fileext").checked,
        linenumbers: document.getElementById("linenumbers").checked,
        langlist: selectedLanguages,
    });
}

function onError(error) {
    console.error("[enlight]: Error:", error);
}

function restoreOption(aId, aDefault) {
    let gettingItem = browser.storage.local.get(aId);
    gettingItem.then((res) => {
        let element = document.getElementById(aId);
        if (element.type && element.type.toLowerCase() === "checkbox")
            element.checked = res[aId] || aDefault;
        else
            element.value = res[aId] || aDefault;
    }, onError);
}

function restoreAllOptions() {
    restoreOption("hlstyle", gDefaultOptions.hlstyle);
    restoreOption("autohl", gDefaultOptions.autohl);
    restoreOption("fileext", gDefaultOptions.fileext);
    restoreOption("linenumbers", gDefaultOptions.linenumbers);
    restoreLangList(gDefaultOptions.langlist);
}

document.addEventListener('DOMContentLoaded', restoreAllOptions);
document.getElementById("hlstyle").addEventListener("change", saveOptions);
document.getElementById("autohl").addEventListener("change", saveOptions);
document.getElementById("fileext").addEventListener("change", saveOptions);
document.getElementById("linenumbers").addEventListener("change", saveOptions);
document.getElementById("langlist").addEventListener("change", saveOptions);
