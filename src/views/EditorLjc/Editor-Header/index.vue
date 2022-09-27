<template>
    <div class="editor-header">
        <div class="header-logo">
            <div class="tab-item logo">
                <img src="@/assets/vue.svg" alt="" />
                <div class="logo">logo</div>
            </div>
        </div>
        <div class="edit-input">
            <el-form label-width="120px">
                <el-form-item label="填写文章标题">
                    <el-input
                        v-model="titleKey"
                        class="w-50 m-2"
                        size="large"
                        placeholder="请输入文章标题"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="selectValue" class="m-2" placeholder="Select" size="large">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="custom-avatar">
            <custom-avatar></custom-avatar>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CustomAvatar from '@/components/Header/Avatar/index.vue'
import { join } from 'path/posix'
import { ref, defineProps, computed } from 'vue'
interface Props {
    headerData?: {
        titleKey: string
        selectValue: string
    }
}
const props = withDefaults(defineProps<Props>(), {
    headerData: () => ({
        titleKey: '',
        selectValue: ''
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
        newVal.selectValue = val
        emit('update:headerData', newVal)
    }
})

interface Iopt {
    label: string
    value: string | number
}
const options: Iopt[] = [
    {
        value: 'Option1',
        label: 'Option1'
    },
    {
        value: 'Option2',
        label: 'Option2'
    },
    {
        value: 'Option3',
        label: 'Option3'
    },
    {
        value: 'Option4',
        label: 'Option4'
    },
    {
        value: 'Option5',
        label: 'Option5'
    }
]
</script>

<style lang="scss" scoped>
.editor-header {
    width: 100%;
    min-height: 20px; /* px-to-viewport-ignore */
    height: 30px;
    box-sizing: border-box;
    // padding: 0 $pad-page;
    background-color: rgba(250, 250, 250, 1);
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
            justify-content: center;
        }
        .el-form-item {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            margin-left: 20px;
            margin-bottom: 0;
        }
    }

    .custom-avatar {
        display: flex;
        flex-direction: row-reverse;
    }

    .tab-item.logo {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
    }
}
</style>
