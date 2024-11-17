// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap'; // Bootstrap JS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons


// i18n setup
import { createI18n } from 'vue-i18n';
const i18n = createI18n({
  locale: 'en', // default language
  messages: {
    en: {
      welcome: "Welcome",
    },
    fr: {
      welcome: "Bienvenue",
    },
  },
});

// Create and configure the Vue app instance
const app = createApp(App);

app.use(i18n);    // Use i18n
app.use(router);  // Use router

// Enable debugging
app.config.devtools = true;
app.config.performance = true;


app.mount('#app'); // Mount the app to the DOM
