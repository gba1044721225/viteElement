<template>
    <div class="article-right">
        <div class="left">
            <h3>1</h3>
        </div>
        <div class="right">
            <div class="title">{{ article.title }}</div>
            <div class="text">{{ article.text }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ar } from 'element-plus/es/locale'

interface Iprops {
    article?: {
        title: string
        text: string
    }
    index?: number
}
const props = withDefaults(defineProps<Iprops>(), {
    index: 1,
    article() {
        return {
            title: '内容标题文字',
            text: '这里是一行内容描述文字'
        }
    }
})
</script>

<style lang="scss" scoped>
.article-right {
    display: flex;
    align-items: center;
    .left {
        width: 30px;
        background-color: rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 8px;
        h3 {
            font-size: 40px;
            font-weight: normal;
            color: $prefecture-card-myfont-color;
        }
    }
    .right {
        margin-left: 15px;
        flex: 1;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        .title {
            color: rgba(0, 0, 0, 0.6);
            font-weight: bold;
            flex: 1;
            margin-bottom: 10px;
        }
        .text {
            flex: 1;
            font-size: 12px;
        }
    }
}
</style>
