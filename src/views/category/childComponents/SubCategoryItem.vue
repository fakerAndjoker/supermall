<template>
  <div class="item">
    <a :href="subCategoryItem.link">
      <img :src="subCategoryItem.image" alt="" class="image">
      <div class="title">{{subCategoryItem.title}}</div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "SubCategoryItem",
    props: {
      subCategoryItem: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .item {
    width: 81px;
    height: 96px;
    text-align: center;
  }

  .image {
    width: 65px;
    height: 65px;
    margin: auto;
  }

  .title {
    margin-top: 8px;
    font-size: 13px;
  }
</style>
