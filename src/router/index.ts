import { createRouter, createWebHistory } from 'vue-router'
import type { Router, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '',
        redirect: '/layout'
    },
    {
        path: '/layout',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '',
                redirect: '/layout/layout-main'
            },
            {
                path: 'layout-main',
                component: () => import('@/views/LayoutMain/index.vue'),
                meta: {
                    title: '首页'
                },
                children: [
                    {
                        path: '',
                        redirect: '/layout/layout-main/home'
                    },
                    {
                        path: 'home',
                        component: () => import('@/views/Home/index.vue'),
                        children: [
                            {
                                path: '',
                                redirect: '/layout/layout-main/home/news'
                            },
                            {
                                path: 'news',
                                component: () => import('@/views/Recommendation/News/index.vue')
                            },
                            {
                                path: 'database',
                                component: () => import('@/views/Recommendation/Database/index.vue')
                            },
                            {
                                path: 'front-end',
                                component: () => import('@/views/Recommendation/FrontEnd/index.vue')
                            },
                            {
                                path: 'back-end',
                                component: () => import('@/views/Recommendation/Backend/index.vue')
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/test',
        component: () => import('@/views/EditorLjc/index.vue')
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
