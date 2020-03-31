import axios from 'axios'

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function (config) {
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/h3',
    timeout: 5000
  });
  //服务器请求拦截
  instance.interceptors.request.use(config=>{
    NProgress.start()
    // console.log(config);
    return config
  })

  instance.interceptors.response.use(res => {//服务器响应拦截
    // console.log(res)
    // setTimeout(()=>{
      NProgress.done()
    // },120000)
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}