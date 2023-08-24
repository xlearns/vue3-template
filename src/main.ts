import "virtual:windi.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Sentry from "@sentry/vue";

const app = createApp(App);

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  logErrors: true,
  release: import.meta.env.VITE_RELEASE,
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", "https:yourserver.io/api/"],
      routingInstrumentation: Sentry.vueRouterInstrumentation(router)
    }),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0
});

app.use(ElementPlus);
app.use(router);
app.mount("#app");

const user = {
  email: import.meta.env.VITE_EMAIL_URL
};
Sentry.setUser(user);
Sentry.configureScope(scope => scope.setUser(null));
