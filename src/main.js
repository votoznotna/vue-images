import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App'
import AuthHandler from './components/AuthHandler';
import ImageList from './components/ImageList';
import UploadForm from './components/UploadForm';
import store from './store'

Vue.config.productionTip = false

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: ImageList },
    { path: '/upload', component: UploadForm },
    { path: '/oauth2/callback', component: AuthHandler }
  ]
});

const root = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

document.body.appendChild(root.$el)
