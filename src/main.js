import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import UZ from './locale/uz.json'
import RU from './locale/ru.json'

import App from './App.vue'
import router from './router'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

export const i18n = createI18n({
    locale: localStorage.lang || 'UZ',
    messages: {
        UZ: UZ,
        RU: RU,
    }
})

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(VueAwesomePaginate)


app.mount('#app')
