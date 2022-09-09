<template>
    <div class="custom-menu">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane :name="item.index" v-for="item in menuList" :key="item.index">
                <template #label>
                    <div class="tab-label label-index-logo" v-if="item.index < 0">
                        <img :src="item.img" alt="" />
                        <span>{{ item.label }}</span>
                    </div>
                    <div class="tab-label" v-else>
                        <span>{{ item.label }}</span>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import type { TabsPaneContext, TabPanelName } from 'element-plus'
const menuList = reactive([
    {
        label: '网站名字',
        img: new URL('../../../assets/vue.svg', import.meta.url).href,
        index: '-1'
    },
    {
        label: '首页',
        index: 0
    },
    {
        label: '分类',
        index: 1
    },
    {
        label: '专题',
        index: 2
    },
    {
        label: '工具',
        index: 3
    },
    {
        label: '留言',
        index: 4
    },
    {
        label: '资料分享',
        index: 5
    }
])

const activeName = ref(0)

const handleClick = (tab: TabsPaneContext, event: Event) => {
    if (tab.index === '0') {
        activeName.value = 999
        return
    }
    console.log(activeName.value)
    // console.log(tab, event)
}
</script>
<style lang="scss" scoped>
.custom-menu {
    padding-top: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);

    .demo-tabs > .el-tabs__content {
        color: #6b778c;
        font-size: 16px;
        font-weight: 600;
    }
    .tab-label {
        font-size: 14px;
    }
    .label-index-logo {
        img {
            height: 30px;
            vertical-align: middle;
        }
    }
    :deep(.el-tabs__nav-wrap::after) {
        background-color: #fff;
    }
}
</style>
