import request from '@/request'


const menu = {
    fetchMenuList() {
        return request.get('/sys/menu/list')
    }
}

export default menu