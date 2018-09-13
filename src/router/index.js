import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend'
import Rank from '../components/rank/rank'
import Singer from '../components/singer/singer'
import SingerDetail from '../components/singer/singerdetail'
import Listdetail from '../components/recommend/listdetail'
import Rankdetail from '../components/rank/rankdetail'
import Search from '../components/header/sreach'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/recommend'},
    {path: '/recommend',
      component: Recommend,
      children: [
        {path: ':id', name: 'listdetail', component: Listdetail}
      ]},
    {path: '/rank',
      component: Rank,
      children: [
        {path: ':id', name: 'rankdetail', component: Rankdetail}
      ]},
    {path: '/singer',
      component: Singer,
      children: [
        {path: ':id', name: 'detail', component: SingerDetail}
      ]},
    {path: '/sreach', component: Search}
  ]
})
