<!--
  - bannerManage Vue 文件
  - @JsName bannerManage
  - @Description
  - @DateTime 2018/1/4 15:59
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="运营管理" mTitle2="banner编辑"></m-Breadcrumb>
    <div class="bannerModify_content">
      <div class="msgPart">
        <div class="bannerTitle"><label>标题</label><input type="text"></div>
        <div class="bannerPicture">
          <label>图片</label>
          <div class="pic">
            <p @click="transferResource">+</p>
            <div class="picOne" v-for="item in pictureList"><img :src="'http://10.0.0.4:8888/'+item.pictureSrc" alt=""></div>
          </div>
        </div>
        <div class="bannerUrl"><label>URL</label><input type="text"></div>
        <div class="bannerMark"><label>备注</label><textarea name="" id="" cols="60" rows="4"></textarea></div>
      </div>
      <div class="msgBottom">
        <div class="msgBottom_content">
          <input type="button" value="取消">
          <input type="button" value="确定">
        </div>
      </div>
      <p-Resource @deliverMsg="changePicture" :msg="msg" class="resource"></p-Resource>
    </div>
  </div>
</template>
<!-- 引入 bannerManage Js 文件  -->
<script>
  import $ from 'jquery'
  import mBreadcrumb from './../../component/headerTag.vue'
  import pResource from '../../component/pictureSource.vue'
  export default {
    name: 'bannerModify',
    data () {
      return {
        pictureList: [] // 图片列表
      }
    },
    methods: {
      // 添加图片
      transferResource: function () {
        $('.resource').css('display', 'block')
      },
      // 选择图片
      changePicture: function (msg) {
        // console.log(msg)
        var that = this
        that.pictureList.push(msg)
        console.log(that.pictureList)
      }
    },
    mounted () {
      $('.resource').css('display', 'none')
    },
    components: {
      mBreadcrumb, pResource
    }
  }
</script>
<!-- 引入 bannerManage Scss 文件  -->
<style lang="scss" scoped>@import "scss/bannerModify";</style>
