/* Vim: set ts=8 sts=2 et sw=2 tw=80: */

var self    = require("sdk/self");
var buttons = require('sdk/ui/button/toggle');
var tabs    = require("sdk/tabs");
var panels  = require("sdk/panel");
var spref   = require('sdk/simple-prefs');

/*
 * Directory for highlight.js code (under data/)
 */
var gHJSPath = "highlightjs";
/*
 * Last language id chosen
 */
var gId = "";

/*
 * Icon sets for toggle button
 */
var gIconInit = { // actually links towards ./lightbulb_off-xx.png
  "16": "./lightbulb_init-16.png",
  "32": "./lightbulb_init-32.png",
  "64": "./lightbulb_init-64.png"
};
var gIconOff = {
  "16": "./lightbulb_off-16.png",
  "32": "./lightbulb_off-32.png",
  "64": "./lightbulb_off-64.png"
};
var gIconOn = {
  "16": "./lightbulb_on-16.png",
  "32": "./lightbulb_on-32.png",
  "64": "./lightbulb_on-64.png"
};

/*
 * Toggle button
 */
var button = buttons.ToggleButton({
  id: "Highlighter",
  label: "Highlight raw source code",
  icon: gIconInit,
  onClick: handleClick
});
button.state("window", { checked: false });

/*
 * Language selection panel
 */
var panelSelect = "window.addEventListener('click', function(event) {" +
                  "  var t = event.target;" +
                  "  if (t.nodeName == 'DIV') {" +
                  "    self.port.emit('click-lang', t.getAttribute('id'));" +
                  "  }" +
                  "}, false);";

var panel = panels.Panel({
  contentURL: self.data.url("panel.html"),
  contentScript: panelSelect,
  onHide: doHighlight
});

panel.port.on("click-lang", function(id) {
  gId = id;
  panel.hide();
});

/*
 * Callbacks
 */
function handleClick(state) {
  /*
   * Classic behavior (window-wise) would be:
   *    // checked is false: clicking a first time set it to true
   *    if (checked)      // i.e. we just clicked an odd time
   *      do highlight
   *    else              // we just clicked an even time
   *      undo highlight
   *    fi
   * But here we toggle tab-wise, so we need to check "manually".
   *
   * Also first time we click tab.checked is false, click does not set it to
   * true. Hence we need a way to know if it's the first time for this tab:
   * here we change the icon path (actually is a link to same PNG file).
   */
  button.state("window", {"checked" : false});
  if (button.state("tab").icon["16"] == gIconInit["16"]) {
    button.state("tab", {"icon" : gIconOn, "checked" : false});
  }

  if (!button.state("tab").checked) {
    button.state("tab", {"icon" : gIconOn, "checked" : true});
    panel.show({
      position: button
    });
  }
  else {
    button.state("tab", {"icon" : gIconOff, "checked" : false});
    undoHighlight();
  }
}

function doHighlight() {
  console.log("Let's (try to) highlight code for language '" + gId + "' with style '"+ spref.prefs["style"] + "'.");
  tabs.activeTab.attach({
    contentScriptOptions: {
      "stylesheet" : self.data.url(gHJSPath + "/styles/" + spref.prefs["style"] + ".css"),
      "language"   : gId
    },
    contentScriptFile: [
      self.data.url(gHJSPath + "/highlight.pack.js"),
      self.data.url("enlightscript.js")
    ]
  });
}

function undoHighlight() {
  console.log("Oh, well, let's get back to initial content.")
  tabs.activeTab.attach({
    contentScriptFile: [
      self.data.url("enlightscript.js")
    ]
  });
}
