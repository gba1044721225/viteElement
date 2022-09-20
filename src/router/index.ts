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
                children: [
                    {
                        path: '',
                        redirect: '/layout/layout-main/home'
                    },
                    {
                        path: 'home',
                        component: () => import('@/views/Home/index.vue'),
                        meta: {
                            title: '首页'
                        },
                        children: [
                            {
                                path: '',
                                redirect: '/layout/layout-main/home/news'
                            },
                            {
                                path: 'news',
                                component: () =>
                                    import('@/views/Home/Recommendation/News/index.vue')
                            },
                            {
                                path: 'database',
                                component: () =>
                                    import('@/views/Home/Recommendation/Database/index.vue')
                            },
                            {
                                path: 'front-end',
                                component: () =>
                                    import('@/views/Home/Recommendation/FrontEnd/index.vue')
                            },
                            {
                                path: 'back-end',
                                component: () =>
                                    import('@/views/Home/Recommendation/Backend/index.vue')
                            }
                        ]
                    },
                    {
                        path: 'Category',
                        component: () => import('@/views/Category/index.vue'),
                        meta: {
                            title: '分类'
                        }
                    },
                    {
                        path: 'theme',
                        component: () => import('@/views/Theme/index.vue'),
                        meta: {
                            title: '主题'
                        }
                    },
                    {
                        path: 'tools',
                        component: () => import('@/views/Tools/index.vue'),
                        meta: {
                            title: '工具'
                        }
                    },
                    {
                        path: 'message',
                        component: () => import('@/views/Message/index.vue'),
                        meta: {
                            title: '留言'
                        }
                    },
                    {
                        path: 'sharing',
                        component: () => import('@/views/Sharing/index.vue'),
                        meta: {
                            title: '分享'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/login/:id(\\W*|\\w*)*',
        component: () => import('@/Admin/index.vue'),
        meta: {
            title: '登录/注册'
        }
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
