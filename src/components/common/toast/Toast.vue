<template>
  <div class="toast" v-if="show">{{message}}</div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default() {
          return ''
        }
      },
      show:{
        type:Boolean,
        default() {
          return true
        }
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: rgba(0,0,0,.7);
    transform: translate(-50%, -50%);
    z-index: 9;
    color: white;
    padding: 10px;
  }
</style>
