const Mock = require('mockjs')

const Random = Mock.Random

let result = {
  code: 200,
  msg: '操作成功',
  data: null,
}

Mock.mock('/captcha', 'get', () => {
  result.data = {
    token: Random.string(32),
    captchaImg: Random.dataImage('120x40', 'p7n5w'),
  }
  return result
})

Mock.mock('/login', 'post', () => {
  // 无法在header中传入数jwt

  // result.code = 400
  // result.msg = "验证码错误"
  result.data = {
    headers: 'fsadefsdffdsfa',
  }
  return result
})

Mock.mock('/sys/userInfo', 'get', () => {
  result.data = {
    id: 1,
    username: 'xuwuruoshui',
    avatar:
      'https://lh3.googleusercontent.com/a-/AOh14GhddEhe0Z-13D2_uMWfLtKcoAOKyyXIqecKI_79=s96-c-rg-br100',
  }

  return result
})

// 获取用户菜单以及权限接口
Mock.mock('/sys/menu/nav', 'get', () => {
  let nav = [
    {
      path: '/sys',
      name: 'SysManga',
      title: '系统管理',
      icon: 'el-icon-s-operation',
      component: 'sys/Users',
      children: [
        {
          path: '/sys/users',
          name: 'SysUser',
          title: '用户管理',
          icon: 'el-icon-s-custom',
          component: 'sys/Users',
        },
        {
          path: '/sys/roles',
          name: 'SysRole',
          title: '角色管理',
          icon: 'el-icon-rank',
          component: 'sys/Roles',
        },
        {
          path: '/sys/menus',
          name: 'SysMenu',
          title: '菜单管理',
          icon: 'el-icon-menu',
          component: 'sys/Menus',
        }
      ]
    },
    {
      name: 'SysTools',
      title: '系统工具',
      icon: 'el-icon-s-tools',
      path: '',
      component: '',
      children: [
        {
          name: 'SysDict',
          title: '数字字典',
          icon: 'el-icon-s-order',
          path: '/sys/dicts',
          component: '',
          children: []
        },
      ]
    }
  ]

  let authorities = ['sys:user:list', 'sys:user:save', 'sys:user:delete']

  result.data = {
    nav,
    authorities,
  }

  return result
})

Mock.mock('/sys/menu/list', 'get', () => {
  result.data = [
    {
      id: 1,
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
      status: 1,
    },
    {
      id: 2,
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄",
    },
    {
      id: 3,
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄",
      type: 0,
      children: [
        {
          id: 31,
          date: "2016-05-01",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1519 弄",
          type: 1,
        },
        {
          id: 32,
          date: "2016-05-01",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1519 弄",
          type: 2,
        },
      ],
    },
    {
      id: 4,
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄",
    },
  ]
  return result
})
