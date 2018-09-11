<template>
  <div class="play" v-show='playlist.length>0'>
    <transition name='playfull'>
      <div class="playfull" v-show='fullscreen'>
        <div class="background">
          <img :src="currentSong.image" width="100%" height="100%">
        </div>
        <div class="top">
          <div class="back" @click='tomin'>
            <div class="iconback iconfont" >&#xe667;</div>
          </div>
          <h1 class='title'>{{currentSong.name}}</h1>
          <h2 class='des'>{{currentSong.singer}}</h2>
        </div>
        <div class="middle">
          <div class="middlem">
            <div class="cdouter">
              <div class="cd">
                <img :src="currentSong.image" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="left11">
              <div class="iconfont left1">&#xe66c;</div>
            </div>
            <div class="left22">
              <div class="iconfont left2">&#xe604;</div>
            </div>
            <div class="center">
              <div class="iconfont center1">&#xe774;</div>
            </div>
            <div class="right11">
              <div class="iconfont right1">&#xe605;</div>
            </div>
            <div class="right22">
              <div class="iconfont right2">&#xe60b;</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name='playmin'>
    <div class="playmin" v-show='!fullscreen' @click='tofull'>
      <div class="minicon">
        <img :src="currentSong.image" width="50px" height="50px" >
        <div class="mintext">
          <h2 class='minname'>{{currentSong.name}}</h2>
          <p class='desc'>{{currentSong.singer}}</p>
        </div>
      </div>

      <div class="mincontrol">
        <div class="iconfont control">&#xe60a;</div>
      </div>
    </div>
    </transition>
  <audio :src="currentSong.url" ref='audio'></audio>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      fullscreen: 'fullscreen',
      playlist: 'playlist',
      currentSong: 'currentSong'
    })
  },
  methods: {
    ...mapMutations({
      SET_FULLSCREEN: 'SET_FULLSCREEN'
    }),
    tomin () {
      this.SET_FULLSCREEN(false)
    },
    tofull () {
      this.SET_FULLSCREEN(true)
    }
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    }
  }
}

</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
  .play
    .playfull
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      background-color $color-background
      z-index: 150
      &.playfull-enter-active,&.playfull-leave-active
        transition all 0.4s ease
        .top, .bottom,.middle
          transition all 0.4s ease
      &.playfull-enter,&.playfull-leave-to
        opacity 0
        .top
          transform translate3d(0,-100px,0)
        .bottom
          transform translate3d(0,100px,0)
        .middle
          transform translate3d(0,0,-100px)

      .background
        position absolute
        left 0
        top 0
        width 120%
        height 120%
        z-index -1
        opacity 0.7
        filter blur(20px)
      .top
        position relative
        .back
          position absolute
          top 0.1rem
          left .1rem
          z-index 50
          transform: rotate(-90deg)
          .iconback
            font-size .6rem
        .title
          margin 0 auto
          padding-top .2rem
          text-align center
          width 80%
          font-size $font-size-large-x
          color $color-text-ll
          overflow hidden
          white-space: nowrap
          text-overflow: ellipsis
        .des
          margin 0 auto
          padding-top .2rem
          text-align center
          width 100%
          font-size $font-size-medium-x
      .middle
        position fixed
        width 100%
        top 2.5rem
        text-align center
        .middlem
          text-align center
          .cdouter
            width 6.4rem
            height 6.4rem
            background-color rgba(255,255,255,0.3)
            border-radius 50%
            margin 0 auto
            box-shadow 0 0 80px #080808
            img
              padding-top .2rem
              border-radius 50%
      .bottom
        position absolute
        bottom 1rem
        width 100%
        .operators
          width 100%
          display flex
          justify-content space-around
          .left11
            display flex
            align-items:Center
            .left1
              font-size .5rem
          .left22
            display flex
            align-items:Center
            .left2
              font-size .6rem
          .center1
            font-size .9rem
          .right11
            display flex
            align-items:Center
            .right1
              font-size .6rem
          .right22
            display flex
            align-items:Center
            .right2
              font-size .5rem
    .playmin
      position fixed
      left 0
      bottom 0
      z-index 180
      width 100%
      height 1.2rem
      display flex
      justify-content space-between
      background-color $color-sub-theme
      opacity 0.9
      &.playmin-enter-active, &.playmin-leave-active
        transition all 0.4s ease
      &.playmin-enter,&.playmin-leave-to
        transform translate3d(0,100px,0)
      .minicon
        display flex
        padding-left .2rem
        height 1.2rem
        align-items center
        width 4rem
        img
          border-radius 50%
        .mintext
          width 100%
          padding-left .2rem
          .minname
            width 100%
            overflow hidden
            white-space: nowrap
            text-overflow: ellipsis
            font-weight bold
          .desc
            color $color-text-l
            font-size .02rem
            margin-top .1rem
      .mincontrol
        display flex
        justify-content center
        align-items center
        .control
          width 1rem
          font-size .7rem

</style>
