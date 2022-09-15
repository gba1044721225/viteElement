<template>
    <div class="card-list">
        <div class="title">
            <slot name="title">
                <div class="content">标题</div>
            </slot>
            <div class="more">
                <span>更多</span>
                <el-icon><ArrowRight /></el-icon>
            </div>
        </div>

        <div :class="className">
            <div class="item" v-for="(item, index) in list" :key="index">
                <slot name="item" :item="item">
                    <div>默认内容</div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Iprops {
    list?: any[]
    className: string
}
const props = withDefaults(defineProps<Iprops>(), {
    list: () => [
        {
            url: new URL('../../assets/testimg/4.jpeg', import.meta.url).href,
            id: 101,
            text: '科技最前沿'
        }
    ],
    className: '默认class'
})
</script>

<style lang="scss">
.card-list {
    margin-top: 20px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
    .title {
        background-color: $prefecture-card-title-color;
        padding: 15px 0;
        // border-radius: 4px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        color: $prefecture-card-myfont-color;
        h3 {
            border-left: 3px solid $prefecture-card-myfont-color;
            padding: 0 20px;
            margin-left: 20px;
        }
        .more {
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-right: 10px;
            font-weight: bold;
        }
        .more:hover {
            color: $prefecture-card-myfont-color-active;
        }
    }
}
</style>
