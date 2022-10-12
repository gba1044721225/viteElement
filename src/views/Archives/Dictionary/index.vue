<template>
    <div class="dictionary">
        <div class="dictionary-handler">
            <el-form :inline="true">
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
            <el-button type="primary" :icon="Search" @click="searchHandler">Search</el-button>
            <el-button type="primary" :icon="Plus">添加词典</el-button>
            <el-button type="danger" icon="Delete" @click="reqDeleteSelection">批量删除</el-button>
        </div>
        <el-card>
            <el-table
                ref="multipleTableRef"
                :data="tableData"
                style="width: 100%; border-color: red"
                :cell-style="returnCellStyle"
                :header-cell-style="returnHeaderStyle"
                @selection-change="handleSelectionChange"
                border
            >
                <el-table-column v-if="tableData.length > 0" type="selection" width="55" />
                <el-table-column
                    v-for="(item, index) in columnsList"
                    :label="relationShip[item]"
                    :key="index"
                >
                    <template #default="scope">{{ dataFormat(scope.row[item], item) }}</template>
                </el-table-column>
                <el-table-column label="编辑" v-if="tableData.length > 0">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                            >Edit</el-button
                        >
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            >Delete</el-button
                        >
                    </template>
                </el-table-column>
                <div class="demo-pagination-block">
                    <div class="demonstration">All combined</div>
                    <el-pagination
                        v-model:currentPage="currentPage4"
                        v-model:page-size="pageSize4"
                        :page-sizes="[100, 200, 300, 400]"
                        :disabled="false"
                        :background="true"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    />
                </div>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { Search, Plus } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
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
    id: 'id',
    modifyTime: '修改时间',
    dictName: '词典名',
    dictVal: '词典值'
}

const tableData = ref<ItableItem[]>([])

const store = useLoginStore()

const multipleSelection = ref<ItableItem[]>([])

const currentPage4 = ref(4)
const pageSize4 = ref(100)
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

const handleEdit = (index: number, row: ItableItem) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: ItableItem) => {
    console.log(index, row)
}

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
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
                formTable.value.option = arr
            }
        })
}

const reqTableData = () => {
    myReq
        .request({
            method: 'POST',
            url: '/sys-dict/dict/list',
            data: {
                data: {
                    keyWord: formTable.value.searchKey,
                    parentVal: formTable.value.region
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

onMounted(() => {
    reqOptionData()
    reqTableData()
})

const columnsList = computed(() => {
    if (tableData.value.length > 0) {
        let keys: string[] = []
        keys = Object.keys(tableData!.value[0])
        console.log('keys', keys)
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
</script>

<style lang="scss" scoped>
.dictionary {
    .dictionary-handler {
        display: flex;
        // .el-button {
        //     margin-left: 20px;
        // }
        .el-button {
            margin-left: 20px;
        }
    }
}
</style>
