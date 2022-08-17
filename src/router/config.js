import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'test',
          name: '医院填报',
          meta: {
            icon: 'medicine-box',
          },
          component: BlankView,
          children: [
            {
              path: 'employee',
              name: '员工健康信息',
              component: () => import('@/pages/employee'),
            },
            {
              name: '医院信息',
              path: 'exchange',
              component: () => import('@/pages/exchange'),
            },
            {
              path: 'performance',
              name: '绩效填报',
              component: () => import('@/pages/hospital'),
            },
            {
              path: 'resultList',
              name: '结果查询',
              component: () => import('@/pages/hospital_list'),
            },
            {
              path: 'upload',
              name: '附件上传',
              component: () =>import('@/pages/hospital_up')
          },
          ]
        },
        {
          path: 'parent2',
          name: '医管中心填报',
          meta: {
            icon: 'user'
          },
          component: BlankView,
          children: [
            {
              path: 'medical',
              name: '医管中心填报',
              // component: () => import('@/pages/hospital_manage')
          },
          {
              path: 'scoring',
              name: '计分页面',
              component: () => import('@/pages/scoring_new')
          
          },
          {
              path: 'manageList',
              name: '医管中心上传',
              // component: () => import('@/pages/manage_list')
          },
         
          {
              path: 'annexAudit',
              name: '附件审核',
              // component: () => import('@/pages/manage_audit')
          },
          ]
        },
      ]
    }
  ]
}

export default options
