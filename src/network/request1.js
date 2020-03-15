import axios from 'axios'
import store from 'store/index.js'
import router from '@/router'
import { SET_USER } from 'store/mutation-types.js'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截
request.interceptors.request.use(config => {
  const user = store.state.user
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截
request.interceptors.response.use(responce => {
  return responce
}, async function(err) {
  if (err.response && err.response.status === 401) {
    const user = store.state.user

    if (user && user.refresh_token) {
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        console.log('刷新token成功')
        // 更新token
        store.commit(SET_USER, {
          token: res.data.data.token, // 最新获取的可用 token
          refresh_token: user.refresh_token // 还是原来的 refresh_token
        })
      } catch (err) {
        console.log('刷新token失败')
        redirectLogin()
      }
    } else {
      // 如果没有refreshToken 跳转login页面 并将当前页面的路径以query形式保存
      redirectLogin()
    }
  }
  return Promise.reject(err)
})

function redirectLogin () {
  router.push('/login?redirect=' + router.currentRoute.fullPath)
}

export default request