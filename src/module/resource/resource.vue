<!--
  - resource Vue 文件
  - @JsName resource
  - @Description
  - @DateTime 2018/1/5 18:03
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="资源管理" mTitle2="图片资源"></m-Breadcrumb>
    <div class="resource_content">
      <div class="resourceContent">
        <div class="resource_left">
          <div class="pictureUpload">
            <el-upload
              class="avatar-uploader"
              action="http://10.0.0.8:8888/api/product/pictureUpLoad"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="group" style="position: relative;">
            <div class="buttonChild">
              <input type="button" value="修改分组" @click="reverseGroupList">
              <input type="button" value="删除分组" @click="removeGroupList">
            </div>
            <ul class="groupChild">
              <li @click="unBanked()">未分组</li>
              <li @click="recycledGroup()">回收站</li>
              <li v-for="(item,index) in groupList" @click="changeGroup(index,item.id,item.groupName)">{{item.groupName}}</li>
            </ul>
            <div class="addGroup">
              <p @click="increaseGroupList">+添加分组</p>
            </div>
            <!--修改分组-->
            <div class="reviseDialog" v-if="reviseDialogShow">
              <div class="smallDiolog"></div>
              <h5>选择分组</h5>
              <ul class="reviseDialogGroup">
                <li v-for="(item,index) in groupList"><a>{{item.groupName}}</a><span @click="reverseLi(item.id, item.groupName)">修改</span></li>
              </ul>
            </div>
            <!--删除框-->
            <div class="deleteDialog" v-if="dialogShow">
              <div class="smallDiv"></div>
              <h5>选择分组</h5>
              <ul class="dialogGroup">
                <li v-for="(item,index) in groupList"><a>{{item.groupName}}</a><span @click="removeLi(item.id)">删除</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="resource_right" v-if="imageList.length!==0">
          <div class="images_content">
            <div class="images" v-for="item in imageList">
              <img :src="'http://10.0.0.8:8888/'+ item.pictureSrc">
              <p><a @click="deletePicture(item.id)">{{msg1}}</a><a @click="modifyPicture(item.id, item.groupId, item.pictureName)">{{msg2}}</a></p>
            </div>
          </div>
          <div class="images_page" v-if="imageList.length!==0">
            <div class="pages">
              <el-pagination
                :page-size="15"
                layout="prev, pager, next,jumper"
                :total="total"
                @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="resource_right" v-if="imageList.length===0" style="padding-top: 150px;height: 687px;">
          <img src="../../../static/images/无占位图@2x.png" alt="" class="unImages">
          <h3 style="text-align: center;height: 40px;font-size: 22px;color: #e7e7e7">哎呀！还没有图片</h3>
        </div>
      </div>
    </div>
    <!--修改图片信息-->
    <div class="mask" v-if="reverseMessage">
      <div class="mask_content">
        <div class="maskC_top">
          <a>修改信息</a>
        </div>
        <div class="maskC_center">
          <div class="mc_content">
            <div class="pictureGroup">
              <label>分组</label>
              <el-select v-model="value1" placeholder="请选择"  @change="changeGroupValue">
                <el-option
                  v-for="item in groupList"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.groupName">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="maskC_bottom">
          <div class="mb_content">
            <input type="button" value="取消" @click="reverseCancle">
            <input type="button" value="保存" @click="reverseEnsure">
          </div>
        </div>
      </div>
    </div>
    <!--添加图片分组-->
    <div class="addMaskGroup" v-if="addExit">
      <div class="mask_content">
        <div class="maskC_top">
          <a>添加分组</a>
        </div>
        <div class="maskC_center">
          <div class="mc_content">
            <div class="pictureGroup">
              <label>分组名称</label>
              <input type="text" v-model="addGroupParams.groupName">
            </div>
          </div>
        </div>
        <div class="maskC_bottom">
          <div class="mb_content">
            <input type="button" value="取消" @click="increaseCancle">
            <input type="button" value="保存" @click="increaseEnsure">
          </div>
        </div>
      </div>
    </div>
    <!--修改分组名称-->
    <div class="mask" v-if="modifyMessage">
      <div class="mask_content">
        <div class="maskC_top">
          <a>修改分组名称</a>
        </div>
        <div class="maskC_center">
          <div class="mc_content">
            <div class="pictureGroup">
              <label>分组名称</label>
              <input type="text" v-model="modifyParams.groupName">
            </div>
          </div>
        </div>
        <div class="maskC_bottom">
          <div class="mb_content">
            <input type="button" value="取消" @click="modifyCancle">
            <input type="button" value="保存" @click="modifyEnsure">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 引入 resource Js 文件  -->
<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  import rq from './../../http/require.js'
  import $ from 'jquery'
  export default {
    name: 'paramConfig',
    data () {
      return {
        imageUrl: '', // 上传图片的src
        imageParam: {isRecycled: 1, page: 1, size: 15}, // 未分组图片参数
        imageParamRecycle: {isRecycled: 0, page: 1, size: 15}, // 回收站图片参数
        imageParamGroup: {isRecycled: 1, page: 1, size: 15, groupId: ''}, // 分组图片参数
        imageList: [], // 获取图片列表
        total: '', // 图片总条数
        groupParam: {page: 1, size: 10}, // 分组参数
        groupList: [], // 分组列表
        groupID: '', // 分组id
        msg1: '删除',
        msg2: '修改',
        reverseMessage: false, // 修改信息的标识
        reverseParams: {id: '', groupId: ''}, // 修改信息参数
        value1: '', // 分组值
        addExit: false, // 添加分组标识
        addGroupParams: {groupName: ''}, // 添加分组参数
        reviseDialogShow: false, // 修改分组框
        dialogShow: false, // 删除分组框
        modifyMessage: false, // 修改分组名称标识
        modifyParams: {id: '', groupName: ''} // 修改参数
      }
    },
    methods: {
      // 上传成功
      handleAvatarSuccess (res, file) {
        var that = this
        this.imageUrl = URL.createObjectURL(file.raw)
        console.log(res, file)
        rq.obtainPictureList(that.imageParam).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.imageList = data.data.data
            that.total = data.data.totalRecord
          } else if (data.result === '失败') {
            that.imageList = []
          }
        })
      },
      // 上传前
      beforeAvatarUpload (file) {
        console.log(file)
      },
      // 改变页码
      handleCurrentChange: function (val) {
        // console.log(val)
        this.imageParam.page = val
        var that = this
        rq.obtainPictureList(that.imageParam).then(function (data) {
          if (data.result === '成功') {
            // console.log(data)
            that.imageList = data.data.data
            that.total = data.data.totalRecord
          } else if (data.result === '失败') {
            that.imageList = []
          }
        })
      },
      // 选择未分组
      unBanked: function () {
        $('.groupChild li').eq(0).css('background', '#e6e2e0').siblings().css('background', '#f4f0ee')
        var that = this
        that.msg1 = '删除'
        that.msg2 = '修改'
        that.groupID = 0
        rq.obtainPictureList(that.imageParam).then(function (data) {
          if (data.result === '成功') {
            // console.log(data)
            that.imageList = data.data.data
            that.total = data.data.totalRecord
          } else if (data.result === '失败') {
            that.imageList = []
          }
        })
      },
      // 选择回收站
      recycledGroup: function () {
        $('.groupChild li').eq(1).css('background', '#e6e2e0').siblings().css('background', '#f4f0ee')
        var that = this
        that.msg1 = '恢复'
        that.msg2 = '彻底删除'
        rq.obtainPictureList(that.imageParamRecycle).then(function (data) {
          if (data.result === '成功') {
            // console.log(data)
            that.imageList = data.data.data
            that.total = data.data.totalRecord
          } else if (data.result === '失败') {
            that.imageList = []
          }
        })
      },
      // 选择其他分组
      changeGroup: function (index, id, groupName) {
        $('.groupChild li').eq(index + 2).css('background', '#e6e2e0').siblings().css('background', '#f4f0ee')
        var that = this
        that.msg1 = '删除'
        that.msg2 = '修改'
        that.groupID = 1
        that.imageParamGroup.groupId = id
        rq.obtainPictureList(that.imageParamGroup).then(function (data) {
          if (data.result === '成功') {
            // console.log(data)
            that.imageList = data.data.data
            that.total = data.data.totalRecord
          } else if (data.result === '失败') {
            that.imageList = []
          }
        })
      },
      // 删除图片以及移入回收站
      deletePicture: function (id) {
        var that = this
        if (that.msg1 === '删除') {
          that.$confirm('此操作将图片移入回收站, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            rq.removePicture(id).then(function (data) {
              if (data.result === '成功') {
                if (that.groupID === 0) {
                  rq.obtainPictureList(that.imageParam).then(function (data) {
                    if (data.result === '成功') {
                      console.log(data)
                      that.imageList = data.data.data
                      that.total = data.data.totalRecord
                    } else if (data.result === '失败') {
                      that.imageList = []
                    }
                  })
                } else if (that.groupID === 1) {
                  rq.obtainPictureList(that.imageParamGroup).then(function (data) {
                    if (data.result === '成功') {
                      console.log(data)
                      that.imageList = data.data.data
                      that.total = data.data.totalRecord
                    } else if (data.result === '失败') {
                      that.imageList = []
                    }
                  })
                }
              } else if (data.result === '失败') {
                console.log('删除失败')
              }
            })
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else if (that.msg1 === '恢复') {
          rq.backPicture(id).then(function (data) {
            if (data.result === '成功') {
              rq.obtainPictureList(that.imageParamRecycle).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.imageList = data.data.data
                  that.total = data.data.totalRecord
                } else if (data.result === '失败') {
                  that.imageList = []
                }
              })
            } else if (data.result === '失败') {
              console.log('删除失败')
            }
          })
        }
      },
      // 彻底删除以及修改图片信息
      modifyPicture: function (id, groupId, pictureName) {
        var that = this
        if (that.msg2 === '修改') {
          that.reverseMessage = true
          that.reverseParams.id = id
          that.reverseParams.groupId = groupId
        } else if (that.msg2 === '彻底删除') {
          that.$confirm('此操作将图片彻底删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            rq.deletePictures(id).then(function (data) {
              if (data.result === '成功') {
                rq.obtainPictureList(that.imageParamRecycle).then(function (data) {
                  if (data.result === '成功') {
                    console.log(data)
                    that.imageList = data.data.data
                    that.total = data.data.totalRecord
                  } else if (data.result === '失败') {
                    that.imageList = []
                  }
                })
              } else if (data.result === '失败') {
                console.log('彻底删除失败')
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
      // 修改取消
      reverseCancle: function () {
        var that = this
        that.reverseMessage = false
      },
      // 修改确定
      reverseEnsure: function () {
        var that = this
        console.log(that.reverseParams)
        rq.reversePicture(that.reverseParams).then(function (data) {
          if (data.result === '成功') {
            if (that.groupID === 0) {
              rq.obtainPictureList(that.imageParam).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.imageList = data.data.data
                  that.total = data.data.totalRecord
                } else if (data.result === '失败') {
                  that.imageList = []
                }
              })
            } else if (that.groupID === 1) {
              rq.obtainPictureList(that.imageParamGroup).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.imageList = data.data.data
                  that.total = data.data.totalRecord
                } else if (data.result === '失败') {
                  that.imageList = []
                }
              })
            }
          } else if (data.result === '失败') {
            this.$message('修改信息失败')
          }
        })
        that.reverseMessage = false
        that.value1 = ''
      },
      // 选择分组
      changeGroupValue: function (val) {
        console.log(val)
        var that = this
        let obj = {}
        obj = that.groupList.find((item) => {
          return item.groupName === val
        })
        that.reverseParams.groupId = obj.id
      },
      // 添加分组
      increaseGroupList: function () {
        var that = this
        that.addExit = true
      },
      // 添加取消
      increaseCancle: function () {
        var that = this
        that.addExit = false
      },
      // 添加确定
      increaseEnsure: function () {
        var that = this
        console.log(that.addGroupParams)
        rq.modifyGroup(that.addGroupParams).then(function (data) {
          if (data.result === '成功') {
            rq.increaseGroup(that.addGroupParams).then(function (data) {
              if (data.result === '成功') {
                rq.obtainPictureGroupList(that.groupParam).then(function (data) {
                  if (data.result === '成功') {
                    that.groupList = data.data.data
                  } else if (data.result === '失败') {
                    that.groupList = []
                  }
                })
              } else if (data.result === '失败') {
                console.log('添加失败')
              }
            })
          } else if (data.result === '失败') {
            console.log('该分组已存在')
          }
        })
        // 1111
        that.addExit = false
      },
      // 修改分组
      reverseGroupList: function () {
        var that = this
        that.reviseDialogShow =! that.reviseDialogShow
        if (that.reviseDialogShow == true) {
          that.dialogShow = false
        }
      },
      // 删除分组
      removeGroupList: function () {
        var that = this
        that.dialogShow =! that.dialogShow
        if (that.dialogShow == true) {
          that.reviseDialogShow = false
        }
      },
      // 删除分组操作
      removeLi: function (id) {
        var that = this
        that.$confirm('此操作将删除该分组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rq.removeGroup(id).then(function (data) {
            if (data.result === '成功') {
              rq.obtainPictureGroupList(that.groupParam).then(function (data) {
                if (data.result === '成功') {
                  // console.log(data)
                  that.groupList = data.data.data
                } else if (data.result === '失败') {
                  that.groupList = []
                }
              })
            } else if (data.result === '失败') {
              console.log('删除失败')
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 修改分组操作
      reverseLi: function (id, groupName) {
        var that = this
        that.modifyMessage = true
        that.modifyParams.id = id
        that.modifyParams.groupName = groupName
      },
      // 修改取消
      modifyCancle: function () {
        var that = this
        that.modifyMessage = false
      },
      // 修改确定
      modifyEnsure: function () {
        var that = this
        rq.modifyGroup(that.modifyParams).then(function (data) {
          if (data.result === '成功') {
            rq.reverseGroup(that.modifyParams).then(function (data) {
              if (data.result === '成功') {
                rq.obtainPictureGroupList(that.groupParam).then(function (data) {
                  if (data.result === '成功') {
                    // console.log(data)
                    that.groupList = data.data.data
                  } else if (data.result === '失败') {
                    that.groupList = []
                  }
                })
              } else if (data.result === '失败') {
                console.log('删除失败')
              }
            })
          } else if (data.result === '失败') {
            console.log('该分组已存在')
          }
        })
        that.modifyMessage = false
      }
    },
    mounted () {
      $('.groupChild li').eq(0).css('background', '#e6e2e0').siblings().css('background', '#f4f0ee')
      var that = this
      rq.obtainPictureList(that.imageParam).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.imageList = data.data.data
          that.total = data.data.totalRecord
        } else if (data.result === '失败') {
          that.imageList = []
        }
      })
      rq.obtainPictureGroupList(that.groupParam).then(function (data) {
        if (data.result === '成功') {
          // console.log(data)
          that.groupList = data.data.data
        } else if (data.result === '失败') {
          that.groupList = []
        }
      })
    },
    components: {
      mBreadcrumb
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #cccccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 28px 100px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
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
  .pictureGroup .el-select{
    height: 32px;
  }
  .pictureGroup .el-select .el-input{
    height: 32px;
  }
  .pictureGroup .el-select .el-input .el-input__inner{
    height: 32px;
  }
</style>
<!-- 引入 resource Scss 文件  -->
<style lang="scss" scoped>@import "scss/resource";</style>
