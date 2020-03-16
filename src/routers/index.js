import Home from '../pages/home/home'
import Role from '../pages/role/role'
import Product from '../pages/product/product'
import Skills from '../pages/skills/skills'
import Category from '../pages/category/category'
import User from '../pages/user/user'
import UploadTest from '../pages/UploadTest/UploadTest'
import Animal from '../pages/UploadTest/animal'
const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/role',
        component: () => import(/*webpackChunkName: "role" */ '../pages/role/role')
    },
    {
        path: '/category',
        component: () => import(/*webpackChunkName: "role" */ '../pages/category/category')
    },
    {
        path: '/product',
        component: () => import(/*webpackChunkName: "role" */ '../pages/product/product')
    },
    {
        path: '/skill',
        component: () => import(/*webpackChunkName: "role" */ '../pages/skills/skills')
    },
    {
        path: '/user',
        component: () => import(/*webpackChunkName: "role" */ '../pages/user/user')
    },
    {
        path: '/file',
        component: () => import(/*webpackChunkName: "role" */ '../pages/UploadTest/UploadTest')
    },
    {
        path: '/animal',
        component: () => import(/*webpackChunkName: "role" */ '../pages/UploadTest/animal')
    }
]

export default routes