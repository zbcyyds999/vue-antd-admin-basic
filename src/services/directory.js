import { request, METHOD } from '@/utils/request'
import { TREE,Core_metadata} from '@/services/api'

/**
 * 
 * @param {当前页} current 
 * @param {条目个数} size 
 * @param {树结构} id 
 * @param {} name 
 * @returns 
 */
export async function core_metadata(current, size,  name) {
  return request(Core_metadata, METHOD.GET, {
    current: current,
    size: size,
    id: 0,
    name: name,
  })
}
/**
 * 
 * @returns 查找树结构
 */
export async function getTree() {
  return request(TREE, METHOD.GET)
}

// export async function Core_and(){
//   return request(Core_and,METHOD.POST,{

//   })
// }


export default {
  getTree,
}