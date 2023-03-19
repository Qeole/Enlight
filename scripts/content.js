/* SPDX-License-Identifier: MPL-2.0 */

/*
 * Syntax highlighting addition/removal handlers (content scripts).
 *
 * First we need to decide whether we do or undo highlight.
 *
 * To do it, we have to add a CSS stylesheet and to enclose <pre></pre> blocks
 * content to highlight with <code></code> tags so that it looks like
 * <pre><code lang="cpp"> int a = 3 + b; </code></pre> (see highlightjs doc).
 * We perform a backup of original document by putting it in a hidden div.
 *
 * Undoing highlight consists in getting saved document back from the div.
 */

/*****************************************************************************/

/* global enlightContentScriptOptions hljs */

/*
 * Get options attached as window.enlightContentScriptOptions by previous
 * content script.
 */
/* eslint-disable-next-line no-var */
var options = enlightContentScriptOptions;

/*
 * Run the main function at startup.
 */
(function () {
    /*
     * If there is no <pre></pre> HTML block, there's nothing to work on: get
     * out of here.
     */
    if (!document.body ||
       document.body.getElementsByTagName("pre").item(0) === null) {
        return;
    }

    const initDocumentDiv = document.getElementById("enlightInitDocument");
    /*
     * If div is found, we already got syntax highlighting: let's undo it.
     * Else, launch highlighting.
     */
    initDocumentDiv === null ? dohl() : undohl(initDocumentDiv.firstChild);

    /*
     * If option is set, activate “gotoline” functionality.
     */
    if (options && options.lineNumbers) {
        gotoline();
    }
}());

/*****************************************************************************/

function dohl () {
    const preList = document.getElementsByTagName("pre");
    /*
     * If options is empty we shouldn't be there. Page has probably been changed
     * since a former highlight: get out as well.
     * If options.language is "undo", we want to undo highlighting. If we
     * triggered dohl() in that case, we probably messed up somewhere in keeping
     * track of page status. Stop the mess here and return.
     */
    if (!options || options === {} || options.language === "undo") {
        return;
    }

    /*
     * Back up initial document
     */
    const clone = document.documentElement.cloneNode(true);
    const idoc = document.createElement("div");
    idoc.style.display = "none";
    idoc.setAttribute("id", "enlightInitDocument");
    idoc.appendChild(clone);

    /*
     * If needed, add CSS rules for line numbering
     */
    addLineNumberStyle();

    /*
     * Deal with language
     */
    let language = "";

    if (options.language !== "" && options.language !== "auto") {
        language = "language-" + options.language;
    } else if (options.language === "auto" && options.fileExt) {
        /* Try to guess language based on file extension */
        const extension = window.location.toString().split(".").pop().toLowerCase();
        switch (extension) {
        case "sh":
            language = "language-bash";
            break;
        case "c":
        case "h":
            language = "language-c";
            break;
        case "cc":
            language = "language-cpp";
            break;
        case "diff":
        case "patch":
            language = "language-diff";
            break;
        case "js":
            language = "language-javascript";
            break;
        case "md":
            language = "language-markdown";
            break;
        case "pl":
            language = "language-perl";
            break;
        case "py":
            language = "language-python";
            break;
        case "rb":
            language = "language-ruby";
            break;
        case "rs":
            language = "language-rust";
            break;
        case "cs":
        case "css":
        case "go":
        case "xml":
        case "ini":
        case "json":
        case "java":
        case "php":
            language = "language-" + extension;
            break;
        case "txt":
            language = "nohighlight";
            break;
        default:
            break;
        }
    }
    /*
     * Else if (options.language == "auto"), we leave language to "" so that
     * highlight.js attempts auto-detection
     */

    /*
     * Enclose <pre></pre> blocks content in <code></code> blocks
     */
    for (const pre of preList) {
        /* Replace all <br> tags with newline characters */
        const codeBlock = pre.querySelector('code');
        codeBlock.innerHTML = codeBlock.innerHTML.replace(/<br>/g, '\n');

        const firstChild = pre.firstChild;
        const code = document.createElement("code");
        let tabsize = "";
        if (options && options.tabSize) {
            tabsize = " -moz-tab-size: " + options.tabSize + ";";
        }
        code.setAttribute("class", language);
        code.style = "padding: 0;" + tabsize;
        code.appendChild(firstChild);
        pre.appendChild(code);
    }

    /*
     * Call highlighting function: hljs is defined in highlight.js library.
     */
    if (options && options.langList) {
        hljs.configure({
            languages: options.langList,
        });
    }
    hljs.highlightAll();

    /*
     * Add line numbers if needed.
     */
    if (options.lineNumbers) {
        for (const pre of preList) {
            const code = pre.firstChild;
            addLineNumbers(code);
        }
    }

    /*
     * There's a remaining white border because of body background color. Remove
     * it by copying background color of highlighted code area.
     */
    setTimeout(function () { // Wait for CSS to be computed
        const codeBG = getComputedStyle(preList[0].firstChild)["background-color"];
        if (codeBG &&
        codeBG !== "white" &&
        codeBG !== "#FFFFFF" &&
        codeBG !== "#ffffff") {
            document.body.style.backgroundColor = codeBG;
        }
    }, 50);

    /*
     * If we launched language auto-detection, tell main script about detected
     * language
     */
    if (options.language === "" || options.language === "auto") {
        const languageId = document.querySelectorAll("pre code")[0].className
            .split(" ").find(c => c.indexOf("language-", 0) === 0)
            .slice("language-".length);
        const port = browser.runtime.connect({ name: "detectedLanguage" });
        port.postMessage({ language: languageId });
        port.disconnect();
    }

    /*
     * Save previous document in a hidden div to restore it on undohl()
     */
    document.body.appendChild(idoc);
}

/*****************************************************************************/

function undohl (idoc) {
    document.replaceChild(idoc, document.documentElement);
    /*
     * Another solution:
     * window.location.reload(false);
     */
}

/*****************************************************************************/

/*
 * Add line numbers to argument code block if option is set
 */
function addLineNumbers (aCode) {
    /*
     * Enclose each line of highlighted content into a "line" span.
     * Text has already been highlighted at this point (it's a mix of text
     * and of spans for coloring), so I can't see any easy way to do this
     * without assigning to innerHTML.
     */
    const lines = aCode.innerHTML
        .replace(/^.*?(\n|.$)/gm, "<span class=\"line hljs-comment\"></span>$&");
    aCode.innerHTML = lines;
}

/*****************************************************************************/

/*
 * Numbering is performed with CSS. We add it to head of document. From
 * https://github.com/isagalaev/highlight.js/compare/master...line-numbers
 */
function addLineNumberStyle () {
    if (!options.lineNumbers) {
        return;
    }

    const styleContent = " \
    pre { \
      counter-reset: lines; \
    } \
    pre .line { \
      counter-increment: lines; \
    } \
    pre .line::before { \
      -moz-user-select: none; \
      \
      content: counter(lines); text-align: right; \
      display: inline-block; min-width: 2.5em; \
      padding-right: 0.5em; margin-right: 0.5em; \
      font-weight: bold; \
      border-right: solid 1px; \
    }";
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    const styleTextNode = document.createTextNode(styleContent);
    style.appendChild(styleTextNode);
    document.head.appendChild(style);
}

/*****************************************************************************/

/*
 * If user added an anchor to the URL, go to line number and select this line.
 * NOTE: there is no event triggered by URL edit that we could listen to, so
 * the anchor must be present when the script loads. If user adds it afterward,
 * they should manually reload the script (or the page if using autodetection).
 */
function gotoline () {
    /*
     * Get "#line27" or "#Line27" or "#L27" or "#l27" -like sequence from URL
     */
    const nb = (window.location + "").match(/#(?:[Ll](?:ine)?)?(\d+)/i);
    if (nb === null) {
        return;
    }

    /*
     * Fetch associated line. Note that we fetch the “absolute” nth line of
     * highlighted code in the file, which is not necessarily the nth line of its
     * block if there are several highlighted blocks of code.
     */
    const target = document.getElementsByClassName("line")[nb[1] - 1];
    if (target === undefined) {
        return;
    }

    /*
     * Scroll to that line
     */
    target.scrollIntoView();

    /*
     * Select this line
     */
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStartAfter(target);
    const next = document.getElementsByClassName("line")[nb[1]];
    next !== undefined
        ? range.setEndBefore(next)
        : range.setEndAfter(target.parentNode);
    selection.addRange(range);
}
