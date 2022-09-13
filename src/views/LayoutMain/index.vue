<template>
    <div class="layout-Main">
        <card-list :="{ list: specialCard.list, className: 'special-list' }">
            <template #title>
                <h3>{{ specialCard.title }}</h3>
            </template>

            <template #item="{ item }">
                <div class="item-special">
                    <div class="content">
                        <img :src="item.url" alt="" />
                        <div>
                            {{ item.text }}
                        </div>
                    </div>
                </div>
            </template>
        </card-list>
    </div>
</template>

<script setup lang="ts">
import CardList from '@/components/Card-list/index.vue'

const specialCard = reactive({
    title: '特色专题',
    list: [
        {
            url: new URL('../../assets/testimg/4.jpeg', import.meta.url).href,
            id: 101,
            text: '科技最前沿'
        },
        {
            url: new URL('../../assets/testimg/4.jpeg', import.meta.url).href,
            id: 102,
            text: '科技最前沿'
        },
        {
            url: new URL('../../assets/testimg/4.jpeg', import.meta.url).href,
            id: 103,
            text: '科技最前沿'
        },
        {
            url: new URL('../../assets/testimg/4.jpeg', import.meta.url).href,
            id: 104,
            text: '科技最前沿'
        }
    ]
})
</script>

<style lang="scss">
.layout-Main {
    h3 {
        padding: 0 20px;
    }
}
.special-list {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    .item {
        flex: 1;
        .content {
            img {
                width: 100%;
                height: 50px;
            }
        }
    }
}
</style>
