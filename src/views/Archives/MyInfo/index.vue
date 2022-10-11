<template>
    <div class="my-info">
        <el-form ref="form" :model="infoForm" label-width="auto">
            <el-form-item label="我的头像">
                <div v-if="infoForm.imgSrc === ''" class="upload-avatar" @click="openDialog">
                    <el-icon><Plus /></el-icon>
                </div>
                <img
                    class="avatar-box"
                    v-if="infoForm.imgSrc !== ''"
                    :src="infoForm.imgSrc"
                    alt=""
                    @click="openDialog"
                />
                <!-- <div class="my-cropper"></div> -->
            </el-form-item>
            <el-form-item label="昵称">
                <el-input
                    :input-style="infoForm.inputStyle"
                    v-model="infoForm.nickName"
                    placeholder="请输入昵称"
                />
            </el-form-item>
            <el-form-item label="手机号">
                <el-input
                    :input-style="infoForm.inputStyle"
                    v-model="infoForm.phone"
                    placeholder="请输入手机号码"
                />
            </el-form-item>
            <!-- <el-form-item label="工作方向">
                <el-select v-model="infoForm.work" placeholder="请选择您的方向">
                    <el-option
                        v-for="item in infoForm.options"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value"
                    />
                </el-select>
            </el-form-item> -->
            <el-form-item label="邮箱">
                <el-input
                    :input-style="infoForm.inputStyle"
                    v-model="infoForm.email"
                    placeholder="请输入邮箱"
                />
            </el-form-item>
            <el-form-item label="编程语言">
                <el-checkbox-group v-model="infoForm.languageList">
                    <el-checkbox-button
                        v-for="item in languageList"
                        :label="item.value"
                        name="type"
                        :key="item.value"
                    >
                        {{ item.label }}
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="infoForm.sex">
                    <el-radio border label="1"> 男 </el-radio>
                    <el-radio border label="0"> 女 </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="座右铭">
                <el-input
                    :input-style="infoForm.inputStyle"
                    v-model="infoForm.signature"
                    placeholder="请输入座右铭"
                />
            </el-form-item>
            <el-form-item label="新密码">
                <el-input
                    v-model="infoForm.comparePwd"
                    :input-style="infoForm.inputStyle"
                    type="password"
                    autocomplete="off"
                    placeholder="请输入新密码"
                />
            </el-form-item>
            <el-form-item label="新密码">
                <el-input
                    v-model="infoForm.password"
                    :input-style="infoForm.inputStyle"
                    type="password"
                    autocomplete="off"
                    placeholder="请再次输入新密码"
                />
            </el-form-item>
        </el-form>

        <div class="btns form-btn">
            <el-button>取消</el-button>
            <el-button type="primary" @click="reqModify">修改</el-button>
        </div>

        <el-dialog
            v-model="infoForm.dialogFormVisible"
            title="头像选择"
            class="my-dialog"
            :lock-scroll="true"
            :destroy-on-close="true"
            :close-on-click-modal="false"
            @close="closeDialog(0)"
        >
            <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.outputSize"
                :outputType="option.outputType"
                :info="option.info"
                :canScale="option.canScale"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :full="option.full"
                :fixedBox="option.fixedBox"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :centerBox="option.centerBox"
                :height="option.height"
                :infoTrue="option.infoTrue"
                :maxImgSize="option.maxImgSize"
                :enlarge="option.enlarge"
                :mode="option.mode"
                @realTime="realTimeEvent"
            ></vueCropper>
            <div class="dialog-left">
                <div
                    class="show-preview"
                    :style="{
                        width: option.previews.w + 'px',
                        height: option.previews.h + 'px',
                        margin: '5px'
                    }"
                >
                    <div :style="option.previews.div" class="preview">
                        <img :src="option.previews.url" :style="option.previews.img" />
                    </div>
                </div>
                <div class="btns">
                    <el-button type="success" round @click="changePhoto">选择</el-button>
                    <el-button type="primary" round @click="closeDialog(1)">上传</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="MyInfo">
import { reactive, nextTick, ref, onMounted, withDefaults } from 'vue'
// import 'default-passive-events'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { myReq } from '@/api/instanceReq/index'
import { useLoginStore } from '@/store/index'
import { encrypt } from '@/utils/storage/encry'
import { getStorageFromKey } from '@/utils/storage/config'
import { ElMessage } from 'element-plus'
interface Ilanguage {
    [index: string]: string
}
interface Props {
    languageList: Ilanguage[] | never[]
}
const props = withDefaults(defineProps<Props>(), {
    languageList: () => [
        {
            label: '前端',
            value: 'web'
        },
        {
            label: '后端',
            value: 'java'
        }
    ]
})
const cropper = ref()
const infoForm = reactive({
    file: null,
    dialogFormVisible: false,
    inputStyle: {
        width: '196px'
    },
    imgSrc: '',
    imgId: '',
    options: [],
    nickName: '',
    phone: '',
    email: '',
    // work: '',
    // checkboxs: [],
    languageList: [],
    sex: '',
    signature: '',
    comparePwd: '',
    password: ''
})
interface Ioption {
    [index: string]: any
}
const option = reactive<Ioption>({
    img: '', // 裁剪图片的地址
    outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
    outputType: 'jpeg', // 裁剪生成图片的格式（jpeg || png || webp）
    info: true, // 图片大小信息
    canScale: true, // 图片是否允许滚轮缩放
    autoCrop: true, // 是否默认生成截图框
    autoCropWidth: 150, // 默认生成截图框宽度
    autoCropHeight: 150, // 默认生成截图框高度
    fixed: true, // 是否开启截图框宽高固定比例
    fixedNumber: [1, 1], // 截图框的宽高比例
    full: false, // false按原比例裁切图片，不失真
    fixedBox: true, // 固定截图框大小，不允许改变
    canMove: false, // 上传图片是否可以移动
    canMoveBox: true, // 截图框能否拖动
    original: false, // 上传图片按照原始比例渲染
    centerBox: false, // 截图框是否被限制在图片里面
    height: true, // 是否按照设备的dpr 输出等比例图片
    infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
    maxImgSize: 3000, // 限制图片最大宽度和高度
    enlarge: 1, // 图片根据截图框输出比例倍数
    mode: 'contain', // 图片默认渲染方式
    previews: {}
})

const store = useLoginStore()

const changePhoto = async () => {
    const files: any = await uploadFile('image/*', true)
    // console.log(files)
    const windowURL = window.URL || window.webkitURL
    // console.log(windowURL.createObjectURL(files[0]))
    infoForm.dialogFormVisible = true
    // console.log(infoForm.dialogFormVisible)
    nextTick(() => {
        console.log(files[0])
        const srcBlob = windowURL.createObjectURL(files[0])
        // console.log(srcBlob)
        option.img = srcBlob
    })
}

const openDialog = async () => {
    // console.log(infoForm.dialogFormVisible)
    if (infoForm.dialogFormVisible === true) {
        return
    }
    changePhoto()
}

const uploadFile = (accept: string, multiple = false) => {
    return new Promise((resolve) => {
        const elementA = document.createElement('input')
        document.body.appendChild(elementA)
        elementA.type = 'file'
        elementA.setAttribute('accept', accept)

        if (multiple) {
            elementA.multiple = true
        }
        elementA.style.display = 'none'
        elementA.onchange = (e) => {
            // console.log(e)
            if (elementA.files && elementA.files.length > 0) {
                resolve(elementA.files)
            }
        }
        elementA.click()

        document.body.removeChild(elementA)
    })
}

const realTimeEvent = (e: any) => {
    option.previews = e
}

enum Econfirm {
    ok = 1,
    cancel = 0
}

const blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File(
        [theBlob as any], // cast as any
        fileName,
        {
            lastModified: new Date().getTime(),
            type: theBlob.type
        }
    )
}

const reqUpload = () => {
    const formdata = new FormData()
    const file: File = blobToFile(infoForm.file as unknown as Blob, 'avatar' + new Date().getTime())
    // console.log(file, 'file')
    formdata.append('file', file)
    myReq
        .request({
            method: 'POST',
            url: `/sys-file/upload/${encrypt(store.token)}/1`,
            data: formdata,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res)
            if (res.meta.code === '200') {
                infoForm.imgSrc = res.data.url
                infoForm.imgId = res.data.fileId
            } else {
                ElMessage({
                    message: res.meta.description,
                    grouping: true,
                    customClass: 'el-custom-fail',
                    offset: 40
                })
            }
        })
}

const closeDialog = (val: Econfirm) => {
    switch (val) {
        case 1:
            cropper.value.getCropBlob((data: any) => {
                // do something
                const windowURL = window.URL || window.webkitURL
                const srcBlob = windowURL.createObjectURL(data)
                // console.log(srcBlob)
                // infoForm.imgSrc = srcBlob
                infoForm.file = data
                reqUpload()
            })
            break
    }
    infoForm.dialogFormVisible = false
}

const reqModify = () => {
    console.log(111)
    const data = {
        userId: JSON.parse(getStorageFromKey('loginData')).userId,
        name: infoForm.nickName === '' ? null : infoForm.nickName,
        password: infoForm.password === '' ? null : infoForm.password,
        imgId: infoForm.imgId === '' ? null : infoForm.imgId,
        email: infoForm.email === '' ? null : infoForm.email,
        language: infoForm.languageList.join('|') === '' ? null : infoForm.languageList.join('|'),
        signature: infoForm.signature === '' ? null : infoForm.signature,
        phone: infoForm.phone === '' ? null : infoForm.phone
    }
    console.log(data)
    myReq
        .request({
            method: 'POST',
            url: '/sys-user/edit',
            data: {
                data,
                meta: {
                    from: 'P',
                    token: store.token
                }
            }
        })
        .then((res) => {
            console.log('res', res)
            if (res.meta.code === '200') {
                ElMessage({
                    message: res.meta.description,
                    grouping: true,
                    customClass: 'el-custom-succ',
                    offset: 40,
                    duration: 1500
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
}

const init = () => {
    const loginData = JSON.parse(getStorageFromKey('loginData'))
    // console.log('loginData', loginData)
    infoForm.email = loginData.email
    infoForm.imgId = loginData.imgId
    infoForm.nickName = loginData.name
    infoForm.phone = loginData.phone
    infoForm.imgSrc = loginData.imgUrl
}

onMounted(() => {
    console.log('props', props)
    init()
})

watch(infoForm, (nw) => {
    console.log('nw', nw)
})
</script>

<style lang="scss" scoped>
.my-info {
    :deep(.el-form-item__label-wrap) {
        display: flex;
        align-items: center;
        padding: 0 28px 0 0;
    }

    .avatar-box {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .upload-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border: 1px dashed rgb(102, 111, 234);
        border-radius: 50%;
        cursor: pointer;
    }

    .form-btn {
        position: absolute;
        bottom: 20px;
        right: 50px;
    }

    :deep(.el-dialog) {
        min-width: 950px;
        width: 1200px;
    }
    :deep(.el-dialog__body) {
        margin: 0 auto;
        // width: 950px;
        height: 400px;
        display: flex;
        display: -webkit-flex;

        .vue-cropper {
            flex: 8;
            // border: 5px solid $prefecture-card-title-color;
            box-shadow: 0px 0px 5px 5px $prefecture-card-title-color;
            border-radius: 0px;
            .cropper-box {
                flex: 1;
                width: 100%;
                .cropper {
                    width: 400px;
                    height: 500px;
                }
            }
        }

        .dialog-left {
            margin-left: 50px;
            flex: 2;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .show-preview {
                width: 200px;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                .preview {
                    overflow: hidden;
                    background: #cccccc;
                    border-radius: 50%;
                    box-shadow: 0px 0px 5px 5px $prefecture-card-title-color;
                }
            }
            .btns {
                display: flex;
                justify-content: space-around;
            }
        }
    }
}
</style>
