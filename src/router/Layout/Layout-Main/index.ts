import Home from './Home'
import Category from './Category'
import Theme from './Theme'
import Tools from './Tools'
import Message from './Message'
import Sharing from './Sharing'
import type { RouteRecordRaw } from 'vue-router'
const LayoutMain: RouteRecordRaw = {
    path: 'layout-main',
    component: () => import('@/views/LayoutMain/index.vue'),
    children: [
        {
            path: '',
            redirect: '/layout/layout-main/home'
        },
        Home,
        Category,
        Theme,
        Tools,
        Message,
        Sharing
    ]
}

export default LayoutMain
