import request from './request';

export function getMenu(){
  return request({
    url:'/category'
  })
}

export function getSubCategory(maitKey){
  return request({
    url:'/subcategory',
    params:{
      maitKey
    }
  })
  // .then(res=>{
  //   return new Promise((resolve,reject)=>{
  //     setTimeout(()=>{
  //       resolve(res) 
  //     },4000)
  //   })
  // })
}

export function getCategoryDetails(miniWallkey,type){
  return request({
    url:'/subcategory/detail',
    params:{
      miniWallkey,
      type
    }
  })
}