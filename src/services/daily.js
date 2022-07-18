import { request, METHOD } from '@/utils/request'
import {getViewData,getDayData,addData} from '@/services/api'

export async function getViewDatas(token,FK_Flow,page,limit,searchParams,userNo) {
    return request(getViewData, METHOD.GET, {
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

export async function getDayDatas(id,status,userNo) {
    return request(getDayData, METHOD.GET, {
        dailyCheckId: id,
        status:status,
        UserNo: userNo
    })
}
export async function getOneEvent(token,WorkID,FK_Flow,FK_Node,FID) {
    return request(addData, METHOD.GET, {
        DoType: "GenerFrmUrl",
        Token: token,
        t: new Date().getTime(),
        WorkID: WorkID,
        FK_Flow: FK_Flow,
        FK_Node:FK_Node,
        FID: FID
       
    })
}


export default {
    getViewDatas,
    getDayDatas,
    getOneEvent
}
