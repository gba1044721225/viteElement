<template>
    <div class="custom-input">
        <el-input
            v-model="customInput"
            placeholder="请输入搜索关键字"
            class="w-50 m-2"
            :suffix-icon="Search"
        />
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const customInput = ref<string>('')
</script>

<style lang="scss" scoped>
.custom-input {
    // height: 70px;
    display: flex;
    align-items: center;
}
</style>
