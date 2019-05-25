function checkAll(aVal) {
    let table = document.getElementById("langlist");

    for (let row of table.children) {
        let cell = row.children[0];
        let input = cell.children[0];
        if (aVal === true)
            input.checked = true;
        else if (aVal === false)
            input.checked = false;
        else if (Array.isArray(aVal)) {
            let l = input.id.substring("langlist-".length);
            input.checked = aVal.includes(l);
        }
    }

    saveOptions();
}

document.getElementById("langlist-selectall")
    .addEventListener("click", () => { checkAll(true) });
document.getElementById("langlist-selectnone")
    .addEventListener("click", () => { checkAll(false) });
document.getElementById("langlist-reset")
    .addEventListener("click", () => { checkAll(gDefaultOptions.langlist) });
