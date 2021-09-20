import request from '@/request'


const menu = {
  fetchMenuList () {
    return request.get('/sys/menu/list')
  },

  fetchMenu (id) {
    return request.post('/sys/menu/info/' + id)
  },
  save () {
    return null
  },
  update () {
    return null
  },
  delete (ids) {
    return ids
  }
}

export default menu