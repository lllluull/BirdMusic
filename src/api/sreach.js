import {jsonp1} from '../common/JS/jsonp'
export function getsreach (query, page, zhida) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
  const data = {
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    remoteplace: 'txt.yqq.center',
    searchid: 45528315552076399,
    t: 0,
    aggr: 1,
    cr: 1,
    catZhida: zhida ? 1 : 0,
    lossless: 0,
    flag_qc: 0,
    p: page,
    n: 20,
    w: query,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }
  return jsonp1(url, data, {param: 'jsonpCallback'})
}
