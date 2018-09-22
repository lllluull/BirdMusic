<template>
  <div class="loading">
    <div class='innerloading'>
      <img width="50" height="50" src="./loading.gif">
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/styl/variable'

  .loading
    width: 100%
    display flex
    height 4rem
    align-items center
    justify-content center
    .innerloading
      text-align center
      .desc
        line-height: .6rem
        height .6rem
        font-size: $font-size-medium-x
        color: $color-theme
</style>
