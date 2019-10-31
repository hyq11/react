const menu = [
    {
        title:'首页',
        path: '/home',
        icon: 'fund'
    },
    {
        title: '商品管理',
        path: '/prd',
        icon: 'shop',
        children: [
            {
                title:'品类管理',
                path: '/category',
                icon: 'codepen'
            },
            {
                title:'商品管理',
                path: '/product',
                icon: 'ant-cloud'
            },
        ]
    },
    {
        title: '角色管理',
        path: '/role',
        icon: 'user'
    },
    {
        title: '英雄技能',
        path: '/skill',
        icon: 'thunderbolt'
    }
]

export default menu