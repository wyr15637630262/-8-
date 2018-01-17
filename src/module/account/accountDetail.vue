<!--
  - accountDetail Vue 文件
  - @JsName accountDetail
  - @Description
  - @DateTime 2018/1/5 11:26
  - @author 亚茹
  -->
<template>
    <div>
      <m-Breadcrumb mTitle1="账号管理" mTitle2="账号详情"></m-Breadcrumb>
      <div class="accountDetail_content">
        <div class="accountTitle">
          <h3>账号信息</h3>
        </div>
        <div class="accountContent">
          <div class="fistPart">
            <div class="account"><a>账户编号</a><a>：</a><a>001</a></div>
            <div class="startTime"><a>创建时间</a><a>：</a><a>2017-12-10 16:30</a></div>
          </div>
          <div class="secondPart">
            <div class="accountName"><a>账户姓名</a><a>：</a><a>杨晨</a></div>
            <div class="accountStatus"><a>状 态</a><a>：</a><a>启用中</a></div>
          </div>
          <div class="thirdPart">
            <div class="accountNumber"><a>账 户</a><a>：</a><a>零售</a></div>
            <div class="accountPassword"><a>密 码</a><a>：</a><a>*********</a></div>
          </div>
          <div class="fourthPart">
            <div class="accountBranch"><a>所属部门</a><a>：</a><a>文一区</a></div>
            <div class="accountRole"><a>角 色</a><a>：</a><a>店长</a></div>
          </div>
          <div class="fifthPart">
            <div class="accountTime"><a>登录时间</a><a>：</a><a>2017-12-10 16:30</a></div>
            <div class="ModifyTime"><a>修改时间</a><a>：</a><a>2017-12-10 16:30</a></div>
          </div>
        </div>
        <div class="powerTitle">
          <h3>权限信息</h3>
        </div>
      </div>
    </div>
</template>

<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'accountDetail',
    data () {
      return {}
    },
    methods: {},
    mounted () {
    },
    components: {
      mBreadcrumb
    }
  }
</script>
<!-- 引入 accountDetail Scss 文件  -->
<style lang="scss" scoped>@import "scss/accountDetail";</style>
