<!--
  - paramList Vue 文件
  - @JsName paramList
  - @Description
  - @DateTime 2018/1/11 10:02
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="系统管理" mTitle2="配置管理"></m-Breadcrumb>
    <div class="paramList_content">
      <div class="query_criteria">
        <div class="query_newAdd" @click="$router.push({name:'paramConfig'})"><a>+新增</a></div>
      </div>
      <table class="paramList_table">
        <thead>
        <tr>
          <td style="width: 11%">编号</td>
          <td style="width: 11%">配置名称</td>
          <td style="width: 11%">配置编码</td>
          <td style="width: 11%">配置值</td>
          <td style="width: 11%">配置权重</td>
          <td style="width: 12%">创建时间</td>
          <td style="width: 11%">配置状态</td>
          <td style="width: 11%">配置备注</td>
          <td style="width: 11%">操作</td>
        </tr>
        </thead>
        <tbody v-if="paramsList.length!==0">
        <tr v-for="(item,index) in paramsList">
          <td>00{{index+1}}</td>
          <td>{{item.configName}}</td>
          <td>{{item.configCode}}</td>
          <td>{{item.configValue}}</td>
          <td>{{item.configWeight}}</td>
          <td>{{item.createTime|date('YYYY-MM-DD')}}</td>
          <td>{{item.configStatus|status}}</td>
          <td>{{item.configRemarks}}</td>
          <td>
            <a style="cursor: pointer;" @click="$router.push({name:'modifyParam'})">修改</a>
            <a>|</a>
            <a style="cursor: pointer;" @click="deleteParam(item.id)">删除</a>
          </td>
        </tr>
        </tbody>
        <tbody v-else-if="paramsList.length===0">
        <tr>
          <td colspan="9" >暂无数据...</td>
        </tr>
        </tbody>
      </table>
      <div class="paramList_page" v-if="paramsList.length!==0">
        <div class="pages">
          <el-pagination
            :page-size="paramsListPageSize"
            layout="prev, pager, next,jumper"
            :total="paramsListTotal"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'paramList',
    data () {
      return {
        params: {page: 1, size: 10}, // 参数
        paramsList: [], // 参数列表
        paramsListTotal: '', // 参数总条数
        paramsListPageSize: '' // 参数每页个数
      }
    },
    methods: {
      // 改变页码
      handleCurrentChange: function (val) {
        var that = this
        that.params.page = val
        rq.obtainParamConfigList(that.params).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.paramsList = data.data.data
            that.paramsListTotal = data.data.totalRecord
            that.paramsListPageSize = data.data.pageSize
          } else if (data.result === '失败') {
            that.paramsList = []
          }
        })
      },
      // 删除参数
      deleteParam: function (id) {
        var that = this
        that.$confirm('此操作将删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rq.removeParamConfig(id).then(function (data) {
            if (data.result === '成功') {
              rq.obtainParamConfigList(that.params).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.paramsList = data.data.data
                  that.paramsListTotal = data.data.totalRecord
                  that.paramsListPageSize = data.data.pageSize
                } else if (data.result === '失败') {
                  that.paramsList = []
                }
              })
            } else if (data.result === '失败') {
              that.$message({
                type: 'info',
                message: '删除失败'
              })
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
      rq.obtainParamConfigList(that.params).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.paramsList = data.data.data
          that.paramsListTotal = data.data.totalRecord
          that.paramsListPageSize = data.data.pageSize
        } else if (data.result === '失败') {
          that.paramsList = []
        }
      })
    },
    components: {
      mBreadcrumb
    },
    filters: {
      status: function (input) {
        var paramStatus = ''
        if (input === 0) {
          paramStatus = '禁用'
        } else if (input === 1) {
          paramStatus = '启用'
        }
        return paramStatus
      }
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
<!-- 引入 paramList Scss 文件  -->
<style lang="scss" scoped>@import "scss/paramList";</style>
