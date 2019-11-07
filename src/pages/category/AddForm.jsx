import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const { Item } = Form
const { TextArea } = Input
const formItemLayout = {
    labelCol: {
      xs: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20},
    },
  };
class AddForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired
    }
    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form {...formItemLayout}>
                <Item label="角色类型">
                    { getFieldDecorator("categoryName", {
                        rules: [
                            {
                                required: true, message: '必填'
                            }
                        ]
                    })(<Input type="text"></Input>) }
                </Item>
                <Item label="特长">
                    { getFieldDecorator('speciality')(
                       <Input type="text"></Input>
                    )}
                </Item>
                <Item label="描述">
                    { getFieldDecorator('description')(
                        <TextArea  rows={4} ></TextArea>
                    )}
                </Item>
            </Form>
        )
    }
}
const wrappAddForm = Form.create({name: 'AddForm'})(AddForm)
export default wrappAddForm
