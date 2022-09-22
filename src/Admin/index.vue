<template>
    <div class="body">
        <div class="main">
            <custom-switch></custom-switch>
            <sign-in></sign-in>
            <sign-up></sign-up>
        </div>
    </div>
</template>

<script setup lang="ts" name="Login">
import CustomSwitch from '@/Admin/components/Switch/index.vue'
import SignIn from '@/Admin/components/Sign_in/index.vue'
import SignUp from '@/Admin/components/Sign_up/index.vue'
import emitter from '@/utils/mitter'

onBeforeUnmount(() => {
    console.log('清理')
    emitter.all.clear()
})
</script>

<style scoped lang="scss">
@import './components/login.scss';
</style>

function defineOptions(arg0: { name: string }) { throw new Error('Function not implemented.') }
