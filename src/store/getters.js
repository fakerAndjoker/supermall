const getters = {
  carList(state) {
    return state.carList
  },
  carCount(state, getters) {
    return getters.carList.length
  },
  selectCount(state) {
    let count = 0
    for (let i = 0; i < state.carList.length; i++) {
      if (state.carList[i].checked) {
        count++
      }
    }
    return count
  },
  totalPrice(state) {
    return state.carList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.count * item.price
    }, 0).toFixed(2)

  }
}
export default getters
