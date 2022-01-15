import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Account from '@/views/Account.vue'
import Admin from '@/views/Admin.vue'
import Medicine from '@/pages/Medicine.vue'
import Dealer from '@/pages/Dealer.vue'
import Customer from '@/pages/Customer.vue'
import Purchaser from '@/pages/Purchaser.vue'
import Help from '@/views/Help.vue'
import IndexPage from '@/pages/IndexPage'
import UserInfo from '@/pages/UserInfo'
import Checkout from '@/pages/feature/Checkout'
import Salesman from '@/pages/Salesman'
import qs from 'qs'
import {request} from '@/network/request'


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/account'
  },
  {
    path: '/account',
    component: Account,
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: 'index-page',
        component: IndexPage
      },
      {
        path: 'medicine',
        component: Medicine
      },
      {
        path: 'dealer',
        component: Dealer
      },
      {
        path: 'customer',
        component: Customer
      },
      {
        path: 'purchaser',
        component: Purchaser
      },
      {
        path: 'user-info',
        component: UserInfo
      },
      {
        path: 'checkout',
        component: Checkout
      },
      {
        path: 'salesman',
        component: Salesman
      }
    ]
  },
  {
    path: '/help',
    component: Help
  }
  
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]
//解决重复跳转相同的路由报错的问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {

      return VueRouterPush.call(this, to).catch(err => err)

}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  // const instance = Vue.prototype.$axios.create({
  //   baseURL: "http://10.86.7.190:8082/logintest",
  //   timeout: 3000
  // })
  // instance.get('/ServletBackEnd')
  // .then(function(response) {
  //   // window.alert(response)
  //   console.log(response)
  // })
  // instance.get('/ServletBackEnd3')
  // .then(function(response) {
  //   // window.alert(response)
  //   console.log(response)
  // })
////////////////////上面的是测试代码///////

  if((to.path !== '/account') && (to.path !== '/help')) {
    if(store.state.token || window.localStorage.getItem("token")) {//当成功登录时(token存在)
      // console.log(store.state.userInfo)
      // console.log('2333')
      store.commit('getToken')
      store.commit('setUserInfo')
      next()
    }
    else {
      window.alert('您未登录！')
      router.push('/account');
      next()
    }
    // console.log('23332')
  }
  else {
    next()
  }
  // next()//测试用记得删
})
export default router
