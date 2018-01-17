<!--
  - increaseType Vue 文件
  - @JsName increaseType
  - @Description
  - @DateTime 2017/12/22 17:37
  - @author 亚茹
  -->
<template>
    <div>
      <m-Breadcrumb mTitle1="商品管理" mTitle2="商品类别"></m-Breadcrumb>
      <div class="increaseType_content">
        <div class="increaseTypeContent">
          <!--类别名称-->
          <div class="categoryName">
            <label>名称</label>
            <input type="text" v-model="categoryParams.categoryName">
          </div>
          <!--父级级联-->
          <div class="categoryParent">
            <label>类别</label>
            <el-select v-model="value1" placeholder="请选择"  @change="firstValue">
              <el-option
                v-for="item in firstCategory"
                :key="item.id"
                :label="item.categoryName"
                :value="item.categoryName">
              </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="请选择" @change="secondValue">
              <el-option
                v-for="item in secondCategory"
                :key="item.id"
                :label="item.categoryName"
                :value="item.categoryName">
              </el-option>
            </el-select>
          </div>
          <!--图片-->
          <div class="categoryPicture" v-if="categoryPicExit">
            <label>图片</label>
            <div class="picture" @click="transfer()">
              <span v-if="pictureExit">+</span>
              <img :src="'http://10.0.0.17:8888/'+pictureSrc"  v-else="pictureExit">
            </div>
          </div>
          <!--排序-->
          <div class="sortPriority">
            <label>排序</label>
            <input type="number" v-model="categoryParams.sortPriority">
          </div>

          <div class="addType_bottom">
            <input type="button" value="取消" @click="categoryCancle">
            <input type="button" value="保存" @click="categorySure">
          </div>
        </div>
      </div>
      <p-Resource @deliverMsg="changePicture" :msg="msg" class="resource"></p-Resource>
    </div>
</template>

<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  import pResource from '../../component/pictureSource.vue'
  import $ from 'jquery'
  export default {
    name: 'increaseType',
    data () {
      return {
        value1: '', // 1级
        value2: '', // 2级
        typeParams: {isRecycled: 1, page: 1, size: 10}, // 商品类别参数
        pictureExit: true, // 图片标识
        pictureSrc: '', // 图片src
        msg: [], // 图片信息
        categoryParams: {
          categoryName: '',
          sortPriority: '',
          isRecycled: 1,
          pictureId: '',
          parentId: ''
        }, // 类别参数
        categoryList: [], // 类别列表
        firstCategory: [], // 一级列表
        secondCategory: [], // 二级列表
        fistId: '', // 一级ID
        secondId: '', // 二级ID
        categoryPicExit: false // 图片选项是否存在
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
        if (that.categoryParams.categoryName === '' || that.categoryParams.categoryName === undefined) {
          that.showMessage('info', 2000, '请输入类别名称'); return false
        } else if (that.categoryParams.sortPriority === '' || that.categoryParams.sortPriority === undefined) {
          that.showMessage('info', 2000, '请输入排序权重'); return false
        } else {
          return true
        }
      },
      // 调取图片
      transfer: function () {
        $('.resource').css('display', 'block')
      },
      // 添加图片
      changePicture: function (msg) {
        this.pictureParams = msg
        if (this.msg.length === 0) {
          this.pictureExit = false
          this.pictureSrc = msg.pictureSrc
          this.categoryParams.pictureId = msg.id
        } else {
          this.pictureExit = true
          this.pictureSrc = ''
        }
      },
      // 选择一级级别
      firstValue: function (value) {
        // console.log(value)
        var that = this
        let obj = {}
        obj = that.firstCategory.find((item) => {
          return item.categoryName === value
        })
        // console.log(obj.id)
        that.fistId = obj.parentId
        that.secondCategory = []
        that.value2 = ''
        for (var i = 0; i < that.categoryList.length; i++) {
          if (that.categoryList[i].parentId === obj.id) {
            that.secondCategory.push(that.categoryList[i])
          }
        }
      },
      // 选择二级级别
      secondValue: function (value) {
        // console.log(value)
        var that = this
        let obj = {}
        obj = that.secondCategory.find((item) => {
          return item.categoryName === value
        })
        console.log(obj.parentId)
        that.secondId = obj.parentId
        that.categoryPicExit = true
      },
      // 取消
      categoryCancle: function () {
        var that = this
        that.$router.push({name: 'commodityType'})
      },
      // 添加确定
      categorySure: function () {
        var that = this
        if (that.value1 === '' && that.value2 === '') {
          that.categoryParams.parentId = 0
        } else if (that.value1 !== '' && that.value2 === '') {
          that.categoryParams.parentId = that.fistId
        } else if (that.value1 !== '' && that.value2 !== '') {
          that.categoryParams.parentId = that.secondId
        }
        console.log(that.categoryParams)
        if (that.validator()) {
          rq.checkCategory(that.categoryParams.categoryName).then(function (data) {
            if (data.result === '成功') {
              rq.addCategory(that.categoryParams).then(function (data) {
                if (data.result === '成功') {
                  that.showMessage('info', 2000, '添加成功')
                  that.$router.push({name: 'commodityType'})
                } else if (data.result === '失败') {
                  that.showMessage('info', 2000, '添加失败')
                }
              })
            } else if (data.result === '失败') {
              that.showMessage('info', 2000, '类别名重复')
            }
          })
        }
      }
    },
    mounted () {
      $('.resource').css('display', 'none')
      var that = this
      rq.searchAllCategory(that.typeParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.categoryList = data.data.data
          that.firstCategory = []
          for (var i = 0; i < that.categoryList.length; i++) {
            if (that.categoryList[i].parentId === 0) {
              that.firstCategory.push(that.categoryList[i])
            }
          }
        } else if (data.result === '失败') {
          that.categoryList = []
        }
      })
    },
    components: {
      mBreadcrumb, pResource
    }
  }
</script>
<style>
  .categoryParent .el-select{
    height: 32px;
  }
  .categoryParent .el-select .el-input{
    height: 32px;
  }
  .categoryParent .el-select .el-input .el-input__inner{
    height: 32px;
  }
</style>
<!-- 引入 increaseType Scss 文件  -->
<style lang="scss" scoped>@import "scss/increaseType";</style>
