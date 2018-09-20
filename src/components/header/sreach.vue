<template>
<transition name='sreach'>
  <div class="sreach">
    <searchbox ref='searchbox' @query = 'queryChange'></searchbox>
    <div class="hotsreach" >
      <div class='hottitle'>热门搜索</div>
      <span v-for='(item, index) in hotkey' :key = index @click="intoquery(item.k)">{{item.k}}</span>
    </div>
    <suggest :query = 'query' :zhida = 'zhida'></suggest>
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
      zhida: true
    }
  },
  components: {
    searchbox,
    suggest
  },
  methods: {
    _gethotkey () {
      gethotkey().then(res => {
        this.hotkey = res.data.hotkey.splice(0, 15)
      })
    },
    intoquery (value) {
      this.$refs.searchbox.setquery(value)
    },
    queryChange (newQuery) {
      this.query = newQuery
    }
  },
  created () {
    this._gethotkey()
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
</style>
