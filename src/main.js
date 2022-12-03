import './utils/fetch'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './routes/index'
import './app.css'
import { useToastStore } from '@/stores/toast'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

const Toast = useToastStore()
app.provide('Toast', Toast)

app.mount('#app')
