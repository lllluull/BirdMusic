<template>
  <div id="app">
    <mheader></mheader>
    <mtab></mtab>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import mheader from './components/header/header'
import mtab from './components/tab/tab'
export default {
  name: 'App',
  components: {
    mheader,
    mtab
  }
}
</script>
<style lang="stylus" scoped>
</style>
