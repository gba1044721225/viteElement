<template>
    <div class="custom-avatar" v-if="store.token">
        <el-dropdown>
            <el-avatar :src="store.imgUrl" />
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
import { useRouter } from 'vue-router'
import { removeStorageFromKey } from '@/utils/storage/config'
import { myReq } from '@/api/instanceReq/index'
const store = useLoginStore()
const router = useRouter()
const avatarList = reactive([
    {
        label: '编辑文章',
        value: 'logout',
        handler: () => {
            router.push({
                path: '/editorLjc'
            })
        }
    },
    {
        label: '个人主页',
        value: 'archives',
        handler: () => {
            router.push({
                path: '/archives'
            })
        }
    },
    {
        label: '退出登录',
        value: 'logout',
        handler: () => {
            myReq
                .request({
                    method: 'POST',
                    url: '/sys-user/logout',
                    data: {
                        meta: {
                            from: 'P',
                            token: store.token
                        }
                    }
                })
                .then((res) => {
                    // console.log('退出', res)
                    store.token = ''
                    removeStorageFromKey('token')
                    if (res.meta.code === '200') {
                        ElMessage({
                            message: res.meta.description,
                            grouping: true,
                            customClass: 'el-custom-succ',
                            offset: 40,
                            duration: 1500,
                            onClose: () => {
                                router.push('/layout')
                            }
                        })
                    } else {
                        ElMessage({
                            message: res.meta.description,
                            grouping: true,
                            customClass: 'el-custom-fail',
                            offset: 40
                        })
                    }
                })
            // store.token = ''
            // removeStorageFromKey('token')
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
