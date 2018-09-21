export class Song {
  constructor ({id, mid, singer, name, album, duration, duration1, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.duration1 = duration1
    this.image = image
    this.url = url
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: allsinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    duration1: filterduration(musicData.interval),
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0&guid=126548448`
  })
}
export function createSongsec (item) {
  return new Song({
    id: item.id,
    mid: item.mid,
    singer: allsinger(item.singer),
    name: item.title,
    album: item.album.name,
    duration: item.interval,
    duration1: filterduration(item.interval),
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/C100${item.mid}.m4a?fromtag=0&guid=126548448`
  })
}

function allsinger (singerlist) {
  let ret = ''
  if (!singerlist) {
    return ''
  }
  singerlist.forEach((item) => {
    ret += `/${item.name}`
  })
  return ret.substring(1)
}

function filterduration (durtion) {
  let min = 0
  let sec = 0
  min = parseInt(durtion / 60)
  sec = durtion % 60
  return `${min}分${sec}秒`
}
