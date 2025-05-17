import { createApp } from 'vue'
import App from './App.vue'
import { Icon } from "@iconify/vue";
import router from './router';
import { GoogleMap } from 'vue3-google-map';
import { AdvancedMarker } from 'vue3-google-map';
import { InfoWindow } from 'vue3-google-map';
import { createPinia } from 'pinia';
const app = createApp(App);

app.use(router);
app.component('Icon', Icon);
app.component('IconifyIcon', Icon);
app.component('V3Map', GoogleMap);
app.component('V3Marker', AdvancedMarker);
app.component('V3Info', InfoWindow);
app.use(createPinia())
app.mount('#app');