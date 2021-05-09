<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"><img src="~assets/img/tabbar/home.svg" alt=""></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    // 父传子
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    methods: {
      itemClick() {
        // 加catch是为了防止连续点击同一个路由报错
        this.$router.replace(this.path).catch(err =>{
          return err
        })
        console.log("是我");
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  /*//不知道为什么这里不起作用*/
  /*.tab-bar-item img {*/
  /*  width: 24px;*/
  /*  height: 24px;*/
  /*  margin-top: 3px;*/
  /*  vertical-align: middle;*/
  /*  margin-bottom: 2px;*/
  /*}*/

</style>
