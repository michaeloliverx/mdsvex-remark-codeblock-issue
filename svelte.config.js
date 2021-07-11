import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";

import mdsveConfig from "./mdsvex.config.cjs";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [mdsvex(mdsveConfig), preprocess()],
  extensions: [".svelte", ".svx"],
  kit: {
    target: "#svelte",
  },
};

export default config;
