import type { RouteRecordRaw } from 'vue-router'
const Archives: RouteRecordRaw = {
    path: '/archives',
    component: () => import('@/views/Archives/index.vue'),
    meta: {
        title: '个人主页'
    }
}

export default Archives
