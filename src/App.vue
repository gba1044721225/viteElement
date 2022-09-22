<template>
    <div class="vite-app">
        <router-view v-slot="{ Component }">
            <keep-alive exclude="Login">
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
