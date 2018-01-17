<!--
  - storeDetail.vue Vue 文件
  - @JsName storeDetail.vue
  - @Description
  - @DateTime 2017/12/6 15:41
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="店铺管理" mTitle2="店铺详情"></m-Breadcrumb>
    <div class="storeDetail_content">
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
  import distributeArea from './distributeArea.vue'
  import detail from './detail.vue'
  export default {
    name: 'storeDetail',
    data () {
      return {
        active: 0,
        currentView: 'detail',
        tabs: [
          {
            type: '店铺详情',
            view: 'detail'
          },
          {
            type: '配送范围',
            view: 'distributeArea'
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
    mounted () {
      // console.log(this.$route.params.userId)
    },
    components: {
      mBreadcrumb, distributeArea, detail
    }
  }
</script>
<!--引入样式-->
<style lang="scss" scoped>@import "scss/storeDetail";</style>
