import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'

document.documentElement.classList.add('silky-theme')
document.documentElement.lang = 'es'

const app = createApp(App)

app.use(router)

app.mount('#app')
