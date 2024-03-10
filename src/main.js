import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/main.sass";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
