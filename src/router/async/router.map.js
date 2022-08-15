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
  daily: {
    name: '日报填写',
    icon: 'table',
    component: view.page
  },
  dailyFill024: {
    name: '日报填写',
    icon:'cluster',
    component: () => import('@/pages/daily/dailyFill')
  },
  dailyViiew: {
    name: '日报查看',
    icon:'reconciliation',
    component: () => import('@/pages/daily/dailyViiew')
  },
  systemSettings: {
    name: '系统设置',
    icon:"setting",
    component: () => import('@/pages/exception/403')
  },
  statisticsView: {
    name: '统计查看',
    icon: "file-text",
    component: () => import('@/pages/exception/403')
  },
  operation: {
    name: '运维管理',
    component: view.page
  },
  maintenance: {
    name: '信息维护',
    component: view.page
  },
  resourcerqt: {
    name: '资源申请',
    component: view.page
  },
  TodoList027: {
    name: '待办资源',
    component: () => import('@/pages/resourcerqt/eventOrder/EventOrderList')
  },
  runningList027: {
    name: '在途资源',
    component: () => import('@/pages/resourcerqt/eventOrder/RunningList')
  },
  completedList027: {
    name: '完成资源',
    component: () => import('@/pages/resourcerqt/eventOrder/completedList')
  },
  eventMaintain: {
    name: '事件工单人员维护',
    link: 'http://10.163.78.207:8089/jflow-web/WF/CCBill/SearchEditer.htm?FrmID=Dict_SJGDRYWH'
  },
  ERP026: {
    name: '资源工单',
    component: () => import('@/pages/resourcemgm')
  },
  repairOrder: {
    name: '工单管理',
    component: view.blank
  },
  eventOrder: {
    name: '事件工单',
    component: view.blank
  },
  resourcesOrder: {
    name: '资源工单',
    // component: view.blank
    component: () => import('@/pages/exception/404')
  },
  problemOrder: {
    name: '问题工单',
    component: () => import('@/pages/exception/404')
    // component: view.blank
  },
  eventOrderList014: {
    name: '待办列表—事件',
    component: () => import('@/pages/operation/eventOrder/EventOrderList')
  },
  runningList014: {
    name: '在途列表—事件',
    component: () => import('@/pages/operation/eventOrder/RunningList')
  },
  completedList014: {
    name: '完成列表—事件',
    component: () => import('@/pages/operation/eventOrder/completedList')
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
