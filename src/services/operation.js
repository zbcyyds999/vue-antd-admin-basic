import { request, METHOD } from '@/utils/request'
import { Operation, getAllEnum } from '@/services/api'

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
export async function getDatas(token, FK_Flow, page, limit, searchParams, userNo) {
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
export async function getData(token) {
    return request(Operation, METHOD.GET, {
        DoType: "DB_Start",
        Token: token,
    })
}
/**
 * 待办页面 新增编辑按钮
 * @param {*} token 
 * @param {*} WorkID 
 * @param {*} FK_Flow 
 * @param {*} FK_Node 
 * @param {*} FID 
 * @returns 
 */
export async function addDatas(token, WorkID, FK_Flow, FK_Node, FID) {
    return request(Operation, METHOD.GET, {
        DoType: "GenerFrmUrl",
        Token: token,
        t: new Date().getTime(),
        WorkID: WorkID,
        FK_Flow: FK_Flow,
        FK_Node: FK_Node,
        FID: FID,
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
 * 获取枚举类
 * @returns 
 */
export async function getAllEnums() {
    return request(getAllEnum, METHOD.GET)
  }


export default {
    getDatas,
    getData,
    addDatas, 
    DelData,
    WithdrawData,
    getAllEnums,
    getCompleteDatas,
    getRunningDatas
}
