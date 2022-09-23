<template>
    <div class="container b-container" id="b-container">
        <form class="form" id="b-form">
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
                autocomplete="off"
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
            <button class="form__button button submit" @click.stop.prevent="reqLogin">登录</button>
            <!-- <el-button @click="getCode">测试</el-button> -->
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import emitter from '@/utils/mitter'
import { myReq } from '@/api/instanceReq/index'
import { useLoginStore } from '@/store/index'
import { useRouter } from 'vue-router'
import { verifyPhone, verifyName, verifyPassword } from '@/utils/verify'
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
interface Props {
    img: string
}
const props = withDefaults(defineProps<Props>(), {
    img: ''
})
const emit = defineEmits<{
    (e: 'update:img', id: string): void
}>()
const store = useLoginStore()
const router = useRouter()
const imgSrc = computed({
    get() {
        return props.img
    },
    set(val) {
        emit('update:img', val)
    }
})
// console.log(imgSrc)
const loginData = reactive({
    password: '',
    phone: '',
    verifyCode: '',
    verifyType: 'P'
})
const getCode = () => {
    myReq
        .request<Idata<Icode>>({
            method: 'GET',
            url: 'sys-user/randomImage/' + store.key
        })
        .then((res) => {
            console.log(res.data.data)
            imgSrc.value = res.data.data
        })
}
const reqLogin = () => {
    if (!verifyPhone(loginData.phone)) {
        ElMessage({
            message: '手机号码格式不对',
            type: 'warning'
        })
        return
    }

    if (!verifyPassword(loginData.password)) {
        ElMessage({
            message: '密码格式不对',
            type: 'warning'
        })
        return
    }

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
            if (res?.data.meta.code === '200') {
                ElMessage({
                    message: res.data.meta.description,
                    grouping: true,
                    customClass: 'el-custom-succ',
                    offset: 40,
                    onClose: () => {
                        router.go(-1)
                    }
                })
                store.token = res.data.meta.tocken ?? ''
                localStorage.setItem(
                    'loginData',
                    JSON.stringify({
                        phone: loginData.phone,
                        password: loginData.password
                    })
                )
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

const initLoginData = () => {
    if (store.signUpCode === 200) {
        loginData.phone = store.signUp.phone
        loginData.password = store.signUp.password
        return
    }

    if (localStorage.getItem('loginData')) {
        loginData.phone = JSON.parse(localStorage.getItem('loginData') as string)!.phone
        loginData.password = JSON.parse(localStorage.getItem('loginData') as string)!.password
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

    emitter.on('change', (isOpen: boolean) => {
        // console.log(isOpen)
        const bContainer = document.querySelector('#b-container') as any
        if (!isOpen) {
            bContainer.classList.remove('is-txl')
            bContainer.classList.remove('is-z200')
        } else {
            bContainer.classList.add('is-txl')
            bContainer.classList.add('is-z200')
        }
    })
})
</script>

<style scoped lang="scss">
@import '../login.scss';
</style>
