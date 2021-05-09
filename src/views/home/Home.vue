<!--第一次打开首页必须要刷新，不然不可以滚动（待解决）-->
<template>
  <div id="home">
    <!--    顶部-->
    <nav-bar class="hom-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="fixed"
                 @tabClick="tabClick" ref="tabControl1"
                 v-show="isTabFixed"></tab-control>
    <!--    滚动区域-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="scrollPosition"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--    轮播图，父传子-->
      <home-swpier :banners="banners" @swpierImgLoad="swiperLoad" v-if="banners.length > 0"></home-swpier>
      <!--    推荐-->
      <recommend-view :recommends="recommends"></recommend-view>
      <!--    本周流行-->
      <feature-view></feature-view>
      <!--    流行-->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <!--    商品-->
      <good-list :goods="goods[currentType].list"></good-list>
    </scroll>
    <!--    回到顶部 .native是监听组件点击-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import HomeSwpier from "./childComponents/HomeSwpier";
  import RecommendView from "./childComponents/RecommendView";
  import FeatureView from "./childComponents/FeatureView"
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodList from "../../components/content/goods/GoodList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";
  import {debounce} from "../../common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwpier,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0

      }
    },
    destroyed() {
      console.log('destroyed');
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    //生命  周期函数
    created() {
      console.log("创建");
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // 监听图片是否加载完成,让better-scroll重新计算滚动区域的高度
      const refresh = debounce(this.$refs.scroll.refresh, 50);
      this.$bus.$on('homeImgItemLoad', () => {
        refresh()
      })
    },
    methods: {
      //事件监听
      //防抖函数

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 1000)
      },
      scrollPosition(position) {
        //决定tabFixed是否显示
        this.isTabFixed = -(position.y) > this.tabOffsetTop
        this.isShowBackTop = -(position.y) > 1000

      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      //网络请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
          // console.log(res);
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // ...是一种数组解构
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .hom-nav {
    color: white;
    /*这是一个常量*/
    background-color: var(--color-tint);
    /*原生滚动时需要*/
    /*font-size: 18px;*/
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }

  /*!*趟tab-control到达距离顶部44px的时候不动了*!加了better-scroll后失效*/
  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*}*/

  /*方案一*/
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  height: calc(100%);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

  /*方案二*/
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .fixed {
    position: relative;
    z-index: 9;
  }
</style>
