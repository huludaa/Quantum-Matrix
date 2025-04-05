<template>
  <el-card>
    <el-table border style="margin: 10px 0px" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="150px">
        <template #="{ row }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量/g" width="150px" prop="weight"></el-table-column>
      <el-table-column label="价格/元" width="150px" prop="price"></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #="{ row }">
          <el-button
            type="primary"
            title="上/下架"
            size="small"
            :icon="row.isSale == 1 ? 'Top' : 'Bottom'"
            @click="updateSale(row)"
          ></el-button>
          <el-button
            type="primary"
            title="编辑sku"
            size="small"
            icon="Edit"
            @click="updateSku(row)"
          ></el-button>
          <el-button
            type="primary"
            title="查看sku详情"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-popconfirm
            :title="`你确定要删除${row.skuName}?`"
            width="200px"
            @confirm="removeSku(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete" title="删除"></el-button>
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
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getHasSku"
      @size-change="handler"
    />
    <!-- 抽屉组件:展示商品详情 -->
    <el-drawer v-model="drawer">
      <!-- 标题部分 -->
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 30px 0px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 30px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 30px 0px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 30px 0px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag style="margin: 5px" v-for="item in skuInfo.skuAttrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 30px 0px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              >{{ item.saleAttrValueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row style="margin: 30px 0px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel height="200px">
              <el-carousel-item v-for="image in skuInfo.skuImageList" :key="image.id">
                <img :src="image.imgUrl" style="width: 100%; height: 100%; object-fit: cover" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
    <!-- 编辑SKU的对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑SKU信息" width="50%">
      <el-form :model="skuForm" label-width="100px">
        <el-form-item label="SKU名称">
          <el-input v-model="skuForm.skuName" placeholder="请输入SKU名称"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
          <el-input
            v-model="skuForm.skuDesc"
            type="textarea"
            placeholder="请输入SKU描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格/元">
          <el-input-number
            v-model="skuForm.price"
            :precision="2"
            :step="0.1"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="重量/g">
          <el-input-number
            v-model="skuForm.weight"
            :precision="2"
            :step="0.1"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="/api/product/fileUpload"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload"
          >
            <img
              v-if="skuForm.skuImageList && skuForm.skuImageList.length > 0"
              :src="skuForm.skuImageList[0].imgUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitUpdate">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
//引入请求
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSale,
  reqSkuInfo,
  reqRemoveSku,
  reqUpdateSku,
} from '@/api/product/sku'
//引入ts类型
import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
//分页器当前页码
const pageNo = ref<number>(1)
//每一页展示几条数据
const pageSize = ref<number>(3)
const total = ref<number>(0)
const skuArr = ref<SkuData[]>([])
//控制抽屉显示与隐藏的字段
const drawer = ref<boolean>(false)
const skuInfo = ref<any>({})
//控制对话框显示与隐藏
const dialogVisible = ref<boolean>(false)
//收集表单数据的对象
const skuForm = ref<any>({
  skuName: '',
  skuDesc: '',
  price: 0,
  weight: 0,
  skuDefaultImg: '',
  skuImageList: [],
})
//组件挂载完毕
onMounted(() => {
  getHasSku()
})
const getHasSku = async (pager = 1) => {
  //当前分页器的页码
  pageNo.value = pager
  const result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code == 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}
//分页器下拉菜单发生变化触发
const handler = (pageSizes: number) => {
  getHasSku()
}

//商品的上架与下架的操作
const updateSale = async (row: SkuData) => {
  //如果当前商品的isSale==1,说明当前商品是上架的额状态->更新为下架
  //否则else情况与上面情况相反
  if (row.isSale == 1) {
    //下架操作
    await reqCancelSale(row.id as number)
    //提示信息
    ElMessage({ type: 'success', message: '下架成功' })
    //发请求获取当前更新完毕的全部已有的SKU
    getHasSku(pageNo.value)
  } else {
    //下架操作
    await reqSaleSku(row.id as number)
    //提示信息
    ElMessage({ type: 'success', message: '上架成功' })
    //发请求获取当前更新完毕的全部已有的SKU
    getHasSku(pageNo.value)
  }
}
//更新已有的SKU
const updateSku = (row: SkuData) => {
  dialogVisible.value = true
  //收集已有的SKU数据进行展示
  skuForm.value = { ...row }
}
//提交更新
const submitUpdate = async () => {
  try {
    const result = await reqUpdateSku(skuForm.value)
    if (result.code === 200) {
      ElMessage({ type: 'success', message: '更新成功' })
      dialogVisible.value = false
      //重新获取列表数据
      getHasSku(pageNo.value)
    } else {
      ElMessage({ type: 'error', message: '更新失败' })
    }
  } catch (error) {
    ElMessage({ type: 'error', message: '更新失败' })
  }
}

//图片上传之前的钩子
const beforeImageUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传图片只能是 JPG/PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}

//图片上传成功的回调
const handleImageSuccess = (response: any) => {
  if (response.code === 200) {
    if (!skuForm.skuImageList) {
      skuForm.skuImageList = []
    }
    skuForm.skuImageList.push({
      id: Date.now(),
      imgName: response.data.name,
      imgUrl: response.data.url,
      skuId: skuForm.id,
    })
    ElMessage.success('图片上传成功')
  } else {
    ElMessage.error('图片上传失败')
  }
}
//查看商品详情按钮的回调
const findSku = async (row: SkuData) => {
  //抽屉展示出来
  drawer.value = true
  //获取已有商品详情数据
  const result: SkuInfoData = await reqSkuInfo(row.id as number)
  //存储已有的SKU
  skuInfo.value = result.data
  console.log(skuInfo.value)
}
//删除某一个已有的商品
const removeSku = async (id: number) => {
  //删除某一个已有商品的情况
  const result: any = await reqRemoveSku(id)
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: 'success', message: '删除成功' })
    //获取已有全部商品
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    //删除失败
    ElMessage({ type: 'error', message: '系统数据不能删除' })
  }
}
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
