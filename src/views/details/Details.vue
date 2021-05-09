<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="scrollPosition">
      <!--      轮播图-->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!--      商品价格-->
      <detail-base-info :goods="goods"></detail-base-info>
      <!--      店铺-->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--      商品展示-->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" ref="detailGoods"></detail-goods-info>
      <!--      参数详情-->
      <detail-item-params :params-info="paramsInfo" ref="params"></detail-item-params>
      <!--      评论-->
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <!--      推荐展示-->
      <good-list :goods="recommend" ref="recommend"></good-list>
    </scroll>
    <!--      底部购物车-->
    <detail-button-bar @addToCar="addToCar"></detail-button-bar>
    <!--    回到顶部 .native是监听组件点击-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>

  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/details";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailItemParams from "./childComponents/DetailItemParams";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import GoodList from "../../components/content/goods/GoodList";
  import {debounce} from "../../common/utils";
  import DetailButtonBar from "./childComponents/DetailButtonBar";
  import BackTop from "../../components/content/backTop/BackTop";
  import Toast from "../../components/common/toast/Toast";

  export default {
    name: "Details",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailItemParams,
      DetailCommentInfo,
      GoodList,
      DetailButtonBar,
      BackTop,
      Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopY: [],
        isShowBackTop: false,
        message:'',
        show:false
      }
    },
    created() {
      this.iid = this.$route.params.iid,
        getDetail(this.iid).then(res => {
          console.log(res);
          const data = res.result
          this.topImages = data.itemInfo.topImages
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          this.shop = new Shop(data.shopInfo)
          this.detailInfo = data.detailInfo
          this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          //取出评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
        })
      getRecommend().then(res => {
        console.log(res);
        this.recommend = res.data.list
      })
    },
    methods: {
      imageLoad() {
        // 解决加载图片时卡顿的bug
        this.$refs.scroll.refresh()
        //获取各个组件距离顶部的大小，可以用防抖函数减少次数，但是这里没必要
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopY);
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
      },
      scrollPosition(position) {
        const positionY = -position.y
        const length = this.themeTopY.length
        for (let i = 0; i < length; i++) {
          if (i <= length - 2) {
            if (positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i + 1]) {
              this.$refs.navBar.currentIndex = i
            }
          } else {
            if (positionY >= this.themeTopY[this.themeTopY.length - 1]) {
              this.$refs.navBar.currentIndex = i
            }
          }
        }
        this.isShowBackTop = -(position.y) > 1000

      },
      addToCar() {
        // 将信息传入购物车
        const product = {};
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        this.$store.dispatch("addCarList",product).then(res =>{
          this.message = res
          this.show = true
          setTimeout(() =>{
            this.show = false
            this.message = ""
          },1000)
        })
      },

      // 回到顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 1000)
      },
    },
    mounted() {
      // 监听图片是否加载完成,让better-scroll重新计算滚动区域的高度
      const refresh = debounce(this.$refs.scroll.refresh, 50);
      this.$bus.$on('detailImgItemLoad', () => {
        refresh()
      })
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

</style>
