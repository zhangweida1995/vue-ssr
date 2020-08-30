import { createAxios } from './fetch'
import axios from 'axios'

export function fectchData() {
  return axios({
    method: 'post',
    url: '/tasks/boards/list',
    // baseURL: 'http://test.api.iglobalwin.com/',
    // params: {
    //   parentId: 0,
    // },
    data: {
      displayStart: 1,
      displayLength: 40,
    },
  })
}
