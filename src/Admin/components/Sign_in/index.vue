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
import { setStorage, getStorageFromKey } from '@/utils/storage/config'
import { ElMessage } from 'element-plus'

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
    store.getCode().then((res) => {
        imgSrc.value = res.data
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

    if (loginData.verifyCode === '') {
        ElMessage({
            message: '验证码不能为空',
            type: 'warning'
        })
        return
    }

    const data = {
        ...loginData,
        key: store.key
    }
    console.log('登录data', data)
    myReq
        .request({
            method: 'POST',
            url: '/sys-user/login',
            data: {
                data,
                meta: {
                    from: 'P',
                    token: ''
                }
            }
        })
        .then((res) => {
            getCode()
            if (res.meta.code === '200') {
                console.log('登录信息', res)
                ElMessage({
                    message: res.meta.description,
                    grouping: true,
                    customClass: 'el-custom-succ',
                    offset: 40,
                    duration: 1500,
                    onClose: () => {
                        // console.log(history.state.back)
                        if (history.state.back) {
                            router.go(-1)
                        } else {
                            router.push('/layout')
                        }
                    }
                })
                store.token = res.meta.tocken ?? ''
                console.log(
                    JSON.stringify({
                        ...res.data
                    })
                )
                setStorage(
                    'loginData',
                    JSON.stringify({
                        ...res.data
                    })
                )
                setStorage('token', res.meta.tocken)
            } else {
                ElMessage({
                    message: res.meta.description,
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
    // console.log(getStorageFromKey('loginData'))
    if (getStorageFromKey('loginData')) {
        console.log(getStorageFromKey('loginData'))
        loginData.phone = JSON.parse(getStorageFromKey('loginData')).phone
        // loginData.password = JSON.parse(getStorageFromKey('loginData')).password
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
