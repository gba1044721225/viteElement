<template>
    <div class="layout-main">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-main {
    width: 1440px;
    margin: 0 auto;
    background-color: rgba(250, 250, 250, 1);
    min-height: 100vh;
    padding-bottom: 50px;
}
</style>
