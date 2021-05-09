<template>
  <div class="shopCar">
    <!--    标题-->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{length}})</div>
      </template>
    </nav-bar>
    <!--    滚动区域-->
    <scroll class="content" ref="scroll">
      <!--      商品-->
      <car-list></car-list>
      <!--      结算-->
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {mapGetters} from 'vuex'
  import CarList from "./childComponents/CarList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BottomBar from "./childComponents/BottomBar";

  export default {
    name: "ShopCar",
    components: {
      NavBar,
      CarList,
      Scroll,
      BottomBar

    },
    computed: {
      // 将getters里面的方法直接转化为计算属性，也可以采用对象的形式改变传过来的方法的名称
      // ...mapGetters(['carList', 'carCount']),
      ...mapGetters({
        length: 'carCount',
      })
    },
    activated() {
      // 解决购物车页面不能刷新的问题
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .content {
    height: calc(100vh - 49px - 44px - 44px);
  }
</style>
