import { dirname } from "path";

export function jschunk(id) {
  const folderURL = dirname(id);

  function exist(folder, module) {
    return folder.includes(module);
  }

  function isURLMerge(arr) {
    return arr.find(module => exist(folderURL, module)) !== undefined;
  }

  if (isURLMerge(["/node_modules/element-plus", "@element-plus/icons-vue"]))
    return "elementui";
  if (isURLMerge(["/node_modules/vue", "node_modules/@vue"])) return "vue";
  if (isURLMerge(["/node_modules/axios"])) return "http";
  if (isURLMerge(["/node_modules/echarts"])) return "echarts";
  if (isURLMerge(["/node_modules/zrender"])) return "zrender";

  if (isURLMerge(["src/router"])) return "router";
  if (isURLMerge(["src/components"])) return "components";
  if (isURLMerge(["src/utils", "src/views"])) return "views";
}
