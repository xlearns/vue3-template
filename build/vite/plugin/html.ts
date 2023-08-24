import type { PluginOption } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
export default function (env: ViteEnv, isBuild) {
  const { VITE_GLOB_APP_TITLE } = env;
  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: VITE_GLOB_APP_TITLE
      }
    }
  });
  return htmlPlugin;
}
