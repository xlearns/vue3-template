import { viteMockServe } from "vite-plugin-mock";
export function setupMockPlugin(env: ViteEnv, isBuild: boolean) {
  return viteMockServe({
    mockPath: "mock",
    enable: !isBuild && env.VITE_MOCK_ENABLE
  });
}
