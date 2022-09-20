<template>
    <div class="container a-container" id="a-container">
        <form class="form" id="a-form" method="" action="">
            <h2 class="form_title title">创建账户</h2>
            <div class="form__icons">
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
            </div>
            <span class="form__span">或使用电子邮件进行注册</span>
            <input class="form__input" type="text" placeholder="Name" />
            <input class="form__input" type="text" placeholder="Email" />
            <input class="form__input" type="password" placeholder="Password" />
            <button class="form__button button submit">SIGN UP</button>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useEmitter from '@/utils/mitter.js'

const emitter = useEmitter()
onMounted(() => {
    emitter.on('change', (isOpen: boolean) => {
        console.log(isOpen)
        if (isOpen) {
            const bContainer = document.querySelector('#a-container') as any
            bContainer.classList.toggle('is-txl')
            bContainer.classList.toggle('is-z200')
        }
    })
})
</script>
<style scoped lang="scss">
@import '../login.scss';
</style>
