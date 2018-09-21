<template>
  <div class="rank" ref='rank'>
    <div>
      <div class='title'><span>Bird</span>音乐飞翔榜</div>
      <ul>
        <li v-for='(item, index) in ranklist' :key=index @click='torankdetail(item.id)'>
          <div class="img">
            <div class='imgcontent'>
              <img :src="item.picUrl" width="190px" height="190px">
              <div class="bottom"><span class='iconfont'>&#xe6a0;</span>  {{item.listenCount|toWang}}万</div>
            </div>
          </div>
          <div class="des">
            <ul>
              <li v-for ='(song, index1) in item.songList' :key = index1>
                <div class="liinner">{{index1+1}} {{song.songname}}-<span>{{song.singername}}</span></div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      ranklist: []
    }
  },
  filters: {
    toWang: function (num) {
      let num1 = num / 10000
      if (num1.toString().includes('.')) {
        return num1.toFixed(1)
      } else {
        return num1
      }
    }
  },
  methods: {
    getrank () {
      axios.get('rank')
        .then((res) => {
          this.ranklist = res.data.data.topList
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.rank)
          })
        })
    },
    torankdetail (id) {
      console.log(id)
      this.$router.push({name: `rankdetail`,
        params: {
          id: id,
          code: id
        }})
    }
  },
  created () {
    this.getrank()
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
.rank
  overflow hidden
  position absolute
  top 2.5rem
  bottom 0
  .title
    height .5rem
    line-height .5rem
    display flex
    align-items center
    justify-content center
    font-size 18px
    span
      color red
      font-size 18px
  li
    display flex
    width 100%
    .img
      position relative
      height 4rem
      padding-left .1rem
      padding-right .1rem
      display flex
      justify-content center
      align-items center
      .imgcontent
        height 3.8rem
        width 3.8rem
        position relative
        .bottom
          position absolute
          bottom .1rem
          left .1rem
    .des
      margin-top .1rem
      display flex
      align-items center
      flex 1
      width 100%
      ul
        display flex
        flex-direction: column
        width 4rem
        .liinner
          height .8rem
          line-height .8rem
          width 4rem
          font-size 10px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          span
            color $color-text-l
</style>
