/* SPDX-License-Identifier: MPL-2.0 */

var gDefaultOptions = {
    hlstyle: "base16/solarized-dark.css",
    autohl: false,
    fileext: false,
    linenumbers: false,
    tabsize: 8,
    /*
     * Default language list.
     * Based on the default selection proposed on the download page for
     * highlight.js: https://highlightjs.org/download/
     *
     *    cd highlight.js    # (in highlight.js repo)
     *    grep -l '^ *Category:.* common' src/languages|sort|sed 's=.\+/\(.*\).js=\1='
     */
    langlist: [
        "bash",
        "c",
        "cpp",
        "csharp",
        "css",
        "diff",
        "go",
        "ini",
        "java",
        "javascript",
        "json",
        "kotlin",
        "less",
        "lua",
        "makefile",
        "markdown",
        "objectivec",
        "perl",
        "php",
        "php-template",
        "plaintext",
        "python",
        "python-repl",
        "r",
        "ruby",
        "rust",
        "scss",
        "shell",
        "sql",
        "swift",
        "typescript",
        "vbnet",
        "xml",
        "yaml",
    ],
}
