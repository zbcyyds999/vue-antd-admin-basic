import { request, METHOD } from '@/utils/request'
import {getData,addData,getAllEnum,getPrjName} from '@/services/api'


export async function getDatas(token,FK_Flow,page,limit,searchParams,) {
    return request(getData, METHOD.GET, {
        DoType: "DB_Todolist",
        Token: token,
        t: new Date().getTime(),
        FK_Flow: FK_Flow,
        page: page,
        limit: limit,
        searchParams
    })
}

//  "&WorkID=0"+ "&FK_Flow=021" + "&FK_Node=0"  + "&FID=0"

export async function addDatas(token,WorkID,FK_Flow,FK_Node,FID) {
    return request(addData, METHOD.GET, {
        DoType: "GenerFrmUrl",
        Token: token,
        t: new Date().getTime(),
        WorkID: WorkID,
        FK_Flow: FK_Flow,
        FK_Node:FK_Node,
        FID: FID,
    })
}
export async function getPrjNames(fk_Flow,userNo) {
    return request(getPrjName, METHOD.GET, {
        fk_Flow: fk_Flow,
        userNo:userNo
    })
}
export async function getAllEnums() {
    return request(getAllEnum, METHOD.GET)
  }
export default {
    getDatas,
    addDatas,
    getAllEnums,//获取搜索条件枚举类
    getPrjNames//获取角色项目名称
}
