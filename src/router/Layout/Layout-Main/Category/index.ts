import type { RouteRecordRaw } from 'vue-router'
const Category: RouteRecordRaw = {
    path: 'Category',
    component: () => import('@/views/Category/index.vue'),
    meta: {
        title: '分类',
        id: 'category'
    },
    name: 'category'
}

export default Category
