const {
  createShikiHighlighter,
  runTwoSlash,
  renderCodeToHTML,
} = require("shiki-twoslash");

// From https://github.com/whizkydee/vscode-palenight-theme/blob/master/themes/palenight.json
const palenightTheme = require("./palenight-theme.json");

const config = {
  extensions: [".svx", ".md"],
  highlight: {
    highlighter: async (code, lang, meta) => {
      const highlighter = await createShikiHighlighter({
        theme: palenightTheme,
      });

      let twoslashResults = null;
      if (meta && meta.includes("twoslash")) {
        twoslashResults = runTwoSlash(code, lang, {});
      }

      const html = renderCodeToHTML(
        code,
        lang,
        meta || [],
        {},
        highlighter,
        twoslashResults
      );

      return `{@html \`${html}\` }`;
    },
  },
};

module.exports = config;
