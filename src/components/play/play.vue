<template>
  <div class="play" v-show='playlist.length>0'>
    <!-- 全页播放器 -->
    <transition name='playfull'>
      <div class="playfull" v-show='fullscreen'>
        <!-- 背景 -->
        <div class="background">
          <img :src="currentSong.image" width="100%" height="100%">
        </div>
        <!-- 头部 -->
        <div class="top">
          <div class="back" @click='tomin'>
            <div class="iconback iconfont" >&#xe667;</div>
          </div>
          <h1 class='title'>{{currentSong.name}}</h1>
          <h2 class='des'>{{currentSong.singer}}</h2>
        </div>
        <!-- 中间部分 -->
        <div class="middle">
          <div class="middlem">
            <div class="cdouter">
              <div class="cd" >
                <img :src="currentSong.image" :class='cdclass'>
              </div>
            </div>
          </div>
        </div>
        <!-- 底部 -->
        <div class="bottom">
          <!-- 进度条 -->
          <div class="bar">
            <span>{{currenttime}}</span>
            <div class="barouter">
              <barmusic :percent = 'percent' @percentChange='processchange'></barmusic>
            </div>
            <span>{{duration}}</span>
          </div>
          <!-- 操作区 -->
          <div class="operators">
            <div class="left11" @click="changemode">
              <div class="iconfont left1" v-show='modetype === 1'>&#xe66c;</div>
              <div class="iconfont left1" v-show='modetype === 2'>&#xe66d;</div>
              <div class="iconfont left1" v-show='modetype === 3'>&#xe60d;</div>
            </div>
            <div class="left22">
              <div class="iconfont left2" @click = 'presong'>&#xe604;</div>
            </div>
            <div class="center" @click='toplay'>
              <div class="iconfont center1" v-show='!playing'>&#xe774;</div>
              <div class="iconfont center1" v-show='playing'>&#xe62e;</div>
            </div>
            <div class="right11">
              <div class="iconfont right1" @click = 'nextsong'>&#xe605;</div>
            </div>
            <div class="right22">
              <div class="iconfont right2">&#xe60b;</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name='playmin'>
      <!-- 迷你播放器 -->
    <div class="playmin" v-show='!fullscreen' @click='tofull'>
      <div class="minicon">
        <img :src="currentSong.image" width="50px" height="50px" :class='cdclass' >
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
    <!-- audio播放器 -->
  <audio :src="currentSong.url" ref='audio' @timeupdate="gettime" @ended="audioend"></audio>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import barmusic from '@/base/musicbar'

export default {
  data () {
    return {
      currenttime: 0,
      duration: 0,
      currentTime2: 0,
      modetype: 1
    }
  },
  components: {
    barmusic
  },
  computed: {
    ...mapGetters({
      fullscreen: 'fullscreen',
      playlist: 'playlist',
      currentSong: 'currentSong',
      playing: 'playing',
      currentIndex: 'currentIndex'
    }),
    cdclass () {
      if (this.playing) {
        return 'alplay'
      } else {
        return 'alpause'
      }
    },
    percent () {
      return this.currentTime2 / this.currentSong.duration
    }
  },
  methods: {
    ...mapMutations({
      SET_FULLSCREEN: 'SET_FULLSCREEN',
      SET_PLAYING: 'SET_PLAYING',
      SET_CURRENTINDEX: 'SET_CURRENTINDEX',
      NEXT_SONG: 'NEXT_SONG',
      PRE_SONG: 'PRE_SONG',
      RANDOM_SONG: 'RANDOM_SONG'
    }),
    tomin () {
      this.SET_FULLSCREEN(false)
    },
    tofull () {
      this.SET_FULLSCREEN(true)
    },
    toplay () {
      this.SET_PLAYING(!this.playing)
    },
    nextsong () {
      if (this.modetype === 1) {
        this.NEXT_SONG()
      } else if (this.modetype === 3) {
        this.RANDOM_SONG()
      } else {
        this.$refs.audio.currentTime = 0
        this.currentSong = this.currentSong
        this.$refs.audio.play()
      }
    },
    presong () {
      if (this.modetype === 1) {
        this.PRE_SONG()
      } else if (this.modetype === 3) {
        this.RANDOM_SONG()
      } else {
        this.$refs.audio.currentTime = 0
        this.currentSong = this.currentSong
        this.$refs.audio.play()
      }
    },
    gettime (e) {
      this.currentTime2 = e.target.currentTime
      this.currenttime = this.formattime(e.target.currentTime)
      this.duration = this.formattime(this.currentSong.duration)
    },
    formattime (time) {
      let min = parseInt(Math.floor(time / 60)).toString().padStart(2, '0')
      let sec = parseInt(Math.floor(time % 60)).toString().padStart(2, '0')
      return `${min}:${sec}`
    },
    processchange (percent) {
      const currenttime = this.currentSong.duration * percent
      this.$refs.audio.currentTime = currenttime
    },
    audioend () {
      this.nextsong()
    },
    changemode () {
      let arry = [1, 2, 3]
      let index = arry.indexOf(this.modetype)
      if (index === 2) {
        index = 0
      } else {
        index += 1
      }
      this.modetype = arry[index]
    }
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing () {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (this.playing) {
          audio.play()
        } else {
          audio.pause()
        }
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
            .cd
              height 6.4rem
              display flex
              align-items center
              justify-content center
              img
                border-radius 50%
                &.alplay
                  animation rotate 20s linear infinite
                &.alpause
                  animation-play-state: paused
      .bottom
        position absolute
        bottom 1rem
        width 100%
        .bar
          width 90%
          display flex
          align-items center
          margin 0px auto
          padding 10px 0
          .barouter
            flex 1
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
          &.alplay
            animation rotate 20s linear infinite
          &.alpause
            animation-play-state: paused
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
  @keyframes rotate
    0%
      transform rotate(0)
    100%
      transform rotate(360deg)
</style>
