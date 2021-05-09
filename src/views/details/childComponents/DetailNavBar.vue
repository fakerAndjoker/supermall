<template>
  <nav-bar>
    <template v-slot:left>
      <div @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" class="back">
      </div>
    </template>
    <template v-slot:center>
      <div class="title">
        <div v-for="(item,index) in titles" class="titleItem"
             :class="{active: index === currentIndex}"
             @click="itemClick(index)">{{item}}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      backClick() {
        this.$router.back();
      },
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    width: 80%;
    margin-left: 8%;
  }

  .titleItem {
    flex: 1;
    text-align: center;
    font-size: 16px;
  }

  .back {
    margin-top: 10px;
    margin-left: 20px;
  }

  .active {
    color: red;
  }
</style>
