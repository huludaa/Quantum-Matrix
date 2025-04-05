<!-- 数据大屏组件用于展示量子计算资源的实时数据 -->
<!-- 包含顶部信息、左侧数据、中间地图、右侧排名等模块  -->

<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <!-- 数据大屏顶部：展示标题和时间等信息 -->
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <!-- 左侧数据展示区：游客、性别、年龄分布 -->
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <!-- 中间区域：地图和趋势图 -->
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <!-- 右侧数据展示区：排名、年度数据、计数器 -->
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Counter class="count"></Counter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入各个子组件
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Counter from './components/couter/index.vue'

// 获取数据大屏展示内容盒子的DOM元素
const screen = ref()

// 组件挂载时进行屏幕适配
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

/**
 * 计算大屏缩放比例
 * @param w 设计稿宽度
 * @param h 设计稿高度
 * @returns 缩放比例
 */
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

// 监听窗口大小变化，实时调整大屏缩放
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .rank {
          flex: 1.2;
        }

        .year {
          flex: 1;
        }

        .count {
          flex: 1;
        }
      }

      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;

        .tourist {
          flex: 1.2;
        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;

        .map {
          flex: 3.5;
        }

        .line {
          flex: 1.5;
        }
      }
    }
  }
}
</style>
