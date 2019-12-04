import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd';
const { Option } = Select;

const { Item } = Form
const formItemLayot = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
class AddForm extends Component {
    static propTypes = {
        formData: PropTypes.object,
        form1: PropTypes.func
    }
    static defaultProps = {
        formData: {
            "username":'',
            "password": '', 
            'phone':'',
            'email': '',
            "roleId": ''
        }
    };
    state = {
        arr: []
    }
    componentDidUpdate(){
        this.props.form1(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { username, password, phone, email, roleId } = this.props.formData

        return (
            <Form {...formItemLayot}>
                <Item label="用户名">
                    {
                        getFieldDecorator('username', {
                            initialValue: username
                        })(
                            <Input placeholder="input username" />
                        )
                    }
                </Item>
                <Item label="密码">
                    {
                        getFieldDecorator('password', {
                            initialValue: password
                        })(
                            <Input.Password placeholder="input password" />
                        )
                    }
                </Item>
                <Item label="手机号">
                    {
                        getFieldDecorator('phone', {
                            initialValue: phone
                        })(
                            <Input placeholder="input phone" />
                        )
                    }
                </Item>
                <Item label="邮箱">
                    {
                        getFieldDecorator('email', {
                            initialValue: email
                        })(
                            <Input placeholder="input email" />
                        )
                    }
                </Item>
                <Item label="类型">
                    {
                        getFieldDecorator('roleId', {
                            initialValue: roleId
                        })(
                            <Select>
                                <Option value="123">123</Option>
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
const wrapperAddForm = Form.create({ name: 'addForm' })(AddForm)
export default wrapperAddForm
