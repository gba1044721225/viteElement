import { defineStore } from 'pinia'
export const useTabStore = defineStore('headerTab', {
    // other options...
    state: () => ({
        tabList: [
            {
                isActive: false,
                id: 'home',
                label: '首页'
            },
            {
                isActive: false,
                id: 'category',
                label: '分类'
            },
            {
                isActive: false,
                id: 'theme',
                label: '主题'
            },
            {
                isActive: false,
                id: 'tools',
                label: '工具'
            },
            {
                isActive: false,
                id: 'message',
                label: '留言'
            },
            {
                isActive: false,
                id: 'sharing',
                label: '分享'
            }
        ]
    })
})

export const useLoginStore = defineStore('headerLogin', {
    state: () => ({
        token: '',
        usrName: '',
        usrPwd: '',
        from: ''
    }),
    actions: {}
})
