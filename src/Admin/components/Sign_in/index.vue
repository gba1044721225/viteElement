<template>
    <div class="container b-container" id="b-container">
        <form class="form" id="b-form" method="" action="">
            <h2 class="form_title title">Sign in to Website</h2>
            <div class="form__icons">
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
            </div>
            <span class="form__span">or use your email account</span>
            <input class="form__input" type="text" placeholder="用户名" />
            <input class="form__input" type="password" placeholder="密码" />
            <a class="form__link">Forgot your password?</a>
            <button class="form__button button submit">SIGN IN</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useEmitter from '@/utils/mitter.js'

const emitter = useEmitter()
onMounted(() => {
    emitter.on('change', (isOpen: boolean) => {
        console.log(isOpen)
        if (!isOpen) {
            const aContainer = document.querySelector('#b-container') as any
            aContainer.classList.toggle('is-txl')
        }
    })
})
</script>

<style scoped lang="scss">
@import '../login.scss';
</style>
