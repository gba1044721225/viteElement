import { createApp } from 'vue'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style.css'
import router from '@/router'

// import { myReq } from '@/api/instanceReq'
// myReq
//     .request({
//         method: 'GET',
//         url: '/Student/stu',
//         data: {}
//     })
//     .then((res) => {
//         console.log(res)
//     })

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.mount('#app')
