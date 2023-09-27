import axios from 'axios'
import { Toast } from 'zarm'

const MODE = import.meta.env.MODE // 环境变量

axios.defaults.baseURL = MODE === 'development' ? '/api' : 'http://finance.xsnowholy.top'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = `${localStorage.getItem('token') || null}`
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.show('服务端异常！')
    return Promise.reject(res)
  }

  if (res.data.code !== 200) {
    if (res.data.msg) Toast.show(res.data.msg)
    if (res.data.code === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(res)
  }

  return res.data
}, error => {
    Toast.show(error.message || '服务器异常!')
    return Promise.reject(error)
})

export default axios