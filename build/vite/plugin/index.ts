import { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import WindiCSS from "vite-plugin-windicss";
import ElementPlus from "unplugin-element-plus/vite";
import svgLoader from "vite-svg-loader";
import configHtmlPlugin from "./html";
import DefineOptions from "unplugin-vue-define-options/vite";

export function getPluginsList(viteEnv, isbuild) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    ElementPlus({ useSource: true }),
    vueJsx(),
    WindiCSS(),
    DefineOptions(),
    svgLoader()
  ];
  vitePlugins.push(configHtmlPlugin(viteEnv, isbuild));
  return vitePlugins;
}
