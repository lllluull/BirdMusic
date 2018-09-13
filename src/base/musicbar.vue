<template>
  <div class="bar" >
    <div class="barinner" ref='bar'>
      <div class="progress" ref='progress'></div>
      <div class="btnouter"
        ref='btn'
        @touchstart='processtouchstart'
        @touchmove='processtouchmove'
        @touchend='processtouchend'
      >
        <div class="btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    percent: {
      types: Number,
      default: 0
    }
  },
  watch: {
    percent (newpercent) {
      if (newpercent > 0 && !this.touch.inital) {
        const barwidth = this.$refs.bar.clientWidth - 16
        const offsetwidth = barwidth * newpercent
        this.$refs.progress.style.width = `${offsetwidth}px`
        this.$refs.btn.style['transform'] = `translate3d(${offsetwidth}px,0,0)`
      }
    }
  },
  methods: {
    processtouchstart (e) {
      this.touch.inital = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    processtouchmove (e) {
      if (!this.touch.inital) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetwidth = Math.min(this.$refs.bar.clientWidth - 16, Math.max(0, this.touch.left + deltaX))
      this.$refs.progress.style.width = `${offsetwidth}px`
      this.$refs.btn.style['transform'] = `translate3d(${offsetwidth}px,0,0)`
    },
    processtouchend () {
      this.triggerPercent()
      this.touch.inital = false
    },
    triggerPercent () {
      const barwidth = this.$refs.bar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth / barwidth
      this.$emit('percentChange', percent)
    }
  },
  created () {
    this.touch = {}
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
  .bar
    height .6rem
    .barinner
      position relative
      top .04rem
      height .08rem
      background rgba(0,0,0,0.3)
      width 100%
      .progress
        position absolute
        height 100%
        background-color red
      .btnouter
        position absolute
        left -0.16rem
        top -0.26rem
        width .6rem
        height .6rem
        .btn
          position relative
          top .12rem
          left .12rem
          box-sizing border-box
          width .32rem
          height .32rem
          border 3px solid $color-text-l
          border-radius 50%
          background-color $color-background

</style>
