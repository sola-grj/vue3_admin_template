<template>
  <div>
    <h1>登录成功后展示的数据</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// 获取仓库对象
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
// 目前首页挂载完毕发送请求获取用户信息
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>
