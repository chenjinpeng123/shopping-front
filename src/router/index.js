import Vue from 'vue'
import VueRouter from 'vue-router'
import First from "../views/front/First";
import Goods from "../views/front/Goods";
import Login from "../views/front/Login";
import Cart from "../views/front/Cart";
import Register from "../views/front/Register"
import Avatar from "../views/front/Avatar";
import Password from "../views/front/Password";
import Order from "../views/front/Order"
import Business from "../views/front/Business"
import BackGround from "../views/back/BackGround"
import UploadPic from "../components/background/mer/UploadPic"
import CheckGood from "../components/background/CheckGood"
import Welcome from "../components/background/Welcome"
import OrderManager from "../components/background/OrderManager"
import CheckOrder from "../components/background/CheckOrder"



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
  },
  {
    path: '/avatar',
    component: Avatar
  },
  {
    path: '/business',
    component: Business
  },
  {
    path: '/password',
    component: Password
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/backGround',
    component: BackGround,
    children: [
      {
        path: 'uploadPic',
        component: UploadPic
      },
      {
        path: 'checkGood',
        component: CheckGood
      },
      {
        path: 'welcome',
        component: Welcome
      },
      {
        path: 'checkOrder',
        component: CheckOrder
      },
      {
        path: 'orderManager',
        component: OrderManager
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
