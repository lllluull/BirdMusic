<template>
  <div class="suggest">
    <ul>
      <li v-for='(item, index) in result'  :key = index>{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
import {getsreach} from '@/api/sreach.js'
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    zhida: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      page: 1,
      result: []
    }
  },
  methods: {
    _getsreach () {
      getsreach(this.query, this.page, this.zhida).then(res => {
        this.result = this.getresult(res.data)
      })
    },
    getresult (data) {
      let ret = []
      if (data.zhida.type === 1) {
        console.log(data.zhida)
        ret.push({...data.zhida, ...{type: 'singer'}})
      }
      if (data.song) {
        ret = ret.concat(data.song.list)
      }
      return ret
    }
  },
  watch: {
    query (newquery) {
      this._getsreach(newquery)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
