<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-scroll class="scrollbar">
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          :collapse="layOutSettingStore.fold ? true : false"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scroll>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Tabbar />
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
// 获取路由对象
import { useRoute } from 'vue-router'
// 引入左侧菜单子组件
import Logo from './logo/index.vue'
// 引入menu组件
import Menu from './menu/index.vue'
// 引入右侧内容展示区域
import Main from './main/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
// 获取Layout配置仓库
import useLayOutSettingStore from '@/store/modules/setting'
import Tabbar from '@/layout/tabbar/index.vue'

let userStore = useUserStore()
let layOutSettingStore = useLayOutSettingStore()

// 获取路由对象
let $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      display: block;
      overflow: auto;
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-tabbar-height);
      left: $base-tabbar-height;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-tabbar-height);
      left: $base-tabbar-height;
    }
  }
}
</style>
