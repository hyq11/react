import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input } from 'antd'
const { Item } = Form
const formItemLayout = {
    labelCol: {
      xs: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 20},
    },
  };
class EditForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    herotype: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }
  // 同步调用
  componentWillMount () {
    //将form传给父组件
    this.props.setForm(this.props.form)
  }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        
        return (
            <Form {...formItemLayout}>
            <Item label="角色名称">
              {getFieldDecorator('herotype', {
                  initialValue: this.props.herotype
              })(<Input type="text"/>)}
            </Item>
            </Form>
        )
    }
}
const WrappedEditForm = Form.create({ name: 'EditForm' })(EditForm)
export default WrappedEditForm
