import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./login.less";
import logo from "./images/logo.jpg";
/**
 * 登录时的路由组件
 */

 /**
  * 只有设置了它htmlType="submit"
  * 才能出发onSubmit
  */
const { Item } = Form
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        // 获取表单输入项
        const value = this.props.form.getFieldsValue()
        console.log(value)
        // this.props.form.validateFileds(()=> {

        // })
    }
  render() {
    const {getFieldDecorator} = this.props.form; 
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" className="login-logo" />
          <h1>后台管理系统</h1>
        </header>
        <section className="login-section">
          <h2>用户登录</h2>
          <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Item>
                {
                    getFieldDecorator('username', {
                        rules: [
                            {}
                        ]
                    })(<Input prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)"}}></Icon>}/>)
                }
              </Item>
              <Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Item>
              <Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  登录
                </Button>
              </Item>
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login)
export default WrappedNormalLoginForm
/**
 * 前台表单验证
 * 收集表单数据
 *  包装Form组件生成一个新的组件Form(login)
 * 新组建回想Form组件传递一个强大的对象form
 * 
 * 高阶函数
 * 1. 一类特别的函数
 *    接受函数类型的参数
 *    返回是函数
 * 2.常见
 *      定时器
 *      Promise(()=> {}).then().catch.finally()
 *      数组遍历的方法： forEach/filer/map/reduce/find/findIndex/every/some
 *      函数对象的bind()
 *      Form.create() / getFieldDecorator()
 * 
 * 高阶组件
 * 1) 本质是一个函数
 * 2)接收一个组件（被包装的组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定属性
 * 3)作用 扩展组件的功能
 */