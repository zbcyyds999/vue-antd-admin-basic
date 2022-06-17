import { request, METHOD } from '@/utils/request'
import {getData,addData,getAllEnum} from '@/services/api'


export async function getDatas(token,page,limit) {
    return request(getData, METHOD.GET, {
        DoType: "DB_Todolist",
        Token: token,
        t: new Date().getTime(),
        FK_Flow: "021",
        searchSQL:"",
        page: page,
        limit: limit
    })
}
//  "&WorkID=0"+ "&FK_Flow=021" + "&FK_Node=0"  + "&FID=0"

export async function addDatas(token) {
    return request(addData, METHOD.GET, {
        DoType: "GenerFrmUrl",
        Token: token,
        t: new Date().getTime(),
        WorkID: '0',
        FK_Flow: "021",
        FK_Node:"0",
        FID: "0",
       
    })
}
export async function getAllEnums() {
    return request(getAllEnum, METHOD.GET)
  }
export default {
    getDatas,
    addDatas,
    getAllEnums//获取搜索条件枚举类
}
