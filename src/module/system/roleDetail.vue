<!--
  - roleDetail Vue 文件
  - @JsName roleDetail
  - @Description
  - @DateTime 2018/1/12 11:00
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="系统管理" mTitle2="角色详情"></m-Breadcrumb>
    <div class="roleDetail_content">
      <h4>基本信息</h4>
      <h4>角色描述</h4>
    </div>
  </div>
</template>
<!-- 引入 roleDetail Js 文件  -->
<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'roleDetail',
    data () {
      return {
        roleBase: [], // 角色基本信息
        rolePermiss: [] // 角色权限
      }
    },
    methods: {
    },
    mounted () {
      var that = this
      var id = that.$route.params.userId
      rq.obtainRoleDetail(id).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.roleBase = data.data.role
          that.rolePermiss = data.data.hasPermissions
        } else if (data.result === '失败') {
          console.log('失败')
        }
      })
    },
    components: {
      mBreadcrumb
    }
  }
</script>
<!-- 引入 roleDetail Scss 文件  -->
<style lang="scss" scoped>@import "scss/roleDetail";</style>
