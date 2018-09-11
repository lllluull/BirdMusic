<template>
  <div class="test" ref='test'>
    <ul>
      <li v-for= '(item, index) in hotlist' :key =index>{{item.title}}</li>
    </ul>

  </div>
</template>
<script>
import {getList} from '@/api/recommend.js'
import BScroll from 'better-scroll'
export default {
  created () {
    this._getlist()
  },
  data () {
    return {
      hotlist: []
    }
  },
  methods: {
    _getlist () {
      getList().then(res => {
        this.hotlist = res.recomPlaylist.data.v_hot
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.test)
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .test
    position absolute
    top 2.4rem
    left 0
    right 0
    bottom 0
    overflow hidden
    li
      height 2rem
</style>
