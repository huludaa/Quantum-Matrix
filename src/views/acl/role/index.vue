<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请输入搜索职位关键字" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="search">搜索</el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin: 10px 0">
    <el-button type="primary" size="default" icon="Edit" @click="addRole">添加职位</el-button>

    <el-table border :data="allRole" style="margin: 20px 0">
      <el-table-column
        label="#"
        align="center"
        type="index"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="ID" align="center" show-overflow-tooltip prop="id"></el-table-column>
      <el-table-column
        label="职位名称"
        align="center"
        show-overflow-tooltip
        prop="roleName"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        show-overflow-tooltip
        prop="createTime"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        show-overflow-tooltip
        prop="updateTime"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="280px" show-overflow-tooltip>
        <template #="{ row }">
          <el-button type="primary" size="small" icon="User" @click="setPermisstion(row)"
            >分配权限</el-button
          >
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">
            编辑
          </el-button>
          <el-popconfirm
            :title="`确定删除？${row.roleName}`"
            width="260px"
            @confirm="deleteRole(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @current-change="getHasRole"
      @size-change="sizeChange"
    />
  </el-card>

  <el-dialog v-model="dialogVisible" :title="RoleParams.id ? '更新职位' : '添加职位'">
    <el-form :model="RoleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请输入职位名称" v-model="RoleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" size="default" @click="save">确定</el-button>
    </template>
  </el-dialog>

  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮的权限</h4>
    </template>
    <template #default>
      <!-- 树形控件 -->
      <el-tree
        ref="tree"
        style="max-width: 600px"
        :data="menuArr"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="selectArr"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handle">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermisstion,
  reqRemoveRole,
} from '@/api/acl/roler/index'
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList,
} from '@/api/acl/roler/type'
import useLayOutSettingStore from '@/store/module/setting'
const settingStore = useLayOutSettingStore()
const pageNo = ref<number>(0)
const pageSize = ref<number>(3)
const total = ref<number>(0)
//存储所有职位
const allRole = ref<Records>([])
//存储搜索关键字
const keyword = ref<string>('')
//控制对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 控制抽屉的显示与隐藏
const drawer = ref<boolean>(false)
//定义数组存储用户权限的数据
const menuArr = ref<MenuList>([])
//准备一个数组:数组用于存储勾选的节点的ID(四级的)
const selectArr = ref<number[]>([])
// 获取树形组件
const tree = ref<any>()
// 收集新增岗位数据
const RoleParams = reactive<RoleData>({
  roleName: '',
})
// 获取ref实例
const form = ref<any>()
onMounted(() => {
  getHasRole()
})
const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  const result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
  if (result.code == 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  }
}
const sizeChange = () => {
  getHasRole()
}
const search = () => {
  getHasRole()
  keyword.value = ''
}
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}

const addRole = () => {
  dialogVisible.value = true
  //清空数据
  Object.assign(RoleParams, {
    roleName: '',
    id: 0,
  })
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
const updateRole = (row: RoleData) => {
  dialogVisible.value = true
  Object.assign(RoleParams, row)
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) callBack()
  callBack(new Error('职位名称至少两位'))
}
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
const save = async () => {
  await form.value.validate()
  const result: any = await reqAddOrUpdateRole(RoleParams)
  if (result.code == 200) {
    dialogVisible.value = false
    //提示文字
    ElMessage({ type: 'success', message: RoleParams.id ? '更新成功' : '添加成功' })
    //再次获取全部的已有的职位
    getHasRole(RoleParams.id ? pageNo.value : 1)
  }
}

//分配权限按钮的回调
//已有的职位的数据
const setPermisstion = async (row: RoleData) => {
  //抽屉显示出来
  drawer.value = true
  //收集当前要分类权限的职位的数据
  Object.assign(RoleParams, row)
  const result: MenuResponseData = await reqAllMenuList(RoleParams.id as number)

  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
// 过滤出已选中的节点ID
const filterSelectArr = (allData: any, initArr: any) => {
  // 遍历传入的所有数据（通常是树形结构的菜单或权限数据）
  allData.forEach((item: any) => {
    // 如果当前节点的 select 属性为 true，并且节点的层级（level）为 4
    if (item.select && item.level == 4) {
      // 将该节点的 id 添加到初始数组 initArr 中
      initArr.push(item.id)
    }

    // 如果当前节点有子节点（children），并且子节点数组长度大于 0
    if (item.children && item.children.length > 0) {
      // 递归调用 filterSelectArr，继续遍历子节点
      filterSelectArr(item.children, initArr)
    }
  })

  // 返回包含所有选中节点 ID 的数组
  return initArr
}

// 树形控件的默认属性
const defaultProps = {
  children: 'children',
  label: 'name',
}

//抽屉的确定回调函数
const handle = async () => {
  const roleId = RoleParams.id
  // getCheckedKeys:若节点可用被选中 (show-checkbox 为 true), 它将返回当前选中节点 key 的数组
  const arr = tree.value.getCheckedKeys()
  // getHalfCheckedKeys:若节点可被选中(show-checkbox 为 true)，则返回目前半选中的节点的 key 所组成的数组
  const arr1 = tree.value.getHalfCheckedKeys()
  const permissionTd = arr.concat(arr1)
  // 下发权限
  const result: any = await reqSetPermisstion(roleId as number, permissionTd)
  if (result.code == 200) {
    //抽屉关闭
    drawer.value = false
    //提示信息
    ElMessage({ type: 'success', message: '分配权限成功' })
    //页面刷新
    // window.location.reload()
  }
}

const deleteRole = async (id: number) => {
  const result: any = await reqRemoveRole(id)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    //再次获取全部的已有的职位
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
