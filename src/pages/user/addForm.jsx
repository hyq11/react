import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, message } from 'antd';
import { roleList } from '../../api/role'

const { Option } = Select;
const { Item } = Form
const formItemLayot = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
class AddForm extends Component {
    static propTypes = {
        formData: PropTypes.object,
        form1: PropTypes.func,
        onChange: PropTypes.func
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
        roles: []
    }
    componentDidUpdate(){
        this.props.form1(this.props.form)
    }
    componentDidMount () {
        this.getRoleList()
    }
    getRoleList = async () => {
        try {
            const res = await roleList()
            if(res.code === 200) {
                this.setState({
                    roles: res.result
                })
            }
        }
        catch(err) {
            message.error(err.message)
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { username, password, phone, email, roleId } = this.props.formData
        const { roles } = this.state
        const { onChange } = this.props
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
                            <Select onChange={onChange}>
                                {
                                    roles.map(item => {
                                    return (<Option key={item._id} value={item._id}>{item.name}</Option>)
                                    })
                                }
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
