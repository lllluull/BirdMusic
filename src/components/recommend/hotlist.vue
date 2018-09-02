<template>
  <div class="hotlist">
    <div class="hotsong">
      <div class="hotsongtitle">
        热门歌单推荐
      </div>
      <div class="hotsongcontent">
        <div class="singlecontent"  v-for = '(item, index) in randomlist' :key = index>
          <div class="img">
            <img :src="item.cover" alt="">
          <div class='listen_num'><span class='iconfont'>&#xe6a0;</span>{{item.listen_num}}</div>
          </div>
          <div class="title">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class='hotsongbottom'>
     <div class='changelist' @click = 'changlist'><span class='iconfont'>&#xe628;</span>换一批</div>
    </div>
  </div>
</template>
<script>
import {getList} from '@/api/recommend.js'
import randomArry from '@/common/js/randomarry.js'
export default {
  data () {
    return {
      hotlist: [],
      randomlist: []
    }
  },
  methods: {
    _getlist () {
      getList().then(res => {
        this.hotlist = res.recomPlaylist.data.v_hot
        randomArry(this.hotlist, this.randomlist, 6)
      })
    },
    changlist () {
      this.randomlist = []
      randomArry(this.hotlist, this.randomlist, 6)
    }
  },
  mounted () {
    this._getlist()
  }
}

</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
.hotsongtitle
  font-size $font-size-large
  height 1rem
  line-height 1rem
  text-align center
  color $color-theme
  background-color $color-text-ll
.hotsongcontent
  width 100%
  padding-bottom 133.34
  overflow:hidden
  background-color $color-text-ll
  .singlecontent
    position relative
    width 31%
    float left
    display: inline-block;
    margin 1%
    .img
      position relative
      img
        width 100%
        border-radius .1rem
      .listen_num
        position absolute
        bottom 0
        left 0
        right 0
        font-size 8px
        padding-bottom .1rem
        padding-left .1rem
        background-image linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.8))
    .title
      font-size 8px
      height .7rem
      padding-top .1rem
.hotsongbottom
  text-align center
  color $color-text-d
  background-color $color-text-ll
  height .85rem
  .changelist
    height .5rem
    line-height .5rem
    width 1.5rem
    border 1px solid $color-text-ll
    margin 0 auto
</style>
