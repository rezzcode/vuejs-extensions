import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import DevHub from './DevHub.vue'

const app = createApp(DevHub)

app.use(createPinia())

app.mount('#app')
