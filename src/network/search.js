import axios from 'axios'
import jsonp from 'jsonp'

export function getHot() {
  return axios.get('http://www.imooc.com/api/search/hot', {
    timeout: 10000
  }).then(res => {
    if (res && res.data.hotKeyWord.owner) {
      return res.data.hotKeyWord.owner
    }
    throw new Error('没有成功获取到数据')
  }).catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

export function getQuery(key) {
  return new Promise((resolve, reject) => {
    const url = `https://suggest.taobao.com/sug?q=${key}&code=utf-8&area=c2c&nick=&sid=`
    const options = {
      param: "callback",
      timeout: 10000
    }
    jsonp(url, options, (err, data) => {
      if (err) {
        reject(err)
      }else{
        resolve(data)
      }
    })
  }).catch(err => {
    console.log(err)
    return []
  })
}
