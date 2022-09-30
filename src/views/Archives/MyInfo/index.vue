<template>
    <div class="my-info">
        <el-form ref="form" :model="infoForm" label-width="auto">
            <el-form-item label="我的头像">
                <div class="upload-avatar" @click="openDialog">
                    <el-icon><Plus /></el-icon>
                    <el-dialog
                        v-model="infoForm.dialogFormVisible"
                        class="my-dialog"
                        :lock-scroll="true"
                        :destroy-on-close="true"
                        :close-on-click-modal="false"
                    >
                        <div class="my-cropper"></div>
                    </el-dialog>
                </div>
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
import Cropper, { CropperImage } from 'cropperjs'
import 'default-passive-events'

const imageCropper = ref()
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

const openDialog = async () => {
    if (infoForm.dialogFormVisible === true) {
        return
    }

    const files: any = await uploadFile('image/*', true)
    // console.log(files)
    const windowURL = window.URL || window.webkitURL
    // console.log(windowURL.createObjectURL(files[0]))
    infoForm.dialogFormVisible = true
    nextTick(() => {
        const srcBlob = windowURL.createObjectURL(files[0])
        infoForm.imgSrc = srcBlob
        const image = new Image()

        image.src = srcBlob
        image.alt = 'Picture'

        imageCropper.value = new Cropper(image, {
            container: '.my-cropper',
            template: `
            <cropper-canvas background="true" class="cropper-canvas">
                <cropper-image></cropper-image>
                <cropper-shade hidden></cropper-shade>
                <cropper-handle action="select" plain></cropper-handle>
                <cropper-selection initial-coverage="0.5" movable resizable zoomable>
                <cropper-grid role="grid" bordered covered></cropper-grid>
                <cropper-crosshair theme-color="rgba(238, 238, 238, 0.5)" centered></cropper-crosshair>
                <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>
                <cropper-handle action="n-resize"></cropper-handle>
                <cropper-handle action="e-resize"></cropper-handle>
                <cropper-handle action="s-resize"></cropper-handle>
                <cropper-handle action="w-resize"></cropper-handle>
                <cropper-handle action="ne-resize"></cropper-handle>
                <cropper-handle action="nw-resize"></cropper-handle>
                <cropper-handle action="se-resize"></cropper-handle>
                <cropper-handle action="sw-resize"></cropper-handle>
                </cropper-selection>
            </cropper-canvas>
            `
        })

        console.log(imageCropper.value.getCropperImage())
    })
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
            console.log(e)
            if (elementA.files && elementA.files.length > 0) {
                resolve(elementA.files)
            }
        }
        elementA.click()

        document.body.removeChild(elementA)
    })
}
</script>

<style lang="scss" scoped>
.my-info {
    .upload-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border: 1px dashed rgb(102, 111, 234);
        border-radius: 10px;
        cursor: pointer;
        .my-cropper {
            width: 500px;
            height: 500px;
            .image {
                width: 500px;
                height: 400px;
            }
            :deep(.cropper-canvas) {
                width: 500px;
                height: 400px;
                // display: flex;
                // justify-content: center;
                // align-items: center;
            }
            :deep(img) {
                height: 500px;
            }
        }

        :deep(.my-dialog) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
