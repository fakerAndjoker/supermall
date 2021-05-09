<template>
  <div class="recommends">
    <div v-for="item in recommends" :key="item.index" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommends {
    display: flex;
    text-align: center;
    font-size: 14px;
    padding: 10px 0 20px 0;
    border-bottom: 8px solid #eee;
  }

  .recommends-item {
    flex: 1;
  }

  .recommends-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 8px;
  }
</style>
