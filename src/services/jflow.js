
import { request, METHOD } from '@/utils/request'
import {getDayData, Operation ,getAllEnum} from '@/services/api'

/**
 * 获取待办列表表格数据
 * @param {*} token 
 * @param {*} FK_Flow 
 * @param {*} page 
 * @param {*} limit 
 * @param {*} searchParams 
 * @param {*} userNo 
 * @returns 
 */
 export async function getTodolistDatas(token, FK_Flow, page, limit, searchParams, userNo) {
  return request(Operation, METHOD.GET, {
      DoType: "DB_Todolist",
      Token: token,
      t: new Date().getTime(),
      FK_Flow: FK_Flow,
      page: page,
      limit: limit,
      searchParams,
      UserNo: userNo
  })
}
/**
* 获取完成列表表格数据
* @param {*} token 
* @param {*} FK_Flow 
* @param {*} page 
* @param {*} limit 
* @param {*} searchParams 
* @param {*} userNo 
* @returns 
*/
export async function getCompleteDatas(token, FK_Flow, page, limit, searchParams, userNo) {
  return request(Operation, METHOD.GET, {
      DoType: "Complete_Init",
      Token: token,
      t: new Date().getTime(),
      FK_Flow: FK_Flow,
      page: page,
      limit: limit,
      searchParams,
      UserNo: userNo
  })
  }
  /**
 * 获取在途表格数据
 * @param {*} token 
 * @param {*} FK_Flow 
 * @param {*} page 
 * @param {*} limit 
 * @param {*} searchParams 
 * @param {*} userNo 
 * @returns 
 */
export async function getRunningDatas(token, FK_Flow, page, limit, searchParams, userNo) {
  return request(Operation, METHOD.GET, {
      DoType: "DB_Runing",
      Token: token,
      t: new Date().getTime(),
      FK_Flow: FK_Flow,
      page: page,
      limit: limit,
      searchParams,
      UserNo: userNo
  })
}
/**
 * 获取页面
 * @param {*} token 
 * @param {*} WorkID 
 * @param {*} FK_Flow 
 * @param {*} FK_Node 
 * @param {*} FID 
 * @returns 
 */
export async function getPage(token, WorkID, FK_Flow, FK_Node, FID) {
  return request(Operation, METHOD.GET, {
    DoType: "GenerFrmUrl",
    Token: token,
    t: new Date().getTime(),
    WorkID: WorkID,
    FK_Flow: FK_Flow,
    FK_Node: FK_Node,
    FID: FID
  })
}
/**
 * 获取jflow 所有流程信息
 * @param {*} token 
 * @returns 
 */
export async function getJflowData(token) {
  return request(Operation, METHOD.GET, {
      DoType: "DB_Start",
      Token: token,
  })
}
/**
 * 获取日报单日查看
 * @param {*} id 
 * @param {*} status 
 * @param {*} userNo 
 * @returns 
 */
 export async function getDayDatas(id, status, userNo) {
  return request(getDayData, METHOD.GET, {
    dailyCheckId: id,
    status: status,
    UserNo: userNo
  })
}

/**
* 删除按钮
* @param {*} token 
* @param {*} WorkID 
* @param {*} flow 
* @returns 
*/
export async function DelData(token, WorkID) {
  return request(Operation, METHOD.GET, {
      DoType: "Flow_BatchDeleteByReal",
      Token: token,
      WorkIDs: WorkID,
      IsDeleteSubFlows: true
  })
}
/**
* 撤销按钮
* @param {*} token 
* @param {*} WorkID 
* @returns 
*/
export async function WithdrawData(token,WorkID) {
  return request(Operation, METHOD.GET, {
      DoType: "Flow_DoUnSend",
      Token: token,
      WorkIDs: WorkID,
  })
}

/**
 * 获取枚举类
 * @returns 
 */
 export async function getAllEnums() {
  return request(getAllEnum, METHOD.GET)
}

export default {
  getTodolistDatas,//获取待办列表表格数据
  getCompleteDatas,//获取完成列表表格数据
  getRunningDatas,//获取在途列表表格数据
  getPage,//获取页面
  getJflowData,//获取jflow所有流程信息
  DelData,//删除按钮
  WithdrawData,//撤销按钮
  getAllEnums//获取枚举类
}


