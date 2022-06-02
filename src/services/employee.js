import { request, METHOD } from '@/utils/request'
import { yq_all, yq_update, yq_delete, yq_add, SelectPage } from '@/services/api'


// export async function getAll() {
//     return request(yq_all, METHOD.GET)
// }
export async function getAll(current, pageSize) {
    return request(yq_all, METHOD.GET,{
        current: current,
        pageSize: pageSize, 
    })
}
export async function updateYq(data) {
    return request(yq_update, METHOD.POST, data)
}

export async function deleteYq(id) {
    return request(yq_delete, METHOD.GET, {
        id: id
    })
}
export async function addYq(data) {
    return request(yq_add, METHOD.POST, data)
}
export async function selectPage(yqMs) {
    return request(SelectPage, METHOD.POST,yqMs
    )
}

export default {
    getAll,
    updateYq,
    deleteYq,
    addYq,
    selectPage
}