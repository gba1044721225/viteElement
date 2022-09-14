<template>
    <div class="vite-layout">
        <layout-header></layout-header>
    </div>
</template>

<script setup lang="ts">
import LayoutHeader from '@/views/LayoutHeader/LayoutHeader.vue'
</script>

<style scoped lang="scss">
.vite-layout {
    padding-bottom: 50px;
    min-width: 768px; /* px-to-viewport-ignore */
    background-color: rgba(100, 100, 100, 0.15);
    min-height: 100vh;
}
</style>
