import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import { router } from '@/router';

createApp(App)
    .use(BootstrapIconsPlugin)
    .use(router)
    .mount('#app')
