import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router'
import api from './connectors/api';

const token = localStorage.getItem('token');

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
