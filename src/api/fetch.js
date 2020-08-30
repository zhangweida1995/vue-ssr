import axios from 'axios'

export function createAxios({ url, method, params, data, timeout = 1000 }) {
  const axiosInstance = axios.create({
    url,
    method,
    baseURL: 'http://test.api.iglobalwin.com/',
    params, //url参数
    data, //body
    timeout,
  })
  axiosInstance.interceptors.request.use(
    function(config) {
      // 在发送请求之前做些什么
      return config
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
