import { createApp } from 'vue';
import App from './App.vue';
// import "./registerServiceWorker";
// import router from './router';
// import store from "./store";

//css
import '@/scss/water-dark.css';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import '@/scss/base.scss';

createApp(App)
  // .use(store)
  // .use(router)
  .mount('#app');
