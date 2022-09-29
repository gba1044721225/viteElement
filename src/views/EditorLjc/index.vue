<template>
    <div class="editor-ljc">
        <layout-header></layout-header>
        <div class="editor-box">
            <!-- {{ headerData }} -->
            <editor-header v-model:headerData="headerData"></editor-header>
            <div style="border: 1px solid #ccc">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    ref="editor"
                    style="height: 500px; overflow-y: hidden"
                    v-model="valueHtml"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="handleCreated"
                />
            </div>
            <div class="editor-btns">
                <el-button type="primary" @click="reqAddArticle">
                    发布<el-icon class="el-icon--right"><Check /></el-icon>
                </el-button>

                <el-button type="primary" :icon="Delete" @click="openDelete" />

                <el-button type="primary" @click="saveEditHtml">
                    暂存<el-icon class="el-icon--right"><Upload /></el-icon>
                </el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import EditorHeader from './Editor-Header/index.vue'
import LayoutHeader from '@/views/LayoutHeader/index.vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { myReq } from '@/api/instanceReq'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Check, Delete } from '@element-plus/icons-vue'
import { useEditorStore, useLoginStore } from '@/store/index'
import type { Action } from 'element-plus'
const edStore = useEditorStore()
const lgStore = useLoginStore()
interface IheaderData {
    titleKey: string
    selectValue: {
        value: string | number
        type: string
    }
}
const headerData = ref<IheaderData>({
    titleKey: '',
    selectValue: {
        value: '',
        type: ''
    }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
    valueHtml.value = edStore.editorHtml
})

const toolbarConfig = {
    excludeKeys: ['group-video']
}

const editorConfig = {
    placeholder: '开始编辑文章...',
    MENU_CONF: {
        uploadImage: {
            server: '/api/sys-file/upload/1',
            fieldName: 'file',
            customInsert(res: any, insertFn: (url: string, alt: string, href: string) => void) {
                console.log(res, 'res')
                // TS 语法
                // customInsert(res, insertFn) {                  // JS 语法
                // res 即服务端的返回结果

                // 从 res 中找到 url alt href ，然后插入图片
                insertFn(res.data.url, '哈哈', 'http://www.bootstrapmb.com/chajian/canvas')
            }
        }
    }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    saveEditHtml()

    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

const mode = 'default' // 'default' 或 'simple'

// 获取Html测试
const saveEditHtml = () => {
    // console.log(editorRef.value.getHtml())
    edStore.editorHtml = editorRef.value.getHtml()
}

// 打开删除询问框
const openDelete = () => {
    ElMessageBox.alert('是否清空文章内容', '警告', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确认',
        callback: (action: Action) => {
            valueHtml.value = ''
        }
    })
}

// 添加文章
const reqAddArticle = () => {
    if (headerData.value.selectValue.value === '') {
        ElMessage({
            message: '请选择文章类别',
            grouping: true,
            customClass: 'el-custom-fail',
            offset: 40
        })
        return
    }

    if (headerData.value.titleKey === '') {
        ElMessage({
            message: '请填写文章标题',
            grouping: true,
            customClass: 'el-custom-fail',
            offset: 40
        })
        return
    }

    const data = {
        data: {
            articleId: '',
            content: editorRef.value.getHtml(),
            flag: '',
            modifyTime: new Date(),
            title: headerData.value.titleKey,
            topicId: headerData.value.selectValue.value,
            type: headerData.value.selectValue.type
        },
        meta: {
            from: 'P',
            token: lgStore.token
        }
    }
    myReq
        .request({
            method: 'POST',
            url: 'article/add',
            data
        })
        .then((res) => {
            console.log(res)
        })
}
</script>

<style lang="scss" scoped>
.editor-ljc {
    min-height: 100vh;

    .editor-box {
        margin-top: 7px;
    }

    .editor-btns {
        margin-top: 20px;
        display: flex;
        flex-direction: row-reverse;
        .el-button {
            margin: 0 20px;
        }
    }
}
</style>
