// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import AnalyzePost from "./components/AnalyzePost.vue";
import Posts from './components/Posts.vue';
import Buscar from './components/Buscar.vue'
import * as VueGoogleMaps from 'vue2-google-maps';

//import routes from 'vue-router';
//import routess from './routess';


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueGoogleMaps,{
  load:{
    key:'AIzaSyArRBk2EQY9hC2QdOGDrCoafNky3I3jAro',
    libraries:'places'
  }
})
const router = new VueRouter({
  routes: [{
      path: '/',      
      component: Buscar
    },
    {
      path: '/Posts/:idPerson',
      name:'Posts',
      component: Posts
    },
    {
      path: '/Hellow/:idPost',
      name:'AnalyzePost',
      component: AnalyzePost
    }
  ]
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
