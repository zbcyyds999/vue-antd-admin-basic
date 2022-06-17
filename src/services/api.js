//跨域代理前缀
// const API_PROXY_PREFIX='/jflow'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
const BASE_URL2 = process.env.VUE_APP_API_BASE_URL2
module.exports = {
  LOGIN: `${BASE_URL}/user/login`,
  ROUTES: `${BASE_URL}/menu/initMenu`,
  LOGOUT: `${BASE_URL}/user/logout`,
  getData: `${BASE_URL2}/jflow-web/DataUser/DevelopAPI/ProcessRequest`,
  addData: `${BASE_URL2}/jflow-web/DataUser/DevelopAPI/ProcessRequest`,
  JflowData:`${BASE_URL2}/jflow-web`,
  getAllEnum:`${BASE_URL2}/jflow-web/api/getAllEnum
  `
}
