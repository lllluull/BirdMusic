import oldJsonp from 'jsonp'

export default function (url, data, option) {
  url += (url.includes('?') ? '&' : '?') + Parama(data)
  return new Promise((resolve, reject) => {
    oldJsonp(url, option, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

function Parama (data) {
  let url = ''
  for (let key in data) {
    let value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
