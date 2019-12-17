import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import './animal.less'
export default class Animal extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Card title="动画试验田" style={{ height: '100vh'}}>
                <img src="http://127.0.0.1:9527/public/upload/157622168120765gf-img.gif" alt="" className="move"/>
            </Card>
        )
    }
}
