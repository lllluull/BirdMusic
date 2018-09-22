<template>
<transition name='sreach'>
  <div class="sreach">
    <searchbox ref='searchbox' @query = 'queryChange'></searchbox>
    <div class="hotsreach" v-show = '!query'>
      <div class='hottitle'>热门搜索</div>
      <span v-for='(item, index) in hotkey' :key = index @click="intoquery(item.k)">{{item.k}}</span>
    </div>
    <div class="history">
      <ul>
        <li v-for = '(item) in history' :key = item class='onehistory'>
          <div class='hisleft' @click="intoquery(item)"><span class='iconfont'>&#xe63b;    </span>{{item}}</div><div class='iconfont hisright' @click='delehistory(item)'>&#xe606;</div>
        </li>
      </ul>
    </div>
    <suggest :query = 'query'  v-show='query'></suggest>
  </div>
</transition>

</template>
<script>
import searchbox from '@/base/sreachbox.vue'
import suggest from '@/components/header/suggest.vue'
import {gethotkey} from '@/api/hotkey.js'
export default {
  data () {
    return {
      hotkey: [],
      query: '',
      zhida: true,
      history: []
    }
  },
  components: {
    searchbox,
    suggest
  },
  methods: {
    _gethotkey () {
      gethotkey().then(res => {
        this.hotkey = res.data.hotkey.slice(0, 15)
      })
    },
    intoquery (value) {
      this.$refs.searchbox.setquery(value)
    },
    queryChange (newQuery) {
      this.query = newQuery
    },
    gethistory () {
      this.history = JSON.parse(localStorage.history)
    },
    delehistory (item) {
      let index = this.history.indexOf(item)
      this.history.splice(index, 1)
    }
  },
  watch: {
    history (newvalue) {
      localStorage.history = JSON.stringify(newvalue)
    },
    query (newvalue) {
      if (!newvalue) {
        this.gethistory()
      }
    }
  },
  created () {
    this._gethotkey()
    this.gethistory()
  },
  activated () {
    this.gethistory()
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
  .sreach-enter-active, .sreach-leave-active
    transition: all 0.3s ease
  .sreach-enter, .sreach-leave-to
    transform: translate3d(-100%, 0, 0)
  .sreach
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color  $color-background
  .hotsreach
    .hottitle
      color white
      padding-left .2rem
      margin-top .2rem
    span
      color $color-dialog-background
      display inline-block
      margin .1rem .1rem
      padding  .2rem .2rem
      background-color #33CCFF
      border-radius .3rem
  .history
    .onehistory
      height 1rem
      line-height 1rem
      display flex
      justify-content space-between
      width 100%
      border-bottom 1px solid #DDDDDD
      font-size 20px
      .hisleft
        padding-left .2rem
      .hisright
        padding-right .2rem
</style>
