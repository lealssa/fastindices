import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import '../node_modules/@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  }  
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(vuetify)

app.mount('#app')
