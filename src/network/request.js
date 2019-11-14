import axios from 'axios'

export default function (config) {
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/v1',
    timeout: 5000
  });

  instance.interceptors.request.use(config=>{
    // console.log(config);
    return config
  })

  instance.interceptors.response.use(res => {//服务器响应拦截
    // console.log(res)
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}