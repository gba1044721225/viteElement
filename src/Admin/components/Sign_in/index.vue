<template>
    <div class="container b-container" id="b-container">
        <form class="form" id="b-form" method="" action="">
            <h2 class="form_title title">登录网站</h2>
            <div class="form__icons">
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
            </div>
            <span class="form__span">或使用您的电子邮件帐户</span>
            <input class="form__input" type="text" placeholder="用户名" />
            <input class="form__input" type="password" placeholder="密码" />
            <a class="form__link">忘记密码了吗?</a>
            <button class="form__button button submit">登录</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useEmitter from '@/utils/mitter.js'

const emitter = useEmitter()

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
