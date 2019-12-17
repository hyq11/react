import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Input, InputNumber, message } from 'antd'
import { skillAdd, skillInfo, skillUpdate } from '../../api/skills'

const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
class AddForm extends Component {
    static propTypes = {
        list: PropTypes.object,
        _id: PropTypes.string
    }
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { visible, name,
            ATK, DEF, STR, AGI, INT, EXP,
            LV, HP, MP
        } = this.state
        const id = this.props._id
        return (
            <span>
                <Button type="primary" onClick={this.handelBtn}>{id ? '编辑' : '新增'}</Button>
                <Modal
                    visible={visible}
                    title="新增英雄数据"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form {...formItemLayout}>
                        <FormItem label="名称">
                            {
                                getFieldDecorator('name', {
                                    initialValue: name,
                                    rules: [
                                        { type: 'string', required: true, message: '必填' }
                                    ]
                                })(<Input></Input>)
                            }
                        </FormItem>
                        <FormItem label="攻击力">
                            {
                                getFieldDecorator('ATK', {
                                    initialValue: ATK,
                                    rules: [
                                        { type: 'number', required: true, message: '必填' }
                                    ]
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label="防御力">
                            {
                                getFieldDecorator('DEF', {
                                    initialValue: DEF,
                                    rules: [
                                        { type: 'number', required: true, message: '必填且是数字' }
                                    ]
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label="力量">
                            {
                                getFieldDecorator('STR', {
                                    initialValue: STR,
                                    rules: [
                                        { type: 'number', required: true, message: '必填且是数字' }
                                    ]
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label="敏捷度">
                            {
                                getFieldDecorator('AGI', {
                                    initialValue: AGI,
                                    rules: [
                                        { type: 'number', required: true, message: '必填且是数字' }
                                    ]
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label="智力">
                            {
                                getFieldDecorator('INT', {
                                    initialValue: INT,
                                    rules: [
                                        { type: 'number', required: true, message: '必填且是数字' }
                                    ]
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label="经验">
                            {
                                getFieldDecorator('EXP', {
                                    initialValue: EXP,
                                    rules: [
                                        { type: 'number', required: true, message: '必填且是数字' }
                                    ]
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label="等级">
                            {
                                getFieldDecorator('LV', {
                                    initialValue: LV,
                                    rules: [
                                        { type: 'number', required: true, message: '必填且是数字' }
                                    ]
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label="生命值">
                            {
                                getFieldDecorator('HP', {
                                    initialValue: HP,
                                    rules: [
                                        { type: 'number', required: true, message: '必填且是数字' }
                                    ]
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label="魔法力">
                            {
                                getFieldDecorator('MP', {
                                    initialValue: MP,
                                    rules: [
                                        { type: 'number', required: true, message: '必填且是数字' }
                                    ]
                                })(<InputNumber />)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        )
    }

    handleOk = () => {
        let that = this
        console.log(this.props.list, 'list')
        console.log(this.props, 'props')
        this.props.form.validateFields(async (err, values) => {
            if (err) return
            try {
                if (this.props._id) {
                    // 获取数据详情
                    await skillUpdate({
                        id: this.props._id,
                        ...values
                    })
                    message.success('编辑成功')
                } else {
                    await skillAdd({
                        ...values
                    })
                    message.success('新增成功')
                }
                that.setVisible(false)
            } catch (err) {
                message.error(err.message)
            }
        })
    }
    setVisible = (visible) => {
        this.setState({ visible })
    }
    handleCancel = () => {
        this.setVisible(false)
    }
    handelBtn = async () => {
        this.setVisible(true)
        try {
            if (this.props._id) {
                // 获取数据详情
                const res = await skillInfo({
                    id: this.props._id
                })
                this.setState({
                    ...res.result
                })
            }
        } catch (err) {
            message.error(err.message)
        }
    }
}
AddForm = Form.create({})(AddForm)
export default AddForm