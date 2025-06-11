import { createApp } from 'vue'
import App from './App.vue'
import { Icon } from "@iconify/vue";
import router from './router';
import { GoogleMap } from 'vue3-google-map';
import { AdvancedMarker } from 'vue3-google-map';
import { InfoWindow } from 'vue3-google-map';
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ApexCharts from 'vue3-apexcharts';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(setupCalendar, {});
app.use(ApexCharts);

app.component('VCalendar', Calendar);
app.component('VDatePicker', DatePicker);
app.component('Icon', Icon);
app.component('IconifyIcon', Icon);
app.component('V3Map', GoogleMap);
app.component('V3Marker', AdvancedMarker);
app.component('V3Info', InfoWindow);

app.use(pinia);
app.mount('#app');
