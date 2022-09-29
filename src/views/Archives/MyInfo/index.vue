<template>
    <div>
        <el-form ref="form" :model="sizeForm" label-width="auto">
            <cropper-canvas background>
                <cropper-image src="/cropperjs/v2/picture.jpg" alt="Picture"></cropper-image>
                <cropper-shade hidden></cropper-shade>
                <cropper-handle action="select" plain></cropper-handle>
                <cropper-selection initial-coverage="0.5" movable resizable zoomable>
                    <cropper-grid role="grid" covered></cropper-grid>
                    <cropper-crosshair centered></cropper-crosshair>
                    <cropper-handle
                        action="move"
                        theme-color="rgba(255, 255, 255, 0.35)"
                    ></cropper-handle>
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
            <el-form-item label="我的头像">
                <el-input v-model="sizeForm.name" />
            </el-form-item>
            <el-form-item label="Activity zone">
                <el-select v-model="sizeForm.region" placeholder="please select your zone">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
                <el-col :span="11">
                    <el-date-picker
                        v-model="sizeForm.date1"
                        type="date"
                        label="Pick a date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />
                </el-col>
                <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col>
                <el-col :span="11">
                    <el-time-picker
                        v-model="sizeForm.date2"
                        label="Pick a time"
                        placeholder="Pick a time"
                        style="width: 100%"
                    />
                </el-col>
            </el-form-item>
            <el-form-item label="Activity type">
                <el-checkbox-group v-model="sizeForm.type">
                    <el-checkbox-button label="Online activities" name="type" />
                    <el-checkbox-button label="Promotion activities" name="type" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
                <el-radio-group v-model="sizeForm.resource">
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
import { reactive, ref } from 'vue'
import Cropper from 'cropperjs'

const sizeForm = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
})
onMounted(() => {})
</script>

<style lang="scss" scoped></style>
