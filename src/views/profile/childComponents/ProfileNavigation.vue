<template>
  <div class="profileNavigation" @click="unfinished">
    <div class="img">
      <slot name="img"></slot>
    </div>
    <div class="title">
      <slot name="title"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileNav",
    methods:{
      unfinished(){
        this.$router.push('/unfinished')
      }
    }
  }
</script>

<style scoped>
  .profileNavigation {
    display: flex;
    align-items: center;
    border-top: 2px solid rgb(242,242,242);
  }

  .img {
    margin: 10px;
  }
</style>
