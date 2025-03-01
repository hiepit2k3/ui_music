import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'flowbite'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const app = createApp(App)

store.dispatch("checkAuth").then(() => {
    app.use(ToastPlugin);
    app.use(router);
    app.use(store);
    app.mount("#app");
  });
