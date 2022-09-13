<template>
    <div class="card-list">
        <div class="title">
            <slot name="title">
                <div class="content">标题</div>
            </slot>
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

<style scoped lang="scss">
.card-list {
    margin-top: 30px;
    padding: 0 $pad-page;
    .title {
        border-left: 2px solid rgb(30, 84, 209);
        .content {
            padding: 0 20px;
        }
    }
}
</style>
