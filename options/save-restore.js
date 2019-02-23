/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ts=8 sts=4 et sw=4 tw=80: */

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function saveOptions(e) {
    e.preventDefault();

    browser.storage.local.set({
        hlstyle: document.getElementById("hlstyle").value,
        autohl: document.getElementById("autohl").checked,
        fileext: document.getElementById("fileext").checked,
        linenumbers: document.getElementById("linenumbers").checked,
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
    restoreOption("hlstyle", "solarized-dark.css");
    restoreOption("autohl", false);
    restoreOption("fileext", false);
    restoreOption("linenumbers", false);
}

document.addEventListener('DOMContentLoaded', restoreAllOptions);
document.getElementById("hlstyle").addEventListener("change", saveOptions);
document.getElementById("autohl").addEventListener("change", saveOptions);
document.getElementById("fileext").addEventListener("change", saveOptions);
document.getElementById("linenumbers").addEventListener("change", saveOptions);
