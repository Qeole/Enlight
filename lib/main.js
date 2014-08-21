/* Vim: set ts=8 sts=2 et sw=2 tw=80: */

var self    = require("sdk/self");
var buttons = require('sdk/ui/button/toggle');
var tabs    = require("sdk/tabs");
var panels  = require("sdk/panel");
var spref   = require('sdk/simple-prefs');

var gHJSPath = "highlightjs";

var gId = "";

var button = buttons.ToggleButton({
  id: "Highlighter",
    label: "Highlight raw source code",
    icon: {
      "16": "./icon-16.png",
      "32": "./icon-32.png",
      "64": "./icon-64.png"
    },
    onClick: handleClick
});

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

function handleClick(state) {
  if (button.state("tab").checked) {
    panel.show({
      position: button
    });
  }
  else {
    undoHighlight();
  }
}

function doHighlight() {
  console.log("Let's highlight code for language '" + gId + "' with style '"+ spref.prefs["style"] + "'.");
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
