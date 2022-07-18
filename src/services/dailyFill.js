import { request, METHOD } from '@/utils/request'
import {getData,addData} from '@/services/api'


export async function getDatas(token,FK_Flow,page,limit,searchParams,userNo) {
    return request(getData, METHOD.GET, {
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

export default {
    getDatas,
    addDatas
}
