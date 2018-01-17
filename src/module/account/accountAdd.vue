<!--
  - accountAdd Vue 文件
  - @JsName accountAdd
  - @Description
  - @DateTime 2018/1/5 9:50
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="账号管理" mTitle2="账号新增"></m-Breadcrumb>
    <div class="accountAdd_content">
      <div class="accountContent">
        <div class="fistPart">
          <div class="accountName"><label>账号姓名</label><input type="text"></div>
          <div class="accountStatus"><label>状态</label><input type="text"></div>
        </div>
        <div class="secondPart">
          <div class="accountNumber"><label>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label><input type="text"></div>
          <div class="accountPassword"><label>密码</label><input type="password"></div>
        </div>
        <div class="thirdPart">
          <div class="accountBranch"><label>所属部门</label><input type="text"></div>
          <div class="accountRole"><label>角色</label><input type="text"></div>
        </div>
        <div class="bottomPart">
          <input type="button" value="取消">
          <input type="button" value="确定">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'accountAdd',
    data () {
      return {
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
<!-- 引入 accountAdd Scss 文件  -->
<style lang="scss" scoped>@import "scss/accountAdd";</style>
