<!--
  - moduleList Vue 文件
  - @JsName moduleList
  - @Description
  - @DateTime 2018/1/16 16:00
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="系统管理" mTitle2="模块管理"></m-Breadcrumb>
    <div class="moduleList_content">

    </div>
  </div>
</template>
<!-- 引入 moduleList Js 文件  -->
<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'moduleList',
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
<!-- 引入 moduleList Scss 文件  -->
<style lang="scss" scoped>@import "scss/moduleList";</style>
