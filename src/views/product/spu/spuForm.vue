<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请你输入SPU名称"
        v-model="SpuParams.spuName"
        style="width: 300px"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId" style="width: 300px">
        <el-option
          v-for="item in AllTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请你输入SPU描述"
        v-model="SpuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- v-model:fileList->展示默认图片
               action:上传图片的接口地址
               list-type:文件列表的类型
          -->
      <el-upload
        v-model:file-list="imgList"
        action="/api/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select
        style="width: 300px"
        v-model="saleAttrIdAndValueName"
        :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'"
      >
        <el-option
          :value="`${item.id}:${item.name}`"
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-button
        @click="addSaleAttr"
        :disabled="saleAttrIdAndValueName ? false : true"
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
        >添加属性</el-button
      >
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0px" :data="saleAttr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值">
          <!-- row:即为当前SPU已有的销售属性对象 -->
          <template #="{ row }">
            <el-tag
              style="margin: 0px 5px"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              class="mx-1"
              closable
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              @blur="toLook(row)"
              v-model="row.saleAttrValue"
              v-if="row.flag == true"
              placeholder="请你输入属性值"
              size="small"
              style="width: 100px"
            ></el-input>
            <el-button
              @click="toEdit(row)"
              v-else
              type="primary"
              size="small"
              icon="Plus"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="deleteSaleAttr(row.baseSaleAttrId)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="saleAttr.length > 0 ? false : true"
        type="primary"
        size="default"
        @click="save"
        >保存</el-button
      >
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { SpuData } from '@/api/product/spu/type'
import { ref, computed } from 'vue'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import type {
  SaleAttrValue,
  HasSaleAttr,
  SaleAttr,
  SpuImg,
  Trademark,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['changeScene'])
//点击取消按钮:通知父组件切换场景为0,展示有的SPU的数据
const cancel = () => {
  emit('changeScene', { flag: 0, params: 'update' })
}
//存储已有的SPU这些数据
const AllTradeMark = ref<Trademark[]>([])
//商品图片
const imgList = ref<SpuImg[]>([])
//已有的SPU销售属性
const saleAttr = ref<SaleAttr[]>([])
//全部销售属性
const allSaleAttr = ref<HasSaleAttr[]>([])
//控制对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
//存储预览图片地址
const dialogImageUrl = ref<string>('')
//存储已有的SPU对象
const SpuParams = ref<SpuData>({
  category3Id: '', //收集三级分类的ID
  spuName: '', //SPU的名字
  description: '', //SPU的描述
  tmId: '', //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})
//将来收集还未选择的销售属性的ID与属性值的名字
const saleAttrIdAndValueName = ref<string>('')
//子组件书写一个方法
const initHasSpuData = async (spu: SpuData) => {
  //存储已有的SPU对象,将来在模板中展示
  //spu:即为父组件传递过来的已有的SPU对象[不完整]
  SpuParams.value = spu
  //获取全部品牌的数据
  const result: AllTradeMark = await reqAllTradeMark()
  //获取某一个品牌旗下全部售卖商品的图片
  const result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  //获取已有的SPU销售属性的数据
  const result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  //获取整个项目全部SPU的销售属性
  const result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  //存储全部品牌的数据
  AllTradeMark.value = result.data
  //SPU对应商品图片
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  //存储已有的SPU的销售属性
  saleAttr.value = result2.data
  //存储全部的销售属性
  allSaleAttr.value = result3.data
}
//照片墙点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  //对话框弹出来
  dialogVisible.value = true
}
//照片墙删除文件钩子
const handleRemove = () => {
  console.log('删除文件成功')
}
//照片钱上传成功之前的钩子约束文件的大小与类型
const handlerUpload = (file: any) => {
  if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPG|GIF',
    })
    return false
  }
}

//计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  //全部销售属性:颜色、版本、尺码
  //已有的销售属性:颜色、版本
  const unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})

//添加销售属性的方法
const addSaleAttr = () => {
  /*
  "baseSaleAttrId": number,
  "saleAttrName": string,
  "spuSaleAttrValueList": SpuSaleAttrValueList
  */
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  //准备一个新的销售属性对象:将来带给服务器即可
  const newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  //追加到数组当中
  saleAttr.value.push(newSaleAttr)
  //清空收集的数据
  saleAttrIdAndValueName.value = ''
}

//属性值按钮的点击事件
const toEdit = (row: SaleAttr) => {
  //点击按钮的时候,input组件不就不出来->编辑模式
  row.flag = true
  row.saleAttrValue = ''
}
//表单元素失却焦点的事件回调，检查值是否合法
const toLook = (row: SaleAttr) => {
  //收集用户输入的属性ID与属性值名字
  const { baseSaleAttrId, saleAttrValue } = row
  //创建新的属性值对象
  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }

  //非法情况判断：检查是否为空
  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空的',
    })
    return
  }
  //非法情况判断：检查是否重复
  const repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })

  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    })
    return
  }

  //通过检查，追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  //切换为查看模式
  row.flag = false
}

//保存按钮的回调
const save = async () => {
  //整理参数
  //发请求:添加SPU|更新已有的SPU
  //成功
  //失败
  //1:照片墙的数据
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name, //图片的名字
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  //2:整理销售属性的数据
  SpuParams.value.spuSaleAttrList = saleAttr.value
  const result = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    })
    //通知父组件切换场景为0
    emit('changeScene', { flag: 0, params: SpuParams.value.id ? 'update' : 'add' })
  } else {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    })
  }
}

//添加一个新的SPU初始化请求方法
const initAddSpu = async (c3Id: number | string) => {
  //清空数据
  Object.assign(SpuParams.value, {
    category3Id: '', //收集三级分类的ID
    spuName: '', //SPU的名字
    description: '', //SPU的描述
    tmId: '', //品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
    id: undefined, // 确保清除ID，否则会被认为是更新操作
  })
  //清空照片
  imgList.value = []
  //清空销售属性
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''
  //存储三级分类的ID
  SpuParams.value.category3Id = c3Id
  //获取全部品牌的数据
  const result: AllTradeMark = await reqAllTradeMark()
  const result1: HasSaleAttrResponseData = await reqAllSaleAttr()
  //存储数据
  AllTradeMark.value = result.data
  allSaleAttr.value = result1.data
}

//删除SPU销售属性
const deleteSaleAttr = (baseSaleAttrId: string) => {
  saleAttr.value = saleAttr.value.filter((item) => item.baseSaleAttrId !== baseSaleAttrId)
}

//对外暴露
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped></style>
