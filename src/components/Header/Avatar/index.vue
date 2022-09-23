<template>
    <div class="custom-avatar" v-if="store.token">
        <el-dropdown>
            <el-avatar
                size="large"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="(item, index) in avatarList" :key="index">
                        <div @click="item.handler">
                            {{ item.label }}
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useLoginStore } from '@/store/index'
const store = useLoginStore()
const avatarList = reactive([
    {
        label: '退出',
        value: 'logout',
        handler: () => {
            store.token = ''
        }
    }
])
</script>

<style lang="scss" scoped>
.custom-avatar {
    width: 267px;
    display: flex;
    align-items: center;
    cursor: pointer;

    :deep(.el-avatar) {
        width: 60px;
        height: 60px;
        img {
            width: 60px;
            height: 60px;
        }
    }
}
</style>
