/* jshint esversion: 6 */
import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main.vue'
import homepage from '@/components/homepage.vue'
// 订单
import order from './order'

import arouter from './as.js'
import product from './flowerSP/product'
import flowerpar from './flowerSP/flowerpar'
import flowersel from './flowerSP/flowersel'
import addfl from './flowerSP/addfl.js'
import useradminrouter from './useradminrouter/useradmin.js'
import productevaluate from './productevaluate.js'

//图片管理
import picture from './allPicture'

//文章
import article from './myArticle'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'homepage',
    //   component: homepage
    // },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    ...order,
    ...arouter,
    ...flowerpar,
    ...flowersel,
    ...product,
    ...addfl,
    ...useradminrouter,
    ...productevaluate,
    ...picture,
    ...article
  ]
})
