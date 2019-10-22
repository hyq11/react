import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './left-nav.less'
import logo from '../../assets/images/logo.jpg'

const { Item, SubMenu, ItemGroup } = Menu

export default class LeftNav extends Component {
    render() {
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
                >
                    <Item key="1">
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
                        <Item key="2">
                            <Link to="/product">
                                品类管理
                        </Link>
                        </Item>
                        <Item key="3">
                            <Link to="/category">
                                商品管理
                        </Link>
                        </Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
