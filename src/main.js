import { createApp } from "vue";
import App from "./App";

import BaseCard from "./components/UI/BaseCard";
import BaseButton from "./components/UI/BaseButton";
import BaseChip from "./components/UI/BaseChip";

import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-chip', BaseChip);

app.mount('#app');
