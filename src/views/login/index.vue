<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          :model="loginForm"
          :rules="rules"
          class="login_form"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到vue3</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              @click="login"
              class="login_btn"
              type="primary"
              size="default"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'
// 引入用户相关的小仓库
let useStore = useUserStore()
// 获取路由器
let $router = useRouter()
// 获取el-form组件
let loginForms = ref()
// 控制按钮加载效果
let loading = ref(false)
// 收集表单数据
let loginForm = reactive({ username: 'admin', password: '111111' })
// 登录按钮回调函数
const login = async () => {
  // 表单校验
  await loginForms.value.validate()

  // 开始加载效果
  loading.value = true
  // 通知仓库发登陆请求
  try {
    await useStore.userLogin(loginForm)
    // 编程式导航
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `Hi,${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

// 自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule 校验规则对象
  // value 表单元素文本内容
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少为五位'))
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  // rule 校验规则对象
  // value 表单元素文本内容
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少为六位'))
  }
}
// 定义表单校验需要配置对象
const rules = {
  username: [
    // 普通校验规则
    // {
    //   required: true,
    //   min: 6,
    //   max: 10,
    //   message: '账号长度至少六位,最多十位',
    //   trigger: 'change',
    // },
    // 自定义校验规则
    {
      trigger: 'change',
      validator: validatorUserName,
    },
  ],
  password: [
    // {
    //   required: true,
    //   min: 6,
    //   max: 15,
    //   message: '密码长度至少六位,最多十五位',
    //   trigger: 'change',
    // },
    // 自定义校验规则
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
