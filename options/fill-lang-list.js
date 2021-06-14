/* SPDX-License-Identifier: MPL-2.0 */

const gLanguagePath = "languages-list_all.json";
const langlistReadyEvent = new Event("langlistReady");

/*
 * Parse JSON list of languages.
 */
function loadJSON (aCallback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", gLanguagePath, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === 200) {
            aCallback(xobj.responseText);
        }
    };
    xobj.send(null);
}

/*
 * Create list of languages.
 */
function updateList (aResponse) {
    const languageList = JSON.parse(aResponse);
    const optList = document.getElementById("langlist");
    for (const l of languageList) {
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
        optList.appendChild(row);
    }

    document.dispatchEvent(langlistReadyEvent);
}

loadJSON(updateList);
