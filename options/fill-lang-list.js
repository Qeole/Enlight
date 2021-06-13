/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ts=8 sts=4 et sw=4 tw=80: */

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var gLanguagePath  = "languages-list_all.json";

/*
 * Parse JSON list of languages.
 */
function loadJSON(aCallback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", gLanguagePath, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            aCallback(xobj.responseText);
        }
    };
    xobj.send(null);
}

/*
 * Create list of languages.
 */
function updateList(aResponse) {
    languageList = JSON.parse(aResponse);
    let optList = document.getElementById("langlist");
    for (let l of languageList) {
        if (l.class == "auto")
            continue;
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        let input = document.createElement("input");
        let label = document.createElement("label");
        let id = "langlist-" + l.class;
        input.type = "checkbox";
        input.id = id;
        label.for = id;
        label.textContent = l.name;
        cell.appendChild(input)
        cell.appendChild(label)
        row.appendChild(cell);
        optList.appendChild(row);
    }
}

loadJSON(updateList);
