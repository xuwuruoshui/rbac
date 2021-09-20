import request from '@/request'


const permissions = {
  editAuth (permissionsData) {
    return request.post('/sys/permissions/list/' + permissionsData.id, permissionsData.ids)
  },

}

export default permissions