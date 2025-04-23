import { createApp } from 'vue'
import App from './App.vue'

import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css' // Import Quasar's core CSS

const app = createApp(App)

app.use(Quasar)

app.mount('#app')
