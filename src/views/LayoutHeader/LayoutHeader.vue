<template>
    <div class="layout-header">
        <custom-menu></custom-menu>
        <custom-input></custom-input>
        <custom-login-and-regist></custom-login-and-regist>
    </div>
</template>

<script setup lang="ts">
import CustomMenu from '@/components/Header/Menu/index.vue'
import CustomInput from '@/components/Header/Input/index.vue'
import CustomLoginAndRegist from '@/components/Header/LoginAndRegist/index.vue'
</script>

<style scoped lang="scss">
.layout-header {
    height: $head-height;
    box-sizing: border-box;
    padding: 0 $pad-page;
    display: flex;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    .custom-menu {
        flex: 4;
    }
    .custom-input {
        flex: 2;
        margin-right: 30px;
    }
    .custom-login-and-regist {
        flex: 1;
    }
}
</style>
