import { request, METHOD } from '@/utils/request'
import { edit_target, getInput_data, find_input, find_tree, get_list, file_upload, file_id, file_list } from '@/services/api'



export async function getData(num, years) {
    return request(getInput_data, METHOD.GET, {
        employeeNo: num,
        years: years,
    })
}
export async function uptarget(data) {
    return request(edit_target, METHOD.POST, data)
}
export async function fileUpload(data) {
    return request(file_upload, METHOD.POST, data,
        { Headers: { 'Content-Type': 'multipart/file' } })
}
export async function fileId(id) {
    return request(file_id, METHOD.GET, {
        id: id
    }
    )
}
export async function fileList(num) {
    return request(file_list, METHOD.GET, {
        employeeNo: num
    })
}
export async function getInput() {
    return request(find_input, METHOD.GET
    )
}

export async function getTree() {
    return request(find_tree, METHOD.GET
    )
}
/**
 * 获取医院列表
 */
export async function getHsList(num) {
    return request(get_list, METHOD.GET, {
        employeeNo: num
    })
}



export default {
    getData,
    uptarget,
    getInput,
    getTree,
    getHsList,
    fileId,
    fileList,
    fileUpload
}