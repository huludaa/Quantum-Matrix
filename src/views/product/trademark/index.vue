<template>
  <el-card class="box-card">
    <!-- 添加品牌按钮 -->
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      @click="addTrademark"
      v-has="`btn.Trademark.add`"
      >添加品牌</el-button
    >

    <!-- 品牌列表表格 -->
    <el-table border :data="trademarkArr" style="margin: 10px 0">
      <!-- 序号列 -->
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <!-- 品牌名称列 -->
      <el-table-column label="品牌名称" align="center">
        <template #="{ row }">
          <h1>{{ row.tmName }}</h1>
        </template>
      </el-table-column>
      <!-- 品牌logo列 -->
      <el-table-column label="品牌logo" align="center">
        <template #="{ row }">
          <img :src="row.logoUrl" />
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="品牌操作" align="center">
        <template #="{ row }">
          <!-- 编辑按钮 -->
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTrademark(row)"
          ></el-button>
          <!-- 删除确认框 -->
          <el-popconfirm
            :title="`确认删除${row.tmName}吗？`"
            width="200px"
            icon="Delete"
            icon-color="red"
            @confirm="removeTrademark(row.id)"
          >
            <template #reference> <el-button type="danger" size="small" icon="Delete" /></template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      layout="prev,pager,next,jumper,->,sizes,total"
      :total="total"
      :background="true"
      @current-change="getHasTrademark"
      @size-change="sizeChange"
    />
  </el-card>
  <!-- 添加/修改品牌对话框 -->
  <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
    <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
      <!-- 品牌名称输入框 -->
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <!-- 品牌LOGO上传 -->
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 对话框底部按钮 -->
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type { TradeMarkResponseData, Records, TradeMark } from '@/api/product/trademark/type'
import { ElImage, ElMessage, type UploadProps } from 'element-plus'
//当前页码
const pageNo = ref<number>(1)
//每一页展示多少条数据
const limit = ref<number>(3)
//存储已有品牌的总数
const total = ref<number>(0)
//存储已有品牌的数据
const trademarkArr = ref<Records>([])
//控制对话框显示与隐藏
const dialogFormVisible = ref<boolean>(false)
//定义收集新增品牌数据
const trademarkParams = reactive<TradeMark>({
  tmName: '', // 品牌名称
  logoUrl: '', // 品牌logo
})
//获取el-form实例
const formRef = ref()
//获取已有品牌的接口封装为一个函数,无参数回到第一页
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  const result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
//组件挂载完毕钩子，发一次请求
onMounted(() => {
  getHasTrademark()
})

const sizeChange = () => {
  getHasTrademark()
}

const addTrademark = () => {
  // 打开添加品牌对话框
  dialogFormVisible.value = true
  //清空上次的数据
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  trademarkParams.id = 0
  //清除上一次检验提醒
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
}

const updateTrademark = (row: TradeMark) => {
  //展示已有品牌的数据
  trademarkParams.id = row.id
  trademarkParams.tmName = row.tmName
  trademarkParams.logoUrl = row.logoUrl
  dialogFormVisible.value = true
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
}

const cancel = () => {
  dialogFormVisible.value = false
}

const confirm = async () => {
  //发起请求之前，validate对整个表单进行校验
  await formRef.value.validate()
  const result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    console.log(result)
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    dialogFormVisible.value = false
  }
}
//上传图片前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage({
        type: 'error',
        message: '图片大小不能超过10M',
      })
      return false
    }
    return true
  } else {
    ElMessage({
      type: 'error',
      message: '文件格式只能为png或jpeg或gif',
    })
    return false
  }
}

//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  //收集上传图片的地址，添加一个新的品牌时带给服务器
  trademarkParams.logoUrl = response.data
  //图片上传成功后清楚检验提醒
  formRef.value.clearValidate('logoUrl')
}

//品牌自定义检验规则方法
const validatorTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length > 0) {
    callback()
  } else {
    callback(new Error('请填写品牌名称'))
  }
}
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请上传图片'))
  }
}
//表单校验规则对象
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

//删除品牌确认
const removeTrademark = async (id: number) => {
  const result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'success',
      message: '删除失败',
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
