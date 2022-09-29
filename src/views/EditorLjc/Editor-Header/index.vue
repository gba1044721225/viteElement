<template>
    <div class="editor-header">
        <div class="edit-input">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="文章标题">
                    <el-input v-model="titleKey" placeholder="Approved by" />
                </el-form-item>
                <el-form-item label="文章类别">
                    <el-select v-model="selectValue" placeholder="Activity zone">
                        <el-option
                            :label="item.label"
                            :value="item.selectValue"
                            v-for="item in options"
                            :key="item.selectValue.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue'
import { myReq } from '@/api/instanceReq'
import { useEditorStore, useLoginStore } from '@/store/index'
const edStore = useEditorStore()
const lgStore = useLoginStore()
interface Props {
    headerData?: {
        titleKey: string
        selectValue: {
            type: string
            value: string | number
        }
    }
}
const props = withDefaults(defineProps<Props>(), {
    headerData: () => ({
        titleKey: '',
        selectValue: {
            type: '',
            value: ''
        }
    })
})

const emit = defineEmits<{
    (e: 'update:headerData', val: any): void
}>()

const titleKey = computed({
    get() {
        return props.headerData.titleKey
    },
    set(val) {
        console.log(val)
        const newVal = JSON.parse(JSON.stringify(props.headerData))
        newVal.titleKey = val
        emit('update:headerData', newVal)
    }
})

const selectValue = computed({
    get() {
        return props.headerData.selectValue
    },
    set(val) {
        console.log(val)
        const newVal = JSON.parse(JSON.stringify(props.headerData))
        console.log(newVal)
        newVal.selectValue = val
        emit('update:headerData', newVal)
    }
})

interface Iopt {
    label: string
    selectValue: {
        value: string | number
        type: string
    }
}
const options = ref<Iopt[]>()

// 获取所有分类和专题
const reqGetCategory = () => {
    myReq
        .request({
            method: 'POST',
            url: 'article/list/category',
            data: {
                data: '',
                meta: {
                    from: 'P',
                    token: lgStore.token
                }
            }
        })
        .then((res) => {
            options.value = []
            // console.log('res', res.data.categotys)
            if (res.meta.code === '200') {
                res.data.categotys.forEach(
                    (v: { topicName: string; topicId: string; type: string }) => {
                        const obj = {
                            label: '',
                            selectValue: {
                                value: '',
                                type: ''
                            }
                        }
                        obj.label = v.topicName
                        obj.selectValue.value = v.topicId
                        obj.selectValue.type = v.type
                        if (options.value) {
                            options.value?.push(obj)
                        }
                    }
                )
            }
        })
}

onMounted(() => {
    reqGetCategory()
})
</script>

<style lang="scss" scoped>
.editor-header {
    width: 100%;
    min-height: 40px; /* px-to-viewport-ignore */
    height: 50px;
    box-sizing: border-box;
    background-color: rgba(250, 250, 250, 1);
    margin-bottom: 5px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    .edit-input {
        flex: 1;
        .el-form {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            // justify-content: center;
        }
        .el-form-item {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            margin-left: 20px;
            margin-bottom: 0;
        }
    }
}
</style>
