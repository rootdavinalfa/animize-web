import Vue from 'vue'
import App from './App.vue'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'

//Import components
import home from '@/components/index/home.vue'
import play from '@/components/index/play.vue'
import packs from '@/components/index/packageview.vue'
import search from '@/components/index/search.vue'
import newp from '@/components/index/new.vue'
import genre from '@/components/index/genre.vue'

import vueHeadful from 'vue-headful'
import {
  CarouselCard,
  CarouselCardItem
} from 'vue-carousel-card'

//import css
import 'vue-carousel-card/styles/index.css'
import '@/style/default.css'

//inject component global
Vue.component(CarouselCard.name, CarouselCard)
Vue.component(CarouselCardItem.name, CarouselCardItem)
Vue.component('vue-headful', vueHeadful)
Vue.use(VueRouter)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.use(require('vue-cookies'))

//Defining route
const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      component: home,
      name: 'home',
      props: true
    },
    {
      path: '/new/:page?',
      component: newp,
      name: 'new',
      props: true
    },
    {
      path: '/genre/:genname?',
      component: genre,
      name: 'genre',
      props: true
    },
    //Anim section
    {
      path: '/anim/play/:idplay',
      component: play,
      props: true,
      name: 'Anime Player'
    },
    {
      path: '/anim/package/:idpack',
      component: packs,
      props: true,
      name: 'Anime Package'
    },
    {
      path: '/search/:query?',
      component: search,
      props: true,
      name: 'Anime Search',
    },
  ]
})

const prod = process.env.NODE_ENV === 'production'
const shouldSW = 'serviceWorker' in navigator && prod
if (shouldSW) {
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log("Service Worker Registered!")
  })
}

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)

}).$mount('#app')