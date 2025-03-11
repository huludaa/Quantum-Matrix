<template>
  <Category :scene="scene" />
  <el-card>
    <div v-show="scene == 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        style="margin: 10px 0"
        :disabled="categoryStore.c3Id ? false : true"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column
          label="属性名称"
          width="120px"
          align="center"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #="{ row, index }">
            <el-tag style="margin: 5px" v-for="(item, index) in row.attrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </template></el-table-column
        >
        <el-table-column label="操作" width="120px" align="center">
          <template #="{ row, index }">
            <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
            <el-popconfirm
              :title="`你确定删除${row.attrName}?`"
              width="200px"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene == 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="attrParams.attrName ? false : true"
        :data="attrParams.attrValueList"
        @click="addAttrValue"
      >
        添加属性值
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="属性值" align="center">
          <template #="{ row, index }">
            <!-- THINK:为什么获取ref实例不是写在div上，而是在input上 -->
            <el-input
              v-if="row.flag"
              @blur="toLook(row, index)"
              placeholder="请输入属性值"
              v-model="row.valueName"
              :ref="
                (vc: any) => {
                  inputAttr[index] = vc
                  console.log('el-input:', vc)
                }
              "
            ></el-input>
            <div v-else @click="toEdit(row, index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ row, index }">
            <el-button
              type="primary"
              size="default"
              @click="attrParams.attrValueList.splice(index, 1)"
              icon="Delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >保存</el-button
      >
      <el-button type="danger" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/module/category'
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { reqAddOrUpdateTrademark } from '@/api/product/trademark'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
//存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
//控制场景的变化
let scene = ref(0)
//收集新增属性的数据
let attrParams = reactive<Attr>({
  attrName: '', //新增的属性的名字
  attrValueList: [], //新增的属性值数组
  categoryId: '', //三级分类的ID
  categoryLevel: 3, //代表的是三级分类
})

const getAttr = async () => {
  //解构获取id
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
//监听三级分类的id变化
watch(
  () => categoryStore.c3Id,
  () => {
    //清空上一次查询的属性与属性值
    attrArr.value = []
    //确保有三级分类的id才进行展示table内容
    if (!categoryStore.c3Id) return
    else {
      getAttr()
    }
  },
)

const addAttr = () => {
  //清空上一次的数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    //获取第三个分类的id
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}
const updateAttr = (row: Attr) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
const cancel = () => {
  scene.value = 0
}
//存对应的组件实例el-input
const inputAttr = ref<any>([])
const addAttrValue = () => {
  //点击添加属性值按钮的时候,向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //定义一个响应式数据控制编辑模式与查看模式的切换
  })
  //获取最后el-input组件聚焦
  nextTick(() => {
    inputAttr.value[attrParams.attrValueList.length - 1].focus()
  })
}
//保存按钮的回调
//TODO:点击保存没反应
// const save = async () => {
//   //发起请求
//   let result: any = await reqAddOrUpdateAttr(attrParams)
//   if (result.code == 200) {
//     console.log('test')

//     //切换场景
//     scene.value = 0
//     ElMessage({
//       type: 'success',
//       message: attrParams.id ? '修改成功' : '添加成功',
//     })
//     //再次获取所有属性与属性值
//     getAttr()
//   } else {
//     ElMessage({
//       type: 'error',
//       message: attrParams.id ? '修改失败' : '添加失败',
//     })
//   }
// }

const save = async () => {
  try {
    let result: any = await reqAddOrUpdateAttr(attrParams)
    if (result && result.code == 200) {
      scene.value = 0
      ElMessage({
        type: 'success',
        message: attrParams.id ? '修改成功' : '添加成功',
      })
      getAttr()
    } else {
      ElMessage({
        type: 'error',
        message: attrParams.id ? '修改失败' : '添加失败',
      })
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '请求失败，请稍后重试',
    })
    console.error('请求失败:', error)
  }
}

//属性值表单元素失去焦点，转为查看模式
const toLook = (row: AttrValue, index: number) => {
  //非法情况（未输入属性值），则不可转为查看模式
  if (row.valueName.trim() == '') {
    //删除属性值为空的元素
    attrParams.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  //非法情况（属性值有相同的）
  // 如果回调函数返回 true，则 find 方法立即返回当前元素，并停止遍历。
  let repeat = attrParams.attrValueList.find((item) => {
    // item != row用于排除当前属性值 row，避免与自身比较。
    if (item != row) {
      return item.valueName == row.valueName
    }
  })

  if (repeat) {
    //删除属性值为重复的元素
    attrParams.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}
// //点击属性值，转为编辑模式
const toEdit = (row: AttrValue, index: number) => {
  row.flag = true
  //nextTick:响应式数据发生变化，获取更新的Dom（组件实例）
  //TODO，聚焦功能并没有实现，73集
  nextTick(() => {
    inputAttr.value[index].focus()
  })
}

// const deleteAttr = async (attrId: number) => {
//   let result = await reqRemoveAttr(attrId)
//   console.log(result)

//   if (result.code == 200) {
//     ElMessage({
//       type: 'success',
//       message: '删除成功',
//     })
//     getAttr()
//   } else {
//     ElMessage({
//       type: 'error',
//       message: '删除失败',
//     })
//   }
// }

//路由组件销毁的时候，把仓库分类相关的数据清空
const deleteAttr = async (attrId: number) => {
  try {
    let result = await reqRemoveAttr(attrId)
    if (result && result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getAttr()
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败',
      })
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '请求失败，请稍后重试',
    })
    console.error('请求失败:', error)
  }
}

onBeforeUnmount(() => {
  //清空仓库的数据
  categoryStore.$reset()
})
</script>
