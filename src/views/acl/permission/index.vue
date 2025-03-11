<template>
  <el-table border :data="PermisstionArr" style="width: 100%; margin-bottom: 20px" row-key="id">
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{ row, index }">
        <el-button
          @click="addPermission(row)"
          type="primary"
          size="small"
          :disabled="row.level == 4 ? true : false"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          @click="updatePermission(row)"
          type="primary"
          size="small"
          :disabled="row.level == 1 ? true : false"
        >
          编辑
        </el-button>
        <el-popconfirm :title="`确定删除？${row.name}`" width="260px" @confirm="deleteMenu(row.id)">
          <template #reference>
            <el-button type="primary" size="small" :disabled="row.level == 1 ? true : false">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'">
    <el-form>
      <el-form-item label="名称">
        <el-input placeholder="请输入菜单名称" v-model="menuData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input placeholder="请输入菜单权限" v-model="menuData.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { reqAllPermisstion, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu/index'
import type {
  PermisstionList,
  PermisstionResponseData,
  Permisstion,
  MenuParams,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
onMounted(() => {
  getHasPermisstion()
})
//存储菜单的数据
let PermisstionArr = ref<PermisstionList>([])
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//添加与更新菜单需要携带的参数
let menuData = reactive<MenuParams>({
  code: '', //权限数值
  level: 0, //几级菜单
  name: '', //菜单的名字
  pid: 0, //菜单的ID
})

const getHasPermisstion = async () => {
  let result: PermisstionResponseData = await reqAllPermisstion()
  if (result.code == 200) {
    PermisstionArr.value = result.data
  }
}
const addPermission = (row: Permisstion) => {
  // 清空数据
  Object.assign(menuData, {
    id: 0,
    code: '', //权限数值
    level: 0, //几级菜单
    name: '', //菜单的名字
    pid: 0, //菜单的ID
  })
  dialogVisible.value = true
  // 收集新增菜单的level数值
  menuData.level = row.level + 1
  // 给谁新增菜单
  menuData.pid = row.id as number
}
const updatePermission = async (row: Permisstion) => {
  dialogVisible.value = true
  Object.assign(menuData, row)
}
const save = async () => {
  let result: any = await reqAddOrUpdateMenu(menuData)
  if (result.code == 200) {
    //对话框隐藏
    dialogVisible.value = false
    //提示信息
    ElMessage({ type: 'success', message: menuData.id ? '更新成功' : '添加成功' })
    //再次获取全部最新的菜单的数据
    getHasPermisstion()
  }
}
const deleteMenu = async (id: number) => {
  let result = await reqRemoveMenu(id)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasPermisstion()
  }
}
</script>
