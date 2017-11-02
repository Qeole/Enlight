/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ts=8 sts=4 et sw=4 tw=80: */

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const styles = [
    { "file": "agate.css",                     "name" : "Agate"                     },
    { "file": "androidstudio.css",             "name" : "Android Studio"            },
    { "file": "arduino-light.css",             "name" : "Arduino Light"             },
    { "file": "arta.css",                      "name" : "Arta"                      },
    { "file": "ascetic.css",                   "name" : "Ascetic"                   },
    { "file": "atelier-cave-dark.css",         "name" : "Atelier Cave Dark"         },
    { "file": "atelier-cave-light.css",        "name" : "Atelier Cave Light"        },
    { "file": "atelier-dune-dark.css",         "name" : "Atelier Dune Dark"         },
    { "file": "atelier-dune-light.css",        "name" : "Atelier Dune Light"        },
    { "file": "atelier-estuary-dark.css",      "name" : "Atelier Estuary Dark"      },
    { "file": "atelier-estuary-light.css",     "name" : "Atelier Estuary Light"     },
    { "file": "atelier-forest-dark.css",       "name" : "Atelier Forest Dark"       },
    { "file": "atelier-forest-light.css",      "name" : "Atelier Forest Light"      },
    { "file": "atelier-heath-dark.css",        "name" : "Atelier Heath Dark"        },
    { "file": "atelier-heath-light.css",       "name" : "Atelier Heath Light"       },
    { "file": "atelier-lakeside-dark.css",     "name" : "Atelier Lakeside Dark"     },
    { "file": "atelier-lakeside-light.css",    "name" : "Atelier Lakeside Light"    },
    { "file": "atelier-plateau-dark.css",      "name" : "Atelier Plateau Dark"      },
    { "file": "atelier-plateau-light.css",     "name" : "Atelier Plateau Light"     },
    { "file": "atelier-savanna-dark.css",      "name" : "Atelier Savanna Dark"      },
    { "file": "atelier-savanna-light.css",     "name" : "Atelier Savanna Light"     },
    { "file": "atelier-seaside-dark.css",      "name" : "Atelier Seaside Dark"      },
    { "file": "atelier-seaside-light.css",     "name" : "Atelier Seaside Light"     },
    { "file": "atelier-sulphurpool-dark.css",  "name" : "Atelier Sulphurpool Dark"  },
    { "file": "atelier-sulphurpool-light.css", "name" : "Atelier Sulphurpool Light" },
    { "file": "atom-one-dark.css",             "name" : "Atom One Dark"             },
    { "file": "atom-one-light.css",            "name" : "Atom One Light"            },
    { "file": "brown-paper.css",               "name" : "Brown Paper"               },
    { "file": "codepen-embed.css",             "name" : "Codepen Embed"             },
    { "file": "color-brewer.css",              "name" : "Color Brewer"              },
    { "file": "darcula.css",                   "name" : "Darcula"                   },
    { "file": "dark.css",                      "name" : "Dark"                      },
    { "file": "darkula.css",                   "name" : "Darkula"                   },
    { "file": "default.css",                   "name" : "Default"                   },
    { "file": "docco.css",                     "name" : "Docco"                     },
    { "file": "dracula.css",                   "name" : "Dracula"                   },
    { "file": "far.css",                       "name" : "Far"                       },
    { "file": "foundation.css",                "name" : "Foundation"                },
    { "file": "github.css",                    "name" : "Github"                    },
    { "file": "github-gist.css",               "name" : "Github Gist"               },
    { "file": "googlecode.css",                "name" : "Googlecode"                },
    { "file": "grayscale.css",                 "name" : "Grayscale"                 },
    { "file": "gruvbox-dark.css",              "name" : "Gruvbox Dark"              },
    { "file": "gruvbox-light.css",             "name" : "Gruvbox Light"             },
    { "file": "hopscotch.css",                 "name" : "Hopscotch"                 },
    { "file": "hybrid.css",                    "name" : "Hybrid"                    },
    { "file": "idea.css",                      "name" : "Idea"                      },
    { "file": "ir-black.css",                  "name" : "Ir Black"                  },
    { "file": "kimbie.dark.css",               "name" : "Kimbie Dark"               },
    { "file": "kimbie.light.css",              "name" : "Kimbie Light"              },
    { "file": "magula.css",                    "name" : "Magula"                    },
    { "file": "mono-blue.css",                 "name" : "Mono Blue"                 },
    { "file": "monokai.css",                   "name" : "Monokai"                   },
    { "file": "monokai-sublime.css",           "name" : "Monokai Sublime"           },
    { "file": "obsidian.css",                  "name" : "Obsidian"                  },
    { "file": "ocean.css",                     "name" : "Ocean"                     },
    { "file": "paraiso-dark.css",              "name" : "Paraiso Dark"              },
    { "file": "paraiso-light.css",             "name" : "Paraiso Light"             },
    { "file": "pojoaque.css",                  "name" : "Pojoaque"                  },
    { "file": "purebasic.css",                 "name" : "PureBASIC"                 },
    { "file": "qtcreator_dark.css",            "name" : "Qt Creator Dark"           },
    { "file": "qtcreator_light.css",           "name" : "Qt Creator Light"          },
    { "file": "railscasts.css",                "name" : "Railscasts"                },
    { "file": "rainbow.css",                   "name" : "Rainbow"                   },
    { "file": "routeros.css",                  "name" : "RouterOS (MikroTik)"       },
    { "file": "school-book.css",               "name" : "School Book"               },
    { "file": "solarized-dark.css",            "name" : "Solarized Dark"            },
    { "file": "solarized-light.css",           "name" : "Solarized Light"           },
    { "file": "sunburst.css",                  "name" : "Sunburst"                  },
    { "file": "tomorrow.css",                  "name" : "Tomorrow"                  },
    { "file": "tomorrow-night-blue.css",       "name" : "Tomorrow Night Blue"       },
    { "file": "tomorrow-night-bright.css",     "name" : "Tomorrow Night Bright"     },
    { "file": "tomorrow-night.css",            "name" : "Tomorrow Night"            },
    { "file": "tomorrow-night-eighties.css",   "name" : "Tomorrow Night Eighties"   },
    { "file": "vs.css",                        "name" : "VisualStudio"              },
    { "file": "vs2015.css",                    "name" : "VisualStudio 2015 Dark"    },
    { "file": "xcode.css",                     "name" : "XCode"                     },
    { "file": "xt256.css",                     "name" : "xt256"                     },
    { "file": "zenburn.css",                   "name" : "Zenburn"                   }
];
let list = document.getElementById("hlstyle");
for (let s of styles) {
    let item = document.createElement("option");
    item.value = s.file;
    item.textContent = s.name;
    list.appendChild(item);
}
