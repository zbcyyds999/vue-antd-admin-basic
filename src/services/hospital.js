import { request, METHOD } from '@/utils/request'
import {
    edit_target, getInput_data, find_input, get_manageList,get_excel,get_strArray,
    find_tree, get_list, file_upload, file_id, file_list, edit_man, get_scoringList, download
} from '@/services/api'


/**
 * 获取列表数据
 * @param {医院编码} num 
 * @param {年份} years 
 * @returns 
 */
export async function getData(num, years) {
    return request(getInput_data, METHOD.GET, {
        employeeNo: num,
        years: years,
    })
}
export async function getScoringList(years) {
    return request(get_scoringList, METHOD.GET, {
        years: years
    })
}
/**
 * 修改全量数据
 * @param {*} data 
 * @returns 
 */
export async function uptarget(data) {
    return request(edit_target, METHOD.POST, data)
}
/**
 * 修改社管中心填报数据
 * @param {*} data 
 * @returns 
 */
export async function editMan(data) {
    return request(edit_man, METHOD.POST, data)
}
export async function getManageList(years) {
    return request(get_manageList, METHOD.GET, {
        years: years
    }
    )
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
export async function getStrArray(data) {
    return request(get_strArray, METHOD.POST, data)
}

export async function getExcel() {
    return request(get_excel, METHOD.GET
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

export async function Download() {
    return request(download, METHOD.GET, {
        responseType: 'blob'

    }
    )
}

export default {
    getData,
    uptarget,
    getInput,
    getTree,
    getExcel,
    editMan,
    getHsList,
    fileId,
    getStrArray,
    fileList,
    fileUpload,
    Download
}