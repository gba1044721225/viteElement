import type { RouteRecordRaw } from 'vue-router'
const Theme: RouteRecordRaw = {
    path: 'theme',
    component: () => import('@/views/Theme/index.vue'),
    meta: {
        title: '主题',
        id: 'theme'
    },
    name: 'theme'
}

export default Theme
