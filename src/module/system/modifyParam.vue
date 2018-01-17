<!--
  - modifyParam Vue 文件
  - @JsName modifyParam
  - @Description
  - @DateTime 2018/1/11 13:39
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="系统管理" mTitle2="修改参数"></m-Breadcrumb>
    <div class="modifyParam_content">

    </div>
  </div>
</template>
<!-- 引入 modifyParam Js 文件  -->
<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'modifyParam',
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
<!-- 引入 modifyParam Scss 文件  -->
<style lang="scss" scoped>@import "scss/modifyParam";</style>
