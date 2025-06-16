import "./style.css";

import { createApp } from "vue";

import App from "./App.vue";

import { isWeb } from "@/utils";

import { initCompat } from "./initCompat";
import { setupRouter } from "./router";

isWeb() && initCompat();
const app = createApp(App);

setupRouter(app);

app.mount("#app");
