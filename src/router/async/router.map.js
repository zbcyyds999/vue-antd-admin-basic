// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  demo: {
    name: 'demo',
    renderMenu: false,
    component: () => import('@/pages/demo')
  },
  projectmgm021: {
    name: '项目管理',
    icon:'cluster',
    renderMenu: false,
    component: () => import('@/pages/projectmgm')
  },
  reviewmgm: {
    name: '评审管理',
    icon:'reconciliation',
    renderMenu: false,
    component: () => import('@/pages/reviewmgm')
  },
  system_settings: {
    name: '系统设置',
    renderMenu: false,
    icon:"setting",
    component: () => import('@/pages/system_settings')
  },
  log_viewing: {
    name: '日志查看',
    renderMenu: false,
    icon: "file-text",
    component: () => import('@/pages/log_viewing')
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
    redirect: '/login',
    component: view.tabs
  },
  exception: {
    name: '异常页',
    icon: 'warning',
    component: view.blank
  }
}
export default routerMap
