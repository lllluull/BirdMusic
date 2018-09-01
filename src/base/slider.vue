<template>
  <div class="slider" ref='slider'>
    <div class="slider-group" ref='sliderGroup'>
     <slot></slot>
    </div>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
import {addClass} from '@/common/js/dom'
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  methods: {
    _setSliderWithd () {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop) {
        width += 2 * sliderWidth + 'px'
      }
      this.$refs.sliderGroup.style.width = width
    },
    _initSlider () {
      
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWithd()
      this._initSlider()
    }, 20)
  }
}
</script>
<style lang="stylus" scoped>
.slider
  min-height 1px
  .slider-group
    white-space nowrap
    position relative
    overflow hidden
    .slider-item
      float left
      box-sizing border-box
      overflow hidden
      text-align center
      img
        display block
        width 100%

</style>
