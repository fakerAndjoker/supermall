<template>
  <div>
    <nav-bar class="navBar">
      <template v-slot:left>
        <div @click="back" class="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div> 这个界面很水</div>
      </template>
    </nav-bar>
    <div class="explain">
      <div>演员未定</div>
      <div>剧本暂无</div>
      <div>资金不足</div>
      <div>敬请期待</div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/common/navbar/NavBar";

  export default {
    name: "UnFinished",
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .navBar {
    background-color: var(--color-tint);
    color: white;
    font-size: 18px;
  }

  .back {
    margin-left: 10px;
    margin-top: 6px;
    line-height: 44px;
  }

  .explain {
    margin-top: 50px;
    font-size: 30px;
    text-align: center;
  }
  .explain div{
    margin: 10px 20px;
  }
</style>
