import { createAxios } from './fetch'
import axios from 'axios'

export function fectchData() {
  axios.interceptors.request.use(
    function(config) {
      config.headers.Authorization = '267482bb42ad40719f7ec8788d6c962e'
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  return axios({
    method: 'post',
    url: '/sys/industry/param',
    baseURL: 'http://test.api.iglobalwin.com/',
    params: {
      parentId: 0,
    },
    // data: {
    //   displayStart: 1,
    //   displayLength: 10,
    // },
  })
}
