<!--
  - publish Vue 文件
  - @JsName publish
  - @Description
  - @DateTime 2017/12/28 16:13
  - @author 亚茹
  -->
<template>
    <div>
      <div class="publish_content">
        <div class="publishContent">
          <div class="firstPart">
            <div class="firstPart_left">
              <p>商品信息</p>
            </div>
            <div class="firstPart_right">
              <div class="commodityName"><label>商品名称</label><input type="text" v-model="productParams.productName"></div>
              <div class="commodityCode"><label>商品编码</label><input type="number" v-model="productParams.productCode"></div>
              <div class="commodityPicture">
                <label>商品图片</label>
                <div class="pic">
                  <p @click="transferResource">+</p>
                  <div class="picOne" v-for="item in pictureList"><img :src="'http://10.0.0.6:8888/'+item.pictureSrc" alt=""></div>
                </div>
              </div>
              <div class="commodityType">
                <label>商品类别</label>
                <el-select v-model="value1" placeholder="请选择" @change="changeType">
                  <el-option
                    v-for="item in thirdCategory"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="item.categoryName">
                  </el-option>
                </el-select>
              </div>
              <div class="originalPrice"><label>商品原价</label><input type="number" v-model="productParams.originalPrice"></div>
              <div class="memberPrice"><label>会员价格</label><input type="number" v-model="productParams.memberPrice"></div>
              <div class="sortPriority"><label>排序权重</label><input type="number" v-model="productParams.sortPriority"></div>
              <div class="commodityStatus">
                <label>商品状态</label>
                <el-select v-model="value2" placeholder="请选择" @change="changeStatus">
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="secondPart">
            <input type="button" value="取消" @click="cancle">
            <input type="button" value="提交" @click="ensure">
          </div>
        </div>
      </div>
      <p-Resource @deliverMsg="changePicture" :msg="msg" class="resource"></p-Resource>
    </div>
</template>
<!-- 引入 publish Js 文件  -->
<script>
  import rq from './../../http/require.js'
  import pResource from '../../component/pictureSource.vue'
  import $ from 'jquery'
  export default {
    name: 'increaseType',
    data () {
      return {
        productParams: {
          categoryId: '',
          productName: '',
          productCode: '',
          productSold: '',
          sortPriority: '',
          productStatus: '',
          originalPrice: '',
          memberPrice: '',
          pictureIds: ''
        }, // 添加商品参数
        typeParams: {isRecycled: 1, page: 1, size: 10}, // 类别参数
        categoryList: [], // 类别列表
        value1: '', // 选中类别
        value2: '', // 选中状态
        status: [
          {
            id: 1,
            value: '上架'
          },
          {
            id: 0,
            value: '下架'
          }
        ], // 状态
        msg: [], // 图片信息
        pictureList: [], // 图片列表
        thirdCategory: [], // 三级类别
        photoList: [] // 图片ID列表
      }
    },
    methods: {
      // 提示信息
      showMessage (type, duration, message, callback) {
        this.$message({
          type: type,
          duration: duration,
          showClose: false,
          message: message,
          onClose: (el) => {
            if (callback) callback(el)
          }
        })
      },
      // 判断条件
      validator () {
        var that = this
        if (that.productParams.productName === '' || that.productParams.productName === undefined) {
          that.showMessage('info', 2000, '请输入商品名称'); return false
        } else if (that.productParams.productCode === '' || that.productParams.productCode === undefined) {
          that.showMessage('info', 2000, '请输入商品编码'); return false
        } else if (that.productParams.pictureIds === '' || that.productParams.pictureIds === undefined) {
          that.showMessage('info', 2000, '请添加商品图片'); return false
        } else if (that.productParams.categoryId === '' || that.productParams.categoryId === undefined) {
          that.showMessage('info', 2000, '请选择商品类别'); return false
        } else if (that.productParams.originalPrice === '' || that.productParams.originalPrice === undefined) {
          that.showMessage('info', 2000, '请输入商品原价'); return false
        } else if (that.productParams.memberPrice === '' || that.productParams.memberPrice === undefined) {
          that.showMessage('info', 2000, '请输入会员价格'); return false
        } else if (that.productParams.sortPriority === '' || that.productParams.sortPriority === undefined) {
          that.showMessage('info', 2000, '请输入排序权重'); return false
        } else if (that.productParams.productStatus === '' || that.productParams.productStatus === undefined) {
          that.showMessage('info', 2000, '请选择商品状态'); return false
        } else {
          return true
        }
      },
      // 调取图片资源
      transferResource: function () {
        $('.resource').css('display', 'block')
      },
      // 选择图片
      changePicture: function (msg) {
        // console.log(msg)
        var that = this
        that.pictureList.push(msg)
        console.log(that.pictureList)
        that.photoList = []
        for (var i = 0; i < that.pictureList.length; i++) {
          that.photoList.push(that.pictureList[i].id)
        }
      },
      // 类别
      changeType: function (value) {
        // console.log(val)
        var that = this
        let obj = {}
        obj = that.thirdCategory.find((item) => {
          return item.categoryName === value
        })
        // console.log(obj.id)
        that.productParams.categoryId = obj.id
      },
      // 状态
      changeStatus: function (value) {
        var that = this
        if (value === '上架') {
          that.productParams.productStatus = 1
        } else if (value === '下架') {
          that.productParams.productStatus = 0
        }
      },
      // 确定
      ensure: function () {
        var that = this
        that.productParams.pictureIds = that.photoList
        if (that.validator()) {
          rq.increaseProductList(that.productParams).then(function (data) {
            if (data.result === '成功') {
              that.showMessage('info', 2000, '添加成功')
              that.value1 = ''
              that.productParams.productName = ''
              that.productParams.productCode = ''
              that.productParams.sortPriority = ''
              that.value2 = ''
              that.productParams.originalPrice = ''
              that.productParams.memberPrice = ''
              that.pictureList = []
            } else if (data.result === '失败') {
              that.showMessage('info', 2000, '添加失败')
            }
          })
        }
      },
      // 取消
      cancle: function () {
        var that = this
        that.value1 = ''
        that.productParams.productName = ''
        that.productParams.productCode = ''
        that.productParams.sortPriority = ''
        that.value2 = ''
        that.productParams.originalPrice = ''
        that.productParams.memberPrice = ''
        that.pictureList = []
      }
    },
    mounted () {
      var that = this
      $('.resource').css('display', 'none')
      rq.searchAllCategory(that.typeParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.categoryList = data.data.data
          for (var i = 0; i < that.categoryList.length; i++) {
            if (that.categoryList[i].isParent === 0) {
              that.thirdCategory.push(that.categoryList[i])
            }
          }
        } else if (data.result === '失败') {
          that.categoryList = []
        }
      })
    },
    components: {pResource}
  }
</script>
<style>
  .commodityType .el-select,.commodityStatus .el-select{
    height: 32px;
  }
  .commodityType .el-select .el-input,.commodityStatus .el-select .el-input{
    height: 32px;
  }
  .commodityType .el-select .el-input .el-input__inner,.commodityStatus .el-select .el-input .el-input__inner{
    height: 32px;
  }
</style>
<!-- 引入 publish Scss 文件  -->
<style lang="scss" scoped>@import "scss/publish";</style>
