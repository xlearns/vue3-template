import type { ConfigEnv } from "vite";
import { loadEnv } from "vite";
import { createProxy, wrapperEnv } from "./build/utils";
import alias from "./build/vite/alias";
import { getPluginsList } from "./build/vite/plugin/index";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { dirname } from "path";

function getViteSentry(envConfig) {
  return sentryVitePlugin({
    release: {
      name: `${process.env.npm_package_name}@${process.env.npm_package_version}`
    },
    sourcemaps: {
      assets: "./dist/**"
    },
    org: envConfig.VITE_SENTRY_ORG,
    project: envConfig.VITE_SENTRY_PROJECT,
    authToken: envConfig.VITE_SENTRY_AUTH_TOKEN
  });
}

export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;
  const isBuild = command === "build";
  return {
    plugins: [...getPluginsList(viteEnv, isBuild), getViteSentry(env)],
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    server: {
      https: false,
      host: "0.0.0.0",
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    optimizeDeps: {
      exclude: ["@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"]
    },
    build: {
      sourcemap: "hidden",
      manifest: true,
      minify: "terser",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: id => {
            const folderURL = dirname(id);

            function exist(folder, module) {
              return folder.includes(module);
            }

            function isURLMerge(arr) {
              return arr.find(module => exist(folderURL, module)) !== undefined;
            }

            if (
              isURLMerge([
                "/node_modules/element-plus",
                "@element-plus/icons-vue"
              ])
            )
              return "elementui";
            if (isURLMerge(["/node_modules/vue", "node_modules/@vue"]))
              return "vue";
            if (isURLMerge(["/node_modules/axios"])) return "http";
            if (isURLMerge(["/node_modules/echarts"])) return "echarts";
            if (isURLMerge(["/node_modules/zrender"])) return "zrender";

            if (isURLMerge(["src/router"])) return "router";
            if (isURLMerge(["src/components"])) return "components";
            if (isURLMerge(["src/utils", "src/views"])) return "views";
          }
        }
      }
    }
  };
};
