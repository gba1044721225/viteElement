<template>
    <el-card>
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
    </el-card>
    <el-card>
        <el-button @click="getEditHtml">获取</el-button>
    </el-card>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { myReq } from '@/api/instanceReq'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
    nextTick(() => {
        // console.log(editorRef.value.getAllMenuKeys())
    })
})

const toolbarConfig = {
    excludeKeys: ['group-video']
}

const editorConfig = {
    placeholder: '请输入内容...',
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
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

// 获取Html测试
const getEditHtml = () => {
    console.log(editorRef.value.getHtml())
}

const mode = 'default' // 'default' 或 'simple'
</script>

<style lang="scss" scoped></style>
