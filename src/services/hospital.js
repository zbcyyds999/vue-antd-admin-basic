import { request, METHOD } from '@/utils/request'
import { edit_target, getInput_data,find_input } from '@/services/api'



export async function getData(num, years) {
    return request(getInput_data, METHOD.GET,{
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

export default {
    getData,
    uptarget,
    getInput
}