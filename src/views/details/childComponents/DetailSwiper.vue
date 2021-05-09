<template>
  <el-carousel trigger="click" height="350px" class="swiper">
    <el-carousel-item v-for="item in topImages" :key="item.index">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style>
  .swiper {
    overflow: hidden;
  }

  /*更改轮播图的切换按钮为圆点*/
  .el-carousel__indicator--horizontal button {
    width: 8px;
    height: 8px;
    border-radius: 3px ;
  }

</style>
