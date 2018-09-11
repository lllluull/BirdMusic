<template>
  <div id="app">
    <mheader></mheader>
    <mtab></mtab>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <play></play>

  </div>
</template>

<script>
import mheader from './components/header/header'
import mtab from './components/tab/tab'
import play from './components/play/play'
export default {
  name: 'App',
  components: {
    mheader,
    mtab,
    play
  }
}
</script>
<style lang="stylus" scoped>
</style>
