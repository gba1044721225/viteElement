import type { RouteRecordRaw } from 'vue-router'
const Tools: RouteRecordRaw = {
    path: 'tools',
    component: () => import('@/views/Tools/index.vue'),
    meta: {
        title: '工具',
        id: 'tools'
    },
    name: 'tools'
}

export default Tools
