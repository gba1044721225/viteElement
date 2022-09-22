<template>
    <div class="body">
        <div class="main">
            <custom-switch></custom-switch>
            <sign-in v-model:img="code"></sign-in>
            <sign-up></sign-up>
        </div>
    </div>
</template>

<script setup lang="ts" name="Login">
import CustomSwitch from '@/Admin/components/Switch/index.vue'
import SignIn from '@/Admin/components/Sign_in/index.vue'
import SignUp from '@/Admin/components/Sign_up/index.vue'
import emitter from '@/utils/mitter'
import { useLoginStore } from '@/store/index'
import { onMounted, ref } from 'vue'
const store = useLoginStore()
const code = ref<string>('gaga')
watch(code, (nw) => {
    console.log(nw, '11111')
})
onMounted(() => {
    store.getCode().then((res) => {
        code.value = res
        console.log(code.value)
    })
})
onBeforeUnmount(() => {
    console.log('清理')
    emitter.all.clear()
})
</script>

<style scoped lang="scss">
@import './components/login.scss';
</style>

function defineOptions(arg0: { name: string }) { throw new Error('Function not implemented.') }
