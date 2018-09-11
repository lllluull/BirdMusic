<template>
  <transition name="detail">
    <div class="detail">
      <div class='header' ref='header'>
        <div class='iconfont detailback' @click='back' ref='back'>&#xe667;</div>
        <div class='detailname'>{{msg.singer_name}}</div>
      </div>
      <div class="detailtitle" ref='detailheader'>
      </div>
      <div class='layer' ref='layer'></div>
      <div class="songlist" ref='songlist'>
        <ul >
          <li v-for='(item, index) in songlist' :key=index  @click = 'selectItem(item,index)'>
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
import {mapGetters, mapActions} from 'vuex'
import {getsong} from '@/api/singer.js'
import BScroll from 'better-scroll'
import {createSong} from '@/common/js/song.js'
export default {
  data () {
    return {
      id: '',
      url: '',
      msg: {},
      songlist: [],
      scrollY: 0
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    getdetail () {
      getsong(this.id).then((res) => {
        this.msg = res.data
        this.msg.list.forEach((item) => {
          this.songlist.push(createSong(item.musicData))
        })
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.songlist, {
            probeType: 3
          })
          this.timer = setTimeout(() => {
            this.scroll.on('scroll', (pos) => {
              this.scrollY = pos.y
            })
          }, 50)
        })
      })
    },
    back () {
      this.$router.back()
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songlist,
        index: index
      })
    },
    ...mapActions({
      selectPlay: 'selectPlay'
    })
  },
  watch: {
    scrollY (newY) {
      let transY = Math.max(newY, -200)
      let zindex = 0
      this.imgheight = 289.8
      let scale = 1
      let blur = 0
      this.$refs.layer.style['transform'] = `translate3d(0, ${transY}px, 0)`
      if (newY > 0) {
        let percent = Math.abs(newY) / this.imgheight
        scale = (1 + percent)
        zindex = 10
        blur = 0
      }
      if (newY < -200) {
        zindex = 10
        this.$refs.detailheader.style.paddingBottom = 0
        this.$refs.detailheader.style.height = `75px`
        this.$refs.header.style.backgroundColor = 'rgba(187 ,255 ,255, 0.5)'
        this.$refs.back.style.backgroundColor = 'rgba(187 ,255 ,255, 0)'
      } else {
        let percent = Math.abs(newY) / this.imgheight
        blur = 10 * percent
        this.$refs.detailheader.style.paddingBottom = '5.5rem'
        this.$refs.detailheader.style.height = 0
        this.$refs.header.style.backgroundColor = null
        this.$refs.back.style.backgroundColor = 'rgba(0,0,0,0.5)'
      }
      this.$refs.detailheader.style.zIndex = zindex
      this.$refs.detailheader.style['transform'] = `scale(${scale})`
      this.$refs.detailheader.style['backdrop-filter'] = `blur(${blur}px)`
      this.$refs.detailheader.style['webkitBackdrop-filter'] = `blur(${blur}px)`
    }
  },
  mounted () {
    this.id = this.$route.params.code
    this.url = this.$route.params.url
    this.getdetail()
    this.$refs.detailheader.style = `background-image: url(${this.url})`
    window.addEventListener('scroll', this.handleScroll, true)
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  }
}

</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
  .detail-enter-active, .detail-leave-active
    transition: all 0.3s ease
  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)
  .detail
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color $color-background
    .detailtitle
      position absolute
      height 0
      top 0
      left 0
      right 0
      padding-bottom 70%
      background-repeat no-repeat
      background-size cover
      background-position-y -0.5rem
    .header
      position fixed
      top 0
      right 0
      left 0
      height 1.5rem
      z-index 60
      .detailback
          width .8rem
          height .8rem
          border-radius 50%
          background rgba(0,0,0,0.5)
          text-align center
          line-height .8rem
          margin-top .2rem
          margin-left .2rem
          font-size .5rem
      .detailname
          position absolute
          left 50%
          top .3rem
          bottom 0
          transform translateX(-50%)
          font-size .5rem
    .layer
      position absolute
      top 5.5rem
      bottom 0
      width 100%
      background-color #E0FFFF
    .songlist
      position absolute
      top 5.5rem
      bottom 0
      width: 100%
      background-color #E0FFFF
      color black
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
