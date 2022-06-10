import Mock from 'mockjs'
// import { ROUTES } from '@/services/api'

// Mock.mock(RegExp(`${ROUTES}` + ".*"), 'get', () => {
  Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/routes`, 'get', () => {
  let result = {}
  result.code = 0
  result.data = [{
    router: 'root',
    children: [
      {
        router: 'demo',
        name: '验权表单',
      },
      'projectmgm',
      'reviewmgm',
      'system_settings',
      'log_viewing'
    ]
  }]
  return result
})
