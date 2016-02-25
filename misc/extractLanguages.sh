#!/bin/bash
#sed 's/registerLanguage("/&\n/g' highlight.pack.js | sed 's/".*//' | sed '1d' | sort

if [ -z "$1" ] ; then
  echo "Usage: $0 <file>"
  exit 1
fi

listall() {
  egrep -o 'registerLanguage\("[^"]+"' $1 | sed 's/registerLanguage("\(.*\)"/\1/' | sort
}
listall $1

echo -e "\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo "Not in data/languages-all.json:"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
grep -f <(sed 's/^"\([^"]*\)".*/\1/' data/languages-all.json) -v <(listall $1)
