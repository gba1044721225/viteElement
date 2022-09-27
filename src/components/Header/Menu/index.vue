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
            @click="changeTab(item.id)"
            :class="{ isActivted: item.id == route.meta.id }"
        >
            <div class="label">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTabStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
const store = useTabStore()
const router = useRouter()
const route = useRoute()
const { tabList } = storeToRefs(store)
const changeTab = (id: string) => {
    console.log(tabList)
    router.push({
        path: `/layout/layout-main/${id}`
    })
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
