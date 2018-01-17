<!--
  - accountList Vue 文件
  - @JsName accountList
  - @Description
  - @DateTime 2018/1/4 17:33
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="账号管理" mTitle2="账号列表"></m-Breadcrumb>
    <div class="accountList_content">
      <div class="query_criteria">
        <div class="query_name"><label>所属部门</label><input type="text"></div>
        <div class="query_role"><label>角色</label><input type="text"></div>
        <div class="query_status">
          <label>状态</label>
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in firstCategory"
              :key="item.id"
              :label="item.categoryName"
              :value="item.categoryName">
            </el-option>
          </el-select>
        </div>
        <div class="query_ensure"><input type="button" value="查询"></div>
        <div class="query_newAdd" @click="$router.push({name:'accountAdd'})"><a>+新增</a></div>
      </div>
      <table class="accountList_table">
        <thead>
        <tr>
          <td style="width: 11%">编号</td>
          <td style="width: 11%">账号姓名</td>
          <td style="width: 11%">所属部门</td>
          <td style="width: 11%">账号</td>
          <td style="width: 11%">密码</td>
          <td style="width: 11%">角色</td>
          <td style="width: 12%">登录时间</td>
          <td style="width: 11%">账号状态</td>
          <td style="width: 11%">操作</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>001</td>
          <td>杨晨</td>
          <td>文一店</td>
          <td>11232242343</td>
          <td>*********</td>
          <td>店长</td>
          <td>2017-12-02 19:30</td>
          <td>启用中</td>
          <td>
            <a style="cursor: pointer;" @click="$router.push({name:'accountDetail'})">查看</a>
            <a>|</a>
            <a @click="$router.push({name:'accountModify'})">修改</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'accountList',
    data () {
      return {
        value1: '', // 状态值
        firstCategory: [] // 状态列表
      }
    },
    methods: {
    },
    mounted () {
    },
    components: {
      mBreadcrumb
    }
  }
</script>
<style>
  .query_status .el-select{
    height: 30px;
  }
  .query_status .el-select .el-input{
    height: 30px;
  }
  .query_status .el-select .el-input .el-input__inner{
    height: 30px;
  }
</style>
<!-- 引入 accountList Scss 文件  -->
<style lang="scss" scoped>@import "scss/accountList";</style>
