<template>
    <div class="container a-container" id="a-container">
        <form class="form" id="a-form">
            <h2 class="form_title title">创建账户</h2>
            <div class="form__icons">
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
            </div>
            <!-- <span class="form__span">或使用电子邮件进行注册</span> -->
            <span class="form__span">请您填写注册信息</span>
            <input class="form__input" v-model="registData.name" type="text" placeholder="账号" />
            <input class="form__input" v-model="registData.phone" type="text" placeholder="电话" />
            <input class="form__input" v-model="registData.email" type="text" placeholder="邮箱" />
            <input
                class="form__input"
                v-model="registData.password"
                type="password"
                autocomplete="off"
                placeholder="密码"
            />
            <div class="code-input">
                <input
                    class="form__input"
                    v-model="registData.code"
                    type="text"
                    placeholder="验证码"
                />
                <img @click="getCode" :src="imgSrc" alt="" />
            </div>
            <button class="form__button button submit" @click.stop.prevent="getRegist">注册</button>
        </form>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import emitter from '@/utils/mitter.js'
import { useLoginStore } from '@/store/index'
import { myReq } from '@/api/instanceReq/index'
import { verifyPhone, verifyName, verifyPassword, verifyEmail } from '@/utils/verify'
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
interface IRegist {
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
const imgSrc = computed({
    get() {
        return props.img
    },
    set(val) {
        emit('update:img', val)
    }
})
const registData = reactive({
    code: '',
    email: '',
    imgId: 0,
    key: '',
    name: '',
    password: '',
    phone: ''
})
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
const getRegist = () => {
    if (!verifyName(registData.name)) {
        ElMessage({
            message: '用户名格式不对',
            type: 'warning'
        })
        return
    }

    if (!verifyPhone(registData.phone)) {
        ElMessage({
            message: '手机号码格式不对',
            type: 'warning'
        })
        return
    }

    if (!verifyEmail(registData.email)) {
        ElMessage({
            message: '邮箱格式不对',
            type: 'warning'
        })
        return
    }

    if (!verifyPassword(registData.password)) {
        ElMessage({
            message: '密码格式不对',
            type: 'warning'
        })
        return
    }

    const data = {
        ...registData,
        key: store.key
    }
    console.log(data)
    myReq
        .request<Idata<IRegist>>({
            method: 'POST',
            url: '/sys-user/create',
            data: {
                data,
                meta: {
                    from: 'P',
                    token: ''
                }
            }
        })
        .then((res) => {
            console.log(res.data)
            if (res.data.meta.code === '200') {
                ElMessage({
                    message: res.data.meta.description,
                    grouping: true,
                    customClass: 'el-custom-succ',
                    offset: 40
                })
                store.signUpCode = 200
                emitter.emit('registSucc', { code: 200 })
                getCode()
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

const initRegistData = () => {
    registData.name = store.signUp.name
    registData.phone = store.signUp.phone
    registData.email = store.signUp.email
    registData.password = store.signUp.password
    store.signUpCode = 500
}

watch(
    () => ({ ...registData }),
    (nw) => {
        // console.log('nw', nw)
        store.signUp = {
            name: nw.name,
            phone: nw.phone,
            email: nw.email,
            password: nw.password
        }
    }
)

onMounted(() => {
    initRegistData()

    emitter.on('change', (isOpen: boolean) => {
        // console.log(isOpen, '111111')
        const bContainer = document.querySelector('#a-container') as any
        if (isOpen) {
            bContainer.classList.add('is-txl')
            bContainer.classList.remove('is-z200')
        } else {
            // getCode()
            bContainer.classList.remove('is-txl')
            bContainer.classList.add('is-z200')
        }
    })
})
</script>
<style scoped lang="scss">
@import '../login.scss';
</style>
