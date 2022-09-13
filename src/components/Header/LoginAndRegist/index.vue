<template>
    <div class="custom-login-and-regist">
        <el-button type="primary"> 登录 </el-button>
        <el-button plain type="">注册</el-button>
    </div>
</template>

<script setup lang="ts"></script>

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
