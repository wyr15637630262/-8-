<!--
  - detail Vue 文件
  - @JsName detail
  - @Description
  - @DateTime 2018/1/17 10:31
  - @author 亚茹
  -->
<template>
  <div>
    <div class="detail_content">
      <div class="detailContent">
        <div class="firstPart">
          <div class="firstPart_left">
            <a>门店编号</a><a>：</a><a>001</a>
          </div>
          <div class="firstPart_right">
            <a>门店名称</a><a>：</a><a>文一店西</a>
          </div>
        </div>
        <div class="secondPart">
          <div class="secondPart_left">
            <a>门店类型</a><a>：</a><a>自营型</a>
          </div>
          <div class="secondPart_right">
            <a>店长姓名</a><a>：</a><a>杨晨</a>
          </div>
        </div>
        <div class="thirdPart">
          <div class="thirdPart_left">
            <a>店长电话</a><a>：</a><a>12888903345</a>
          </div>
          <div class="thirdPart_right">
            <a>门店地址</a><a>：</a><a>文一西路369号</a>
          </div>
        </div>
        <div class="fourthPart">
          <a>门店照片</a><a>：</a><img src="../../../static/images/logo.png">
        </div>
        <div class="fifthPart">
          <a>门店地址</a><a>：</a>
          <div class="adressPicture"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 引入 detail Js 文件  -->
<script>
  import rq from './../../http/require.js'
  export default {
    name: 'detail',
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
      var that = this
      console.log(that.$route.params.branchId)
//      var id = that.$route.params.branchId
//      rq.obtainArea(that.increaseParams.branchId).then(function (data) {
//        if (data.result === '成功') {
//          // console.log(data)
//          that.areaList = data.data
//        } else if (data.result === '失败') {
//          that.areaList = []
//        }
//      })
    },
    components: {
    }
  }
</script>
<!-- 引入 detail Scss 文件  -->
<style lang="scss" scoped>@import "scss/detail";</style>
