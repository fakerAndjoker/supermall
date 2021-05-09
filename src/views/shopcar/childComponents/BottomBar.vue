<template>
  <div class="bottom-menu">
    <check-button class="select-all" :is-checked="isSelectAll" @click.native="selectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计:￥{{totalPrice}}</span>
    <span class="count" @click="settlement">去结算:({{selectCount}})</span>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  import {mapGetters} from "vuex";

  export default {
    name: "BottomBar",
    components: {
      CheckButton
    },
    data() {
      return {}
    },
    computed: {
      // 好像是直接修改state里面的属性的原因
      ...mapGetters(['totalPrice', 'selectCount']),
      isSelectAll() {
        if (this.$store.state.carList.length === 0) {
          return false
        }
        for (let item of this.$store.state.carList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      selectAll() {
        if (this.isSelectAll) {
          this.$store.commit('noSelectAll')
        } else {
          this.$store.commit('selectAll')
        }
        console.log("点击了");
      },
      settlement(){
        this.$router.push('/unfinished')
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }


  .bottom-menu .count {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }

</style>
