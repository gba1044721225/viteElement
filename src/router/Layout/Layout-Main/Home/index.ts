import HomeTabs from './HomeTabs'
import type { RouteRecordRaw } from 'vue-router'
const Home: RouteRecordRaw = {
    path: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
        title: '首页',
        id: 'home'
    },
    children: [
        {
            path: '',
            redirect: '/layout/layout-main/home/news'
        },
        ...HomeTabs
    ],
    name: 'home'
}

export default Home
