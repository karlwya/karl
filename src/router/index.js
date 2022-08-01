import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login/LoginView.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/home/HomeView.vue'),
    meta:{
      title:'首页'
    },
    children: [
      {
        path:'/',
        redirect:'/welcome'
      },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/echart/EchartView.vue'),
        meta:{
          title:'数据报表'
        }
      },
      {
        path: '/user/queryList',
        name: 'userlist',
        component: () => import('@/views/user/UserList.vue'),
        meta:{
          title:'用户列表'
        }
      },
      {
        path: '/goods/queryList',
        name: 'goodlist',
        component: () => import('@/views/goods/GoodList.vue'),
        meta:{
          title:'商品列表'
        }
      },
      {
        path: '/goods/queryList/add',
        name: 'AddGoods',
        component: () => import('@/views/goods/AddGoods.vue'),
        meta:{
          title:'添加商品'
        }
      },
      {
        path: '/goods/queryList/edit',
        name: 'EditGoods',
        component: () => import('@/views/goods/EditGoods.vue'),
        meta:{
          title:'修改商品'
        }
      },
      {
        path: '/attr/queryCategoryList',
        name: 'classlist',
        component: () => import('@/views/goods/ParamsList.vue'),
        meta:{
          title:'分类参数'
        }
      },
      {
        path: '/category/queryList',
        name: 'goodlists',
        component: () => import('@/views/goods/GoodsClassfity.vue'),
        meta:{
          title:'商品分类'
        }
      },
      {
        path: '/role/queryList',
        name: 'adminlist',
        component: () => import('@/views/jurisdiction/AdminList.vue'),
        meta:{
          title:'角色列表'
        }
      },
      {
        path: '/menu/permission',
        name: 'adminrole',
        component: () => import('@/views/jurisdiction/AdminRole.vue'),
        meta:{
          title:'权限列表'
        }
      },
      {
        path: '/order/queryList',
        name: 'orderlist',
        component: () => import('@/views/order/OrderList.vue'),
        meta:{
          title:'订单列表'
        }
      },
    ]
  },
]

const router = new VueRouter({
  routes
})




router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem('username')
  if (to.path == '/login') {
    next()
  } else if (!username) {
    next('/login')
  }
  next()
})

export default router