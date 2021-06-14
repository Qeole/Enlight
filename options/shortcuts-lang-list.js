/* SPDX-License-Identifier: MPL-2.0 */

/* global gDefaultOptions saveOptions */

function checkAll (aVal) {
    const table = document.getElementById("langlist");

    for (const row of table.children) {
        const cell = row.children[0];
        const input = cell.children[0];
        if (aVal === true) {
            input.checked = true;
        } else if (aVal === false) {
            input.checked = false;
        } else if (Array.isArray(aVal)) {
            const l = input.id.substring("langlist-".length);
            input.checked = aVal.includes(l);
        }
    }

    saveOptions();
}

document.getElementById("langlist-selectall")
    .addEventListener("click", () => {
        checkAll(true);
    });
document.getElementById("langlist-selectnone")
    .addEventListener("click", () => {
        checkAll(false);
    });
document.getElementById("langlist-reset")
    .addEventListener("click", () => {
        checkAll(gDefaultOptions.langlist);
    });
