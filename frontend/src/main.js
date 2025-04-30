import { createApp } from 'vue'
import App from './App.vue'
import { Icon } from "@iconify/vue";
import router from './router';

const app = createApp(App);

app.use(router);

app.component('Icon', Icon);
app.component('IconifyIcon', Icon)

app.mount('#app')
