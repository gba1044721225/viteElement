<template>
    <div class="prefecture">
        <!-- 特色专区 -->
        <card-list :="{ list: specialCard.list, className: 'special-list' }">
            <template #title>
                <h3>{{ specialCard.title }}</h3>
            </template>
            <template #item="{ item }">
                <div class="content">
                    <img :src="item.url" alt="" />
                    <div class="text">
                        {{ item.text }}
                    </div>
                </div>
            </template>
        </card-list>
        <!-- 工具 -->
        <card-list :="{ list: toolCard.list, className: 'tool-list' }">
            <template #title>
                <h3>{{ toolCard.title }}</h3>
            </template>
            <template #item="{ item }">
                <div class="content">
                    <img :src="item.url" alt="" />
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
        },
        {
            url: new URL('../../assets/testimg/4.jpeg', import.meta.url).href,
            id: 104,
            text: '科技最前沿'
        }
    ]
})

const toolCard = reactive({
    title: '工具',
    list: [
        {
            url: new URL('../../assets/testimg/5.jpeg', import.meta.url).href,
            id: 101
        },
        {
            url: new URL('../../assets/testimg/5.jpeg', import.meta.url).href,
            id: 102
        },
        {
            url: new URL('../../assets/testimg/5.jpeg', import.meta.url).href,
            id: 103
        },
        {
            url: new URL('../../assets/testimg/5.jpeg', import.meta.url).href,
            id: 104
        }
    ]
})
</script>

<style lang="scss">
.prefecture {
    --radius: 2px;
    h3 {
        padding: 0 20px;
    }
}
// 特色专区
.special-list {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 20px;
    .item {
        border-radius: var(--radius);
        cursor: pointer;
        flex-basis: calc(100% / 5);
        transition: all 0.3s;
        .content {
            border-radius: var(--radius);
            img {
                border-radius: var(--radius);
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
                width: 100%;
                display: block;
            }
            .text {
                border-radius: var(--radius);
                border-top-right-radius: 0;
                border-top-left-radius: 0;
                font-size: 16px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.2);
            }
        }
    }
    .item:nth-child(n + 2) {
        margin-left: 15px;
    }
    .item:hover {
        transform: scale(1.05);
        box-shadow: -2px 2px 10px 2px rgba(0, 0, 0, 0.2);
    }
}
// 工具专区
.tool-list {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 20px;
    .item {
        border-radius: var(--radius);
        cursor: pointer;
        flex-basis: calc(100% / 4);
        transition: all 0.3s;
        .content {
            border-radius: var(--radius);
            img {
                border-radius: var(--radius);
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
                width: 100%;
                display: block;
                object-fit: cover;
                object-position: 50% 50%;
            }
        }
    }
    .item:nth-child(n + 2) {
        margin-left: 15px;
    }
    .item:hover {
        transform: scale(1.05);
        box-shadow: -2px 2px 10px 2px rgba(0, 0, 0, 0.2);
    }
}
</style>
