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
    overflow-x: scroll;
    min-height: 40px; /* px-to-viewport-ignore */
    height: $head-height;
    box-sizing: border-box;
    padding: 0 $pad-page;
    display: flex;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    position: sticky;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    background-color: rgba(240, 240, 240, 0.7);
    .custom-menu {
        flex: 4;
    }
    .custom-input {
        flex: 1.5;
        margin-right: 30px;
    }
    .custom-login-and-regist {
        flex: 1;
    }
}
.layout-header::-webkit-scrollbar {
    display: none;
}
</style>
