<template>
  <div class="suggest" ref="suggest">
    <div>
      <ul>
        <li v-if='singer' class='singer' @click='choosesinger(singer.singerMID, singer.singerPic)'>
          <img :src="singer.singerPic"  >
          <div class='singerdes'>
            <div class='namesinger'>歌手： {{singer.singerName}}</div>
            <div class='singercount'>单曲：{{singer.songNum}}  专辑：{{singer.albumNum}}</div>
          </div>
          <div class='iconfont todetail'>&#xe602;</div>
        </li>
        <li v-for='(item, index) in songlist'  :key = index class="songdes">
          <div >
            <div class="songname">{{item.name}}</div>
            <div class="songsinger">{{item.singer}}</div>
            <div class='songablum'>{{item.album}}</div>
          </div>
        </li>
        <div v-show='dropDown === 0' class='loading'><span class='iconfont pullup'>&#xe602;</span> 上拉加载更多</div>
        <div v-show='dropDown === 1' class='loading'><span class='iconfont letgo'>&#xe602;</span>放手开始加载</div>
        <div v-show='dropDown === 2' class='loading'>加载中</div>
      </ul>
    </div>
  </div>
</template>
<script>
import {getsreach} from '@/api/sreach.js'
import {createSongsec} from '@/common/js/song.js'
import BScroll from 'better-scroll'
export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      page: 1,
      result: [],
      dropDown: 0,
      zhida: true,
      history: []
    }
  },
  methods: {
    _getsreach (page, zhida) {
      getsreach(this.query, page, this.zhida).then(res => {
        this.result = this.result.concat(this.getresult(res.data))
        this.dropDown = 0
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.suggest, {
              scrollY: true,
              probeType: 3
            })
            this.scroll.on('scroll', () => {
              let maxheight = this.scroll.scrollerHeight - this.scroll.wrapperHeight
              if (this.scroll.y < -maxheight - 100) {
                this.dropDown = 1
              } else {
                this.dropDown = 0
              }
            })
            this.scroll.on('touchend', (pos) => {
              let maxheight = this.scroll.scrollerHeight - this.scroll.wrapperHeight
              if (this.scroll.y < -maxheight - 100) {
                this.dropDown = 2
              }
            })
          } else {
            this.scroll.refresh()
          }
        })
      })
    },
    getresult (data) {
      let ret = []
      if (data.zhida.type === 1) {
        ret.push({...data.zhida, ...{type: 'singer'}})
      }
      if (data.song) {
        ret = ret.concat(data.song.list)
      }
      return ret
    },
    choosesinger (id, url) {
      this.$router.push({name: `detail`,
        params: {
          id: id,
          code: id,
          url: url
        }})
    }
  },
  computed: {
    singer () {
      if (this.result[0]) {
        if (this.result[0].type === 'singer') {
          return this.result[0].zhida_singer
        }
      }
    },
    songlist () {
      let list = []
      let songlist = []
      if (this.result[0]) {
        if (this.result[0].type) {
          list = this.result.slice(1)
          list.forEach(item => {
            songlist.push(createSongsec(item))
          })
        } else {
          list = this.result
          list.forEach(item => {
            songlist.push(createSongsec(item))
          })
        }
      }
      return songlist
    }
  },
  watch: {
    query (newquery) {
      this.result = []
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
        this._getsreach(newquery, this.page)
        this.history.push(newquery)
      }, 1000)
    },
    dropDown () {
      if (this.dropDown === 2) {
        this.page = this.page + 1
        this.zhida = false
        this._getsreach(this.page, this.zhida)
      }
    }
  },
  mounted () {
    this._getsreach()
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
.suggest
  position fixed
  top 1.2rem
  bottom 0
  left 0
  right 0
  background-color  #87CEFA
  color #FFFAF0
  overflow hidden
  ul
    .singer
      height 2rem
      width 100%
      display flex
      align-items center
      background-color $color-sub-theme
      padding-left .2rem
      padding-right .2rem
      margin-bottom .05rem
      img
        border-radius 50%
        width 20%
      .singerdes
        padding-left .2rem
        .namesinger
          font-weight bold
          font-size .3rem
        .singercount
          padding-top .2rem
          font-size  .2rem
      .todetail
        position absolute
        right .1rem
        font-size .5rem
    .songdes
      height 1.5rem
      width 100%
      display flex
      align-items center
      background-color $color-sub-theme
      padding-left .2rem
      padding-right .2rem
      margin-bottom .05rem
      .songname
        font-size .3rem
      .songsinger
        padding-top .09rem
        font-size .1rem
        color #C8C8C8
        font-weight light
      .songablum
        padding-top .09rem
        font-size .03rem
        color #B0B0B0
        font-weight lighter
    .loading
      height 1rem
      width 100%
      display flex
      align-items center
      justify-content center
      .pullup
        transform rotate(-90deg)
      .letgo
        transform rotate(90deg)

</style>
