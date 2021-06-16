#!/bin/sh

HJSDIR="hljs"

rm -rf $HJSDIR
mkdir $HJSDIR
#wget --header='Referer: https://highlightjs.org/download/' --header='Cookie: csrftoken=8Md2sZNCuaAfiPWKeGLDkjkIUstBOokw'  --post-data 'csrfmiddlewaretoken=8Md2sZNCuaAfiPWKeGLDkjkIUstBOokw&apache.js=on&bash.js=on&cs.js=on&cpp.js=on&css.js=on&coffeescript.js=on&diff.js=on&xml.js=on&http.js=on&ini.js=on&json.js=on&java.js=on&javascript.js=on&makefile.js=on&markdown.js=on&nginx.js=on&objectivec.js=on&php.js=on&perl.js=on&python.js=on&ruby.js=on&sql.js=on&1c.js=on&avrasm.js=on&actionscript.js=on&applescript.js=on&asciidoc.js=on&autohotkey.js=on&axapta.js=on&brainfuck.js=on&cmake.js=on&capnproto.js=on&clojure.js=on&d.js=on&dos.js=on&dart.js=on&delphi.js=on&django.js=on&dust.js=on&elixir.js=on&erlang.js=on&erlang-repl.js=on&fsharp.js=on&fix.js=on&gcode.js=on&glsl.js=on&gherkin.js=on&go.js=on&gradle.js=on&groovy.js=on&haml.js=on&handlebars.js=on&haskell.js=on&haxe.js=on&x86asm.js=on&lasso.js=on&lisp.js=on&livecodeserver.js=on&lua.js=on&mel.js=on&mathematica.js=on&matlab.js=on&mizar.js=on&monkey.js=on&nsis.js=on&nimrod.js=on&nix.js=on&ocaml.js=on&ruleslanguage.js=on&oxygene.js=on&parser3.js=on&protobuf.js=on&profile.js=on&q.js=on&r.js=on&rib.js=on&rsl.js=on&rust.js=on&scss.js=on&scala.js=on&scheme.js=on&scilab.js=on&smalltalk.js=on&swift.js=on&tex.js=on&thrift.js=on&typescript.js=on&vbnet.js=on&vbscript.js=on&vhdl.js=on&vala.js=on&vim.js=on' 'https://highlightjs.org/download/' -O 'highlight.zip' -c
mv highlight.zip $HJSDIR
cd $HJSDIR
unzip highlight.zip
rm -- CHANGES.md LICENSE README.md README.ru.md
rm -- highlight.zip
