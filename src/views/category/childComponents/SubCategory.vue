<template>
  <div class="subCategory">
    <SubCategoryItem :subCategoryItem="item" v-for="item in subCategory"></SubCategoryItem>
  </div>
</template>

<script>
  import SubCategoryItem from "./SubCategoryItem";

  export default {
    name: "SubCategory",
    components: {
      SubCategoryItem,
    },
    props: {
      subCategory: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .subCategory {
    display: flex;
    /*子元素是否换行*/
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 5px;
  }
</style>
