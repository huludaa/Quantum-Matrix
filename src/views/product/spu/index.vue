<template>
  <div>
    <div><Category :scene="scene"></Category></div>

    <el-card>
      <!-- 显示已有SPU -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="SPU名称" align="center" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            align="center"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作" align="center">
            <template #="{ row, index }">
              <el-button type="primary" size="small" icon="Plus" title="添加SPU"></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button type="primary" size="small" icon="View" title="查看SKU列表"></el-button>
              <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </div>

      <!-- 添加SPU|修改SPU子组件 -->
      <spuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></spuForm>

      <!-- 添加SKU的子组件 -->
      <skuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></skuForm>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/module/category'
import { reqHasSpu } from '@/api/product/spu'
import type { HasSpuResponseData, Records } from '@/api/product/spu/type'
import spuForm from './spuForm.vue'
import skuForm from './skuForm.vue'
import type { SpuData } from '@/api/product/spu/type'
let categoryStore = useCategoryStore()
let scene = ref<number>(0) //0:显示已有SPU  1:添加或者修改已有SPU 2:添加SKU的结构
const pageNo = ref<number>(1)
const pageSize = ref<number>(3)
//存储已有的SPU的数据
let records = ref<Records>([])
//存储已有SPU总个数
let total = ref<number>(0)
//获取子组件的vc实例
const spu = ref()
const sku = ref()

watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

const changeSize = () => {
  getHasSpu()
}

const addSpu = () => {
  scene.value = 1
  //点击添加SPU按钮,调用子组件的方法初始化数据
  spu.value.initAddSpu()
}

//修改已有的SPU的按钮的回调
const updateSpu = (row: SpuData) => {
  scene.value = 1
  spu.value.initHasSpuData(row)
}

//子组件SpuForm绑定自定义事件:目前是让子组件通知父组件切换场景为0
const changeScene = (obj: any) => {
  //子组件Spuform点击取消变为场景0:展示已有的SPU
  scene.value = obj.flag
  if (obj.params == 'update') {
    //更新留在当前页
    getHasSpu(pageNo.value)
  } else {
    //添加留在第一页
    getHasSpu()
  }
}

//路由组件销毁前，情况仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>
