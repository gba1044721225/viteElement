<template>
    <div class="news">
        <el-card v-for="i in 5" :key="i">
            <article-left></article-left>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import ArticleLeft from '@/components/ArticleLeft/index.vue'
</script>

<style lang="scss" scoped></style>
