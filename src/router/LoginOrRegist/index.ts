import type { RouteRecordRaw } from 'vue-router'
const LoginOrRegist: RouteRecordRaw = {
    path: '/login/:id(\\W*|\\w*)*',
    component: () => import('@/Admin/index.vue'),
    meta: {
        title: '登录/注册'
    }
}

export default LoginOrRegist
