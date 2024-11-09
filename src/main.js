import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import AdminPanel from "@/components/AdminPanel.vue";
import QuizPanel from "@/components/QuizPanel.vue";

const router = createRouter({
    routes: [
        {
            path: '/',
            component: AdminPanel,
            name: 'AdminPanel',
        },
        {
            path: '/quiz',
            component: QuizPanel,
            name: 'QuizPanel',
        }
    ],
    history: createWebHistory()
})
const app = createApp(App)
app.use(router)
app.mount('#app')
