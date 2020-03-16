import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import HeaderNav from '../../components/nav/header-nav'
import LeftNav from '../../components/nav/left-nav'
import storeUtils from '../../utils/storeUtils.js'
import Home from '../home/home'
import Role from '../role/role'
import Product from '../product/product'
import Skills from '../skills/skills'
import Category from '../category/category'
import User from '../user/user'
import UploadTest from '../UploadTest/UploadTest'
import Animal from '../UploadTest/animal'
import routes from '../../routers' 
console.log(routes);
const { Sider, Content } = Layout
/**
 * 管理后台的路由组件
 */
export default class Admin extends Component {
    render() {
        const token = storeUtils.getUser('USER_KEY')
        if(!token || token === '') {
            // 自动调回登陆页面
            console.log(token)
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{ height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <HeaderNav/>
                    <Content style={{ padding: "20px"}}>
                        <Switch>
                            {
                                // routes.map((item, i) => {
                                //     return (
                                //         <Route key={i} path={item.path} component={item.components} exact/>
                                //     )
                                // })
                            }
                            <Route path="/home" component={Home} exact></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/category" component={Category}></Route>
                            <Route path="/product" component={Product}></Route>
                            <Route path="/skill" component={Skills}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/file" component={UploadTest}></Route>
                            <Route path="/animal" component={Animal}></Route>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    {/* <Footer><p>推荐使用谷歌浏览器访问，效果更佳呦':)'</p></Footer> */}
                </Layout>
            </Layout>
        )
    }
}
