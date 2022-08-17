import { request, METHOD } from '@/utils/request'
import { edit_target, getInput_data, find_input,find_tree, get_list } from '@/services/api'



export async function getData(num, years) {
    return request(getInput_data, METHOD.GET, {
        employeeNo: num,
        years: years,
    })
}
export async function uptarget(data) {
    return request(edit_target, METHOD.POST, data)
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
    getHsList
}