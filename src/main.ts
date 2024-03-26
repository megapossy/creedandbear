import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Base from '@/plugins/base'

import '@/assets/styles/scss/main.scss'

const app = createApp(App)

app.use(Base)
app.use(createPinia())
app.use(router)

app.mount('#app')
