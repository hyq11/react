import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './left-nav.less'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.jpg'

const { Item, SubMenu } = Menu

class LeftNav extends Component {
    componentWillMount() {
        this.menuNode = this.getMenuList(menuList)
    }
    render() {
        const path = this.props.location.pathname
        const openKey = this.openKey
        return (
            <div className="left-nav">
                <header className="left-nav-header">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <h1>管理一下喽</h1>
                    </Link>
                </header>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {/* <Item key="/home">
                        <Link to="/home">
                            <Icon type="mail" />
                            <span>首页</span>
                        </Link>
                    </Item>

                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                        >
                        <Item key="/product">
                            <Link to="/product">
                                品类管理
                            </Link>
                        </Item>
                        <Item key="/category">
                            <Link to="/category">
                                商品管理
                            </Link>
                        </Item>
                    </SubMenu> */}
                    {this.menuNode}
                </Menu>
            </div>
        )
    }
    //生成菜单 map的形式
    getMenuList_map = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Item key={item.path}>
                        <Link to={item.path}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/* 这里使用递归调用 */}
                        {/* <Item key="/product">
                            <Link to="/product">
                                品类管理
                            </Link>
                        </Item> */}
                        {this.getMenuList(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    // reduce方法
    getMenuList = (menuList) => {
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push((
                    <Item key={item.path}>
                        <Link to={item.path}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                ))
            } else {
                const path = this.props.location.pathname
                // 有children的数据的时候判断路由的路径在哪一组数据中
                const selItem = item.children.find(sItem => sItem.path === path)
                if(selItem) {
                    this.openKey = item.path
                }
                pre.push((
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuList(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }
}

// 使用高阶组件withRouter可以获取到props中的三大属性：history, location, match
export default withRouter(LeftNav)