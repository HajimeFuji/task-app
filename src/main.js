import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// firebaseをimport
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCM4G6Q2OOz-T0Ervczof8BBLDn9gsxAls",
    authDomain: "task-app-1533b.firebaseapp.com",
    projectId: "task-app-1533b",
    storageBucket: "task-app-1533b.appspot.com",
    messagingSenderId: "429863285232",
    appId: "1:429863285232:web:d21323dc45262e54df2d35"
};

// firebaseの初期化
initializeApp(firebaseConfig);

library.add(fas,far)

createApp(App).use(store).use(router).component('fa', FontAwesomeIcon ).mount('#app')
