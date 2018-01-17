/**
 * router Js 文件
 * @JsName router
 * @Description Vue 程序路由文件
 * @DateTime 2017-10-17 13:47
 * @author 亚茹
 */
const router = [
  {
    path: '/',
    name: 'App',
    redirect: (to) => { // 重定向到路由
      return 'logIn'
    }
  },
  {
    path: '/logIn',
    name: 'logIn',
    component: resolve => require(['@/module/logIn/logIn.vue'], resolve)
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/module/index/index.vue'], resolve),
    children: [
      {
        path: '/memberList',
        name: 'memberList',
        component: resolve => require(['@/module/member/memberList.vue'], resolve)
      },
      {
        path: '/memberDetail',
        name: 'memberDetail',
        component: resolve => require(['@/module/member/memberDetail.vue'], resolve)
      },
      {
        path: '/commodityTag',
        name: 'commodityTag',
        component: resolve => require(['@/module/commodity/commodityTag.vue'], resolve)
      },
      {
        path: '/commodityType',
        name: 'commodityType',
        component: resolve => require(['@/module/commodity/commodityType.vue'], resolve)
      },
      {
        path: '/commodityBank',
        name: 'commodityBank',
        component: resolve => require(['@/module/commodity/commodityBank.vue'], resolve)
      },
      {
        path: '/increaseType',
        name: 'increaseType',
        component: resolve => require(['@/module/commodity/increaseType.vue'], resolve)
      },
      {
        path: '/editCategory',
        name: 'editCategory',
        component: resolve => require(['@/module/commodity/editCategory.vue'], resolve)
      },
      {
        path: '/orderList',
        name: 'orderList',
        component: resolve => require(['@/module/order/orderList.vue'], resolve)
      },
      {
        path: '/orderDetail',
        name: 'orderDetail',
        component: resolve => require(['@/module/order/orderDetail.vue'], resolve)
      },
      {
        path: '/storeList',
        name: 'storeList',
        component: resolve => require(['@/module/store/storeList.vue'], resolve)
      },
      {
        path: '/storeDetail',
        name: 'storeDetail',
        component: resolve => require(['@/module/store/storeDetail.vue'], resolve)
      },
      {
        path: '/distributeArea',
        name: 'distributeArea',
        component: resolve => require(['@/module/store/distributeArea.vue'], resolve)
      },
      {
        path: '/storeAdd',
        name: 'storeAdd',
        component: resolve => require(['@/module/store/storeAdd.vue'], resolve)
      },
      {
        path: '/storeModify',
        name: 'storeModify',
        component: resolve => require(['@/module/store/storeModify.vue'], resolve)
      },
      {
        path: '/storeGroup',
        name: 'storeGroup',
        component: resolve => require(['@/module/store/storeGroup.vue'], resolve)
      },
      {
        path: '/bannerManage',
        name: 'bannerManage',
        component: resolve => require(['@/module/operate/bannerManage.vue'], resolve)
      },
      {
        path: '/bannerAdd',
        name: 'bannerAdd',
        component: resolve => require(['@/module/operate/bannerAdd.vue'], resolve)
      },
      {
        path: '/bannerModify',
        name: 'bannerModify',
        component: resolve => require(['@/module/operate/bannerModify.vue'], resolve)
      },
      {
        path: '/accountList',
        name: 'accountList',
        component: resolve => require(['@/module/account/accountList.vue'], resolve)
      },
      {
        path: '/accountDetail',
        name: 'accountDetail',
        component: resolve => require(['@/module/account/accountDetail.vue'], resolve)
      },
      {
        path: '/accountModify',
        name: 'accountModify',
        component: resolve => require(['@/module/account/accountModify.vue'], resolve)
      },
      {
        path: '/accountAdd',
        name: 'accountAdd',
        component: resolve => require(['@/module/account/accountAdd.vue'], resolve)
      },
      {
        path: '/paramConfig',
        name: 'paramConfig',
        component: resolve => require(['@/module/system/paramConfig.vue'], resolve)
      },
      {
        path: '/paramList',
        name: 'paramList',
        component: resolve => require(['@/module/system/paramList.vue'], resolve)
      },
      {
        path: '/modifyParam',
        name: 'modifyParam',
        component: resolve => require(['@/module/system/modifyParam.vue'], resolve)
      },
      {
        path: '/roleList',
        name: 'roleList',
        component: resolve => require(['@/module/system/roleList.vue'], resolve)
      },
      {
        path: '/roleDetail',
        name: 'roleDetail',
        component: resolve => require(['@/module/system/roleDetail.vue'], resolve)
      },
      {
        path: '/moduleList',
        name: 'moduleList',
        component: resolve => require(['@/module/system/moduleList.vue'], resolve)
      },
      {
        path: '/resource',
        name: 'resource',
        component: resolve => require(['@/module/resource/resource.vue'], resolve)
      }
    ]
  }
]
export default router
