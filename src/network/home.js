import request from './request';

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
  // .then(res=>{//模拟数据延迟
  //   return new Promise((resolve,reject)=>{
  //     setTimeout(()=>{
  //       resolve(res)
  //     },2000)
  //   })
  // })
}