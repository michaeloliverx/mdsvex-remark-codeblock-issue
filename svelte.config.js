import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import {
  createShikiHighlighter,
  runTwoSlash,
  renderCodeToHTML,
} from "shiki-twoslash";
import { readFileSync } from "fs";

// From https://github.com/whizkydee/vscode-palenight-theme/blob/master/themes/palenight.json
const palenightTheme = JSON.parse(readFileSync("./palenight-theme.json"));

const mdsvexPreprocess = mdsvex({
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
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [mdsvexPreprocess, preprocess()],
  extensions: [".svelte", ".svx"],
  kit: {
    target: "#svelte",
  },
};

export default config;
