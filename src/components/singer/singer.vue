<template>
  <div class='singer' ref='wrapper'>
    <div>
    <div class="singerlist" v-for = '(item, index) in singerlist' :key=index  :ref='item.title'>
      <div class="singertitle">{{item.title}}</div>
      <div class="singerlistsort" >
        <ul v-for = '(items,myindex) in item.items' :key = myindex>
          <li class='onesinger' @click='choosesinger(items.id, items.url)'><div class="img"><img v-lazy="items.url" alt=""></div><div class='singername'>{{items.name}}</div></li>
        </ul>
      </div>
    </div>
    </div>
    <div class="alpha">
      <ul>
        <li
        v-for = '(item, index) in singerlist' :key = index
        @click = 'alpha'
        :class="[item.title === alpa ?'activeclass' :'']"
        @touchstart.prevent = 'touchstart'
        @touchmove = 'touchmove'
        @touchend = 'touchend'
        >{{item.title}}</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import {getsingerlist} from '@/api/singer.js'
import BScroll from 'better-scroll'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      singerlist: [],
      alpa: '热',
      startY: 397,
      timer: null,
      touchStatus: false

    }
  },
  methods: {
    _getsingerlist () {
      getsingerlist().then((res) => {
        let arry = res.data.list
        let map = {
          hot: {
            title: '热',
            items: []
          }
        }
        arry.forEach((item, index) => {
          let key = item.Findex
          if (index < 10) {
            map.hot.items.push({
              name: item.Fsinger_name,
              id: item.Fsinger_mid,
              url: `//y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`,
              ids: item.Fsinger_id
            })
          }
          if (map[key]) {
            map[key].items.push({
              name: item.Fsinger_name,
              id: item.Fsinger_mid,
              url: `//y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`,
              ids: item.Fsinger_id
            })
          } else {
            map[key] = {
              title: key,
              items: [
                {name: item.Fsinger_name,
                  id: item.Fsinger_mid,
                  url: `//y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`,
                  ids: item.Fsinger_id
                }
              ]
            }
          }
        })
        let hot = []
        let ret = []
        for (let i in map) {
          let item = map[i]
          if (item.title.match(/[a-zA-Z]/)) {
            ret.push(item)
          } else if (item.title === '热') {
            hot.push(item)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        this.singerlist = hot.concat(ret)
        this.setSinger(this.singerlist)
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper)
        })
      })
    },
    alpha (e) {
      this.alpa = e.target.innerText
      this.scroll.scrollToElement(this.$refs[this.alpa][0], 500)
    },
    touchstart () {
      this.touchStatus = true
    },
    touchmove (e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(
          () => {
            let index = Math.floor((e.touches[0].screenY - this.startY) / 14)
            this.alpa = this.singerlist[index].title
            this.scroll.scrollToElement(this.$refs[this.alpa][0], 500)
          }, 10)
      }
    },
    touchend () {
      this.touchStatus = false
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    choosesinger (id, url) {
      this.$router.push({name: `detail`,
        params: {
          id: id,
          code: id,
          url: url
        }})
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  mounted () {
    this._getsingerlist()
    console.log(this)
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
.singer
  position absolute
  top 2.4rem
  left 0
  right 0
  bottom 0
  overflow hidden
  .singertitle
    display block
    background-color $color-text-d
    height .9rem
    line-height .9rem
    color $color-theme
    padding-left .2rem
  .onesinger
    display flex
    justify-content space-between
    background-color $color-sub-theme
    height 2rem
    border-bottom 1px solid #0000DD
    .singername
      flex 1
      text-align center
      height 2rem
      line-height 2rem
    .img
      width 1.6rem
      height 1.6rem
      padding .2rem
      img
        width 100%
        border-radius 50%
  .alpha
    position fixed
    right .2rem
    top 35%
    .activeclass
      color red
      font-weight bold
</style>
