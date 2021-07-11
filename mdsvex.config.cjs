const remarkShikiTwoslash = require("remark-shiki-twoslash").default;

// From https://github.com/whizkydee/vscode-palenight-theme/blob/master/themes/palenight.json
const palenightTheme = require("./palenight-theme.json");

const config = {
  extensions: [".svx", ".md"],
  remarkPlugins: [[remarkShikiTwoslash, { theme: palenightTheme }]],
  highlight: false,
};

module.exports = config;
