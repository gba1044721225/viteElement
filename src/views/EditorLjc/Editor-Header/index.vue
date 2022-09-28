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
                            :value="item.value"
                            v-for="item in options"
                            :key="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
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
