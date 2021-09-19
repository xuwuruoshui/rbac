import request from '@/request'


const menu = {
  fetchMenuList () {
    return request.get('/sys/menu/list')
  },

  fetchMenu (id) {
    return request.get('/sys/menu/info/' + id)
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

export default menu