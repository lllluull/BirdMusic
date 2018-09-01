<template>
  <div id="app">
    <mheader></mheader>
    <mtab></mtab>
    <router-view></router-view>

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

<style>

</style>
