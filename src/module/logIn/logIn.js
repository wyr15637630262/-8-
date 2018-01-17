/**
 * logIn Js 文件
 * @JsName logIn
 * @Description 登录视图Js脚本
 * @DateTime 2017-10-17 12:06
 * @author 亚茹
 */
import rq from './../../http/require.js'
export default {
  name: 'logIn',
  data () {
    return {
      isSubmit: false,
      buttonName: '登录',
      logInForm: {
        loginAccount: '',
        loginPassword: ''
      }
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
    // 判断信息
    validator () {
      var that = this
      if (that.logInForm.loginAccount === '' || that.logInForm.loginAccount === undefined) {
        that.showMessage('info', 2000, '请输入用户名'); return false
      } else if (that.logInForm.loginPassword === '' || that.logInForm.loginPassword === undefined) {
        that.showMessage('info', 2000, '请输入密码'); return false
      } else {
        return true
      }
    },
    // 登录
    submitForm: function () {
      var that = this
      if (that.validator()) {
        that.buttonName = '登录中'
        that.isSubmit = true
        rq.login(that.logInForm).then(function (data) {
          if (data.code === 10001) {
            that.showMessage('success', 1000, data.result, () => {
              that.$router.push({name: 'index', params: {menuData: data.data}})
            })
          } else if (data.code === 10010) {
            that.showMessage('warning', 1500, data.result, () => {
              that.buttonName = '登录'
              that.isSubmit = false
            })
          }
        })
      }
    }
  },
  mounted () {
  }
}
