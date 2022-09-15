<template>
    <div class="recommendation">
        <div class="grid-left">
            <div class="custom-link">
                <!-- v-slot="{ isActive, href, navigate }" -->
                <el-row>
                    <el-col
                        :span="routerItem.label.length"
                        v-for="routerItem in routeList"
                        :key="routerItem.path"
                    >
                        <router-link custom :to="routerItem.path" v-slot="{ navigate }">
                            <el-button type="primary" plain link @click="navigate">
                                {{ routerItem.label }}
                            </el-button>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
            <router-view></router-view>
        </div>
        <div class="grid-right">
            <div class="title-right">热门文章</div>
            <article-right></article-right>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArticleRight from '@/components/ArticleRight/index.vue'
const routeList = reactive([
    {
        path: '/layout/layout-main/home/news',
        label: '最新'
    },
    {
        path: '/layout/layout-main/home/database',
        label: '数据库'
    },
    {
        path: '/layout/layout-main/home/front-end',
        label: '前端'
    },
    {
        path: '/layout/layout-main/home/back-end',
        label: '后端'
    }
])
</script>

<style lang="scss" scoped>
.recommendation {
    display: grid;
    grid-template-columns: calc((100% + $prefecture-card-margin) / 4 * 3 - $prefecture-card-margin) calc(
            (100% + $prefecture-card-margin) / 4
        );
    column-gap: $prefecture-card-margin;
    margin-top: 20px;
    .grid-left {
        .custom-link {
            text-align: center;
            padding: $tab-pad;
            background-color: $prefecture-card-title-color;
        }
        .el-button {
            color: $prefecture-card-myfont-color;
        }
        .el-button:hover {
            color: $prefecture-card-myfont-color-active;
        }
    }
    .grid-right {
        .title-right {
            box-sizing: border-box;
            // padding: $tab-pad;
            background-color: $prefecture-card-title-color;
        }
    }
}
</style>
