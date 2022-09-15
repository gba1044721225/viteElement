<template>
    <div class="article-right">
        <div class="left">
            <h3>1</h3>
        </div>
        <div class="right">
            <div class="title">内容标题文字</div>
            <div class="text">这里是一行内容描述文字</div>
        </div>
    </div>
</template>

<script setup></script>

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
        h3 {
            font-size: 40px;
            font-weight: normal;
        }
    }
    .right {
        flex: 1;
        padding: 20px;
        box-sizing: border-box;
    }
}
</style>
