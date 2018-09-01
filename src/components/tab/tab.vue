<template>
  <div class="tab">
    <router-link to="/recommend" tag='div' class='tabitem'><span class='itemlink'> 推荐</span></router-link>
    <router-link to="/singer" tag='div' class='tabitem'> <span class='itemlink'>歌手</span></router-link>
    <router-link to="/rank" tag='div' class='tabitem'><span class='itemlink'>排名</span></router-link>
  </div>
</template>
<script>

</script>
<style lang="stylus" scoped>
@import '~common/styl/variable'
  .tab
    height 1.2rem
    display flex
    .tabitem
      flex 1
      font-size $font-size-large
      text-align center
      height 1.2rem
      line-height 1.2rem
      .itemlink
        padding-bottom .1rem
      &.router-link-active
        .itemlink
          border-bottom 2px solid red
          color #FF69B4
</style>
