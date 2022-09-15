import { createApp } from 'vue'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style.css'
import router from '@/router'

import { myReq } from '@/api/instanceReq'
myReq
    .request({
        method: 'POST',
        url: '/sys-user/create',
        data: JSON.stringify({
            data: {
                createTime: '2022-09-15T10:03:17.249Z',
                email: 'string',
                imgId: 0,
                modifyTime: '2022-09-15T10:03:17.249Z',
                name: 'string',
                password: 'string',
                phone: 'string',
                signature: 'string',
                userId: 0
            },
            meta: {
                code: 'string',
                description: {},
                from: 'string',
                serverity: 'string',
                tocken: 'string'
            }
        })
    })
    .then((res) => {
        console.log(res)
    })

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.mount('#app')
