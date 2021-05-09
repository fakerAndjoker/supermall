<template>
  <div class="good-list">
    <good-list-item v-for="item in goods" :goodItem="item"></good-list-item>
  </div>
</template>

<script>
  import GoodListItem from "./GoodListItem";
  export default {
    name: "GoodList",
    components:{
      GoodListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .good-list{
    display: flex;
    /*根据图片的大小自适应宽度（一行放几张图片)*/
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }

</style>
