import {jsonp1} from '../common/JS/jsonp'
import {commonParams, options} from './config'
export function getsingerlist () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1928093487
  })
  return jsonp1(url, data, options)
}

export function getsong (id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    begin: 0,
    num: 50,
    songstatus: 1,
    notice: 0,
    singermid: id
  })
  return jsonp1(url, data, options)
}
