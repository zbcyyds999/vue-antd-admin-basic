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
            icon: 'dashboard',
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
            }
          ]
        },
        {
          path: 'parent2',
          name: '医院中心填报',
          meta: {
            icon: 'form'
          },
          component: BlankView,
          children: [
            {
              path: 'demo2',
              name: '演示页面2',
              component: () => import('@/pages/hospital'),
            }
          ]
        },
      ]
    }
  ]
}

export default options
