<template>
    <div class="container b-container" id="b-container">
        <div class="form" id="b-form" method="" action="">
            <h2 class="form_title title">登录网站</h2>
            <div class="form__icons">
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
            </div>
            <!-- <span class="form__span">或使用您的电子邮件帐户</span> -->
            <span class="form__span">请您填写账号密码</span>
            <input class="form__input" v-model="loginData.phone" type="text" placeholder="手机号" />
            <input
                class="form__input"
                v-model="loginData.password"
                type="password"
                placeholder="密码"
            />
            <div class="code-input">
                <input
                    class="form__input"
                    v-model="loginData.verifyCode"
                    type="text"
                    placeholder="验证码"
                />
                <img @click="getCode" :src="imgSrc" alt="" />
            </div>
            <a class="form__link">忘记密码了吗?</a>
            <button class="form__button button submit" @click="reqLogin">登录</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import emitter from '@/utils/mitter'
import { myReq } from '@/api/instanceReq/index'

import { useLoginStore } from '@/store/index'
import { useRouter } from 'vue-router'
import type { Idata } from '@/api/type/index'
interface Icode {
    data: any
    meta: {
        code?: string | number
        description?: string
        from?: string
        serverity?: string
        tocken?: string
    }
}
interface ILogin {
    data: any
    meta: {
        code?: string | number
        description?: string
        from?: string
        serverity?: string
        tocken?: string
    }
}
const store = useLoginStore()
const imgSrc = ref('')
const loginData = reactive({
    password: '',
    phone: '',
    verifyCode: '',
    verifyType: 'P'
})
const router = useRouter()
const getCode = () => {
    myReq
        .request<Idata<Icode>>({
            method: 'GET',
            url: 'sys-user/randomImage/' + store.key
        })
        .then((res) => {
            // console.log(res.data.data)
            imgSrc.value = res.data.data
        })
}
const reqLogin = () => {
    myReq
        .request<Idata<ILogin>>({
            method: 'POST',
            url: '/sys-user/login',
            data: {
                data: {
                    ...loginData
                },
                meta: {
                    from: 'P',
                    token: ''
                }
            }
        })
        .then((res) => {
            // console.log(11111)
            // console.log(res.data.meta)
            if (res.data.meta.code === '200') {
                ElMessage({
                    message: res.data.meta.description,
                    grouping: true,
                    customClass: 'el-custom-succ',
                    offset: 40,
                    onClose: () => {
                        router.go(-1)
                    }
                })
            } else {
                ElMessage({
                    message: res.data.meta.description,
                    grouping: true,
                    customClass: 'el-custom-fail',
                    offset: 40
                })
                store.actGetRandomKey()
            }
        })
}

const initLoginData = () => {
    store.actGetRandomKey()
    if (store.signUpCode === 200) {
        loginData.phone = store.signUp.phone
        loginData.password = store.signUp.password
    }
}

onMounted(() => {
    initLoginData()

    emitter.on('registSucc', ({ code }) => {
        // console.log('开启')
        // console.log('registSucc', code)
        if (code === 200) {
            if (store.signUpCode === 200) {
                loginData.phone = store.signUp.phone
                loginData.password = store.signUp.password
            }
        }
    })
    const bContainer = document.querySelector('#b-container') as any

    emitter.on('change', (isOpen: boolean) => {
        // console.log(isOpen)
        if (!isOpen) {
            bContainer.classList.remove('is-txl')
            bContainer.classList.remove('is-z200')
        } else {
            // getCode()
            bContainer.classList.add('is-txl')
            bContainer.classList.add('is-z200')
        }
    })
    nextTick(() => {
        console.log('up', bContainer.classList.contains('is-z200'))
    })
})
</script>

<style scoped lang="scss">
@import '../login.scss';
</style>
