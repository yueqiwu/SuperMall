import request from './request';
import axios from 'axios'

const CancelToken = axios.CancelToken;
let getSubCategoryCancel
let getCategoryDetailsCancel

export function getMenu() {
  return request({
    url: '/category'
  })
}

export function getSubCategory(maitKey) {
  getSubCategoryCancel && getSubCategoryCancel('取消了前一次的请求');
  getSubCategoryCancel = null;
  return request({
    url: '/subcategory',
    params: {
      maitKey
    },
    cancelToken: new CancelToken(function executor(c) {
      getSubCategoryCancel = c;
    })
  })
  .catch(err => {
    if (axios.isCancel(err)) {//取消前一次请求 这个捕获到的是取消请求的错误
      console.log(err);
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

export function getCategoryDetails(miniWallkey, type) {
  getCategoryDetailsCancel && getCategoryDetailsCancel('取消了前一次的请求');
  getCategoryDetailsCancel = null;
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    },
    cancelToken: new CancelToken(function executor(c) {
      // console.log(c)
      getCategoryDetailsCancel = c;
    })
  })
  .catch(err => {
    if (axios.isCancel(err)) {//取消前一次请求 这个捕获到的是取消请求的错误
      console.log(err);
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