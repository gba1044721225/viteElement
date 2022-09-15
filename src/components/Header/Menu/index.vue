<template>
    <div class="custom-menu">
        <div class="tab-item logo">
            <img src="@/assets/vue.svg" alt="" />
            <div class="logo">logo</div>
        </div>
        <div
            class="tab-item"
            v-for="item in tabList"
            :key="item.id"
            @click="changeTab(item)"
            :class="{ isActivted: item.id == currentId }"
        >
            <div class="label">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
interface Iitem {
    isActive: boolean
    id: string
    label: string
}
interface Iprops {
    tabList?: Iitem[]
}
const props = withDefaults(defineProps<Iprops>(), {
    tabList: () => [
        {
            isActive: false,
            id: 'home',
            label: '首页'
        },
        {
            isActive: false,
            id: 'category',
            label: '分类'
        },
        {
            isActive: false,
            id: 'theme',
            label: '主题'
        },
        {
            isActive: false,
            id: 'tool',
            label: '工具'
        },
        {
            isActive: false,
            id: 'message',
            label: '留言'
        },
        {
            isActive: false,
            id: 'sharing',
            label: '分享'
        }
    ]
})

const currentId: Ref<string> = ref(props.tabList[0].id)

const changeTab = (item: Iitem) => {
    currentId.value = item.id
}
</script>

<style lang="scss" scoped>
.custom-menu {
    // height: $head-height;
    display: flex;
    flex-wrap: nowrap;
    cursor: pointer;
    font-family: 'wryh';
    .tab-item {
        flex: 1;
        // box-sizing: border-box;
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .label {
            text-align: center;
        }
        border-bottom: 2px solid rgba(21, 124, 198, 0);
    }
    .tab-item:hover {
        color: rgba(0, 0, 0, 0.7);
    }
    .isActivted {
        border-bottom: 2px solid rgba(21, 124, 198, 1);
    }

    .tab-item.logo {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
    }
}
</style>
