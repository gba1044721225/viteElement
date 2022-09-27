import type { RouteRecordRaw } from 'vue-router'
const Message: RouteRecordRaw = {
    path: 'message',
    component: () => import('@/views/Message/index.vue'),
    meta: {
        title: '留言',
        id: 'message'
    },
    name: 'message'
}

export default Message
