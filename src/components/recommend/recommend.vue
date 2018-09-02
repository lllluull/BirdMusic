<template>
  <div class = 'recommend' v-if='piclist.length'>
   <slider>
     <a :href="item.linkUrl" v-for = '(item, index) in piclist' :key = 'index' class='img'><img :src="item.picUrl" ></a>
   </slider>
   <hotlist></hotlist>
  </div>
</template>
<script>
import {getRecommend} from '@/api/recommend.js'
import slider from '../../base/slider'
import hotlist from './hotlist'
export default {
  data () {
    return {
      piclist: []
    }
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        this.piclist = res.data.slider
      })
    }
  },
  components: {
    slider,
    hotlist
  },
  mounted () {
    this._getRecommend()
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
  .recommend
    position: fixed
    width: 100%
    top: 2.4rem
    bottom: 0
    overflow:auto
    .rtitle
      font-size $font-size-large
      height .5rem
      line-height .5rem
      text-align center
</style>
