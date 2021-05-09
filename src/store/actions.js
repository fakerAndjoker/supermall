const actions = {
  // 用dispatch来调用actions里的方法
  // context是一个内容对象，包含这个vuex整体的其他属性，state，mutation等等，context是一个内容对象，包含这个vuex整体的其他属性，state，mutation等等，
  addCarList(context, payLoad) {
    return new Promise((resolve, reject) => {
      //判断购物车里面是否已经拥有该商品
      // find()方法返回一个对象
      let oldProduct = context.state.carList.find(item => item.iid === payLoad.iid)
      // let oldProduct = state.carList.find(function (item) {
      //   return item.iid === payLoad.iid
      //
      // })
      payLoad.checked = true
      if (oldProduct) {
        context.commit("addCount", oldProduct)
        resolve("商品数量+1!")
      } else {
        // payLoad里面没有count属性会自动创建
        payLoad.count = 1;
        context.commit("addToCar", payLoad)
        resolve("商品添加成功!")
      }
    })
  },
}
export default actions
