<!--
  - editCategory Vue 文件
  - @JsName editCategory
  - @Description
  - @DateTime 2017/12/27 10:03
  - @author 亚茹
  -->
<template>
    <div>
      <m-Breadcrumb mTitle1="商品管理" mTitle2="商品类别"></m-Breadcrumb>
      <div class="editType_content">
        <div class="editTypeContent">
          <!--类别名称-->
          <div class="categoryName">
            <label>名称</label>
            <input type="text" v-model="modifyTypeParams.categoryName">
          </div>
          <!--父级-->
          <div class="categoryParent">
            <label>级别</label>
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
              <img :src="'http://10.0.0.4:8888/'+pictureSrc"  v-else="pictureExit">
            </div>
          </div>
          <!--排序-->
          <div class="sortPriority">
            <label>排序</label>
            <input type="number" v-model="modifyTypeParams.sortPriority">
          </div>

          <div class="editType_bottom">
            <input type="button" value="取消" @click="categoryCancle">
            <input type="button" value="保存" @click="categorySure">
          </div>
        </div>
      </div>
      <p-Resource @deliverMsg="change" :msg="msg" class="resource"></p-Resource>
    </div>
</template>
<!-- 引入 editCategory Js 文件  -->
<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  import pResource from '../../component/pictureSource.vue'
  import $ from 'jquery'
  export default {
    name: 'editCategory',
    data () {
      return {
        pictureExit: true, // 图片标识
        pictureSrc: '', // 图片src
        msg: [], // 图片信息
        modifyTypeParams: {
          id: '',
          categoryName: '',
          isParent: '',
          sortPriority: '',
          isRecycled: 1,
          parentId: ''
        }, // 修改类别参数
        value1: '', // 1级
        value2: '', // 2级
        typeParams: {isRecycled: 1, page: 1, size: 10}, // 商品类别参数
        categoryValue: [], // 编辑前类别值
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
        if (that.modifyTypeParams.categoryName === '' || that.modifyTypeParams.categoryName === undefined) {
          that.showMessage('info', 2000, '请输入类别名称'); return false
        } else if (that.modifyTypeParams.sortPriority === '' || that.modifyTypeParams.sortPriority === undefined) {
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
      change: function (msg) {
        this.pictureParams = msg
        if (this.msg.length === 0) {
          this.pictureExit = false
          this.pictureSrc = msg.pictureSrc
          this.modifyTypeParams.pictureId = msg.id
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
      // 修改确定
      categorySure: function () {
        var that = this
        if (that.value1 === '' && that.value2 === '') {
          that.modifyTypeParams.parentId = 0
          that.modifyTypeParams.isParent = 1
        } else if (that.value1 !== '' && that.value2 === '') {
          that.modifyTypeParams.parentId = that.fistId
          that.modifyTypeParams.isParent = 0
        } else if (that.value1 !== '' && that.value2 !== '') {
          that.modifyTypeParams.parentId = that.secondId
          that.modifyTypeParams.isParent = 0
        }
        if (that.validator()) {
          rq.checkCategory(that.modifyTypeParams.categoryName).then(function (data) {
            if (data.result === '成功') {
              rq.modifyCategory(that.modifyTypeParams).then(function (data) {
                if (data.result === '成功') {
                  that.showMessage('info', 2000, '修改成功')
                  that.$router.push({name: 'commodityType'})
                } else if (data.result === '失败') {
                  that.showMessage('info', 2000, '修改失败')
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
      this.categoryValue = this.$route.params.categoryParams[0]
      // console.log(this.categoryValue)
      this.modifyTypeParams.id = this.categoryValue.id
      this.modifyTypeParams.categoryName = this.categoryValue.categoryName
      this.modifyTypeParams.sortPriority = this.categoryValue.sortPriority
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
<!-- 引入 editCategory Scss 文件  -->
<style lang="scss" scoped>@import "scss/editCategory";</style>
