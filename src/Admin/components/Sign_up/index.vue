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
            <input class="form__input" type="text" placeholder="账号" />
            <input class="form__input" type="text" placeholder="邮件" />
            <input class="form__input" type="password" placeholder="密码" />
            <button class="form__button button submit">注册</button>
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
        const bContainer = document.querySelector('#a-container') as any
        if (isOpen) {
            bContainer.classList.add('is-txl')
            bContainer.classList.remove('is-z200')
        } else {
            bContainer.classList.remove('is-txl')
            bContainer.classList.add('is-z200')
        }
    })
})
</script>
<style scoped lang="scss">
@import '../login.scss';
</style>
