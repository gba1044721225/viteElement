import { createRouter, createWebHistory } from 'vue-router'
import Layout from './Layout'
import LoginOrRegist from './LoginOrRegist'
import EditorLjc from './EditorLjc'
import type { Router, RouteRecordRaw } from 'vue-router'
const ICLUDE_ROUTES = []
const routes: RouteRecordRaw[] = [
    {
        path: '',
        redirect: '/layout'
    },
    Layout,
    LoginOrRegist,
    EditorLjc
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
