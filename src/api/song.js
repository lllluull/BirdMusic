/* eslint-disable */
import axios from 'axios'

export function getlist (id) {
  return axios.get('/api/getDiscList', {
    params: {
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      disstid: id,
      format: 'jsonp',
      g_tk: 5381,
      jsonpCallback: 'playlistinfoCallback',
      loginUin: 0,
      hostUin: 0,
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq',
      needNewCode: 0
    }
  })
    .then((res) => {
      const playlistinfoCallback = function (a) {
        return a.cdlist[0]
      }
      let hotlist = res.data
      let aa = eval(hotlist)
      return Promise.resolve(aa)
    })
}
