<!--
  - commodityBank Vue 文件
  - @JsName commodityBank
  - @Description
  - @DateTime 2017/12/19 11:34
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="商品管理" mTitle2="商品库"></m-Breadcrumb>
    <div class="commodityBank_content">
      <div class="tab">
        <ul>
          <li v-for="(tab,index) in tabs" @click="toggle(index ,tab.view)" :class="{active:active==index}">{{tab.type}}</li>
        </ul>
        <div class="tabs_right"></div>
      </div>
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  import onOffer from './onOffer.vue'
  import wareHouse from './wareHouse.vue'
  import publish from './publish.vue'
  export default {
    name: 'commodityBank',
    data () {
      return {
        active: 0,
        currentView: 'onOffer',
        tabs: [
          {
            type: '出售中',
            view: 'onOffer'
          },
          {
            type: '仓库中',
            view: 'wareHouse'
          },
          {
            type: '发布商品',
            view: 'publish'
          }
        ]
      }
    },
    methods: {
      toggle: function (i, v) {
        this.active = i
        this.currentView = v
      }
    },
    mounted () {},
    components: {
      mBreadcrumb, onOffer, wareHouse, publish
    }
  }
</script>
<!-- 引入 commodityBank Scss 文件  -->
<style lang="scss" scoped>@import "scss/commodityBank";</style>
