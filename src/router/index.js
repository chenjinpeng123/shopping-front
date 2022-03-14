import Vue from 'vue'
import VueRouter from 'vue-router'
import First from "../views/First";
import Goods from "../views/Goods";
import Login from "../views/Login";
import Cart from "../views/Cart";
import Register from "../views/Register"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: First
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
