<template>
    <div class="vite-layout">
        <layout-header></layout-header>
        <layout-main></layout-main>
    </div>
</template>

<script setup lang="ts">
import LayoutHeader from '@/views/LayoutHeader/index.vue'
import LayoutMain from '@/views/LayoutMain/index.vue'
</script>

<style scoped lang="scss">
.vite-layout {
    padding-bottom: 50px;
    min-width: 768px; /* px-to-viewport-ignore */
    background-color: rgba(100, 100, 100, 0.15);
    min-height: 100vh;
}
</style>
