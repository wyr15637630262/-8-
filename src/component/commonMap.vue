<!--
  - commonMap Vue 文件
  - @JsName commonMap
  - @Description
  - @DateTime 2018/1/15 10:46
  - @author 亚茹
  -->
<template>
    <div class="commonMap">
      <div id="allmap" style="width: 90%;height: 400px;margin: 10px auto;"></div>
    </div>
</template>
<!-- 引入 commonMap Js 文件  -->
<script>
  export default {
    name: 'commonMap',
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
      var map = new BMap.Map('allmap')
      var mk
      map.centerAndZoom(new BMap.Point(120.21937542, 30.25924446), 11)
      map.addControl(new BMap.MapTypeControl())
      map.setCurrentCity('杭州')
      map.enableScrollWheelZoom(true)
      var geoc = new BMap.Geocoder()
      // 单击获取点击的地址（经纬度）
      map.addEventListener('click', function (e) {
        map.removeOverlay(mk)
        mk = new BMap.Marker(e.point)
        map.addOverlay(mk)
        // 获取地址
        var pt = e.point
        geoc.getLocation(pt, function (rs) {
          var addComp = rs.addressComponents
          console.log(addComp.province + ',' + addComp.city + ',' + addComp.district + ',' + addComp.street + ',' + addComp.streetNumber)
        })
      })
      // 定位获取地址（经纬度）
      var geolocationControl = new BMap.GeolocationControl()
      geolocationControl.addEventListener('locationSuccess', function (e) {
        // console.log(e)
        // 获取地址
        var pt = e.point
        geoc.getLocation(pt, function (rs) {
          var addComp = rs.addressComponents
          console.log(addComp.province + ',' + addComp.city + ',' + addComp.district + ',' + addComp.street + ',' + addComp.streetNumber)
        })
      })
      map.addControl(geolocationControl)
    }
  }
</script>
<style lang="scss" scoped>
  .commonMap{
    width: 100%;
    height: 400px;
  }
</style>


