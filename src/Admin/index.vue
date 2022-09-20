<template>
    <div class="body">
        <div class="main">
            <custom-switch></custom-switch>
            <sign-in></sign-in>
            <sign-up></sign-up>
        </div>
    </div>
</template>

<script setup lang="ts">
import CustomSwitch from '@/Admin/components/Switch/index.vue'
import SignIn from '@/Admin/components/Sign_in/index.vue'
import SignUp from '@/Admin/components/Sign_up/index.vue'
</script>

<style scoped lang="scss">
@import './components/login.scss';
</style>
