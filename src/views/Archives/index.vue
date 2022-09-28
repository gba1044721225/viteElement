<template>
    <div class="archives">
        <layout-header></layout-header>
        <el-tabs type="border-card">
            <el-tab-pane label="个人信息">个人信息</el-tab-pane>
            <el-tab-pane label="发布文章">发布文章</el-tab-pane>
            <el-tab-pane label="我的关注">我的关注</el-tab-pane>
            <el-tab-pane label="我的收藏">我的收藏</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import LayoutHeader from '@/views/LayoutHeader/index.vue'
</script>

<style lang="scss" scoped></style>
