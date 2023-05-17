import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
const Index = () =>import('../views/Layout/index.vue')
const Login = () =>import('../views/Login/login.vue')
const Home = () =>import('../views/Home/home.vue')
const Goods = () =>import('../views/Goods/goods.vue')
const Params = () =>import('../views/Params/params.vue')
const Advert = () =>import('../views/Advert/advert.vue')
const Order = () =>import('../views/Order/order.vue')
const OrderList = () =>import('../views/Order/OrderList/orderlist.vue')
const OrderBack = () =>import('../views/Order/OrderBack/orderback.vue')
const AddGoods = () =>import('../views/Goods/addgoods.vue')
const Speci = () => import('../views/Params/paramsinfo/speci.vue')
const User = () =>import('../views/User/index.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Index',
    component: Index,
    meta:{
      isLogin:true
    },
    children:[
      {
        path:'/',
        name:'Home',
        component:Home
      },
      {
        path:'/goods',
        name:'Goods',
        component:Goods
      },
      {
        path:'/addgoods',
        name:'AddGoods',
        component:AddGoods
      },
      {
        path:'/params',
        name:'Params',
        component:Params,
        redirect:'/params/speci',
        children:[
          {
            path:'/params/speci',
            name:'Speci',
            component:Speci
          },
        ]
      },
      {
        path:'/advert',
        name:'Advert',
        component:Advert
      },
      {
        path:'/user',
        name:'User',
        component:User
      },
      {
        path:'/order',
        name:'Order',
        component:Order,
        redirect:'/order/order-list',
        children:[
          {
            path:'order-list',
            name:'OrderList',
            component:OrderList
          },
          {
            path:'order-back',
            name:'OrderBack',
            component:OrderBack
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
    meta:{
      loginisLogin:true
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
