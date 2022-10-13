<template>
    <div class="dictionary">
        <div class="dictionary-handler">
            <el-form :inline="true" label-width="90px">
                <el-form-item label="分类：">
                    <el-select v-model="formTable.region" placeholder="please select your zone">
                        <el-option
                            v-for="item in formTable.option"
                            :label="item.label"
                            :value="item.value"
                            :key="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="字典名称：">
                    <el-input
                        :input-style="inputStyle"
                        v-model="formTable.searchKey"
                        placeholder="请输入字典名称"
                    />
                </el-form-item>
            </el-form>
            <div class="btns">
                <el-button type="primary" :icon="Search" @click="searchHandler">Search</el-button>
                <!-- <el-button type="primary" :icon="Plus">添加词典</el-button> -->
                <el-button type="danger" icon="Delete" @click="reqDeleteSelection"
                    >批量删除</el-button
                >
                <el-dropdown>
                    <el-button type="primary" icon="Plus">添加</el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="addCommand('cate')"
                                >新增分类</el-dropdown-item
                            >
                            <el-dropdown-item @click="addCommand('dict')"
                                >新增词典</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <el-card>
            <el-table
                ref="multipleTableRef"
                :data="tableData"
                style="width: 100%; border-color: red; max-height: 800px"
                :cell-style="returnCellStyle"
                :header-cell-style="returnHeaderStyle"
                @selection-change="handleSelectionChange"
                border
            >
                <el-table-column v-if="tableData.length > 0" type="selection" width="55" />
                <el-table-column
                    :width="item === 'id' ? 55 : 'auto'"
                    v-for="(item, index) in columnsList"
                    :label="relationShip[item]"
                    :key="index"
                >
                    <template #default="scope">
                        <span v-if="!isShowInput(scope.$index, item)">{{
                            dataFormat(scope.row[item], item)
                        }}</span>
                        <el-input
                            :disabled="item === 'modifyTime' || item === 'id'"
                            v-if="isShowInput(scope.$index, item)"
                            v-model="tableData[scope.$index][item]"
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="编辑" v-if="tableData.length > 0">
                    <template #default="scope">
                        <div class="table-btns">
                            <el-button
                                v-if="!isShowConfirm(scope.$index, scope.row)"
                                size="small"
                                @click="handleEdit(scope.$index, scope.row, 'change')"
                                >修改</el-button
                            >
                            <el-button
                                v-if="isShowConfirm(scope.$index, scope.row)"
                                size="small"
                                @click="handleEdit(scope.$index, scope.row, 'cancle')"
                                >取消</el-button
                            >
                            <el-button
                                v-if="isShowConfirm(scope.$index, scope.row)"
                                size="small"
                                @click="handleEdit(scope.$index, scope.row, 'confirm')"
                                type="primary"
                                >确定</el-button
                            >
                            <el-button
                                size="small"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                                >删除</el-button
                            >
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-pagination">
                <!-- <div class="demonstration">All combined</div> -->
                <el-pagination
                    v-model:currentPage="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[2, 10, 15, 20]"
                    :disabled="false"
                    :background="true"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </el-card>

        <el-dialog v-model="dialogForm.visibleDict" :title="dialogForm.titleDict">
            <el-card>
                <el-form>
                    <el-form-item label="词典名" :label-width="dialogForm.formLabelWidth">
                        <el-input
                            :input-style="inputStyle"
                            placeholder="请输入字典名"
                            v-model="dialogForm.dictName"
                        />
                    </el-form-item>
                    <el-form-item label="词典值" :label-width="dialogForm.formLabelWidth">
                        <el-input
                            :input-style="inputStyle"
                            placeholder="请输入字典值"
                            v-model="dialogForm.dictVal"
                        />
                    </el-form-item>
                    <el-form-item label="标注" :label-width="dialogForm.formLabelWidth">
                        <el-input
                            :input-style="inputStyle"
                            placeholder="请输入标注"
                            v-model="dialogForm.remarkDict"
                        />
                    </el-form-item>
                    <el-form-item label="词典类型" :label-width="dialogForm.formLabelWidth">
                        <el-select v-model="dialogForm.region" placeholder="请选择类型">
                            <el-option
                                v-for="item in formTable.option"
                                :label="item.label"
                                :value="item.value"
                                :key="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>

                <div class="form-btns">
                    <el-button type="primary" @click="reqConfirmDict">确认</el-button>
                    <el-button @click="dialogForm.visibleDict = false">取消</el-button>
                </div>
            </el-card>
        </el-dialog>

        <el-dialog v-model="dialogForm.visibleCate" :title="dialogForm.titleCate">
            <el-card>
                <el-form>
                    <el-form-item label="分类名" :label-width="dialogForm.formLabelWidth">
                        <el-input
                            :input-style="inputStyle"
                            placeholder="请输入分类名"
                            v-model="dialogForm.cateName"
                        />
                    </el-form-item>
                    <el-form-item label="分类值" :label-width="dialogForm.formLabelWidth">
                        <el-input
                            :input-style="inputStyle"
                            placeholder="请输入分类值"
                            v-model="dialogForm.cateKey"
                        />
                    </el-form-item>
                    <el-form-item label="标注" :label-width="dialogForm.formLabelWidth">
                        <el-input
                            :input-style="inputStyle"
                            placeholder="请输入标注"
                            v-model="dialogForm.remarkCate"
                        />
                    </el-form-item>
                </el-form>
                <div class="form-btns">
                    <el-button type="primary" @click="reqConfirmCate">确认</el-button>
                    <el-button @click="dialogForm.visibleCate = false">取消</el-button>
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { Search, Plus } from '@element-plus/icons-vue'
import { ref, onMounted, watch } from 'vue'
import type { ElTable } from 'element-plus'
import { myReq } from '@/api/instanceReq/index'
import { useLoginStore } from '@/store/index'

interface IformTable {
    option: Array<{
        label: string
        value: string
    }>
    region: string
    searchKey: string
}

interface ItableItem {
    [index: string]: string | number
}

const formTable = ref<IformTable>({
    option: [],
    region: '',
    searchKey: ''
})

const inputStyle = {
    width: '196px'
}

const relationShip: { [index: string]: string } = {
    id: '序号',
    modifyTime: '修改时间',
    dictName: '词典名',
    dictVal: '词典值'
}

const tableData = ref<ItableItem[]>([])

const store = useLoginStore()

const multipleSelection = ref<ItableItem[]>([])

const editIndex = ref<string | number>('')

const saveRow = ref<string>('')

const currentPage = ref(1)

const pageSize = ref(2)

const totalPage = ref(0)

const dialogForm = ref({
    formLabelWidth: '90px',
    titleDict: '新增词典',
    visibleDict: false,
    dictName: '',
    dictVal: '',
    region: '',
    remarkDict: '',

    titleCate: '新增分类',
    visibleCate: false,
    cateName: '',
    cateKey: '',
    remarkCate: ''
})

const handleSelectionChange = (val: ItableItem[]) => {
    console.log('val', val)
    multipleSelection.value = val
}
const reqDeleteSelection = () => {
    if (multipleSelection.value.length === 0) {
        ElMessage({
            message: '请至少勾选一条数据',
            grouping: true,
            customClass: 'el-custom-fail',
            offset: 40
        })
        return
    }

    const idList = multipleSelection.value.map((v) => {
        return v.id
    })
    // console.log('idList', idList.join('|'))
    myReq
        .request({
            method: 'POST',
            url: '/sys-dict/del/2',
            data: {
                data: {
                    id: idList.join('|')
                },
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
                    offset: 40
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

const handleEdit = (index: number, row: ItableItem, handle: string) => {
    // console.log(index, row)

    if (handle === 'change') {
        if (editIndex.value !== '' && editIndex.value !== index) {
            ElMessage({
                message: '请先完成其他修改值',
                type: 'warning'
            })
        } else {
            saveRow.value = JSON.stringify(row)
            editIndex.value = index
        }
    }
    if (handle === 'cancle') {
        // console.log('tableData.value[index]', tableData.value[index])
        // console.log('saveRow.value', saveRow.value)
        tableData.value[index] = JSON.parse(saveRow.value)
        editIndex.value = ''
        saveRow.value = ''
    }
    if (handle === 'confirm') {
        console.log('row', row)
        reqEdit(row)
        editIndex.value = ''
        saveRow.value = ''
    }
}
const isShowInput = computed(() => {
    return function (index: number, item: string) {
        // console.log(tableData.value[index][item])
        // console.log('editIndex.value', editIndex.value)
        if (index === editIndex.value) {
            return true
        }
        return false
    }
})
const isShowConfirm = computed(() => {
    return function (index: number, item: string) {
        if (index === editIndex.value) {
            return true
        }
        return false
    }
})

const reqEdit = (item: ItableItem) => {
    myReq
        .request({
            method: 'POST',
            url: '/sys-dict/dict/edit',
            data: {
                data: {
                    id: item.id,
                    dictType: item.dictVal,
                    dictName: item.dictName
                },
                meta: {
                    from: 'P',
                    token: store.token
                }
            }
        })
        .then((res) => {
            console.log('reqEdit', res)
            reqTableData()
        })
}

const handleDelete = (index: number, row: ItableItem) => {
    console.log(index, row)
}

const addCommand = (item: string) => {
    switch (item) {
        case 'cate':
            dialogForm.value.visibleCate = true
            break
        case 'dict':
            dialogForm.value.visibleDict = true
            break
    }
}

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
    reqTableData()
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    reqTableData()
}

const returnCellStyle: any = function () {
    return {
        'text-align': 'center'
    }
}

const returnHeaderStyle: any = function () {
    return {
        'text-align': 'center'
    }
}

const reqOptionData = () => {
    myReq
        .request({
            method: 'POST',
            url: '/sys-dict/dict/cate',
            data: {
                data: null,
                meta: {
                    from: 'P',
                    token: store.token
                }
            }
        })
        .then((res) => {
            console.log('reqOptionData', res)
            if (res.meta.code === '200') {
                const arr: Array<{ label: string; value: string }> = []
                res.data.forEach((v: { typeName: string; typeKey: string }) => {
                    arr.push({
                        label: v.typeName,
                        value: v.typeKey
                    })
                })
                arr.push({
                    label: '全部',
                    value: ''
                })
                formTable.value.option = arr
            }
        })
}

const reqTableData = () => {
    console.log({
        keyWord: formTable.value.searchKey,
        parentVal: formTable.value.region,
        current: currentPage.value,
        size: pageSize.value
    })
    myReq
        .request({
            method: 'POST',
            url: '/sys-dict/dict/list',
            data: {
                data: {
                    keyWord: formTable.value.searchKey,
                    parentVal: formTable.value.region,
                    current: currentPage.value,
                    size: pageSize.value
                },
                meta: {
                    from: 'P',
                    token: store.token
                }
            }
        })
        .then((res) => {
            console.log('reqTableData', res)
            if (res.meta.code === '200') {
                const arr: Array<{
                    modifyTime: number
                    dictName: string
                    dictVal: string
                    id: number
                }> = []
                res.data.records.forEach(
                    (v: { modifyTime: number; dictName: string; dictVal: string; id: number }) => {
                        arr.push({
                            id: v.id,
                            modifyTime: v.modifyTime,
                            dictName: v.dictName,
                            dictVal: v.dictVal
                        })
                    }
                )
                totalPage.value = res.data.total
                tableData.value = arr
                // console.log('tableData.value', tableData.value)
            }
        })
        .catch((err) => {
            console.log('err:', err)
        })
}

const searchHandler = () => {
    reqTableData()
}

const reqConfirmDict = () => {
    myReq
        .request({
            method: 'POST',
            url: '/sys-dict/dict/add',
            data: {
                data: {
                    dictVO: {
                        dictVal: dialogForm.value.dictVal,
                        parentVal: dialogForm.value.region,
                        dictName: dialogForm.value.dictName,
                        remark: dialogForm.value.remarkDict
                    },
                    sysDictType: null
                },
                meta: {
                    from: 'P',
                    token: store.token
                }
            }
        })
        .then((res) => {
            console.log('reqConfirmDict', res)
        })
    // dialogForm.value.visibleDict = false
}

const reqConfirmCate = () => {
    myReq
        .request({
            method: 'POST',
            url: '/sys-dict/dict/add',
            data: {
                data: {
                    dictVO: null,
                    sysDictType: {
                        typeName: dialogForm.value.cateName,
                        typeKey: dialogForm.value.cateKey,
                        remark: dialogForm.value.remarkCate
                    }
                },
                meta: {
                    from: 'P',
                    token: store.token
                }
            }
        })
        .then((res) => {
            console.log('reqConfirmCate', res)
        })
    // dialogForm.value.visibleCate = false
}

onMounted(() => {
    reqOptionData()
    reqTableData()
})

const columnsList = computed(() => {
    if (tableData.value.length > 0) {
        let keys: string[] = []
        keys = Object.keys(tableData!.value[0])
        // console.log('keys', keys)
        return keys
    } else {
        return []
    }
})

const dataFormat = computed(() => {
    return function (value: any, item: string) {
        if (item === 'modifyTime') {
            const years = new Date(value).getFullYear()
            const months = new Date(value).getMonth() + 1
            const days = new Date(value).getDate()

            return `${years}-${months}-${days}`
        } else {
            return value
        }
    }
})

// watch(
//     tableData.value,
//     (nw) => {
//         console.log(nw)
//     },
//     {
//         deep: true
//     }
// )
</script>

<style lang="scss" scoped>
.dictionary {
    .el-button {
        margin-left: 0;
        margin-right: 15px;
    }
    .table-btns {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dictionary-handler {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        // .el-button {
        //     margin-left: 20px;
        // }

        :deep(.el-form) {
            flex: 7;
            display: flex;
            align-items: center;

            .el-form-item {
                margin-bottom: 0;
            }
        }

        .btns {
            // flex: 3;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin-right: 15px;
            .el-button {
                min-width: 95px; /* px-to-viewport-ignore */
                margin-right: 15px;
                width: 115px;
                font-size: 0.9vw;
            }
        }
    }

    .table-pagination {
        margin-top: 25px;
        display: flex;
        justify-content: center;
    }

    .form-btns {
        margin-top: 15px;
        display: flex;
        flex-direction: row-reverse;
    }
}
</style>
