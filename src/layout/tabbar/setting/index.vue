<template>
  <el-button
    size="small"
    circle
    icon="Refresh"
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    circle
    icon="FullScreen"
    @click="fullScreen"
  ></el-button>
  <el-button size="small" circle icon="Setting"></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// 获取骨架相关的小仓库
import useLayOutSettingStore from '@/store/modules/setting'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()
let layoutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
// 刷新按钮点击回调函数
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全凭按钮点击回调
const fullScreen = () => {
  // DOM对象的一个属性，可以用来判断当前是否为全屏模式
  let full = document.fullscreenElement
  if (!full) {
    // 文档根节点的方法requestFullScreen 实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = () => {
  userStore.userLogout()
  // 跳转登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped></style>
