import type { ProxyOptions } from "vite";

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

export function wrapperEnv(env: Recordable): ViteEnv {
  const ret: ViteEnv = {
    VITE_PORT: 8080,
    VITE_PUBLIC_PATH: "",
    VITE_ROUTER_HISTORY: "",
    VITE_GLOB_APP_TITLE: "",
    VITE_PROXY: []
  };

  for (const envName of Object.keys(env)) {
    let realName = env[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}

export function createProxy(list: ProxyList = []) {
  if (typeof list == "string") {
    list = JSON.parse(list) as ProxyList;
  }
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ""),
      ...(isHttps ? { secure: false } : {})
    };
  }
  return ret;
}
