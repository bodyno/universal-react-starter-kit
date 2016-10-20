import axios from 'axios'
import { message, notification } from 'antd'
import { isProd } from 'components/Common'

axios.defaults.baseURL = '/restapi/store/v1/'
axios.defaults.headers.common['X-HB-Client-Type'] = 'store-pc'

// 自定义loading效果
let hide
axios.interceptors.request.use(function (config) {
  if (!hide) hide = message.loading('正在执行中...', 0)
  return config
})

axios.interceptors.response.use(function (response) {
  hide()
  return response
}, function (error) {
  if (error.response.status == 401) {
    location.href = `https://account.baobaobooks.${ isProd() ? 'com' : 'net' }/login?continue=${encodeURIComponent(location.href)}`
    return
  } else {
    if (error.response.data.message) {
      notification.warning({
        message: '服务器异常',
        description: error.response.data.message
      })
    }
  }
  hide()
  message.warning('服务器异常，请稍后再试', 3)
  return Promise.reject(error)
})

export default axios
