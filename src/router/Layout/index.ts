import LayoutMain from './Layout-Main'
import type { RouteRecordRaw } from 'vue-router'
const Layout: RouteRecordRaw = {
    path: '/layout',
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: '',
            redirect: '/layout/layout-main'
        },
        LayoutMain
    ]
}

export default Layout
