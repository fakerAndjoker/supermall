const mutations = {
  // 用commit来调用mutations里面的方法
  addCount(state,playLoad) {
    playLoad.count++
  },
  addToCar(state,playLoad) {
    state.carList.push(playLoad)
  },
  changeChecked(state, index) {
    state.carList[index].checked = !state.carList[index].checked
  },
  selectAll(state) {
    state.carList.forEach(item => item.checked = true)
  },
  noSelectAll(state) {
    state.carList.forEach(item => item.checked = false)
  },

}
export default mutations
