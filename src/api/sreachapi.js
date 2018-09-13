import {jsonp1} from '../common/JS/jsonp'
import {options} from './config'
export function getsreach (input) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg'
  const data = {
    is_xml: 0,
    format: 'json',
    key: input,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }
  return jsonp1(url, data, options)
}
