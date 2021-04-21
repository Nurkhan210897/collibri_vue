import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueTheMask from 'vue-the-mask'
import YandexShare from '@cookieseater/vue-yandex-share'
import VueSkeletonLoader from 'skeleton-loader-vue'

import './assets/sass/main.scss'

Vue.prototype.$axios = axios;
Vue.use(Vuelidate)
Vue.use(VueTheMask)
Vue.component('yandex-share', YandexShare);
Vue.component('vue-skeleton-loader', VueSkeletonLoader);


import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

Vue.config.productionTip = false

new Vue({
    router,
    store,
    lang: 'ru',
    render: h => h(App)
}).$mount('#app')