import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import HeaderNav from '../../components/nav/header-nav'
import LeftNav from '../../components/nav/left-nav'
import memoryUtils from '../../utils/memoryUtils.js'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
const {  Footer, Sider, Content } = Layout
/**
 * 管理后台的路由组件
 */
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if(!user || !user.token) {
            // 自动调回登陆页面
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{ height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <HeaderNav/>
                    <Content style={{ }}>
                        <Switch>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/category" component={Category}></Route>
                            <Route path="/product" component={Product}></Route>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer><p>推荐使用谷歌浏览器访问，效果更佳呦':)'</p></Footer>
                </Layout>
            </Layout>
        )
    }
}
