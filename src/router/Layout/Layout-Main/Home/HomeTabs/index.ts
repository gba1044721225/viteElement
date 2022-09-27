import { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw[]>[
    {
        path: '',
        redirect: '/layout/layout-main/home/news'
    },
    {
        path: 'news',
        component: () => import('@/views/Home/Recommendation/News/index.vue')
    },
    {
        path: 'database',
        component: () => import('@/views/Home/Recommendation/Database/index.vue')
    },
    {
        path: 'front-end',
        component: () => import('@/views/Home/Recommendation/FrontEnd/index.vue')
    },
    {
        path: 'back-end',
        component: () => import('@/views/Home/Recommendation/Backend/index.vue')
    }
]
