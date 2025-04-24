import { createApp } from 'vue'
import App from './App.vue'

import { Quasar, QBtn, QIcon, QToolbar, QSpace } from 'quasar'
import 'quasar/dist/quasar.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'

const app = createApp(App)

app.use(Quasar)

app.component('q-btn', QBtn)
app.component('q-icon', QIcon)
app.component('q-toolbar', QToolbar)
app.component('q-space', QSpace)

app.mount('#app')
