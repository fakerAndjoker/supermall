<template>
  <div class="good-list-item" @click="itemClick">
    <img :src="showImg" alt="" @load="imgLoad">
    <div class="good-info">
      <p>{{goodItem.title}}</p>
      <span class="price">{{goodItem.price}}</span>
      <img src="~assets/img/common/collect.svg" alt="">
      <span class="collect">{{goodItem.cfav}}</span>
      <span></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props: {
      goodItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imgLoad() {
        // 事件总线
        // -1表示不匹配,0表示匹配
        if (this.$route.path.indexOf('/home') == 0) {
          this.$bus.$emit('homeImgItemLoad');
        } else if (this.$route.path.indexOf('/detail') == 0) {
          this.$bus.$emit('detailImgItemLoad')
        }
      },
      itemClick() {
        this.$router.push('/details/' + this.goodItem.iid)
      }
    },
    computed: {
      showImg() {
        return this.goodItem.img || this.goodItem.image || this.goodItem.show.img
      }
    }
  }
</script>

<style scoped>
  .good-list-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }

  .good-list-item img {
    width: 100%;
    /*height: 267px;*/
    height: 100%;
    border-radius: 5px;
  }

  .good-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .good-info p {
    /*一般会用在一行文本超出固定宽度就隐藏超出的内容，但是这种情况一般会和省略号一起配合使用，超出位置显示省略号（是一行文本才有效哦）：*/
    overflow: hidden;
    /*显示省略符号来代表被修剪的文本。*/
    text-overflow: ellipsis;
    /*文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。*/
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .good-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .good-info .collect {
    margin-left: 1px;
  }

  .good-info img {
    width: 14px;
    height: 14px;
    padding-top: 3px;
  }
</style>
