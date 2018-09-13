<template>
  <div class="sreach">
    <input type="text" placeholder="请输入歌曲、专辑、歌手、歌单名字" v-model='input'><button @click='_getsreach'>sad</button>
    <ul>
    </ul>
  </div>
</template>
<script>
import {getsreach} from '@/api/sreachapi.js'
export default {
  data () {
    return {
      input: '',
      showdata: {},
      album: []
    }
  },
  methods: {
    _getsreach () {
      return getsreach(this.input).then((res) => {
        return Promise.resolve(res)
      })
    }
  },
  created () {
    this.$watch('input', (newinput) => {
      this._getsreach.then((res) => {
        this.showdata = res.data
      })
    })
  }
}

</script>
<style lang="stylus" scoped>
  .sreach
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color white
    input
      border 1px solid grey
      width 80%
      height .6rem
</style>
