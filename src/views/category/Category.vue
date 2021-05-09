<template>
  <div class="category">
    <!--    顶部-->
    <NavBar class="navBar">
      <template slot="center">
        <div>商品分类</div>
      </template>
    </NavBar>
    <!--    内容-->
    <div class="content">
      <!--      侧边栏-->
      <div class="left">
        <CategorySidebar :sidebar-item="sidebarItem" @sideBarItemClick="sideBarItemClick"></CategorySidebar>
      </div>
      <!--      右侧内容-->
      <scroll class="right" ref="scroll">
        <div>
          <SubCategory class="subCategory" :sub-category="currentSubCategory"></SubCategory>
          <!--        流行-->
          <TabControl :titles="titles" @tabClick="tableClick"></TabControl>
          <!--        商品-->
          <good-list :goods="currentCategoryDetail"></good-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CategorySidebar from "./childComponents/CategorySidebar";
  import {getCategory, getSubcategory, getCategoryDetail} from "../../network/category";
  import SubCategory from "./childComponents/SubCategory";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodList from "../../components/content/goods/GoodList";
  import Scroll from "../../components/common/scroll/Scroll";


  export default {
    name: "Category",
    components: {
      CategorySidebar,
      NavBar,
      SubCategory,
      TabControl,
      GoodList,
      Scroll

    },
    data() {
      return {
        scroll: null,
        sidebarItem: ['正在流行', '上衣', '裤子', '裙子', '内衣', '女鞋', '男鞋', '包包', '运动', '配饰', '美妆', '个护', '家居', '百货', '母婴', '食品'],
        categoryList: [],
        currentIndex: -1,
        categoryData: [],
        titles: ['流行', '新款', '精选'],
        currentType: 'pop'
      }
    },
    created() {
      //网络请求默认是异步的。
      //若同时执行两个异步的方法，且其中一个要利用另一个的返回值，则有可能会报错
      this.getCategory()
    },

    mounted() {

    },
    computed: {
      currentSubCategory() {
        if (this.currentIndex === -1) {
          console.log(this.currentIndex);
          return []
        } else {
          return this.categoryData[this.currentIndex].subcategories
        }
      },

      // detail
      currentCategoryDetail() {
        if (this.currentIndex === -1) {
          // console.log(this.currentIndex);
          return []
        } else {
          // console.log(this.categoryData[this.currentIndex].categoryDetails[this.currentType]);
          return this.categoryData[this.currentIndex].categoryDetails[this.currentType]
        }
      }
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          this.categoryList = res.data.category.list
          //初始化categoryData
          for (let i = 0; i < this.categoryList.length; i++) {
            this.categoryData[i] = {
              subcategories: [],
              categoryDetails: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 第一次请求数据
          this.getSubcategory(0)
        })
      },
      getSubcategory(index) {
        let maitKey = this.categoryList[index].maitKey
        getSubcategory(maitKey).then(res => {
          // this.currentIndex = index
          this.categoryData[index].subcategories = res.data.list
          //获取某个类型的数据
          this.getCategoryDetail('pop', index)
          this.getCategoryDetail('sell', index)
          this.getCategoryDetail('new', index)
        })
      },

      // 这里请求数据的时间有问题,逻辑上感觉没有问题，但就是不对。只好用了一个定时器（但是这样做不好)
      getCategoryDetail(type, index) {
        getCategoryDetail(this.categoryList[index].miniWallkey, type).then(res => {
          this.categoryData[index].categoryDetails[type] = res
          setTimeout(() =>{
            this.currentIndex = index
          },400)
        })
      },
      sideBarItemClick(index) {
        this.$refs.scroll.scrollTo(0, 0)
        this.getSubcategory(index)
      },
      tableClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'sell'
            break
          case 2:
            this.currentType = 'new'
        }
      }
    }
  }
</script>

<style scoped>

  .navBar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
    box-shadow: none;
  }

  .content {
    display: flex;
    width: 100%;
  }

  .left {
    width: 100px;
  }

  .right {
    width: calc(100% - 100px);
    height: calc(100vh - 93px);
  }

  .subCategory {
  }
</style>
