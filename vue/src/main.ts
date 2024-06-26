import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidate from './plugins/VeeValidate'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VeeValidate)

app.mount('#app')
