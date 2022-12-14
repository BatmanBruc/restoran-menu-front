import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie';
import Categories from '../components/pages/Categories.vue'
import Products from '../components/pages/Products.vue'
import Login from '../components/pages/Login.vue'
import Register from '../components/pages/Register.vue'

const middlewareAdmin = (to, from, next)=>{
  if(!Cookies.get('auth_token')){
    router.push('auth')
  }else{
    next()
  }
}
const middlewareAuth = (to, from, next)=>{
  if(Cookies.get('auth_token')){
    router.push('orders')
  }else{
    next()
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/categories', component: Categories, meta: { layout: 'Admin' }, beforeEnter: middlewareAdmin },
    { path: '/products', component: Products, meta: { layout: 'Admin' }, beforeEnter: middlewareAdmin },
    { path: '/auth', component: Login, meta: { layout: 'Auth' }, beforeEnter: middlewareAuth },
    { path: '/register', component: Register, meta: { layout: 'Auth' }, beforeEnter: middlewareAuth }
  ]
})

export default router
