<template>
    <div class="switch" id="switch-cnt">
        <div class="switch__circle"></div>
        <div class="switch__circle switch__circle--t"></div>
        <div class="switch__container" id="switch-c1">
            <h2 class="switch__title title">欢迎回来!</h2>
            <p class="switch__description description">
                为了与我们保持联系，请使用您的个人信息登录
            </p>
            <button class="switch__button button switch-btn" @click="change">登录</button>
        </div>
        <div class="switch__container is-hidden" id="switch-c2">
            <h2 class="switch__title title">朋友,你好呀!</h2>
            <p class="switch__description description">输入您的个人信息，开始我们的旅程</p>
            <button class="switch__button button switch-btn" @click="change">注册</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import useEmitter from '@/utils/mitter'
import { useLoginStore } from '@/store/index'
const sidebarOpen = ref(false)
const emitter = useEmitter()
const store = useLoginStore()
const change = () => {
    const switchC1 = document.querySelector('#switch-c1') as any
    const switchC2 = document.querySelector('#switch-c2') as any
    const switchCircle = document.querySelectorAll('.switch__circle') as any
    const switchCtn = document.querySelector('#switch-cnt') as any
    switchCtn.classList.add('is-gx')
    sidebarOpen.value = !sidebarOpen.value
    emitter.emit('change', sidebarOpen.value)
    nextTick(() => {
        switchCtn.classList.remove('is-gx')
    })
    switchCtn.classList.toggle('is-txr')
    switchCircle[0].classList.toggle('is-txr')
    switchCircle[1].classList.toggle('is-txr')
    switchC1.classList.toggle('is-hidden')
    switchC2.classList.toggle('is-hidden')
}

onMounted(() => {
    console.log(store.from)
    console.log(store.from)
    if (store.from === 'regist') {
        return
    }
    if (store.from === 'login') {
        nextTick(() => {
            change()
        })
    }
})
</script>

<style scoped lang="scss">
@import '../login.scss';
</style>
