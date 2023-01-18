/* SPDX-License-Identifier: MPL-2.0 */

import { DefaultOptions } from "../options/defaults.js";
import { FullLanguageList } from "../options/list-languages.js";

const AddonName = browser.runtime.getManifest().name;

/*
 * Paths.
 */
const HLJSPath = "../hljs/highlight.min.js";
const HLJSStylesDir = "/hljs/styles/";
const ContentScript = "../scripts/content.js";

/*
 * Current page status: highlighted, or not.
 */
let isHighlighted = false;

/*
 * Initialize options with default values.
 */
const options = JSON.parse(JSON.stringify(DefaultOptions));

/*
 * Callback.
 */
function onError (error) {
    console.error(`[${AddonName}] Error:`, error);
}

/*
 * Reload one option from storage.
 */
function reloadOption (aId, aDefault) {
    const gettingItem = browser.storage.local.get(aId);
    return gettingItem.then((res) => {
        if (res[aId] !== undefined) {
            options[aId] = res[aId];
        }
    }, onError);
}

/*
 * Update button tooltip label ("title").
 */
function updateTitle (aLanguageId) {
    if (aLanguageId) {
        let title = "Enlight [";
        for (const l of FullLanguageList) {
            if (l.class === aLanguageId) {
                title += l.name;
                break;
            }
        }
        title += "]";
        browser.action.setTitle({
            title: title,
        });
    } else {
        browser.action.setTitle({ title: "Enlight" });
    }
}

/*
 * Injected script. Pass options to main content script.
 */
function passOptions (aLanguageId, aFileExt, aLineNumbers, aTabSize, aLangList) {
    window.enlightContentScriptOptions = {
        language: aLanguageId,
        fileExt: aFileExt,
        lineNumbers: aLineNumbers,
        tabSize: aTabSize,
        langList: aLangList,
    };
}

/*
 * Actually trigger syntax highlighting by injecting content scripts.
 */
function doHighlight (aLanguageId) {
    browser.tabs.query({
        active: true,
    }).then((tabs) => {
        const target = {
            tabId: tabs[0].id,
        };

        browser.scripting.executeScript({
            target: target,
            files: [HLJSPath],
        }).then(() => {
            browser.scripting.executeScript({
                target: target,
                func: passOptions,
                args: [
                    aLanguageId,
                    options.fileext,
                    options.linenumbers,
                    options.tabsize,
                    JSON.stringify(options.langlist),
                ],
            }).then(() => {
                browser.scripting.executeScript({
                    target: target,
                    files: [ContentScript],
                }).then(() => {
                    if (aLanguageId === "undo") {
                        return browser.scripting.removeCSS({
                            target: target,
                            files: [HLJSStylesDir + options.hlstyle],
                        });
                    } else {
                        return browser.scripting.insertCSS({
                            target: target,
                            files: [HLJSStylesDir + options.hlstyle],
                        });
                    }
                });
            });
        });
    });
}

/*
 * Listener. Communicate with popup.
 */
function popupListener (aMsg, aSender, aSendResponse) {
    if (aMsg.languageId) {
        console.debug(`[${AddonName}] Required language:`, aMsg.languageId);
        doHighlight(aMsg.languageId);
        isHighlighted = true;
        if (aMsg.languageId === "auto" && !options.autohl) {
            /* Add listener to get selected language from content script */
            browser.runtime.onConnect.addListener(checkBodyListener);
        } else {
            updateTitle(aMsg.languageId);
        }
    } else if (aMsg.shouldOpenPopup) {
        const response = {
            shouldOpen: !isHighlighted,
        };
        if (response.shouldOpen) {
            response.langSubset = options.langlist;
        }
        aSendResponse(response);
        if (isHighlighted) {
            doHighlight("undo");
            isHighlighted = false;
            updateTitle();
        }
    }
}

/*
 * Injected script. Check page contents, for auto-highlighting.
 */
function checkBody () {
    const port = browser.runtime.connect({ name: "checkBodyPort" });
    if (
        document.body &&
    document.body.childNodes.length === 1 &&
    document.body.firstChild.nodeName === "PRE" &&
    document.location.toString()
        .slice(0, "view-source:".length) !== "view-source:"
    ) {
        port.postMessage({ isCodeBlock: true });
    } else {
        port.postMessage({ isCodeBlock: false });
    }
    port.disconnect();
}

/*
 * Listen to injected script to see if it detects a code block in the page.
 */
function checkBodyListener (p) {
    switch (p.name) {
    case "checkBodyPort":
        p.onMessage.addListener((m) => {
            console.debug(`[${AddonName}] Do we detect a code block?`, m.isCodeBlock);
            if (m.isCodeBlock) {
                doHighlight("auto");
            }
            isHighlighted = m.isCodeBlock;
        });
        break;
    case "detectedLanguage":
        p.onMessage.addListener((m) => {
            console.debug(`[${AddonName}] Content script detected language:`,
                m.language);
            updateTitle(m.language);
        });
        break;
    }
}

/*
 * Listener. If auto-highlighting is selected, highlight all raw text pages.
 */
function tabUpdateListener (aTabId, aChangeInfo, aTabInfo) {
    if (!aChangeInfo.url) {
        return;
    }
    /*
     * Auto-highlight!
     */
    browser.scripting.executeScript({
        target: {
            tabId: aTabId,
        },
        func: checkBody,
    });
}

/*
 * Load all options, and set up auto-highlighting if required.
 */
function init () {
    if (options.autohl) {
        browser.runtime.onConnect.removeListener(checkBodyListener);
        browser.tabs.onUpdated.removeListener(tabUpdateListener);
    }

    reloadOption("autohl")
        .then(reloadOption("fileext"))
        .then(reloadOption("linenumbers"))
        .then(reloadOption("hlstyle"))
        .then(reloadOption("tabsize"))
        .then(reloadOption("langlist"))
        .then(() => {
            if (options.autohl) {
                browser.runtime.onConnect.addListener(checkBodyListener);
                browser.tabs.onUpdated.addListener(tabUpdateListener);
            }
        });
}

/*
 * Perform these operations at add-on start-up:
 */

browser.runtime.onMessage.addListener(popupListener);

browser.storage.onChanged.addListener(init);
init();
