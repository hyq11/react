import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
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
        // const value = this.props.form.getFieldsValue()
        
        // 表单组件的统一验证
        this.props.form.validateFields((err, values) => {
            // values这个是表达数据集
            // values和value的值相同
            if(err) {
                return
            } else {
            }
        })
    }
    // 自定义验证
    validatorPwd = (rule, value, callback) => {
        if(!value) {
            callback('密码必填')
        } else if(value.length<4 || value.lengt > 12 ) {
            callback('密码长度至少4位, 最长12位')
        }else if(!(/^[a-zA-Z0-9_]+$/.test(value))) {
            callback('下划线、字母和数字组合')
        } else {
            callback()
        }
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
                        // 声明式验证：直接使用别人定义好的验证规则进行验证
                        rules: [
                            { required: true, whitespace: true, message: '用户名必填'},
                            { min: 4, message: '用户名至少4位'},
                            { max: 12, message: '用户名最多4位'},
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '下划线、字母和数字组合'}
                        ]
                    })(<Input placeholder="username" prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)"}}></Icon>}/>)
                }
              </Item>
              <Item>
                {getFieldDecorator("password", {
                  // 配置对象
                  rules: [
                    { validator: this.validatorPwd, required: true }
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
 * 4)高阶组件也是高阶函数
 */