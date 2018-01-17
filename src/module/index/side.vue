<!--
  - index Vue 文件
  - @JsName index
  - @Description 首页视图
  - @DateTime 2017-10-17 12:00
  - @author 花花
  -->
<template>
  <div class="common_side">
  	<div class="menus">
      <el-menu  class="el-menu-vertical-demo" theme="dark" unique-opened router >
        <!--会员管理-->
        <el-submenu  index="1">
          <template slot="title" ><span class="el-menu-img"><span></span>会员管理</span></template>
          <el-menu-item index="memberList">会员列表</el-menu-item>
        </el-submenu>
        <!--店铺管理-->
        <el-submenu index="2">
          <template slot="title"><span class="el-menu-img"><span></span>店铺管理</span></template>
          <el-menu-item index="storeList">店铺列表</el-menu-item>
          <el-menu-item index="storeGroup">店铺分组</el-menu-item>
        </el-submenu>
        <!--商品管理-->
        <el-submenu  index="3">
          <template slot="title" ><span class="el-menu-img"><span></span>商品管理</span></template>
          <el-menu-item index="commodityTag">商品标签</el-menu-item>
          <el-menu-item index="commodityType">商品类别</el-menu-item>
          <el-menu-item index="commodityBank">商品库</el-menu-item>
        </el-submenu>
        <!--订单管理-->
        <el-submenu index="4" >
          <template slot="title"><span class="el-menu-img"><span></span>订单管理</span></template>
          <el-menu-item index="orderList">订单列表</el-menu-item>
        </el-submenu>
        <!--运营管理-->
        <el-submenu index="5" >
          <template slot="title"><span class="el-menu-img"><span></span>运营管理</span></template>
          <el-menu-item index="bannerManage">banner列表</el-menu-item>
        </el-submenu>
        <!--账号管理-->
        <el-submenu index="6" >
          <template slot="title"><span class="el-menu-img"><span></span>账号管理</span></template>
          <el-menu-item index="accountList">账号管理列表</el-menu-item>
        </el-submenu>
        <!--系统管理-->
        <el-submenu index="7" >
          <template slot="title"><span class="el-menu-img"><span></span>系统管理</span></template>
          <el-menu-item index="moduleList">模块管理</el-menu-item>
          <el-menu-item index="paramList">配置管理</el-menu-item>
          <el-menu-item index="roleList">角色管理</el-menu-item>
        </el-submenu>
        <!--资源管理-->
        <el-submenu index="8" >
          <template slot="title"><span class="el-menu-img"><span></span>资源管理</span></template>
          <el-menu-item index="resource">图片资源</el-menu-item>
        </el-submenu>
      </el-menu>

      <!--<el-menu  class="el-menu-vertical-demo" theme="dark" unique-opened router >-->
        <!--&lt;!&ndash;会员管理&ndash;&gt;-->
        <!--<el-submenu  index="1">-->
          <!--<template slot="title" ><span class="el-menu-img"><span></span>会员管理</span></template>-->
          <!--<el-menu-item index="memberList">会员列表</el-menu-item>-->
        <!--</el-submenu>-->
      <!--</el-menu>-->
      <!--<li v-for="item in girls" style="width: 100%;height: 10px;">{{item.name}}</li>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'side',
    props: {
      girls: {
        type: Array,
        required: true
      }
    },
    ready () {
      this.$watch('msg', function (newVal, oldVal) {
        console.log('newVal') // 这里再感受下值拿到了没
      })
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  .common_side{
    width: 100%;
    .menus{
      width: 100%;
      .el-menu{
        width: 100%;
        background-color: #494d56;
        .el-submenu{
          color: #ffffff;
          .el-submenu__title{
            height: 42px;
            line-height: 42px;
            border-left: 3px solid #494d56;
            &:hover{
              background: #393e48;
            }
            .el-menu-img{
              color: #ffffff;
            }
            .el-submenu__icon-arrow{
              color: #ffffff;
            }
          }
          .el-menu{
            .el-menu-item{
              color: #ffffff;
              background: #494d56;
              height: 35px;
              line-height: 35px;
              padding: 0 10px;
              &:hover{
                background: #ec6a47;
              }
            }
          }
        }
      }
    }
  }
  .menus .el-menu li.is-active .el-menu .el-menu-item.is-active{
    background: #ec6a47;
    color:#fff;
  }
  .menus .el-menu .el-submenu.is-opened .el-submenu__title{
    border-left: 3px solid #ec6a47;
  }
</style>
