<!--
  - roleList Vue 文件
  - @JsName roleList
  - @Description
  - @DateTime 2018/1/11 16:15
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="系统管理" mTitle2="角色管理"></m-Breadcrumb>
    <div class="roleList_content">
      <div class="query_criteria">
        <div class="query_name"><label>角色</label><input type="text"></div>
        <div class="query_ensure"><input type="button" value="查询"></div>
        <div class="query_newAdd"><a>+新增</a></div>
      </div>
      <table class="roleList_table">
        <thead>
        <tr>
          <td style="width: 12%">序号</td>
          <td style="width: 16%">角色名称</td>
          <td style="width: 16%">角色描述</td>
          <td style="width: 16%">角色权限</td>
          <td style="width: 20%">添加时间</td>
          <td style="width: 20%">操作</td>
        </tr>
        </thead>
        <tbody v-if="roleList.length!==0">
        <tr v-for="(item,index) in roleList">
          <td style="width: 12%">00{{index+1}}</td>
          <td style="width: 16%">{{item.name}}</td>
          <td style="width: 16%">{{item.roleDes}}</td>
          <td style="width: 16%">{{item.available|status}}</td>
          <td style="width: 20%">{{item.createTime|date('YYYY-MM-DD')}}</td>
          <td style="width: 20%">
            <a @click="$router.push({name:'roleDetail',params:{userId: item.id}})">查看</a>
            <a>|</a>
            <a>修改</a>
            <a>|</a>
            <a>删除</a>
          </td>
        </tr>
        </tbody>
        <tbody v-else-if="roleList.length===0">
        <tr>
          <td colspan="6" >暂无数据...</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<!-- 引入 roleList Js 文件  -->
<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'roleList',
    data () {
      return {
        roleList: [], // 角色列表
        roleListTotal: '', // 角色总个数
        roleListPageSize: '' // 每页个数
      }
    },
    methods: {
    },
    mounted () {
      var that = this
      rq.obtainRoleList().then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.roleList = data.data
        } else if (data.result === '失败') {
          that.roleList = []
        }
      })
    },
    components: {
      mBreadcrumb
    },
    filters: {
      status: function (input) {
        var available = ''
        if (input === 0) {
          available = '禁用'
        } else if (input === 1) {
          available = '启用'
        }
        return available
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
<!-- 引入 roleList Scss 文件  -->
<style lang="scss" scoped>@import "scss/roleList";</style>
