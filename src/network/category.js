import {request} from "./request";

export function getCategory() {
  return request({
    url: '/category'
  })
}


//上面部分的数据
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })

}


//下面部分的数据(详情数据）
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })

}
