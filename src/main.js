import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './index.css'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

const app = createApp(App) // cria a app Vue normalmente
const pinia = createPinia() // cria a instância do Pinia

app.use(pinia) // usa o Pinia no app
app.use(router)
app.use(VCalendar, {})
app.mount('#app')
