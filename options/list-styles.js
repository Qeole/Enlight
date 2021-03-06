/* SPDX-License-Identifier: MPL-2.0 */

/* eslint-disable no-multi-spaces */
const FullStyleList = [
    { file: "base16/3024.css",                          name: "3024" },
    { file: "a11y-dark.css",                            name: "A11y Dark" },
    { file: "a11y-light.css",                           name: "A11y Light" },
    { file: "agate.css",                                name: "Agate" },
    { file: "an-old-hope.css",                          name: "An Old Hope" },
    { file: "androidstudio.css",                        name: "Android Studio" },
    { file: "base16/apathy.css",                        name: "Apathy" },
    { file: "base16/apprentice.css",                    name: "Apprentice" },
    { file: "arduino-light.css",                        name: "Arduino Light" },
    { file: "arta.css",                                 name: "Arta" },
    { file: "ascetic.css",                              name: "Ascetic" },
    { file: "base16/ashes.css",                         name: "Ashes" },
    { file: "base16/atelier-cave.css",                  name: "Atelier Cave" },
    { file: "base16/atelier-cave-light.css",            name: "Atelier Cave Light" },
    { file: "base16/atelier-dune.css",                  name: "Atelier Dune" },
    { file: "base16/atelier-dune-light.css",            name: "Atelier Dune Light" },
    { file: "base16/atelier-estuary.css",               name: "Atelier Estuary" },
    { file: "base16/atelier-estuary-light.css",         name: "Atelier Estuary Light" },
    { file: "base16/atelier-forest.css",                name: "Atelier Forest" },
    { file: "base16/atelier-forest-light.css",          name: "Atelier Forest Light" },
    { file: "base16/atelier-heath.css",                 name: "Atelier Heath" },
    { file: "base16/atelier-heath-light.css",           name: "Atelier Heath Light" },
    { file: "base16/atelier-lakeside.css",              name: "Atelier Lakeside" },
    { file: "base16/atelier-lakeside-light.css",        name: "Atelier Lakeside Light" },
    { file: "base16/atelier-plateau.css",               name: "Atelier Plateau" },
    { file: "base16/atelier-plateau-light.css",         name: "Atelier Plateau Light" },
    { file: "base16/atelier-savanna.css",               name: "Atelier Savanna" },
    { file: "base16/atelier-savanna-light.css",         name: "Atelier Savanna Light" },
    { file: "base16/atelier-seaside.css",               name: "Atelier Seaside" },
    { file: "base16/atelier-seaside-light.css",         name: "Atelier Seaside Light" },
    { file: "base16/atelier-sulphurpool.css",           name: "Atelier Sulphurpool" },
    { file: "base16/atelier-sulphurpool-light.css",     name: "Atelier Sulphurpool Light" },
    { file: "base16/atlas.css",                         name: "Atlas" },
    { file: "atom-one-dark.css",                        name: "Atom One Dark" },
    { file: "atom-one-dark-reasonable.css",             name: "Atom One Dark Reasonable" },
    { file: "atom-one-light.css",                       name: "Atom One Light" },
    { file: "base16/bespin.css",                        name: "Bespin" },
    { file: "base16/black-metal.css",                   name: "Black Metal" },
    { file: "base16/black-metal-bathory.css",           name: "Black Metal Bathory" },
    { file: "base16/black-metal-burzum.css",            name: "Black Metal Burzum" },
    { file: "base16/black-metal-dark-funeral.css",      name: "Black Metal Dark Funeral" },
    { file: "base16/black-metal-gorgoroth.css",         name: "Black Metal Gorgoroth" },
    { file: "base16/black-metal-immortal.css",          name: "Black Metal Immortal" },
    { file: "base16/black-metal-khold.css",             name: "Black Metal Khold" },
    { file: "base16/black-metal-marduk.css",            name: "Black Metal Marduk" },
    { file: "base16/black-metal-mayhem.css",            name: "Black Metal Mayhem" },
    { file: "base16/black-metal-nile.css",              name: "Black Metal Nile" },
    { file: "base16/black-metal-venom.css",             name: "Black Metal Venom" },
    { file: "base16/brewer.css",                        name: "Brewer" },
    { file: "base16/bright.css",                        name: "Bright" },
    { file: "base16/brogrammer.css",                    name: "Brogrammer" },
    { file: "brown-paper.css",                          name: "Brown Paper" },
    { file: "base16/brush-trees.css",                   name: "Brush Trees" },
    { file: "base16/brush-trees-dark.css",              name: "Brush Trees Dark" },
    { file: "base16/chalk.css",                         name: "Chalk" },
    { file: "base16/circus.css",                        name: "Circus" },
    { file: "base16/classic-dark.css",                  name: "Classic Dark" },
    { file: "base16/classic-light.css",                 name: "Classic Light" },
    { file: "codepen-embed.css",                        name: "Codepen Embed" },
    { file: "base16/codeschool.css",                    name: "Codeschool" },
    { file: "color-brewer.css",                         name: "Color Brewer" },
    { file: "base16/colors.css",                        name: "Colors" },
    { file: "base16/cupcake.css",                       name: "Cupcake" },
    { file: "base16/cupertino.css",                     name: "Cupertino" },
    { file: "base16/danqing.css",                       name: "Danqing" },
    { file: "base16/darcula.css",                       name: "Darcula" },
    { file: "dark.css",                                 name: "Dark" },
    { file: "base16/dark-violet.css",                   name: "Dark Violet" },
    { file: "base16/darkmoss.css",                      name: "Darkmoss" },
    { file: "base16/darktooth.css",                     name: "Darktooth" },
    { file: "base16/decaf.css",                         name: "Decaf" },
    { file: "default.css",                              name: "Default" },
    { file: "base16/default-dark.css",                  name: "Default Dark" },
    { file: "base16/default-light.css",                 name: "Default Light" },
    { file: "devibeans.css",                            name: "Devibeans" },
    { file: "base16/dirtysea.css",                      name: "Dirtysea" },
    { file: "docco.css",                                name: "Docco" },
    { file: "base16/dracula.css",                       name: "Dracula" },
    { file: "base16/edge-dark.css",                     name: "Edge Dark" },
    { file: "base16/edge-light.css",                    name: "Edge Light" },
    { file: "base16/eighties.css",                      name: "Eighties" },
    { file: "base16/embers.css",                        name: "Embers" },
    { file: "base16/equilibrium-dark.css",              name: "Equilibrium Dark" },
    { file: "base16/equilibrium-gray-dark.css",         name: "Equilibrium Gray Dark" },
    { file: "base16/equilibrium-gray-light.css",        name: "Equilibrium Gray Light" },
    { file: "base16/equilibrium-light.css",             name: "Equilibrium Light" },
    { file: "base16/espresso.css",                      name: "Espresso" },
    { file: "base16/eva.css",                           name: "Eva" },
    { file: "base16/eva-dim.css",                       name: "Eva Dim" },
    { file: "far.css",                                  name: "Far" },
    { file: "base16/flat.css",                          name: "Flat" },
    { file: "foundation.css",                           name: "Foundation" },
    { file: "base16/framer.css",                        name: "Framer" },
    { file: "base16/fruit-soda.css",                    name: "Fruit Soda" },
    { file: "gml.css",                                  name: "GML" },
    { file: "base16/gigavolt.css",                      name: "Gigavolt" },
    { file: "github.css",                               name: "GitHub" },
    { file: "base16/github.css",                        name: "GitHub (Base16)" },
    { file: "github-dark.css",                          name: "GitHub Dark" },
    { file: "github-dark-dimmed.css",                   name: "GitHub Dark Dimmed" },
    { file: "base16/google-dark.css",                   name: "Google Dark (Base16)" },
    { file: "base16/google-light.css",                  name: "Google Light" },
    { file: "googlecode.css",                           name: "Google Code" },
    { file: "gradient-dark.css",                        name: "Gradient Dark" },
    { file: "gradient-light.css",                       name: "Gradient Light" },
    { file: "grayscale.css",                            name: "Grayscale" },
    { file: "base16/grayscale-dark.css",                name: "Grayscale Dark" },
    { file: "base16/grayscale-light.css",               name: "Grayscale Light" },
    { file: "base16/green-screen.css",                  name: "Green Screen" },
    { file: "base16/gruvbox-dark-hard.css",             name: "Gruvbox Dark Hard" },
    { file: "base16/gruvbox-dark-pale.css",             name: "Gruvbox Dark Pale" },
    { file: "base16/gruvbox-dark-medium.css",           name: "Gruvbox Dark Medium" },
    { file: "base16/gruvbox-dark-soft.css",             name: "Gruvbox Dark Soft" },
    { file: "base16/gruvbox-light-hard.css",            name: "Gruvbox Light Hard" },
    { file: "base16/gruvbox-light-medium.css",          name: "Gruvbox Light Medium" },
    { file: "base16/gruvbox-light-soft.css",            name: "Gruvbox Light Soft" },
    { file: "base16/hardcore.css",                      name: "Hardcore" },
    { file: "base16/harmonic16-dark.css",               name: "Harmonic16 Dark" },
    { file: "base16/harmonic16-light.css",              name: "Harmonic16 Light" },
    { file: "base16/heetch-dark.css",                   name: "Heetch Dark" },
    { file: "base16/heetch-light.css",                  name: "Heetch Light" },
    { file: "base16/helios.css",                        name: "Helios" },
    { file: "base16/hopscotch.css",                     name: "Hopscotch" },
    { file: "base16/horizon-dark.css",                  name: "Horizon Dark" },
    { file: "base16/horizon-light.css",                 name: "Horizon Light" },
    { file: "base16/humanoid-dark.css",                 name: "Humanoid Dark" },
    { file: "base16/humanoid-light.css",                name: "Humanoid Light" },
    { file: "hybrid.css",                               name: "Hybrid" },
    { file: "base16/ia-dark.css",                       name: "iA Dark" },
    { file: "base16/ia-light.css",                      name: "iA Light" },
    { file: "ir-black.css",                             name: "IR Black" },
    { file: "base16/ir-black.css",                      name: "IR Black (Base16)" },
    { file: "base16/icy-dark.css",                      name: "Icy Dark" },
    { file: "idea.css",                                 name: "Idea" },
    { file: "isbl-editor-dark.css",                     name: "ISBL Editor Dark" },
    { file: "isbl-editor-light.css",                    name: "ISBL Editor Light" },
    { file: "base16/isotope.css",                       name: "Isotope" },
    { file: "base16/kimber.css",                        name: "Kimber" },
    { file: "kimbie-dark.css",                          name: "Kimbie Dark" },
    { file: "kimbie-light.css",                         name: "Kimbie Light" },
    { file: "lightfair.css",                            name: "Lightfair" },
    { file: "lioshi.css",                               name: "Lioshi" },
    { file: "base16/london-tube.css",                   name: "London Tube" },
    { file: "base16/macintosh.css",                     name: "Macintosh" },
    { file: "magula.css",                               name: "Magula" },
    { file: "base16/marrakesh.css",                     name: "Marrakesh" },
    { file: "base16/materia.css",                       name: "Materia" },
    { file: "base16/material.css",                      name: "Material" },
    { file: "base16/material-darker.css",               name: "Material Darker" },
    { file: "base16/material-lighter.css",              name: "Material Lighter" },
    { file: "base16/material-palenight.css",            name: "Material Palenight" },
    { file: "base16/material-vivid.css",                name: "Material Vivid" },
    { file: "base16/mellow-purple.css",                 name: "Mellow Purple" },
    { file: "base16/mexico-light.css",                  name: "Mexico Light" },
    { file: "base16/mocha.css",                         name: "Mocha" },
    { file: "mono-blue.css",                            name: "Mono Blue" },
    { file: "monokai.css",                              name: "Monokai" },
    { file: "monokai-sublime.css",                      name: "Monokai Sublime" },
    { file: "base16/monokai.css",                       name: "Monokai (Base16)" },
    { file: "nnfx-dark.css",                            name: "NNFX Dark" },
    { file: "nnfx-light.css",                           name: "NNFX Light" },
    { file: "base16/nebula.css",                        name: "Nebula" },
    { file: "night-owl.css",                            name: "Night Owl" },
    { file: "nord.css",                                 name: "Nord" },
    { file: "base16/nord.css",                          name: "Nord (Base16)" },
    { file: "base16/nova.css",                          name: "Nova" },
    { file: "obsidian.css",                             name: "Obsidian" },
    { file: "base16/ocean.css",                         name: "Ocean" },
    { file: "base16/oceanicnext.css",                   name: "OceanicNext" },
    { file: "base16/one-light.css",                     name: "One Light" },
    { file: "base16/onedark.css",                       name: "OneDark" },
    { file: "base16/outrun-dark.css",                   name: "Outrun Dark" },
    { file: "base16/papercolor-dark.css",               name: "Papercolor Dark" },
    { file: "base16/papercolor-light.css",              name: "Papercolor Light" },
    { file: "base16/paraiso.css",                       name: "Paraiso" },
    { file: "paraiso-dark.css",                         name: "Paraiso Dark" },
    { file: "paraiso-light.css",                        name: "Paraiso Light" },
    { file: "base16/pasque.css",                        name: "Pasque" },
    { file: "base16/phd.css",                           name: "PhD" },
    { file: "base16/pico.css",                          name: "Pico" },
    { file: "pojoaque.css",                             name: "Pojoaque" },
    { file: "base16/pop.css",                           name: "Pop" },
    { file: "base16/porple.css",                        name: "Porple" },
    { file: "purebasic.css",                            name: "PureBASIC" },
    { file: "qtcreator-dark.css",                       name: "Qt Creator Dark" },
    { file: "qtcreator-light.css",                      name: "Qt Creator Light" },
    { file: "base16/qualia.css",                        name: "Qualia" },
    { file: "base16/railscasts.css",                    name: "Railscasts" },
    { file: "rainbow.css",                              name: "Rainbow" },
    { file: "base16/rebecca.css",                       name: "Rebecca" },
    { file: "base16/ros-pine.css",                      name: "Rosé Pine" },
    { file: "base16/ros-pine-dawn.css",                 name: "Rosé Pine Dawn" },
    { file: "base16/ros-pine-moon.css",                 name: "Rosé Pine Moon" },
    { file: "routeros.css",                             name: "RouterOS (MikroTik)" },
    { file: "base16/sagelight.css",                     name: "Sagelight" },
    { file: "base16/sandcastle.css",                    name: "Sandcastle" },
    { file: "school-book.css",                          name: "School Book" },
    { file: "base16/seti-ui.css",                       name: "Seti UI" },
    { file: "shades-of-purple.css",                     name: "Shades of Purple" },
    { file: "base16/shapeshifter.css",                  name: "Shapeshifter" },
    { file: "base16/silk-dark.css",                     name: "Silk Dark" },
    { file: "base16/silk-light.css",                    name: "Silk Light" },
    { file: "base16/snazzy.css",                        name: "Snazzy" },
    { file: "base16/solar-flare.css",                   name: "Solar Flare" },
    { file: "base16/solar-flare-light.css",             name: "Solar Flare Light" },
    { file: "base16/solarized-dark.css",                name: "Solarized Dark" },
    { file: "base16/solarized-light.css",               name: "Solarized Light" },
    { file: "base16/spacemacs.css",                     name: "Spacemacs" },
    { file: "srcery.css",                               name: "Srcery" },
    { file: "stackoverflow-dark.css",                   name: "Stack Overflow Dark" },
    { file: "stackoverflow-light.css",                  name: "Stack Overflow Light" },
    { file: "base16/summercamp.css",                    name: "Summercamp" },
    { file: "base16/summerfruit-dark.css",              name: "Summerfruit Dark" },
    { file: "base16/summerfruit-light.css",             name: "Summerfruit Light" },
    { file: "sunburst.css",                             name: "Sunburst" },
    { file: "base16/synth-midnight-terminal-dark.css",  name: "Synth Midnight Terminal Dark" },
    { file: "base16/synth-midnight-terminal-light.css", name: "Synth Midnight Terminal Light" },
    { file: "base16/tango.css",                         name: "Tango" },
    { file: "base16/tender.css",                        name: "Tender" },
    { file: "base16/tomorrow.css",                      name: "Tomorrow" },
    { file: "base16/tomorrow-night.css",                name: "Tomorrow Night" },
    { file: "tomorrow-night-blue.css",                  name: "Tomorrow Night Blue" },
    { file: "tomorrow-night-bright.css",                name: "Tomorrow Night Bright" },
    { file: "base16/twilight.css",                      name: "Twilight" },
    { file: "base16/unikitty-dark.css",                 name: "Unikitty Dark" },
    { file: "base16/unikitty-light.css",                name: "Unikitty Light" },
    { file: "vs.css",                                   name: "VisualStudio" },
    { file: "vs2015.css",                               name: "VisualStudio 2015 Dark" },
    { file: "base16/vulcan.css",                        name: "Vulcan" },
    { file: "base16/windows-10.css",                    name: "Windows 10" },
    { file: "base16/windows-10-light.css",              name: "Windows 10 Light" },
    { file: "base16/windows-95.css",                    name: "Windows 95" },
    { file: "base16/windows-95-light.css",              name: "Windows 95 Light" },
    { file: "base16/windows-high-contrast.css",         name: "Windows High Contrast" },
    { file: "base16/windows-high-contrast-light.css",   name: "Windows High Contrast Light" },
    { file: "base16/windows-nt.css",                    name: "Windows NT" },
    { file: "base16/windows-nt-light.css",              name: "Windows NT Light" },
    { file: "base16/woodland.css",                      name: "Woodland" },
    { file: "xcode.css",                                name: "XCode" },
    { file: "base16/xcode-dusk.css",                    name: "XCode Dusk" },
    { file: "xt256.css",                                name: "xt256" },
    { file: "base16/zenburn.css",                       name: "Zenburn" },
];
/* eslint-enable no-multi-spaces */

export { FullStyleList };
