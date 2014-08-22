#!/bin/sh
sed 's/registerLanguage("/&\n/g' highlight.pack.js | sed 's/".*//' | sed '1d' | sort
