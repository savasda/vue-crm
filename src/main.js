import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from './filters/date.filter';
import messagePlugin from './utils/message.plugin';
import firebase from 'firebase/app';

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAHBOs0IOZX-Su2-Zw9pYoXN16l0Hl_a0c",
  authDomain: "vue-sda-crm.firebaseapp.com",
  databaseURL: "https://vue-sda-crm.firebaseio.com",
  projectId: "vue-sda-crm",
  storageBucket: "vue-sda-crm.appspot.com",
  messagingSenderId: "93761410835",
  appId: "1:93761410835:web:f5174fb8cc6ecf2f23ace6",
  measurementId: "G-F9JCG3PBN4"
};
firebase.initializeApp(firebaseConfig);
let app;
Vue.config.productionTip = false;
Vue.filter('date', dateFilter);
Vue.use(Vuelidate);
Vue.use(messagePlugin);

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});



