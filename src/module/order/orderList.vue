
<template>
  <div>
    <m-Breadcrumb mTitle1="订单管理" mTitle2="订单列表"></m-Breadcrumb>
  	<div class="orderList_content">
      <div class="queryOne">
        <div class="query_name"><label>订单编号</label><input type="text"></div>
        <div class="query_date"><label>下单时间</label><input type="date"><a style="margin: 0 5px;">-</a><input type="date"></div>
        <div class="query_status">
          <label>订单状态</label>
          <el-select v-model="value1" placeholder="请选择"  @change="changeStatusValue">
            <el-option
              v-for="item in statusList"
              :key="item.statusId"
              :label="item.statusName"
              :value="item.statusName">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="queryTwo">
        <div class="query_number"><label>手机号码</label><input type="text"></div>
        <div class="query_store"><label>订单店铺</label><input type="text"></div>
        <div class="query_ensure"><input type="button" value="查询" @click="searchOrder"></div>
      </div>
      <table class="orderList_table">
        <thead>
        <tr>
          <td style="width: 15%">订单编号</td>
          <td style="width: 11%">微信昵称</td>
          <td style="width: 11%">收货人名称</td>
          <td style="width: 18%">收货人号码</td>
          <td style="width: 15%">订单店铺</td>
          <td style="width: 20%">订单时间</td>
          <td style="width: 10%">状态</td>
        </tr>
        </thead>
        <tbody v-if="orderList.length!==0">
        <tr v-for="item in orderList" @click="$router.push({name:'orderDetail',params:{userId: item.id}})">
          <td>{{item.orderCode}}</td>
          <td>{{item.userNickName}}</td>
          <td>{{item.userName}}</td>
          <td>{{item.account}}</td>
          <td>{{item.branchName}}</td>
          <td>{{item.createTime|date('YYYY-MM-DD')}}</td>
          <td>{{item.orderStatus|status}}</td>
        </tr>
        </tbody>
        <tbody v-else-if="orderList.length===0">
        <tr>
          <td colspan="7" >暂无数据...</td>
        </tr>
        </tbody>
      </table>
      <div class="orderList_page" v-if="orderList.length!==0">
        <div class="pages">
          <el-pagination
            :page-size="orderListPageSize"
            layout="prev, pager, next,jumper"
            :total="orderListTotal"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'orderList',
    data () {
      return {
        orderParams: {page: 1, size: 10}, // 订单列表参数
        orderList: [], // 订单列表
        conditionParams: {page: 1, size: 10, orderStatus: ''}, // 订单列表参数
        orderListTotal: 10, // 订单总个数
        orderListPageSize: 10, // 每页个数
        pageNumber: '',
        statusList: [
          {
            statusName: '未付款',
            statusId: 0
          }, {
            statusName: '已付款',
            statusId: 1
          }, {
            statusName: '配送中',
            statusId: 2
          }, {
            statusName: '订单完成',
            statusId: 3
          }, {
            statusName: '订单关闭',
            statusId: 4
          }
        ], // 订单状态列表
        value1: '' // 状态值
      }
    },
    methods: {
      // 改变页码
      handleCurrentChange: function (val) {
        var that = this
        that.orderParams.page = val
        rq.obtainOrderList(that.orderParams).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.orderList = data.data.data
          } else if (data.result === '失败') {
            that.orderList = []
          }
        })
      },
      // 改变状态
      changeStatusValue: function (value) {
        var that = this
        let obj = {}
        obj = that.statusList.find((item) => {
          return item.statusName === value
        })
        that.conditionParams.orderStatus = obj.statusId
        // console.log(obj.statusId)
      },
      // 查询订单
      searchOrder: function () {
        var that = this
        rq.obtainOrderList(that.conditionParams).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.orderList = data.data.data
            that.orderListTotal = data.data.totalRecord
            that.orderListPageSize = data.data.pageSize
          } else if (data.result === '失败') {
            that.orderList = []
          }
        })
      }
    },
    mounted () {
      var that = this
      rq.obtainOrderList(that.orderParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.orderList = data.data.data
          that.orderListTotal = data.data.totalRecord
          that.orderListPageSize = data.data.pageSize
        } else if (data.result === '失败') {
          that.orderList = []
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
      }
    }
  }
</script>
<style>
  .pages .el-pagination .el-pager li.number{
    margin-right: 5px;
    border:1px solid #9c9b9c;
  }
  .pages .el-pagination .el-pager li.number:hover{
    color: #ec6a47;
  }
  .pages .el-pagination button:hover{
    color: #ec6a47;
  }
  .pages .el-pagination .el-pager li.active{
    color: #494d56;
    border:1px solid #494d56;
  }
  .query_status .el-select{
    height: 32px;
  }
  .query_status .el-select .el-input{
    height: 32px;
  }
  .query_status .el-select .el-input .el-input__inner{
    height: 32px;
  }
</style>
<!--引入样式-->
<style lang="scss" scoped>@import "scss/orderList";</style>
