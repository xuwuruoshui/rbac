import request from '@/request'


const auth = {
  editAuth (authData) {
    return request.post('/sys/auth/list/' + authData.id, authData.ids)
  },

}

export default auth