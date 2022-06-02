import { request, METHOD } from '@/utils/request'
import { te_list, te_add, te_update, sq_list, org_list } from '@/services/api'



export async function getAll(page, pageSize, name, sfz, visitsHospital, outReason,token) {
    return request(te_list, METHOD.GET, {
        page: page,
        pageSize: pageSize,
        name: name,
        sfz: sfz,
        visitsHospital: visitsHospital,
        outReason: outReason,
        token:token
    })
}
export async function getSqList() {
    return request(sq_list, METHOD.GET)
}
export async function getOrgList(token) {
    return request(org_list, METHOD.GET,{
        token:token
    })
}

export async function addTe(data) {
    return request(te_add, METHOD.POST, data)
}
export async function updateTe(data) {
    return request(te_update, METHOD.POST, data)
}
export default {
    getAll,
    getSqList,
    getOrgList,
    addTe,
    updateTe
}