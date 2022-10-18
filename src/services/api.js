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
  get_list: `${BASE_URL}/target-hospital/getHospitalList`,//获取医院结果
  get_scoringList: `${BASE_URL}/target-hospital/getScoringList`,//获取按年分的医院
  hospital: `${BASE_URL}/target-hospital/Hospital`,//获取医院列表
  insert_view: `${BASE_URL}/file-view/insertView`,//提交审核意见
  get_view: `${BASE_URL}/file-view/getView`,//获取审核意见
  edit_formula: `${BASE_URL}/formula-value/upFormula`,//编辑计分页面的数据

  
  file_upload: `${BASE_URL}/file/fileUpload`,//上传图片
  file_id: `${BASE_URL}/file/fileId`,//删除图片
  file_list: `${BASE_URL}/file/fileList`,//获取图片
  
  get_strArray: `${BASE_URL}/region/getStrArray`,
  get_excel: `${BASE_URL}/region/getExcel`,//获取
  get_table: `${BASE_URL}/region/getTable`,//可编辑的单元格

  find_tree: `${BASE_URL}/region/findTree`,//获取多级表头
  download: `${BASE_URL}/file/download`,//获取excel文件流
  

}
