import type { RouteRecordRaw } from 'vue-router'
const EditorLjc: RouteRecordRaw = {
    path: '/editorLjc',
    component: () => import('@/views/EditorLjc/index.vue'),
    meta: {
        title: '编辑文章'
    }
}

export default EditorLjc
