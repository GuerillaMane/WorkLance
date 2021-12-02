import {createApp} from "vue";
import Notifications from "@kyvg/vue3-notification";

import './assets/styles/main.scss';

import App from "./App";
import BaseCard from "./components/UI/BaseCard";
import BaseButton from "./components/UI/BaseButton";
import BaseChip from "./components/UI/BaseChip";
import BaseSpinner from "./components/UI/BaseSpinner";
import BaseAlert from "./components/UI/BaseAlert";

import router from "./router";
import store from "./store";
import axios from "./plugins/api";

const app = createApp(App);

app.config.globalProperties.axios = axios;

app.use(Notifications);
app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-chip', BaseChip);
app.component('base-spinner', BaseSpinner);
app.component('base-alert', BaseAlert);

app.mount('#app');
