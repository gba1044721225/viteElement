import type { RouteRecordRaw } from 'vue-router'
const Sharing: RouteRecordRaw = {
    path: 'sharing',
    component: () => import('@/views/Sharing/index.vue'),
    meta: {
        title: '分享',
        id: 'sharing'
    },
    name: 'sharing'
}

export default Sharing
