import request from '@/request'
import qs from 'qs'


const role = {
  fetchRoleList (params) {
    return request.get('/sys/role/list?' + qs.stringify(params))
  },

  fetchRole (id) {
    return request.get('/sys/role/info/' + id)
  },
  save () {
    return null
  },
  update () {
    return null
  },
  delete () {
    return null
  }
}

export default role