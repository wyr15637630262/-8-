<!--
  - pictureSource Vue 文件
  - @JsName pictureSource
  - @Description
  - @DateTime 2017/12/25 13:45
  - @author 亚茹
  -->
<template>
    <div class="pictureSource">
      <div class="pictureSource_con">
        <!--标题-->
        <div class="picture_title">
            <p>我的图片</p>
        </div>
        <!--图片区域-->
        <div class="picture_main">
          <ul class="pictureMain_left">
            <li @click="unGroup">未分组</li>
            <li v-for="(item,index) in groupList" @click="selectGroup(index, item.id)">{{item.groupName}}</li>
          </ul>
          <div class="pictureMain_right">
            <div class="picture_top">
              <div class="image" v-for="(item,index) in pictureList" @click="selectPicture(index)">
                <img :src="'http://10.0.0.6:8888/'+item.pictureSrc" class="mainImg">
                <p>{{item.pictureName}}</p>
                <span class="checked"><img src="../../static/images/选中图标.png" alt=""></span>
              </div>
            </div>
            <div class="picture_bottom">
              <div class="pages">
                <el-pagination
                  :page-size="pageSize"
                  layout="prev, pager, next,jumper"
                  :total="totalRecord"
                  @current-change="handleCurrentChange">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <!---->
        <div class="picture_bottom">
          <input type="button" value="取消" @click="deliverCancle()">
          <input type="button" value="确定" @click="deliverSure()">
        </div>
      </div>
    </div>
</template>

<script>
  import rq from '../http/require.js'
  import $ from 'jquery'
  export default {
    name: 'pictureSource',
    data () {
      return {
        allPicture: {groupId: '', isRecycled: 1, page: 1, size: 10}, // 所有图片
        groupParams: {page: 1, size: 10}, // 图片分组参数
        groupList: [], // 图片分组
        pictureList: [], // 图片
        pictureParams: {groupId: 1, isRecycled: 1, page: 1, size: 10}, // 查询图片参数
        pageSize: 10, // 每页的
        totalRecord: 10, // 共有的
        imageMsg: []
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
      // 选择分组
      selectGroup: function (index, id) {
        var that = this
        $('.pictureMain_left li').eq(index + 1).addClass('active').siblings().removeClass('active')
        that.pictureParams.groupId = id
        rq.obtainPictureList(that.pictureParams).then(function (data) {
          if (data.result === '成功') {
            // console.log(data)
            that.pictureList = data.data.data
            that.pageSize = data.data.pageSize
            that.totalRecord = data.data.totalRecord
          } else if (data.result === '失败') {
            that.pictureList = []
          }
        })
      },
      // 未分组
      unGroup: function () {
        var that = this
        $('.pictureMain_left li').eq(0).addClass('active').siblings().removeClass('active')
        rq.obtainPictureList(that.allPicture).then(function (data) {
          if (data.result === '成功') {
            // console.log(data)
            that.pictureList = data.data.data
            that.pageSize = data.data.pageSize
            that.totalRecord = data.data.totalRecord
          } else if (data.result === '失败') {
            that.pictureList = []
          }
        })
      },
      // 选择图片
      selectPicture: function (index) {
        var that = this
        if ($('.image').eq(index).find('.mainImg').hasClass('imgChecked')) {
          $('.image').eq(index).find('.mainImg').removeClass('imgChecked')
          $('.image').eq(index).find('.checked').css('display', 'none')
          that.imageMsg = []
        } else {
          $('.image').eq(index).find('.mainImg').addClass('imgChecked')
          $('.image').eq(index).siblings().find('.mainImg').removeClass('imgChecked')
          $('.image').eq(index).find('.checked').css('display', 'block')
          $('.image').eq(index).siblings().find('.checked').css('display', 'none')
          that.imageMsg = that.pictureList[index]
        }
        // console.log(that.imageMsg)
      },
      // 图片分页
      handleCurrentChange: function (val) {
        var that = this
        console.log(val)
        that.allPicture.page = val
        rq.obtainPictureList(that.allPicture).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.pictureList = data.data.data
            that.pageSize = data.data.pageSize
            that.totalRecord = data.data.totalRecord
          } else if (data.result === '失败') {
            that.pictureList = []
          }
        })
      },
      // 取消
      deliverCancle: function () {
        $('.pictureSource').css('display', 'none')
      },
      // 确定
      deliverSure: function () {
        var that = this
        if (that.imageMsg.length === 0) {
          that.showMessage('info', 2000, '未添加图片')
        } else {
          $('.pictureSource').css('display', 'none')
          this.$emit('deliverMsg', that.imageMsg)
          $('.image .mainImg').removeClass('imgChecked')
          $('.image .checked').css('display', 'none')
        }
      }
    },
    mounted () {
      var that = this
      $('.pictureMain_left li').eq(0).addClass('active').siblings().removeClass('active')
      // 分组
      rq.obtainPictureGroupList(that.groupParams).then(function (data) {
        if (data.result === '成功') {
          // console.log(data)
          that.groupList = data.data.data
        } else if (data.result === '失败') {
          that.groupList = []
        }
      })
      // 图片
      rq.obtainPictureList(that.allPicture).then(function (data) {
        if (data.result === '成功') {
          // console.log(data)
          that.pictureList = data.data.data
          that.pageSize = data.data.pageSize
          that.totalRecord = data.data.totalRecord
        } else if (data.result === '失败') {
          that.pictureList = []
        }
      })
    },
    components: {
    }
  }
</script>
<style>
  .pages .el-pagination .el-pager li.number{
    margin-right: 5px;
    border:1px solid #9c9b9c;
  }
  .pages .el-pagination .el-pager li.number:hover{
    color: #ec6a47;
  }
  .pages .el-pagination button:hover{
    color: #ec6a47;
  }
  .pages .el-pagination .el-pager li.active{
    color: #494d56;
    border:1px solid #494d56;
  }
</style>
<!-- 引入 pictureSource Scss 文件  -->
<style lang="scss" scoped>@import "scss/pictureSource";</style>
