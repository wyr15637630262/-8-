<!--
  - distributeArea Vue 文件
  - @JsName distributeArea
  - @Description
  - @DateTime 2018/1/4 13:22
  - @author 亚茹
  -->
<template>
  <div>
    <div class="distributeArea_content">
      <div class="increaseBtn"><input type="button" value="新增" @click="increase"></div>
      <table class="distributeArea_table">
        <thead>
        <tr>
          <td style="width: 20%">编号</td>
          <td style="width: 40%">配送地区</td>
          <td style="width: 40%">操作</td>
        </tr>
        </thead>
        <tbody v-if="areaList.length!==0">
        <tr v-for="(item,index) in areaList">
          <td>00{{index+1}}</td>
          <td>{{item.areaName}}</td>
          <td>
            <a @click="editArea(item.areaName,item.id)">编辑</a>
            <a style="padding: 0 5px">|</a>
            <a @click="deleteArea(item.id)">删除</a>
          </td>
        </tr>
        </tbody>
        <tbody v-else-if="areaList.length===0">
        <tr>
          <td colspan="3" >暂无数据...</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--新增小区-->
    <div class="mask" v-if="increaseExit">
      <div class="maskContent">
        <div class="maskContent_top">
          <p>新增配送小区</p>
        </div>
        <div class="maskContent_center">
          <div class="area">
            <label>小区名称</label>
            <input type="text" v-model="increaseParams.areaName">
          </div>
        </div>
        <div class="maskContent_bottom">
          <input type="button" value="取消" @click="addCancle">
          <input type="button" value="保存" @click="addEnsure">
        </div>
      </div>
    </div>
    <!--编辑小区-->
    <div class="editMask" v-if="editExit">
      <div class="editMaskContent">
        <div class="editMaskContent_top">
          <p>编辑配送小区</p>
        </div>
        <div class="editMaskContent_center">
          <div class="area">
            <label>小区名称</label>
            <input type="text" v-model="editParams.areaName">
          </div>
        </div>
        <div class="editMaskContent_bottom">
          <input type="button" value="取消" @click="editCancle">
          <input type="button" value="保存" @click="editEnsure">
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 引入 distributeArea Js 文件  -->
<script>
  import rq from './../../http/require.js'
  export default {
    name: 'storeList',
    data () {
      return {
        areaList: [], // 配送范围列表
        increaseParams: {branchId: '', areaName: ''}, // 新增参数
        editParams: {id: '', areaName: ''}, // 编辑参数
        increaseExit: false, // 新增标识
        editExit: false // 编辑标识
      }
    },
    methods: {
      // 新增
      increase: function () {
        var that = this
        that.increaseExit = true
      },
      // 新增取消
      addCancle: function () {
        var that = this
        that.increaseExit = false
        that.increaseParams.areaName = ''
      },
      // 新增确定
      addEnsure: function () {
        var that = this
        if (that.increaseParams.areaName === '') {
          that.$message('请输入信息')
        } else {
          rq.increaseArea(that.increaseParams).then(function (data) {
            if (data.result === '成功') {
              rq.obtainArea(that.increaseParams.branchId).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.areaList = data.data
                  that.increaseParams.areaName = ''
                } else if (data.result === '失败') {
                  that.areaList = []
                }
              })
            } else if (data.result === '失败') {
              that.$message('添加失败')
            }
          })
          that.increaseExit = false
        }
      },
      // 编辑
      editArea: function (areaName, id) {
        var that = this
        that.editExit = true
        that.editParams.areaName = areaName
        that.editParams.id = id
      },
      // 编辑取消
      editCancle: function () {
        var that = this
        that.editExit = false
      },
      // 编辑确定
      editEnsure: function () {
        var that = this
        if (that.editParams.areaName === '') {
          that.$message('请输入信息')
        } else {
          rq.modifyArea(that.editParams).then(function (data) {
            if (data.result === '成功') {
              rq.obtainArea(that.increaseParams.branchId).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.areaList = data.data
                } else if (data.result === '失败') {
                  that.areaList = []
                }
              })
            } else if (data.result === '失败') {
              that.$message('修改失败')
            }
          })
          that.editExit = false
        }
      },
      // 删除
      deleteArea: function (id) {
        var that = this
        that.$confirm('此操作将删除该店铺, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rq.removeArea(id).then(function (data) {
            if (data.result === '成功') {
              rq.obtainArea(that.increaseParams.branchId).then(function (data) {
                if (data.result === '成功') {
                  // console.log(data)
                  that.areaList = data.data
                } else if (data.result === '失败') {
                  that.areaList = []
                }
              })
            } else if (data.result === '失败') {
              that.$message('删除失败')
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    mounted () {
      var that = this
      var id = that.$route.params.branchId
      that.increaseParams.branchId = id
      rq.obtainArea(that.increaseParams.branchId).then(function (data) {
        if (data.result === '成功') {
          // console.log(data)
          that.areaList = data.data
        } else if (data.result === '失败') {
          that.areaList = []
        }
      })
    },
    components: {
    }
  }
</script>
<!-- 引入 distributeArea Scss 文件  -->
<style lang="scss" scoped>@import "scss/distributeArea";</style>
