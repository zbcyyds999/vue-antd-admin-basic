import TabsView from '@/layouts/tabs/TabsView'
// import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

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
          path: 'dailyFill',
          name: '演示页',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/daily/dailyFill')
        },
        {
          path: 'list',
          name: '列表页',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'dailyFill',
              name: '查询表格',
              meta: {
                authority: 'queryForm',
              },
              // component: () => import('@/pages/list/QueryList'),
            },
            {
              path: 'query/detail/:id',
              name: '查询详情',
        
              // component: () => import('@/pages/Demo')
            },
      
            {
              path: 'search',
              name: '搜索列表',
              // component: () => import('@/pages/list/search/SearchLayout'),
              children: [
                {
                  path: 'article',
                  name: '文章',
                  // component: () => import('@/pages/list/search/ArticleList'),
                },
                {
                  path: 'application',
                  name: '应用',
                  // component: () => import('@/pages/list/search/ApplicationList'),
                },
                {
                  path: 'project',
                  name: '项目',
                  // component: () => import('@/pages/list/search/ProjectList'),
                }
              ]
            }
          ]
        },
       
      ]
    }
  ]
}

export default options
