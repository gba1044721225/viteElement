import { defineStore } from 'pinia'
import { myReq } from '@/api/instanceReq/index'
import { getStorageFromKey } from '@/utils/storage/config'

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
    state: () => {
        // const keyPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        // const keyNum = 8
        // let text = ''
        // for (let i = 0; i < keyNum; i++) {
        //     text += keyPool[Math.floor(Math.random() * 62)]
        // }
        return {
            signUp: {
                name: '',
                phone: '',
                email: '',
                password: ''
            },
            signUpCode: 500,
            token: getStorageFromKey('token'),
            imgSrc: JSON.parse(getStorageFromKey('loginData')).imgUrl,
            from: '',
            key: ''
        }
    },
    getters: {},
    actions: {
        actGetRandomKey() {
            // console.log(1111111)
            const keyPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
            const keyNum = 8
            let text = ''
            for (let i = 0; i < keyNum; i++) {
                text += keyPool[Math.floor(Math.random() * 62)]
            }
            // console.log(text)
            this.key = text
            // console.log(this.key)
        },
        async getCode() {
            this.actGetRandomKey()
            return myReq.request({
                method: 'GET',
                url: 'sys-user/randomImage/' + this.key
            })
        }
    }
})

export const useEditorStore = defineStore('EditorLjc', {
    state: () => {
        return {
            editorHtml: ''
        }
    }
})
