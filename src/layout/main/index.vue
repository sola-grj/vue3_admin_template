<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'
let layoutSettingStore = useLayOutSettingStore()

// 控制当前组件是否销毁重新创建
let flag = ref(true)

// 监听仓库内部数据是否发生变化，判断用户是否点击刷新按钮
watch(
  () => layoutSettingStore.refresh,
  () => {
    // 点击刷新按钮，路由组件销毁
    flag.value = false
    // nextTick 可以保证响应式数据发生变化之后，你的DOM已经更新完毕了
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
