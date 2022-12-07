import './utils/fetch'
import './app.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import { QuillEditor } from '@vueup/vue-quill'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { useToastStore } from '@/stores/toast'

import App from './App.vue'
import { router } from './routes/index'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.component('QuillEditor', QuillEditor)
const Toast = useToastStore()
app.provide('Toast', Toast)

app.mount('#app')
