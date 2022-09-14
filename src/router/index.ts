import { createRouter, createWebHistory } from 'vue-router'
import type { Router, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '',
        redirect: '/layout'
    },
    {
        path: '/layout',
        component: () => import('@/layout/index.vue')
        // children: [
        //     {
        //         path: '',
        //         redirect: '/layout/home'
        //     },
        //     {
        //         path: 'news',
        //         component: () => import('@/views/Recommendation/News/index.vue'),
        //         meta: {
        //             title: '首页'
        //         }
        //     }
        // ]
    }
]

const router: Router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from) => {
    console.log(to, 'to')
    document.title = <string>to.meta.title
})

export default router
