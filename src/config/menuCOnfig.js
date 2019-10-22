const menu = [
    {
        title:'首页',
        path: '/home',
        icon: 'mail'
    },
    {
        title: '商品管理',
        path: '/product',
        icon: 'mail',
        children: [
            {
                title:'品类管理',
                path: '/category',
                icon: 'mail'
            },
            {
                title:'商品管理',
                path: '/',
                icon: 'mail'
            },
        ]
    }
]