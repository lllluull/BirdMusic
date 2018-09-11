import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend'
import Rank from '../components/rank/rank'
import Singer from '../components/singer/singer'
import SingerDetail from '../components/singer/singerdetail'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/recommend'},
    {path: '/recommend', component: Recommend},
    {path: '/rank', component: Rank},
    {path: '/singer',
      component: Singer,
      children: [
        {path: ':id', name: 'detail', component: SingerDetail}
      ]}
  ]
})
