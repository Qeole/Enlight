#!/bin/sh
#sed 's/registerLanguage("/&\n/g' highlight.pack.js | sed 's/".*//' | sed '1d' | sort

egrep -o 'registerLanguage\("[^"]+"' highlight.pack.js | sed 's/registerLanguage("\(.*\)"/\1/' | sort
