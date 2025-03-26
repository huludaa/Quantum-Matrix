<!-- 优化：更新其他用户信息时不用window.location.reload(),只有在更新当前用户时才使用 -->
<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="用户名称">
        <el-input placeholder="请输入用户名称" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">
          搜索
        </el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
    <el-button
      type="primary"
      size="default"
      :disabled="selectIdArr.length ? false : true"
      @click="deleteSelectUser"
    >
      批量删除
    </el-button>

    <el-table @selection-change="selectChange" style="margin: 10px 0" border :data="userArr">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" align="center" type="index" width="50px"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column
        label="用户名字"
        align="center"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        prop="username"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户角色"
        align="center"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="330px" align="center">
        <template #="{ row, index }">
          <el-button type="primary" size="small" icon="User" @click="setRole(row)"
            >分配角色</el-button
          >
          <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">
            编辑
          </el-button>
          <!-- 删除确认框 -->
          <el-popconfirm
            :title="`确定删除？${row.username}`"
            width="260px"
            @confirm="deleteUser(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pageNO"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      background="true"
      layout="prev,pager,next,jumper,->,sizes,total"
      :total="total"
      @size-change="handler"
      @current-change="getHasUser"
    ></el-pagination>
  </el-card>

  <!-- 新增用户和编辑的抽屉 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <!-- 通过 :model，表单的所有输入项的值都存储在 userParams 中，方便在提交表单时一次性获取所有数据 -->
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input placeholder="请输入用户姓名" v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="drawer = false">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-drawer>

  <!-- 分配角色的抽屉 -->
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            @change="handleCheckAllChange"
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            >全选
          </el-checkbox>
          <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
            <!-- label是要收集的数据 -->
            <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer1 = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/module/setting'
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqSelectUser,
  reqRemoveUser,
} from '@/api/acl/user/index'
import type {
  SetRoleData,
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
let pageNO = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<Records>([])
//控制新增用户和编辑抽屉的显示与隐藏
let drawer = ref<boolean>(false)
//控制分配角色抽屉的显示与隐藏
let drawer1 = ref<boolean>(false)
//收集用户信息的响应式数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
// 存储全部职位的数据
let allRole = ref<AllRole>([])
// 存储当前用户已有的职位
let userRole = ref<AllRole>([])
//获取form组件实例
let formRef = ref<any>()
//控制顶部全选复选框不确定的样式
const isIndeterminate = ref<boolean>(true)
//收集顶部复选框全选的数据
const checkAll = ref<boolean>(false)
// 准备一个数组存储批量删除的用户id
let selectIdArr = ref<User[]>([])
// 定义存储搜索关键字的变量
let keyword = ref<string>('')
// 充值功能的仓库实例化
let settingStore = useLayOutSettingStore()

onMounted(() => {
  getHasUser()
})
const getHasUser = async (pager = 1) => {
  pageNO.value = pager
  let result: UserResponseData = await reqUserInfo(pageNO.value, pageSize.value, keyword.value)

  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}

const handler = () => {
  getHasUser()
}

//添加用户按钮的回调
const addUser = () => {
  //抽屉显示出来
  drawer.value = true
  //清空数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  //清除上一次的错误提示信息
  formRef.value.clearValidate('username')
  formRef.value.clearValidate('name')
  formRef.value.clearValidate('password')
}

//更新已有的用户按钮的回调
//row:即为已有用户的账号信息
const updateUser = (row: User) => {
  //抽屉显示出来
  drawer.value = true
  Object.assign(userParams, row)
  //清除上一次的错误提示信息
  formRef.value.clearValidate('username')
  formRef.value.clearValidate('name')
}

//保存按钮的回调
const save = async () => {
  await formRef.value.validate()
  //保存按钮:添加新的用户|更新已有的用户账号信息
  let result: any = await reqAddOrUpdateUser(userParams)
  //添加或者更新成功
  if (result.code == 200) {
    //关闭抽屉
    drawer.value = false
    //提示消息
    ElMessage({ type: 'success', message: userParams.id ? '更新成功' : '添加成功' })
    //获取最新的全部账号的信息
    getHasUser(userParams.id ? pageNO.value : 1)
    console.log(userParams)
    //浏览器自动刷新一次，换成真实接口后开启
    // window.location.reload()
  } else {
    //关闭抽屉
    drawer.value = false
    //提示消息
    ElMessage({ type: 'error', message: userParams.id ? '更新失败' : '添加失败' })
  }
}
//校验的回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 1) callBack()
  callBack(new Error('用户姓名至少两位'))
}
const validatorName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 0) callBack()
  callBack(new Error('请输入用户昵称'))
}
const validatorPassword = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 6) callBack()
  callBack(new Error('用户密码至少六位'))
}
//表单校验的规则对象
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}

//分配角色抽屉的回调
const setRole = async (row: User) => {
  drawer1.value = true
  Object.assign(userParams, row)
  //获取全部职位的数据与当前用户已有的职位
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number)
  console.log(result)

  if (result.code == 200) {
    //存储全部职位
    allRole.value = result.data.allRolesList
    //存储当前用户已有的职位
    userRole.value = result.data.assignRoles
  }
}
//顶部的全部复选框的change事件
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
//顶部全部的复选框的change事件
const handleCheckedCitiesChange = (value: string[]) => {
  //顶部复选框的勾选数据
  //代表:勾选上的项目个数与全部的职位个数相等，顶部的复选框勾选上
  checkAll.value = allRole.value.length == value.length
  //不确定的样式
  isIndeterminate.value = allRole.value.length !== value.length
}
//确定按钮的回调(分配职位)
const confirmClick = async () => {
  //收集参数
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number
    }),
  }
  //分配用户的职位
  let result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: 'success', message: '分配职务成功' })
    //关闭抽屉
    drawer1.value = false
    //获取更新完毕用户的信息,更新完毕留在当前页
    getHasUser(pageNO.value)
  }
}

// 删除某个用户
const deleteUser = async (userId: number) => {
  let result: any = await reqRemoveUser(userId)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(userArr.value.length > 1 ? pageNO.value : pageNO.value - 1)
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
//table复选框勾选的时候会触发的事件
const selectChange = (value: any) => {
  selectIdArr.value = value
}
//批量删除按钮的回调
const deleteSelectUser = async () => {
  //整理批量删除的参数
  let idsList: any = selectIdArr.value.map((item) => {
    return item.id
  })
  //批量删除的请求
  let result: any = await reqSelectUser(idsList)
  console.log('result', result)

  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(userArr.value.length > 1 ? pageNO.value : pageNO.value - 1)
  }
}

// 搜索功能
const search = () => {
  getHasUser()
  keyword.value = ''
}

// 重置功能
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
