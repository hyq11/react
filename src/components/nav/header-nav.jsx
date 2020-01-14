import React, { Component } from 'react'
import { Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import './header-nav.less'
import memoryUtils from '../.././utils/memoryUtils.js'
import storeUtils from '../.././utils/storeUtils'

function formate(value){
    const date = new Date(value)
    const y = date.getFullYear()
    const mth = date.getMonth() + 1
    const d = date.getDate()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    return y + '/'+ mth + '/' + d + '/' + " " +toTime(h) + ":" + toTime(m) + ":" + toTime(s)
}
function toTime (value){
    return value > 9 ? value+'': '0'+ value
}
class HeaderNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            time: formate(Date.now())
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            const time =  formate(Date.now())
            this.setState({time})
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        const { time } = this.state
        return (
            <div className="header-nav">
                <div>欢迎<span className="username">{storeUtils.getUser('USER_NAME')}</span><span className="logout" onClick={this.logout}><Icon type="logout" /> 退出登录</span></div>
                <div className="time">{ time }</div>
            </div>
        )
    }
    logout = () => {
        memoryUtils.user = {}
        storeUtils.removeUser("USER_KEY")
        storeUtils.removeUser("ROLE_ID")
        this.props.history.replace('/login')
    }
}

export default withRouter(HeaderNav)