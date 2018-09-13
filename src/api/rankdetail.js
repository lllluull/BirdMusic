import axios from 'axios'
export function getrankdetail (id) {
  return axios.get('/api/getranklist', {
    params: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      tpl: 3,
      page: 'detail',
      type: 'top',
      topid: id,
      _: Date.parse(new Date())
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
