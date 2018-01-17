<!--
  - bannerManage Vue 文件
  - @JsName bannerManage
  - @Description
  - @DateTime 2018/1/4 15:59
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="运营管理" mTitle2="banner管理"></m-Breadcrumb>
    <div class="bannerManage_content">
      <div class="increaseBtn"><input type="button" value="新增" @click="addBanner"></div>
      <table class="bannerManage_table">
        <thead>
        <tr>
          <td style="width: 16%">编号</td>
          <td style="width: 16%">标题</td>
          <td style="width: 16%">URL</td>
          <td style="width: 16%">图片</td>
          <td style="width: 20%">创建时间</td>
          <td style="width: 16%">操作</td>
        </tr>
        </thead>
        <tbody>
        <!--<tr v-for="(item,index) in tagList">-->
          <!--<td>00{{index+1}}</td>-->
          <!--<td>{{item.labelName}}</td>-->
          <!--<td>{{item.sortPriority}}</td>-->
          <!--<td>{{item.productNumber}}</td>-->
          <!--<td>{{item.createTime|date('YYYY-MM-DD')}}</td>-->
          <!--<td>-->
            <!--<a @click="goEditor(item.labelName,item.sortPriority,item.id)">{{msg1}}</a>-->
            <!--<a style="padding: 0 10px">|</a>-->
            <!--<a @click="goDelete(item.id)">{{msg2}}</a>-->
          <!--</td>-->
        <!--</tr>-->
        <tr>
          <td>001</td>
          <td>banner1</td>
          <td>www.baidu.com</td>
          <td><img src="../../../static/images/headerLogo.jpg" alt=""></td>
          <td>2017-12-05</td>
          <td @click="editBanner"><a style="cursor: pointer;">编辑</a></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<!-- 引入 bannerManage Js 文件  -->
<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'bannerManage',
    data () {
      return {
      }
    },
    methods: {
      // 编辑
      editBanner: function () {
        this.$router.push({name: 'bannerModify'})
      },
      // 新增
      addBanner: function () {
        this.$router.push({name: 'bannerAdd'})
      }
    },
    mounted () {},
    components: {
      mBreadcrumb
    }
  }
</script>
<!-- 引入 bannerManage Scss 文件  -->
<style lang="scss" scoped>@import "scss/bannerManage";</style>
