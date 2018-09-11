import {getsingerlist} from '@/api/singer.js'
export function getsingerlists () {
  return new Promise((resolve, reject) => {
    if (_getsingerlist()) {
      resolve(_getsingerlist)
    }
  })
}

function _getsingerlist () {
  getsingerlist().then((res) => {
    let arry = res.data.list
    let map = {
      hot: {
        title: '热门',
        items: []
      }
    }
    arry.forEach((item, index) => {
      let key = item.Findex
      if (index < 10) {
        map.hot.items.push({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
          url: `//y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
        })
      }
      if (map[key]) {
        map[key].items.push({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
          url: `//y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
        })
      } else {
        map[key] = {
          title: key,
          items: [
            {name: item.Fsinger_name,
              id: item.Fsinger_mid,
              url: `//y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
            }
          ]
        }
      }
    })
    let hot = []
    let ret = []
    for (let i in map) {
      let item = map[i]
      if (item.title.match(/[a-zA-Z]/)) {
        ret.push(item)
      } else if (item.title === '热门') {
        hot.push(item)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(ret)
  })
}
