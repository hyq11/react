import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './left-nav.less'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.jpg'

const { Item, SubMenu } = Menu

class LeftNav extends Component {
    // 在render前执行一次
    // 为第一次render准备数据
    //设置初始状态
    constructor(props){
        super(props)
        this.menuNode = this.getMenuList(menuList)
    }
    // warning:警告componentWillMount被rename，所以初始状态设置写在constructor中
    // componentWillMount() {
    // }
    render() {
        let path = this.props.location.pathname
        this.path = path
        const openKey = this.openKey
        const selectedKeys = this.findSelectPath(menuList)  // 查找详情的时候展开包含children菜单
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
                    selectedKeys={[selectedKeys]}
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
                    {/* {this.getMenuList(menuList)} */}
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
        const path = this.props.location.pathname
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
                // 有children的数据的时候判断路由的路径在哪一组数据中
                // const selItem = item.children.find(sItem => sItem.path === path)
                const selItem = item.children.find(sItem =>  path.indexOf(sItem.path) === 0)
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
    findSelectPath = (menuList) => {
        let b = ''
        menuList.forEach(item => {
            if(!item.children) {
                if(this.path.includes(item.path)){
                    b = item.path
                    return
                }
            } else {
                b = this.findSelectPath(item.children)
            }
        })
        return b
    }

}

// 使用高阶组件withRouter可以获取到props中的三大属性：history, location, match
export default withRouter(LeftNav)