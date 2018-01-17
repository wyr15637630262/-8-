<!--
  - storeAdd.vue Vue 文件
  - @JsName storeAdd.vue
  - @Description
  - @DateTime 2017/12/6 15:41
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="店铺管理" mTitle2="店铺添加"></m-Breadcrumb>
    <div class="storeAdd_content">
      <div class="storeAddContent">
        <!--店铺名称-->
        <div class="branchName">
          <label>店铺名称</label>
          <input type="text" v-model="addStoreParams.branchName">
        </div>
        <!--店铺编码-->
        <div class="branchCode">
          <label>店铺编码</label>
          <input type="number" v-model="addStoreParams.branchCode">
        </div>
        <!--店铺状态-->
        <div class="status">
          <label>店铺状态</label>
          <el-radio-group v-model="radio1">
            <el-radio :label="1">营业中</el-radio>
            <el-radio :label="2">休息中</el-radio>
            <el-radio :label="3">已注销</el-radio>
          </el-radio-group>
        </div>
        <!--店铺属性-->
        <div class="property">
          <label>店铺属性</label>
          <el-radio-group v-model="radio2">
            <el-radio :label="4">本地门店</el-radio>
            <el-radio :label="5">外地门店</el-radio>
          </el-radio-group>
        </div>
        <!--店铺分组-->
        <div class="group">
          <label>店铺分组</label>
          <el-select v-model="value" placeholder="请选择"  @change="changeValue">
            <el-option
              v-for="item in storeGroupList"
              :key="item.id"
              :label="item.groupName"
              :value="item.groupName">
            </el-option>
          </el-select>
        </div>
        <!--店铺图片-->
        <div class="picture">
          <label>店铺图片</label>
          <div class="pic">
            <p @click="transferResource">+</p>
            <div class="picOne"><img :src="'http://10.0.0.6:8888/'+pictureList.pictureSrc"></div>
          </div>
        </div>
        <!--店铺地址-->
        <div class="detailAdress">
          <label>店铺地址</label>
          <input type="text" v-model="adress">
        </div>
        <!--店铺面积-->
        <div class="acreage">
          <label>店铺面积</label>
          <input type="text" v-model="addStoreParams.acreage">
        </div>
        <!--店铺类型-->
        <div class="branchType">
          <label>店铺类型</label>
          <el-radio-group v-model="radio3">
            <el-radio :label="6">自营店</el-radio>
            <el-radio :label="7">加盟店</el-radio>
          </el-radio-group>
        </div>
        <!--商圈-->
        <div class="district">
          <label class="labelStyle">商 圈</label>
          <el-radio-group v-model="radio4">
            <el-radio :label="8">默认</el-radio>
            <el-radio :label="9">生活社区</el-radio>
            <el-radio :label="10">商业中心</el-radio>
            <el-radio :label="11">休闲娱乐</el-radio>
            <el-radio :label="12">学区</el-radio>
            <el-radio :label="13">交通枢纽</el-radio>
          </el-radio-group>
        </div>
        <!--营业时间-->
        <div class="openingTime">
          <label>营业时间</label>
          <input type="time" v-model="addStoreParams.openingTime">
          <input type="time" v-model="addStoreParams.endTime">
        </div>
        <!--管理模式-->
        <div class="manageMode">
          <label>管理模式</label>
          <el-radio-group v-model="radio5">
            <el-radio :label="14">紧密型</el-radio>
          </el-radio-group>
        </div>
        <!--起送价格-->
        <div class="reservePrice">
          <label>起送价格</label>
          <input type="number" v-model="addStoreParams.reservePrice">
        </div>
        <!--排序权重-->
        <div class="sortOrder">
          <label>排序权重</label>
          <input type="number" v-model="addStoreParams.sortOrder">
        </div>
        <!--店铺描述-->
        <div class="branchDes">
          <label>店铺描述</label>
          <textarea cols="30" rows="3" v-model="addStoreParams.branchDes"></textarea>
        </div>
      </div>
      <!--地图-->
      <div class="commonMap">
        <div id="allmap" style="width: 90%;height: 400px;margin: 10px auto;"></div>
      </div>
      <!--添加button-->
      <div class="storeAdd_button">
        <input type="button" value="保存" @click="increaseStore">
      </div>
    </div>
    <p-Resource @deliverMsg="changePicture" :msg="msg" class="resource"></p-Resource>
  </div>
</template>

<script>
  import $ from 'jquery'
  import pResource from '../../component/pictureSource.vue'
  import mBreadcrumb from './../../component/headerTag.vue'
  import rq from './../../http/require.js'
  export default {
    name: 'storeAdd',
    data () {
      return {
        storeGroupParams: {page: 1, size: 10}, // 店铺分组参数
        storeGroupList: [], // 店铺分组列表
        radio1: 1, // 店铺状态
        radio2: 4, // 店铺属性
        radio3: 6, // 店铺类型
        radio4: 8, // 商圈
        radio5: 14, // 管理模式
        value: '', // 店铺分组
        msg: [], // 图片信息
        pictureList: [], // 图片列表
        photoList: [], // 图片ID列表
        addStoreParams: {
          groupId: 1, // 分组ID
          status: '', // 店铺状态
          pictureId: '', // 店铺图片ID
          branchName: '', // 分店名称
          branchCode: '', // 分店编码
          property: '', // 分店(仓库)属性
          acreage: '', // 门店面积
          reservePrice: '', // 起送价
          branchType: '', // 门店类型
          district: '', // 商圈
          manageMode: '', // 管理模式
          sortOrder: '', // 排序权重
          openingTime: '', // 营业时间
          endTime: '', // 结束时间
          branchDes: '', // 店铺描述
          province: '', // 省份
          city: '', // 城市
          area: '', // 区域
          areaVillage: '', // 街道/小区/楼盘
          detailAddress: '', // 详细地址
          zip: '', // 邮政编码
          latitude: '', // 纬度
          longitude: '' // 经度
        }, // 添加店铺的参数
        longitude: 116.404, // 初始化的经纬度
        latitude: 39.915,
        adress: '' // 点击或是定位的地址
      }
    },
    methods: {
      // 添加门店图片
      transferResource: function () {
        $('.resource').css('display', 'block')
      },
      // 选择图片
      changePicture: function (msg) {
        var that = this
        that.pictureList = msg
        that.addStoreParams.pictureId = that.pictureList.id
      },
      // 下拉框选择
      changeValue: function (value) {
        this.value = value
        let obj = {}
        obj = this.storeGroupList.find((item) => {
          return item.groupName === value
        })
        console.log(obj.id)
        this.addStoreParams.groupId = obj.id
      },
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
      // 判断条件
      validator () {
        var that = this
        if (that.addStoreParams.branchName === '' || that.addStoreParams.branchName === undefined) {
          that.showMessage('info', 2000, '请输入名称'); return false
        } else if (that.addStoreParams.branchCode === '' || that.addStoreParams.branchCode === undefined) {
          that.showMessage('info', 2000, '请输入店铺编码'); return false
        } else if (that.addStoreParams.acreage === '' || that.addStoreParams.acreage === undefined) {
          that.showMessage('info', 2000, '请输入店铺面积'); return false
        } else if (that.addStoreParams.openingTime === '' || that.addStoreParams.openingTime === undefined) {
          that.showMessage('info', 2000, '请输入营业时间'); return false
        } else if (that.addStoreParams.endTime === '' || that.addStoreParams.endTime === undefined) {
          that.showMessage('info', 2000, '请输入结束时间'); return false
        } else if (that.addStoreParams.reservePrice === '' || that.addStoreParams.reservePrice === undefined) {
          that.showMessage('info', 2000, '请输入起送价'); return false
        } else if (that.addStoreParams.sortOrder === '' || that.addStoreParams.sortOrder === undefined) {
          that.showMessage('info', 2000, '请输入排序权重'); return false
        } else if (that.addStoreParams.branchDes === '' || that.addStoreParams.branchDes === undefined) {
          that.showMessage('info', 2000, '请输入店铺描述'); return false
        } else if (that.value === '' || that.value === undefined) {
          that.showMessage('info', 2000, '请选择分组'); return false
        } else if (that.addStoreParams.detailAddress === '' || that.addStoreParams.detailAddress === undefined) {
          that.showMessage('info', 2000, '请输入详细地址'); return false
        } else {
          return true
        }
      },
      // 增加店铺
      increaseStore: function () {
        var that = this
        that.addStoreParams.province = that.prov
        that.addStoreParams.city = that.city
        that.addStoreParams.area = that.district
        // 店铺状态
        if (that.radio1 === 1) {
          that.addStoreParams.status = 0
        } else if (that.radio1 === 2) {
          that.addStoreParams.status = 1
        } else if (that.radio1 === 3) {
          that.addStoreParams.status = 2
        }
        // 店铺属性
        if (that.radio2 === 4) {
          that.addStoreParams.property = 0
        } else if (that.radio2 === 5) {
          that.addStoreParams.property = 1
        }
        // 店铺类型
        if (that.radio3 === 6) {
          that.addStoreParams.branchType = 0
        } else if (that.radio3 === 7) {
          that.addStoreParams.branchType = 1
        }
        // 商圈
        if (that.radio4 === 8) {
          that.addStoreParams.district = 0
        } else if (that.radio4 === 9) {
          that.addStoreParams.district = 1
        } else if (that.radio4 === 10) {
          that.addStoreParams.district = 2
        } else if (that.radio4 === 11) {
          that.addStoreParams.district = 3
        } else if (that.radio4 === 12) {
          that.addStoreParams.district = 4
        } else if (that.radio4 === 14) {
          that.addStoreParams.district = 5
        }
        // 管理模式
        if (that.radio5 === 14) {
          that.addStoreParams.manageMode = 0
        }
        if (that.validator()) {
          rq.increaseStoreList(that.addStoreParams).then(function (data) {
            if (data.result === '成功') {
              console.log('111')
              that.$router.push({name: 'storeList'})
            } else if (data.result === '失败') {
              that.showMessage('info', 2000, '添加失败'); return false
            }
          })
        }
      }
    },
    mounted () {
      var that = this
      $('.resource').css('display', 'none')
      rq.obtainStoreGroupList(that.storeGroupParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.storeGroupList = data.data.data
        } else if (data.result === '失败') {
          that.storeGroupList = []
        }
      })
      var map = new BMap.Map('allmap')
      var mk
      map.centerAndZoom(new BMap.Point(120.21937542, 30.25924446), 11)
      map.addControl(new BMap.MapTypeControl())
      map.setCurrentCity('杭州')
      map.enableScrollWheelZoom(true)
      var geoc = new BMap.Geocoder()
      // 单击获取点击的地址（经纬度）
      map.addEventListener('click', function (e) {
        console.log(e)
        map.removeOverlay(mk)
        mk = new BMap.Marker(e.point)
        map.addOverlay(mk)
        that.addStoreParams.latitude = e.point.lat
        that.addStoreParams.longitude = e.point.lng
        // 获取地址
        var pt = e.point
        geoc.getLocation(pt, function (rs) {
          var addComp = rs.addressComponents
          console.log(addComp.province + ',' + addComp.city + ',' + addComp.district + ',' + addComp.street + ',' + addComp.streetNumber)
          that.adress = addComp.province + ',' + addComp.city + ',' + addComp.district + ',' + addComp.street + ',' + addComp.streetNumber
          that.addStoreParams.province = addComp.province
          that.addStoreParams.city = addComp.city
          that.addStoreParams.area = addComp.district
          that.addStoreParams.areaVillage = addComp.street
        })
      })
      // 定位获取地址（经纬度）
      var geolocationControl = new BMap.GeolocationControl()
      geolocationControl.addEventListener('locationSuccess', function (e) {
        that.addStoreParams.latitude = e.point.lat
        that.addStoreParams.longitude = e.point.lng
        // 获取地址
        var pt = e.point
        geoc.getLocation(pt, function (rs) {
          var addComp = rs.addressComponents
          console.log(addComp.province + ',' + addComp.city + ',' + addComp.district + ',' + addComp.street + ',' + addComp.streetNumber)
          that.adress = addComp.province + ',' + addComp.city + ',' + addComp.district + ',' + addComp.street + ',' + addComp.streetNumber
          that.addStoreParams.province = addComp.province
          that.addStoreParams.city = addComp.city
          that.addStoreParams.area = addComp.district
          that.addStoreParams.areaVillage = addComp.street
        })
      })
      map.addControl(geolocationControl)
    },
    components: {
      mBreadcrumb, pResource
    }
  }
</script>
<style>
  .group .el-select{
    height: 32px;
  }
  .group .el-select .el-input{
    height: 32px;
  }
  .group .el-select .el-input .el-input__inner{
    height: 32px;
  }
</style>
<!--引入样式-->
<style lang="scss" scoped>@import "scss/storeAdd";</style>
