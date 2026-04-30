import { createApp } from "vue";
import { createPinia } from "pinia";
import Vant, { Locale } from "vant";
import enUS from "vant/es/locale/lang/en-US";
import "vant/lib/index.css";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";

Locale.use("en-US", enUS);
createApp(App).use(createPinia()).use(router).use(Vant).mount("#app");
