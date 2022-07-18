//跨域代理前缀
// const API_PROXY_PREFIX='/jflow'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/user/login`,
  ROUTES: `${BASE_URL}/menu/initMenu`,
  LOGOUT: `${BASE_URL}/user/logout`,
  getData: `jflow-web/api/getDailyWriteInfo`, 
  getViewData: `jflow-web/api/getDailyCheckInfo`,
  getDayData: `jflow-web/api/getDailyCheckDetailInfo`,
  addData: `jflow-web/DataUser/DevelopAPI/ProcessRequest`,
  DbRunningData:`jflow-web/WF/MyViewGener.htm`,
  JflowData: `jflow-web`,
  getAllEnum: `jflow-web/api/getAllEnum`,
  getPrjName: `jflow-web/api/getAllPrjNameForPeople`
}
