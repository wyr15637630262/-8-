<!--
  - storeDetail.vue Vue 文件
  - @JsName storeDetail.vue
  - @Description
  - @DateTime 2017/12/6 15:41
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="订单管理" mTitle2="订单详情"></m-Breadcrumb>
    <div class="orderDetail_content">
      <!--订单信息-->
      <div class="orderMessage">
        <h4>订单信息</h4>
        <div class="order_content">
          <div class="orderContent_left">
            <div class="firstPart"><a>订单编号</a><a>：</a><a>{{orderMsg.orderCode}}</a></div>
            <div class="thirdPart"><a>订单状态</a><a>：</a><a>{{orderMsg.orderStatus|status}}</a></div>
            <div class="fourthPart"><a>订单积分</a><a>：</a><a>{{parseInt(orderMsg.payAmount*intergal[1]/intergal[0])}}</a></div>
          </div>
          <div class="orderContent_right">
            <div class="firstPart"><a>订单时间</a><a>：</a><a>{{orderMsg.createTime|date('YYYY-MM-DD')}}</a></div>
            <div class="secondPart"><a>配送费用</a><a>：</a><a>{{distributeFee}}</a></div>
            <div class="thirdPart"><a>订单门店</a><a>：</a><a>{{orderMsg.branchName}}</a></div>
          </div>
        </div>
        <div class="mark">
          <div class="mark_left">
            <a>备注信息</a><a>：</a>
          </div>
          <div class="mark_right">
            <a>{{orderMsg.memberRemark}}</a>
          </div>
        </div>
        <div class="feedBack" v-if="orderMsg.orderStatus === 4">
          <div class="feedBack_left">
            <a>用户反馈</a><a>：</a>
          </div>
          <div class="feedBack_right">
            <a>备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息
              备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息
              备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息
              备注信息备注信息备注信息备注信息备注信息备注信息备注信息。
            </a>
          </div>
        </div>
      </div>
      <!--客户信息-->
      <div class="userMessage">
        <h4>客户信息</h4>
        <div class="user_content">
          <div class="userContent_left">
            <div class="firstPart"><a>客户名称</a><a>：</a><a>{{userMsg.consigneeName}}</a></div>
            <div class="secondPart"><a>客户地址</a><a>：</a><a>{{userMsg.consigneeAddress}}</a></div>
          </div>
          <div class="userContent_right">
            <div class="firstPart"><a>客户电话</a><a>：</a><a>{{userMsg.consigneeTel}}</a></div>
          </div>
        </div>
      </div>
      <!--支付信息-->
      <div class="payMessage">
        <h4>支付信息</h4>
        <div class="pay_content">
          <div class="payContent_left">
            <div class="firstPart"><a>支付时间</a><a>：</a><a>{{orderMsg.paymentTime|date('YYYY-MM-DD')}}</a></div>
            <div class="secondPart"><a>支付金额</a><a>：</a><a>{{orderMsg.payAmount}}</a></div>
            <div class="thirdPart"><a>优惠金额</a><a>：</a><a>{{orderMsg.discountAmount}}</a></div>
          </div>
          <div class="payContent_right">
            <div class="firstPart"><a>支付账号</a><a>：</a><a>{{payMsg.loginAccount}}</a></div>
            <div class="secondPart"><a>支付类型</a><a>：</a><a>微信支付</a></div>
            <div class="thirdPart"><a>优惠类型</a><a>：</a><a>{{orderMsg.userType|discount}}</a></div>
          </div>
        </div>
      </div>
      <!--商品信息-->
      <div class="goodsMessage">
        <h4>商品信息</h4>
        <table class="goodsList">
          <thead>
          <tr>
            <td style="width: 160px;">商品图片</td>
            <td style="width: 160px;">商品信息</td>
            <td style="width: 160px;">数量</td>
            <td style="width: 160px;">价格（元）</td>
            <td style="width: 160px;">会员价格（元）</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in goodsMsg">
            <td style="width: 160px;">
              <img :src="'http://10.0.0.6:8888/'+item.productPicture" style="width: 40px;height: 40px;vertical-align: middle;">
            </td>
            <td style="width: 160px;">
              <p>{{item.productName}}</p>
            </td>
            <td style="width: 160px;">
              <p>{{item.number}}</p>
            </td>
            <td style="width: 160px;">
              <p>{{item.originalPrice}}</p>
            </td>
            <td style="width: 160px;">
              <p>{{item.memberPrice}}</p>
            </td>
          </tr>
          </tbody>
        </table>
        <p class="actual">实付金额：{{orderMsg.payAmount}}元</p>
      </div>
      <!--是否配送-->
      <input type="button" value="配送" v-if="orderMsg.orderStatus === 1" @click="changeState">
    </div>
  </div>
</template>

<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  import rq from './../../http/require.js'
  export default {
    name: 'orderDetail',
    data () {
      return {
        id: '', // 订单ID
        orderMsg: [], // 订单信息
        userMsg: [], // 用户信息
        payMsg: [], // 支付信息
        goodsMsg: [], // 商品信息
        changeParams: {id: '', orderStatus: 3}, // 更改为配送参数
        distributeFee: '', // 配送费用
        intergal: [] // 积分
      }
    },
    methods: {
      // 更改为配送中
      changeState: function () {
        var that = this
        rq.distributeStatus(that.changeParams).then(function (data) {
          if (data.result === '成功') {
            // console.log(data)
          } else if (data.result === '失败') {
          }
        })
      }
    },
    mounted () {
      var that = this
      that.id = that.$route.params.userId
      that.changeParams.id = that.$route.params.userId
      rq.obtainOrderDetail(that.id).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.orderMsg = data.data.order
          that.userMsg = data.data.orderConsigneeInfo
          that.payMsg = data.data.user
          that.goodsMsg = data.data.orderItems
          that.distributeFee = data.data.distributionFee
          // that.intergal = data.data.integralConfig
          that.intergal = data.data.integralConfig.split('=')
          // console.log(that.intergal)
        } else if (data.result === '失败') {
        }
      })
    },
    components: {
      mBreadcrumb
    },
    filters: {
      status: function (input) {
        var orderStatus = ''
        if (input === 0) {
          orderStatus = '未付款'
        } else if (input === 1) {
          orderStatus = '已付款'
        } else if (input === 2) {
          orderStatus = '配送中'
        } else if (input === 3) {
          orderStatus = '订单完成'
        } else if (input === 4) {
          orderStatus = '订单关闭'
        }
        return orderStatus
      },
      discount: function (input) {
        var status = ''
        if (input === 0) {
          status = '无'
        } else if (input === 1) {
          status = '会员折扣'
        }
        return status
      }
    }
  }
</script>
<!--引入样式-->
<style lang="scss" scoped>@import "scss/orderDetail";</style>
