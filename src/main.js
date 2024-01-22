import './assets/main.css'

import {createApp} from 'vue'
import {autoAnimatePlugin} from '@formkit/auto-animate/vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Favorites from "@/pages/Favorites.vue";
import Main from "@/pages/Main.vue";

const app = createApp(App);

const routes = [
  { path: '/', name: 'Home', component: Main },
  { path: '/favorites', name:'Favorites', component: Favorites },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')



