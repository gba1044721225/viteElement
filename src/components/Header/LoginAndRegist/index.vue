<template>
    <div class="custom-login-and-regist">
        <el-button type="primary" @click="linkToLogin"> 登录 </el-button>
        <el-button plain type="" @click="linkToRegist">注册</el-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const linkToLogin = () => {
    router.push({
        path: '/login'
    })
}
const linkToRegist = () => {
    router.push({
        path: '/login'
    })
}
</script>

<style lang="scss" scoped>
.custom-login-and-regist {
    // height: 70px;
    display: flex;
    align-items: center;
    .regist {
        padding: 15px;
        flex: 1;
    }
    .el-button {
        font-size: 16px;
        flex: 1;
    }
}
</style>
