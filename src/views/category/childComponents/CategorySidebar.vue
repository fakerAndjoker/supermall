<template>
  <Scroll class="menu">
    <div class="sidebar">
    <span v-for="(item,index) in sidebarItem" class="sidebarItem"
          @click="itemClick(index)" :class="{activeItem: currentIndex === index}">{{item}}</span>
    </div>
  </Scroll>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";

  export default {
    name: "CategorySidebar",
    components: {
      Scroll
    },
    props: {
      sidebarItem: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    created() {
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('sideBarItemClick', index)
      }
    }
  }
</script>

<style scoped>
  .menu {
    width: 100px;
    height: calc(100vh - 95px);
    background-color: #f6f6f6;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
  }

  .sidebarItem {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .activeItem {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }

</style>
