<!--
  - wareHouse Vue 文件
  - @JsName wareHouse
  - @Description
  - @DateTime 2017/12/28 16:12
  - @author 亚茹
  -->
<template>
  <div>
    <div class="wareHouse_content">
      <div class="query_criteria">
        <div class="query_name"><label>商品名称</label><input type="text"></div>
        <div class="query_category"><label>商品分类</label><input type="text"></div>
        <div class="query_ensure"><input type="button" value="查询"></div>
        <div class="query_recycled" @click="rubish()"><a>回收站</a><img src="./../../../static/images/select.png" v-show="imgShow"></div>
      </div>
      <table class="wareHouse_table">
        <thead>
        <tr>
          <td style="width: 5%">编号</td>
          <td style="width: 10%">名称</td>
          <td style="width: 13%">缩略图</td>
          <td style="width: 7%">分类</td>
          <td style="width: 6%">排序</td>
          <td style="width: 10%">原价</td>
          <td style="width: 10%">会员价</td>
          <td style="width: 10%">销量</td>
          <td style="width: 14%">创建时间</td>
          <td style="width: 15%">操作</td>
        </tr>
        </thead>
        <tbody v-if="outProductList.length!==0">
        <tr v-for="(item,index) in outProductList">
          <td>00{{index+1}}</td>
          <td>{{item.product.productName}}</td>
          <td><img :src="'http://10.0.0.4:8888/'+item.productPictureBos[0].pictureUrl" alt="" v-if="item.productPictureBos[0].pictureUrl !== undefined"></td>
          <td>{{item.category.categoryName}}</td>
          <td>{{item.product.sortPriority}}</td>
          <td>{{item.product.originalPrice}}</td>
          <td>{{item.product.memberPrice}}</td>
          <td>{{item.product.productSold}}</td>
          <td>{{item.product.createTime|date('YYYY-MM-DD')}}</td>
          <td>
            <a @click="editProduct(item.product.id)">{{msg1}}</a>
            <a>|</a>
            <a @click="deleteProduct(item.product.id)">{{msg2}}</a>
            <a>|</a>
            <a @click="stockProduct(item.product.id)">{{msg3}}</a>
          </td>
        </tr>
        </tbody>
        <tbody v-else-if="outProductList.length===0">
        <tr>
          <td colspan="10" >暂无数据...</td>
        </tr>
        </tbody>
      </table>
      <div class="wareHouse_page" v-if="outProductList.length!==0">
        <div class="pages">
          <el-pagination
            :page-size="productListPageSize"
            layout="prev, pager, next,jumper"
            :total="productListTotal"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 引入 wareHouse Js 文件  -->
<script>
  import rq from './../../http/require.js'
  export default {
    name: 'wareHouse',
    data () {
      return {
        productParams: {isRecycled: 1, page: 1, size: 10}, // 商品参数
        productParamsRecycle: {isRecycled: 0, page: 1, size: 10}, // 商品参数
        productList: [], // 商品总列表
        outProductList: [], // 仓库中商品列表
        productListTotal: 10, // 商品总个数
        productListPageSize: 10, // 每页个数
        imgShow: false, // 回收站标识
        msg1: '编辑',
        msg2: '删除',
        msg3: '上架'
      }
    },
    methods: {
      // 提示信息
      showMessage (type, duration, message, callback) {
        this.$message({
          type: type,
          duration: duration,
          showClose: false,
          message: message,
          onClose: (el) => {
            if (callback) callback(el)
          }
        })
      },
      // 改变页码
      handleCurrentChange: function () {
      },
      // 上架
      stockProduct: function (id) {
        // console.log(id)
        var that = this
        rq.shelvedProducts(id).then(function (data) {
          if (data.result === '成功') {
            rq.obtainProductList(that.productParams).then(function (data) {
              if (data.result === '成功') {
                that.productList = data.data.data
                that.outProductList = []
                for (var i = 0; i < that.productList.length; i++) {
                  if (that.productList[i].product.productStatus === 0) {
                    that.outProductList.push(that.productList[i])
                  }
                }
              } else if (data.result === '失败') {
                that.productList = []
                that.outProductList = []
              }
            })
          } else if (data.result === '失败') {
            that.showMessage('info', 2000, '恢复失败')
          }
        })
      },
      // 编辑或恢复
      editProduct: function (id) {
        // console.log(id)
        var that = this
        if (that.imgShow === false) {
          that.showMessage('info', 2000, '请删除后添加')
        } else {
          rq.resumeFromRecycled(id).then(function (data) {
            if (data.result === '成功') {
              rq.obtainProductList(that.productParamsRecycle).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.productList = data.data.data
                  that.outProductList = []
                  for (var i = 0; i < that.productList.length; i++) {
                    if (that.productList[i].product.productStatus === 0) {
                      that.outProductList.push(that.productList[i])
                    }
                  }
                } else if (data.result === '失败') {
                  that.productList = []
                  that.outProductList = []
                }
              })
            } else if (data.result === '失败') {
              that.showMessage('info', 2000, '恢复失败')
            }
          })
        }
      },
      // 移入回收站或彻底删除
      deleteProduct: function (id) {
        // console.log(id)
        var that = this
        if (that.imgShow === false) {
          // 移入回收站
          that.$confirm('此操作将删除该类别, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            rq.removeToRecycled(id).then(function (data) {
              if (data.result === '成功') {
                rq.obtainProductList(that.productParams).then(function (data) {
                  if (data.result === '成功') {
                    console.log(data)
                    that.productList = data.data.data
                    that.outProductList = []
                    for (var i = 0; i < that.productList.length; i++) {
                      if (that.productList[i].product.productStatus === 0) {
                        that.outProductList.push(that.productList[i])
                      }
                    }
                  } else if (data.result === '失败') {
                    that.productList = []
                    that.outProductList = []
                  }
                })
              } else if (data.result === '失败') {
                that.showMessage('info', 2000, '请逐级删除')
              }
            })
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          // 彻底删除
          that.$confirm('此操作将彻底删除该类别, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            rq.removeProduct(id).then(function (data) {
              if (data.result === '成功') {
                rq.obtainProductList(that.productParamsRecycle).then(function (data) {
                  if (data.result === '成功') {
                    console.log(data)
                    that.productList = data.data.data
                    that.outProductList = []
                    for (var i = 0; i < that.productList.length; i++) {
                      if (that.productList[i].product.productStatus === 0) {
                        that.outProductList.push(that.productList[i])
                      }
                    }
                  } else if (data.result === '失败') {
                    that.productList = []
                    that.outProductList = []
                  }
                })
              } else if (data.result === '失败') {
                that.showMessage('info', 2000, '请逐级删除')
              }
            })
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      },
      // 回收站
      rubish: function () {
        var that = this
        that.imgShow = !that.imgShow
        if (that.imgShow === true) {
          that.msg1 = '恢复'
          that.msg2 = '彻底删除'
          rq.obtainProductList(that.productParamsRecycle).then(function (data) {
            if (data.result === '成功') {
              console.log(data)
              that.productList = data.data.data
              that.outProductList = []
              for (var i = 0; i < that.productList.length; i++) {
                if (that.productList[i].product.productStatus === 0) {
                  that.outProductList.push(that.productList[i])
                }
              }
            } else if (data.result === '失败') {
              that.productList = []
              that.outProductList = []
            }
          })
        } else {
          that.msg1 = '编辑'
          that.msg2 = '删除'
          rq.obtainProductList(that.productParams).then(function (data) {
            if (data.result === '成功') {
              console.log(data)
              that.productList = data.data.data
              that.outProductList = []
              for (var i = 0; i < that.productList.length; i++) {
                if (that.productList[i].product.productStatus === 0) {
                  that.outProductList.push(that.productList[i])
                }
              }
            } else if (data.result === '失败') {
              that.productList = []
              that.outProductList = []
            }
          })
        }
      }
    },
    mounted () {
      var that = this
      rq.obtainProductList(that.productParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.productList = data.data.data
          that.productListTotal = data.data.totalRecord
          that.productListPageSize = data.data.pageSize
          that.outProductList = []
          for (var i = 0; i < that.productList.length; i++) {
            if (that.productList[i].product.productStatus === 0) {
              that.outProductList.push(that.productList[i])
            }
          }
        } else if (data.result === '失败') {
          that.productList = []
        }
      })
    },
    components: {}
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
</style>
<!-- 引入 wareHouse Scss 文件  -->
<style lang="scss" scoped>@import "scss/wareHouse";</style>
