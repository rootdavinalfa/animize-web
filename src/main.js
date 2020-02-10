import Vue from 'vue'
import App from './App.vue'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'
import home from '@/components/index/home.vue'
import play from '@/components/index/play.vue'
import packs from '@/components/index/packageview.vue'
import vueHeadful from 'vue-headful'
import {
  CarouselCard,
  CarouselCardItem
} from 'vue-carousel-card'
import 'vue-carousel-card/styles/index.css'
import '@/style/default.css'
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

const router = new VueRouter({
  routes:[
    {path:'/',component:home,name:'home'},
    //Anim section
    {path:'/anim/play/:idplay',component:play,name:'Anime Player'},
    {path:'/anim/package/:idpack',component:packs,name:'Anime Package'},
  ]
})
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)

}).$mount('#app')