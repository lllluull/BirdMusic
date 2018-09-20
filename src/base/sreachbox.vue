<template>
  <div class="sreachbox">
    <div class="innerbox">
      <span class='iconfont iconsreach'>&#xe620;</span>
      <input type="text" class='textsreach' :placeholder="placeholder" v-model='query' >
      <span class='iconfont deleta' v-show='query' @click="clearsreach">&#xe80b;</span>
    </div>
    <span class='cancelsreach' @click= 'back'>取消</span>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '歌曲名称、歌手'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    clearsreach () {
      this.query = ''
    },
    setquery (value) {
      this.query = value
    }
  },
  created () {
    this.$watch('query', (newQuery) => {
      this.$emit('query', newQuery)
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
  .sreachbox
    height 1.2rem
    width 100%
    background-color red
    display flex
    align-items center
    justify-content center
    .innerbox
      width 90%
      height 60%
      background-color #fff
      opacity 0.4
      display flex
      align-items center
      border-radius .5rem
      .iconsreach
        color $color-dialog-background
        font-size .4rem
        padding-left .1rem
        padding-right .1rem
      .textsreach
        width 6.3rem
        height 100%
        outline none
      .deleta
        color $color-dialog-background
        font-size .3rem
        padding-right .2rem
    .cancelsreach
      padding-left .1rem
      padding-right .1rem
</style>
