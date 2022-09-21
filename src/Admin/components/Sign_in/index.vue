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
            <a class="form__link">忘记密码了吗?</a>
            <button class="form__button button submit" @click="reqLogin">登录</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import useEmitter from '@/utils/mitter.js'
import { myReq } from '@/api/instanceReq/index'
import type { Idata } from '@/api/type/index'
const emitter = useEmitter()
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
const loginData = reactive({
    password: '',
    phone: '',
    verifyCode: '',
    verifyType: 'P'
})
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
            console.log(11111)
            console.log(res.data.meta)
            if (res.data.meta.code === 200) {
                ElMessage({
                    message: '注册成功',
                    grouping: true,
                    customClass: 'el-custom-succ',
                    offset: 40
                })
            } else {
                ElMessage({
                    message: res.data.meta.description,
                    grouping: true,
                    customClass: 'el-custom-fail',
                    offset: 40
                })
            }
        })
}

onMounted(() => {
    const aContainer = document.querySelector('#b-container') as any
    emitter.on('change', (isOpen: boolean) => {
        console.log(isOpen)
        if (!isOpen) {
            aContainer.classList.remove('is-txl')
            aContainer.classList.remove('is-z200')
        } else {
            aContainer.classList.add('is-txl')
            aContainer.classList.add('is-z200')
        }
    })
})
</script>

<style scoped lang="scss">
@import '../login.scss';
</style>
