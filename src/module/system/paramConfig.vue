<!--
  - paramConfig Vue 文件
  - @JsName paramConfig
  - @Description
  - @DateTime 2018/1/4 17:42
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="系统管理" mTitle2="参数配置"></m-Breadcrumb>
    <div class="paramConfig_content">
      <div class="paramContent">
        <div class="paramName">
          <div class="paramName_left"><a>配置名称</a></div>
          <div class="paramName_right">
            <el-radio-group v-model="radio1" @change="changeRadio">
              <div class="one"><el-radio :label="1">起送价格</el-radio></div>
              <div class="two"><el-radio :label="2">配送费用</el-radio></div>
              <div class="three"><el-radio :label="3">积分配置</el-radio></div>
            </el-radio-group>
          </div>
        </div>
        <div class="paramCode">
          <div class="paramCode_left"><a>配置编码</a></div>
          <div class="paramCode_right"><input type="text" v-model="increaseIndentify.configCode"></div>
        </div>
        <div class="paramValue">
          <div class="paramValue_left"><a>配置值</a></div>
          <div class="paramValue_right" v-if="indentify"><input type="text" v-model="paramValue1"></div>
          <div class="paramValue_right" v-else="indentify"><input type="text" v-model="paramValue2"><a>元</a><a>=</a><input type="text" v-model="paramValue3"><a>元</a></div>
        </div>
        <div class="paramStatus">
          <div class="paramStatus_left"><a>配置状态</a></div>
          <div class="paramStatus_right">
            <el-select v-model="value1" placeholder="请选择" @change="changeStatusValue">
              <el-option
                v-for="item in statusList"
                :key="item.statusId"
                :label="item.statusValue"
                :value="item.statusValue">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="paramWeight">
          <div class="paramWeight_left"><a>配置权重</a></div>
          <div class="paramWeight_right"><input type="number" v-model="increaseIndentify.configWeight"></div>
        </div>
        <div class="paramRemarks">
          <div class="paramRemarks_left"><a>配置备注</a></div>
          <div class="paramRemarks_right"><textarea v-model="increaseIndentify.configRemarks"></textarea></div>
        </div>
        <div class="paramLast">
          <input type="button" value="取消" @click="paramCancle">
          <input type="button" value="确定" @click="paramEnsure">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'paramConfig',
    data () {
      return {
        radio1: 1, // 单选值
        statusList: [
          {
            statusValue: '启用',
            statusId: 0
          },
          {
            statusValue: '禁用',
            statusId: 1
          }
        ], // 状态列表
        value1: '', // 状态值
        indentify: true, // 标识
        increaseIndentify: {configName: '', configCode: '', configValue: '', configRemarks: '', configStatus: '', configWeight: ''}, // 增加参数
        paramValue1: '', // 配置值1
        paramValue2: '', // 配置值2
        paramValue3: '' // 配置值3
      }
    },
    methods: {
      // 改变配置名称
      changeRadio: function (val) {
        // console.log(val)
        if (val === 3) {
          this.indentify = false
        } else {
          this.indentify = true
        }
        if (val === 1) {
          this.increaseIndentify.configName = '起送价格'
        } else if (val === 2) {
          this.increaseIndentify.configName = '配送费用'
        } else if (val === 3) {
          this.increaseIndentify.configName = '积分配置'
        }
      },
      // 改变配置状态
      changeStatusValue: function (val) {
        let obj = {}
        obj = this.statusList.find((item) => {
          return item.statusValue === val
        })
        // console.log(obj.statusId)
        this.increaseIndentify.configStatus = obj.statusId
      },
      // 参数取消
      paramCancle: function () {
      },
      // 参数确定
      paramEnsure: function () {
        console.log(this.increaseIndentify)
      }
    },
    mounted () {
      var that = this
      rq.increaseParamConfig(that.increaseIndentify).then(function (data) {
        if (data.result === '成功') {
          console.log('成功')
        } else if (data.result === '失败') {
          console.log('失败')
        }
      })
    },
    components: {
      mBreadcrumb
    }
  }
</script>
<style>
  .paramStatus_right .el-select{
    height: 32px;
  }
  .paramStatus_right .el-select .el-input{
    height: 32px;
  }
  .paramStatus_right .el-select .el-input .el-input__inner{
    height: 32px;
  }
</style>
<!-- 引入 paramConfig Scss 文件  -->
<style lang="scss" scoped>@import "scss/paramConfig";</style>
