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
