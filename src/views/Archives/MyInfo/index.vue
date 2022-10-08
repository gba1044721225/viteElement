<template>
    <div class="my-info">
        <el-form ref="form" :model="infoForm" label-width="auto">
            <el-form-item label="我的头像">
                <div v-if="infoForm.imgSrc === ''" class="upload-avatar" @click="openDialog">
                    <el-icon><Plus /></el-icon>
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
                                <el-button @click="changePhoto">更换图片</el-button>
                                <el-button @click="closeDialog(1)">确定</el-button>
                            </div>
                        </div>
                    </el-dialog>
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
            <el-form-item label="Activity zone">
                <el-select v-model="infoForm.region" placeholder="please select your zone">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
                <el-col :span="11">
                    <el-date-picker
                        v-model="infoForm.date1"
                        type="date"
                        label="Pick a date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />
                </el-col>
                <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col>
                <el-col :span="11">
                    <el-time-picker
                        v-model="infoForm.date2"
                        label="Pick a time"
                        placeholder="Pick a time"
                        style="width: 100%"
                    />
                </el-col>
            </el-form-item>
            <el-form-item label="Activity type">
                <el-checkbox-group v-model="infoForm.type">
                    <el-checkbox-button label="Online activities" name="type" />
                    <el-checkbox-button label="Promotion activities" name="type" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
                <el-radio-group v-model="infoForm.resource">
                    <el-radio border label="Sponsor" />
                    <el-radio border label="Venue" />
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, nextTick, ref } from 'vue'
// import 'default-passive-events'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
const cropper = ref()
const infoForm = reactive({
    fileList: [],
    dialogFormVisible: false,
    imgSrc: '',
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
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

const changePhoto = async () => {
    const files: any = await uploadFile('image/*', true)
    // console.log(files)
    const windowURL = window.URL || window.webkitURL
    // console.log(windowURL.createObjectURL(files[0]))
    infoForm.dialogFormVisible = true
    nextTick(() => {
        console.log(files[0])
        const srcBlob = windowURL.createObjectURL(files[0])
        // console.log(srcBlob)
        option.img = srcBlob
    })
}

const openDialog = async () => {
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

const closeDialog = (val: Econfirm) => {
    switch (val) {
        case 1:
            cropper.value.getCropBlob((data: any) => {
                // do something
                const windowURL = window.URL || window.webkitURL
                const srcBlob = windowURL.createObjectURL(data)
                console.log(srcBlob)
                infoForm.imgSrc = srcBlob
                infoForm.dialogFormVisible = false
            })
            break
    }
}
</script>

<style lang="scss" scoped>
.my-info {
    .avatar-box {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.1);
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

        // :deep(.my-dialog) {
        //     display: flex;
        //     flex-direction: column;
        //     justify-content: center;
        //     align-items: center;
        // }
        :deep(.el-dialog__body) {
            margin: 0 auto;
            width: 900px;
            height: 400px;
            display: flex;
            display: -webkit-flex;

            .vue-cropper {
                flex: 8;
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
                margin-left: 20px;
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
                        border: 1px solid #cccccc;
                    }
                }
            }
        }
    }
}
</style>
