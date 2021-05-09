import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })

}

export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    // 添加到地址后面的
    params: {
      type,
      page
    }
  })

}
