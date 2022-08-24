//跨域代理前缀
const API_PROXY_PREFIX = '/api'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/login`,
  ROUTES: `${BASE_URL}/routes`,
  Core_metadata: `${BASE_URL}/core-metadata`,
  TREE: `${BASE_URL}/core-and/findTree`,
  Core_and: `${BASE_URL}/core-and`,
  yq_all: `${BASE_URL}/yq-ms/all`,
  yq_update: `${BASE_URL}/yq-ms/update`,
  yq_delete: `${BASE_URL}/yq-ms/delete`,
  yq_add: `${BASE_URL}/yq-ms/add`,
  SelectPage: `${BASE_URL}/yq-ms/selectPage`,

  te_list: `${BASE_URL}/talentExchange/list`,
  te_update: `${BASE_URL}/talentExchange/update`,
  te_add: `${BASE_URL}/talentExchange/add`,
  sq_list: `${BASE_URL}/Shequinfo/list`,
  org_list: `${BASE_URL}/orgpeopleinfo/list`,

  find_input: `${BASE_URL}/target/findInput`,
  getInput_data: `${BASE_URL}/target-hospital/getListAll`,
  get_manageList: `${BASE_URL}/target-hospital/getManageList`,
  edit_target: `${BASE_URL}/target-hospital/editTarget`,
  edit_man: `${BASE_URL}/target-hospital/editMan`,
  get_list: `${BASE_URL}/target-hospital/getList`,//获取医院结果
  
  file_upload: `${BASE_URL}/file/fileUpload`,//上传图片
  file_id: `${BASE_URL}/file/fileId`,//删除图片
  file_list: `${BASE_URL}/file/fileList`,//获取图片
  
  find_tree: `${BASE_URL}/region/findTree`,//获取多级表头


  

}
