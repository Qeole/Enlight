/* SPDX-License-Identifier: MPL-2.0 */

var gLanguagePath  = "languages-list_all.json";
const langlistReadyEvent = new Event("langlistReady");

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

    document.dispatchEvent(langlistReadyEvent);
}

loadJSON(updateList);
