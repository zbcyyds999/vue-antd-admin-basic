// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
  // login: {
  //   authority: '*',
  //   path: '/exchange',
  //   component: () => import('@/pages/exchange')
  // },
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },
  root: {
    path: '/',
    name: '首页',
    redirect: '/exchange',
    component: view.tabs
  },
  parent1: {
    name: '父级路由1',
    icon: 'dashboard',
    component: view.blank
  },
  test: {
    name: '测试页',
    icon: 'dashboard',
    component: view.blank
  },
  employee: {
    name: '员工健康信息',
    path: 'employee',
    component: () => import('@/pages/employee')
  },
  exchange: {
    name: '医院信息',
    path: 'exchange',
    component: () => import('@/pages/hospital')
  }
}
export default routerMap
