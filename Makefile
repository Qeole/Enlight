# SPDX-License-Identifier: MPL-2.0

SHELL := /usr/bin/env bash

VERSION := $(shell sed -n '/"version"/ s/.*: "\(.*\)",/\1/p' manifest.json)
HLJS_VERSION := $(shell awk '/HLJS_VERSION/ { print $$1 }' README.md)

ADDON   := web-ext-artifacts/enlight-$(VERSION).zip
WEB_EXT ?= ./node_modules/web-ext/bin/web-ext

HLJS_DIR     := hljs
HLJS_SCRIPT  := highlight.min.js
HLJS_STYLES  := $(HLJS_DIR)/styles
HLJS         := $(HLJS_DIR)/$(HLJS_SCRIPT) $(HLJS_STYLES) $(HLJS_DIR)/README.md $(HLJS_DIR)/LICENSE

HLJS_SRC_DIR := highlight.js
HLJS_SRC_REF := $(HLJS_SRC_DIR)/LICENSE
HLJS_SRC     := $(addprefix $(HLJS_SRC_DIR)/,build/$(HLJS_SCRIPT) src/$(notdir $(HLJS_STYLES)) README.md LICENSE)

addon: hljs_version checks $(ADDON) addons-linter

checks: check-css-list check-lang-list eslint

%.zip: $(HLJS)
	$(WEB_EXT) build --overwrite-dest -i misc/ -i amo-screenshots/ -i package-lock.json -i $(HLJS_SRC_DIR)/

hljs: clean-hljs hljs_version $(HLJS)

$(HLJS): $(HLJS_SRC_REF)
	cd $(HLJS_SRC_DIR) && \
		npm install && \
		node tools/build.js -t browser
	mkdir -p $(HLJS_DIR)
	cp -r -t $(HLJS_DIR) $(HLJS_SRC)

lib-src: clean-lib-src $(HLJS_SRC_DIR)

hljs_version: $(HLJS_SRC_REF)
	pushd $(dir $<) && \
		[[ "$$(git describe --tags)" == "$(HLJS_VERSION)" ]] || \
		( git checkout $(HLJS_VERSION) && \
			popd && \
			$(RM) -r -- $(HLJS_DIR) )

$(HLJS_SRC_REF):
	git submodule update --init

.PHONY: addon hljs checks lib-src hljs_version

STYLES_LIST := options/list-styles.js
check-css-list: $(HLJS_STYLES)
	@printf 'Checking that all CSS styles from highlight.js are listed in the add-on...\t'
	@error=0; \
		for stylepath in $(HLJS_STYLES)/*.css $(HLJS_STYLES)/base16/*.css; do \
			style=$${stylepath#$(HLJS_STYLES)/}; \
			if ! grep -q $$style $(STYLES_LIST); then \
				[ $$error = 0 ] && printf '\n'; \
				printf '\e[1;31m[WARNING] Found missing CSS style: "%s".\e[0m\n' $$style; \
				error=1; \
			fi; \
		done; [ $$error = 0 ] && printf 'All good.\n' || false
	@printf 'Checking that all CSS styles from the add-on are present in highlight.js...\t'
	@error=0; \
		for style in $$(sed -n 's/.*"\([^"]\+.css\)",.*/\1/p' $(STYLES_LIST)); do \
			if ! [ -f $(HLJS_STYLES)/$$style ]; then \
				[ $$error = 0 ] && printf '\n'; \
				printf '\e[1;31m[WARNING] Found missing CSS style: "%s".\e[0m\n' $$style; \
				error=1; \
			fi; \
		done; [ $$error = 0 ] && printf 'All good.\n' || false

LANGUAGES_LIST := options/list-languages.js
HLJS_LANG_FILES = $(basename $(notdir $(wildcard $(HLJS_SRC_DIR)/src/languages/*.js)))
check-lang-list: $(HLJS_SRC_DIR)
	@printf 'Checking that all languages from highlight.js are listed in the add-on...\t'
	@error=0; LANGUAGES="$(HLJS_LANG_FILES)"; \
		for l in $$LANGUAGES; do \
			if ! grep -q -w $$l $(LANGUAGES_LIST); then \
				[ $$error = 0 ] && printf '\n'; \
				printf '\e[1;31m[WARNING] Found missing language: "%s".\e[0m\n' $$l; \
				error=1; \
			fi; \
		done; [ $$error = 0 ] && printf 'All good.\n' || false
	@printf 'Checking that all languages from the add-on are present in highlight.js...\t'
	@error=0; LANGUAGES="$(HLJS_LANG_FILES)"; \
		for l in $$(sed -n '/class: "auto"/d; s/.*class: "\([^"]*\)".*/\1/p' $(LANGUAGES_LIST)); do \
			if ! echo $$LANGUAGES | grep -q -w $$l ; then \
				[ $$error = 0 ] && printf '\n'; \
				printf '\e[1;31m[WARNING] Found missing language: "%s".\e[0m\n' $$l; \
				error=1; \
			fi; \
		done; [ $$error = 0 ] && printf 'All good.\n' || false

.PHONY: check-css-list check-lang-list

# https://github.com/mozilla/addons-linter
ADDONS_LINTER ?= ./node_modules/addons-linter/bin/addons-linter
addons-linter:
	$(ADDONS_LINTER) $(ADDON)

# https://eslint.org/
eslint:
	npx eslint $(FIX) scripts popup options

# WARNING: This one is very specific to my own setup, you will need to adapt it
FIREFOX_BIN      ?= /opt/firefox/firefox-bin
FIREFOX_PROFILE  ?= ../enlight-FxDevProfile
FIREFOX_TESTFILE ?= file:///etc/bash.bashrc
run: $(HLJS)
	$(WEB_EXT) run -f $(FIREFOX_BIN) -p $(FIREFOX_PROFILE) -u $(FIREFOX_TESTFILE)

.PHONY: eslint addons-linter run

clean-lib-src:
	$(RM) -r -- $(HLJS_SRC_DIR)

clean-hljs:
	$(RM) -r -- $(HLJS_DIR)

clean: clean-hljs clean-lib-src
	$(RM) -- $(ADDON)

.PHONY: clean clean-hljs clean-lib-src

version:
	@echo -e "highlight.js\tversion $(HLJS_VERSION)"
	@echo -e "Enlight\t\tversion $(VERSION)"

.PHONY: version
