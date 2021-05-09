<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default() {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return true
        }
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    // 组件挂载到DOM之后
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // 现在好像不写这个属性也能监听position了
        probeType: this.probeType,
        // 这里如果是false的话，下面的代码会报错
        pullUpLoad: this.pullUpLoad,
        //新版本属性
        observeDOM: true
      }),
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        }),
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>
