<template>
  <transition name='listdetail'>
    <div class="detail">
      <div class="header">
        <div class="backgroud">
          <img :src="msg.logo" width="100%" height="100%">
        </div>
        <div class="top">
          <div class='iconfont back' @click = 'back'>&#xe667;</div>
          <div class="alltitle">歌单</div>
        </div>
        <div class="middle">
          <div class="img">
            <img :src="msg.logo" height='170px' width='170px'>
          </div>
          <div class="left">
            <div class="title">{{msg.dissname}}</div>
            <div class="nickname"><div class="avatar"><img :src="msg.headurl" width="40px" height="40px"></div><div>{{msg.nickname}}</div></div>
            <div class="desc"><span>简介：</span>{{msg.desc}}</div>
          </div>
        </div>
      </div>
      <div class="songlist" ref='songlist'>
        <ul >
            <li v-for='(item,index) in songlists' :key=index @click="selectsong(item,index)">
              <div class="right">
                <div class="songname">{{item.name}}</div>
                <div class="des">{{item.singer}}  </div>
                <div class='album'>{{item.album}}</div>
              </div>
              <div class="duration"><span class='iconfont icon'>&#xe600;</span>{{item.duration1}}</div>
              </li>
          </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import {getlist} from '@/api/song.js'
import {createSong} from '@/common/js/song.js'
import BScroll from 'better-scroll'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      id: 0,
      msg: {},
      songlists: []
    }
  },
  methods: {
    _getlist () {
      getlist(this.id).then((res) => {
        this.msg = res
        this.msg.songlist.forEach((item) => {
          this.songlists.push(createSong(item))
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.songlist, {
              probeType: 3
            })
          })
        })
      })
    },
    back () {
      this.$router.back()
    },
    selectsong (item, index) {
      this.selectPlay({
        list: this.songlists,
        index: index
      })
    },
    ...mapActions({
      selectPlay: 'selectPlay'
    })
  },
  mounted () {
    this.id = this.$route.params.code
    this._getlist()
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
  .listdetail-enter-active, .listdetail-leave-active
    transition: all 0.3s ease
  .listdetail-enter, .listdetail-leave-to
    transform: translate3d(100%, 0, 0)
  .detail
    position fixed
    top:0
    left 0
    right 0
    bottom 0
    background-color $color-background
    .header
      overflow hidden
      height 35%
      .backgroud
        position absolute
        left 0
        top 0
        width 150%
        height 35%
        z-index -1
        opacity 0.8
        filter blur(20px)
      .top
        display flex
        height 1rem
        line-height 1rem
        .back
          font-size .6rem
          width 1rem
          padding-left .2rem
        .alltitle
          font-size .4rem
          flex 1
          display flex
          justify-content center
          transform translateX(-0.5rem)
      .middle
        height 4rem
        display flex
        align-items center
        .img
          width 4rem
          height 4rem
          display flex
          justify-content center
          align-items center
          img
            border-radius 5%
        .left
          flex 1
          position relative
          height 4rem
          .title
            padding-top .3rem
            height .5rem
            line-height .5rem
            font-size $font-size-medium-x
          .nickname
            padding-top .6rem
            display flex
            align-items center
            .avatar
              padding-right .3rem
              img
                border-radius 50%
          .desc
            padding-top .6rem
            font-size $font-size-small-s
            color $color-text-ll
            line-height .4rem
            width 4rem
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
    .songlist
      position absolute
      top 35%
      bottom 0
      width: 100%
      background-color #E0FFFF
      color black
      overflow hidden
      li
        display flex
        justify-content space-between
        width: 100%
        height 1.5rem
        line-height 1.5rem
        border-bottom 1px solid #DCDCDC
        .right
          height 1.5rem
          line-height 1.5rem
          flex 1
          padding-left .3rem
          overflow:hidden
          .songname
            font-weight bold
            height .7rem
            line-height .7rem
            width 100%
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
          .des
            height .4rem
            line-height .4rem
            font-size .08rem
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
          .album
            height .4rem
            line-height .4rem
            font-size .08rem
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            color $color-dialog-background
        .duration
          color $color-dialog-background
          width 1.4rem
          font-size .05rem
          padding-left .6rem
          .icon
            color $color-theme
</style>
