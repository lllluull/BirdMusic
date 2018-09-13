<template>
  <div class='header'>
    <div>
      <div class="img">
      </div>
      <div class='title'>BirdMusic</div>
    </div>
    <router-link to="/sreach" tag='div' class="sreach iconfont">&#xe620;</router-link>
  </div>
</template>
<script>

</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
.header
  height 1.2rem
  background-color:red
  text-align center
  position relative
  .title
    height 1.2rem
    line-height 1.2rem
    display inline-block
    vertical-align top
    font-size $font-size-large-x
  .img
    display inline-block
    background-image url('../../common/img/logo.png')
    height .8rem
    width .8rem
    background-size .8rem .8rem
    margin-top .2rem
  .sreach
    position absolute
    right .3rem
    top .3rem
    font-size 30px
    font-weight bold
</style>
