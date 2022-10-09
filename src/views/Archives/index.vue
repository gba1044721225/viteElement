<template>
    <div class="archives">
        <layout-header></layout-header>
        <div class="tabbar">
            <el-card :body-style="{ minHeight: 'calc(100vh - 115px)' }">
                <el-tabs type="border-card">
                    <el-tab-pane label="个人信息">
                        <my-info></my-info>
                    </el-tab-pane>
                    <el-tab-pane label="发布文章">
                        <my-article></my-article>
                    </el-tab-pane>
                    <el-tab-pane label="我的关注">我的关注</el-tab-pane>
                    <el-tab-pane label="我的收藏">我的收藏</el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import LayoutHeader from '@/views/LayoutHeader/index.vue'
import MyInfo from '@/views/Archives/MyInfo/index.vue'
import MyArticle from '@/views/Archives/MyArticle/index.vue'
</script>

<style lang="scss" scoped>
.archives {
    background-color: rgba(250, 250, 250, 1);
    min-height: 100vh;
    // padding-bottom: 50px;
    .tabbar {
        width: 1440px;
        margin: 0 auto;

        :deep(.el-tabs__content) {
            min-height: calc(100vh - 250px);
            position: relative;
        }

        :deep(#pane-0) {
            padding-left: 50px;
        }
    }
}
</style>
