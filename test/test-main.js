/* Vim: set ts=8 sts=2 et sw=2 tw=80: */

var self  = require("sdk/self");
var tabs  = require("sdk/tabs");
var utils = require('sdk/test/utils');
var main  = require("./main");

function clickInPanel(languageId) {
  main.panel.languageId = languageId;
  main.panel.hide();
  main.doHighlight();
}

exports["test main01 startup"] = function(assert, done) {
  assert.ok(!main.button.state("tab").checked, "01 button toggled off");
  assert.ok(!main.panel.isShowing,             "01 panel is closed");
  done();
};

exports["test main02 double click"] = function(assert, done) {
  assert.ok(!main.button.state("tab").checked, "02a button toggled off");
  assert.ok(!main.panel.isShowing,             "02a panel is closed");

  main.button.click();
  utils.waitUntil(function(){return main.panel.isShowing;}).then(() => {
    assert.ok( main.button.state("tab").checked, "02b button toggled on");
    assert.ok( main.panel.isShowing,             "02b panel is open");

    main.button.click();
    assert.ok(!main.button.state("tab").checked, "02c button toggled off");
    /*
     * Double click on button through JavaScript does not seem to close panel.
     * Close it manually.
     */
    assert.ok( main.panel.isShowing,             "02c panel is open");
    main.panel.hide();

    utils.waitUntil(function(){return !main.panel.isShowing;}).then(() => {
      assert.ok(!main.button.state("tab").checked, "02d button toggled off");
      assert.ok(!main.panel.isShowing,             "02d panel is closed");
      done();
    });
  });
};

exports["test main03 highlight blank"] = function(assert, done) {
  assert.ok(!main.button.state("tab").checked, "03a button toggled off");
  assert.ok(!main.panel.isShowing,             "03a panel is closed");

  main.button.click();
  utils.waitUntil(function(){return main.panel.isShowing;}).then(() => {
    assert.ok( main.button.state("tab").checked, "03b button toggled on");
    assert.ok( main.panel.isShowing,             "03b panel is open");

    clickInPanel("auto");
    main.doHighlight();
    utils.waitUntil(function(){return !main.panel.isShowing;}).then(() => {
      utils.waitUntil(function(){return !main.button.state("tab").checked}).then(() => {
        assert.ok(!main.button.state("tab").checked, "03c button toggled off");
        assert.ok(!main.panel.isShowing,             "03c panel is closed");
        done();
      });
    });
  });
};

exports["test main04 highlight empty"] = function(assert, done) {
  assert.ok(!main.button.state("tab").checked, "04a button toggled off");
  assert.ok(!main.panel.isShowing,             "04a panel is closed");
  tabs.open({
    url     : self.data.url("test/index.html"),
    onReady : () => {

      main.button.click();
      utils.waitUntil(function(){return main.panel.isShowing;}).then(() => {
        assert.ok( main.button.state("tab").checked, "04b button toggled on");
        assert.ok( main.panel.isShowing,             "04b panel is open");

        clickInPanel("auto");
        main.doHighlight();
        utils.waitUntil(function(){return !main.button.state("tab").checked;}).then(() => {
          assert.ok(!main.button.state("tab").checked, "04c button toggled off");
          assert.ok(!main.panel.isShowing,             "04c panel is closed");

          tabs.activeTab.close();
          done();
        });
      });
    }
  });
};

exports["test main05 highlight test page"] = function(assert, done) {
  assert.ok(!main.button.state("tab").checked, "05a button toggled off");
  assert.ok(!main.panel.isShowing,             "05a panel is closed");
  tabs.open({
    url     : self.data.url("test/random_c"),
    onReady : () => {

      main.button.click();
      utils.waitUntil(function(){return main.panel.isShowing;}).then(() => {
        assert.ok( main.button.state("tab").checked, "05b button toggled on");
        assert.ok( main.panel.isShowing,             "05b panel is open");

        clickInPanel("auto");
        utils.waitUntil(function(){return  main.button.state("tab").checked &&
                                          !main.panel.isShowing;}).then(() => {
          assert.ok( main.button.state("tab").checked, "05c button toggled on");
          assert.ok(!main.panel.isShowing,             "05c panel is closed");

          main.button.click();
          utils.waitUntil(function(){return !main.panel.isShowing;}).then(() => {
            assert.ok(!main.button.state("tab").checked, "05d button toggled off");
            assert.ok(!main.panel.isShowing,             "05d panel is closed");

            tabs.activeTab.close();
            done();
          });
        });
      });
    }
  });
};

exports["test main06 highlight then reload"] = function(assert, done) {
  assert.ok(!main.button.state("tab").checked, "06a button toggled off");
  assert.ok(!main.panel.isShowing,             "06a panel is closed");
  tabs.open({
    url     : self.data.url("test/random_c"),
    onReady : () => {

      main.button.click();
      utils.waitUntil(function(){return  main.button.state("tab").checked &&
                                         main.panel.isShowing;}).then(() => {
        assert.ok( main.button.state("tab").checked, "06b button toggled on");
        assert.ok( main.panel.isShowing,             "06b panel is open");

        clickInPanel("auto");
        utils.waitUntil(function(){return  main.button.state("tab").checked &&
                                          !main.panel.isShowing;}).then(() => {
          assert.ok( main.button.state("tab").checked, "06c button toggled on");
          assert.ok(!main.panel.isShowing,             "06c panel is closed");

          tabs.activeTab.reload();
          utils.waitUntil(function(){return !main.button.state("tab").checked;}).then(() => {
            assert.ok(!main.button.state("tab").checked, "06d button toggled off");
            assert.ok(!main.panel.isShowing,             "06d panel is closed");

            tabs.activeTab.close();
            done();
          });
        });
      });
    }
  });
};

require("sdk/test").run(exports);
