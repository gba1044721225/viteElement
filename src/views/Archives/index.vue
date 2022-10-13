<template>
    <div class="archives">
        <layout-header></layout-header>
        <div class="tabbar">
            <el-card :body-style="{ minHeight: 'calc(100vh - 115px)' }">
                <el-tabs type="border-card">
                    <el-tab-pane
                        v-for="(item, index) in tabPaneList"
                        :label="item.label"
                        :key="index"
                    >
                        <component :is="item.myCpt" :languageList="languageList"></component>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts" name="Archives">
import LayoutHeader from '@/views/LayoutHeader/index.vue'
import MyInfo from '@/views/Archives/MyInfo/index.vue'
import MyArticle from '@/views/Archives/MyArticle/index.vue'
import { shallowRef, onMounted } from 'vue'
import type { Component } from 'vue'
import { useLoginStore } from '@/store/index'
import { encrypt } from '@/utils/storage/encry'
import { getStorageFromKey } from '@/utils/storage/config'
import { myReq } from '@/api/instanceReq/index'

interface Ilanguage {
    label?: string
    value?: string
}
interface ItabPaneList {
    label: string
    myCpt: Component | undefined
}
const tabPaneList = shallowRef<ItabPaneList[]>([
    {
        label: '个人信息',
        myCpt: MyInfo
    },
    {
        label: '我的文章',
        myCpt: MyArticle
    }
    // {
    //     label: '我的关注',
    //     myCpt: MyArticle
    // },
    // {
    //     label: '我的收藏',
    //     myCpt: MyArticle
    // }
])
const languageList = ref()
const store = useLoginStore()
const reqMenuTab = () => {
    myReq
        .request({
            method: 'POST',
            url: `/sys-dict/dict/menu/${encrypt(store.token)}`
        })
        .then((res) => {
            console.log('reqMenuTab', res)
            const arrL: Ilanguage[] = []
            res.data.languages.forEach(
                (v: { dictName: string | undefined; dictVal: string | undefined }) => {
                    const obj: Ilanguage = {}
                    obj.label = v.dictName
                    obj.value = v.dictVal
                    arrL.push(obj)
                }
            )
            languageList.value = arrL
            const arr: ItabPaneList[] = []
            const newTabList = tabPaneList.value
            res.data.menu.forEach((v: { dictName: string; remark: any }) => {
                const obj: ItabPaneList = {
                    label: '',
                    myCpt: undefined
                }
                obj.label = v.dictName
                obj.myCpt = defineAsyncComponent(
                    () => import(`@/views/Archives/${v.remark}/index.vue`)
                )
                arr.push(obj)
            })
            // console.log(arr)
            tabPaneList.value = [...newTabList, ...arr]
            triggerRef(tabPaneList)
            // console.log(tabPaneList.value)
        })
        .catch((err) => {
            console.log('err', err)
        })
}

const init = () => {
    if (JSON.parse(getStorageFromKey('loginData'))) {
        const loginData = JSON.parse(getStorageFromKey('loginData'))
        if (loginData.type === 's') {
            // console.log(1111)
            reqMenuTab()
        }
    }
}

onMounted(() => {
    // console.log(getStorageFromKey('loginData'))

    init()
})
</script>

<style lang="scss" scoped>
.archives {
    background-color: rgba(250, 250, 250, 1);
    min-height: 100vh;
    // padding-bottom: 50px;
    .tabbar {
        width: 1440px;
        margin: 0 auto;

        :deep(.el-tabs__content) {
            min-height: calc(100vh - 250px);
            position: relative;
        }

        :deep(#pane-0) {
            padding-left: 50px;
        }
    }
}
</style>
