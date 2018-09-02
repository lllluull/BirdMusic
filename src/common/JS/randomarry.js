//  ad为输入的数组，ranlist为输出的数组，num是要截取的个数
export default function randomArry (ad, randlist, num) {
  let len = ad.length
  for (let i = 0; i < num; i++) {
    let rand = Math.floor(Math.random() * len)
    let kk = ad[rand]
    if (randlist.includes(kk)) {
      i--
    } else {
      randlist.push(ad[rand])
    }
  }
}
