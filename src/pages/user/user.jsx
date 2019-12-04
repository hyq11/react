import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { userList, userAdd } from '../../api/user'
import AddForm from './addForm'
import { dealTime } from '../../utils/tools'
const { Group } = Button
export default class User extends Component {

    constructor(prop) {
        super(prop)
        this.columns = this.getInitData()
    }
    state = {
        dataSource: [],
        loading: false,
        visible: false
    }
    // 这个生命周期是在render()后执行的
    componentDidMount() {
        this.fetch()
    }

   
    render() {
        const { dataSource, loading, visible } = this.state
        const title = (
            <Button type="primary" onClick={this.showModal}>
                新增
            </Button>
        )
        return (
            <Card title={title}>
                <Table rowKey="_id" columns={this.columns} dataSource={dataSource} bordered loading={loading}></Table>
                <Modal 
                 title="Basic Modal"
                 visible={visible}
                 onOk={this.handleOk}
                 onCancel={this.handleCancel}>
                    <AddForm form1={form => this.form = form}></AddForm>
                </Modal>
            </Card>
        )
    }
    // 获取用户列表
    fetch = async () => {
        if(this.state.loading) return
        this.setState({
            loading: true
        })
        const { code, result } = await userList()
        this.setState({
            loading: false
        })
        if(code === 200) {
            this.setState({
                dataSource: result
            })
        }
    }
    // 初始表格数据
    getInitData = () => {
        return [
            {
                title: '用户名',
                dataIndex: 'username',
                index: 'username',
                width: 120,
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                index: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone',
                index: 'phone'
            },
            {
                title: '注册时间',
                render({createDate }) {
                    return (
                    <span>{dealTime(createDate, "YYYY-MM-DD HH:mm:ss")}</span>
                    );
                }
            },
            {
                title: '所属角色',
                width: 150,
                dataIndex: 'roleName',
                index: 'roleName'
            },
            {
                title: '操作',
                dataIndex: 'action',
                index: 'action',
                width: 150,
                render(row) {
                    return (
                        <Group size="small">
                            <Button type="primary">修改</Button>
                            <Button type="danger">删除</Button>
                        </Group>
                    )
                }
            }
        ]
    }
    // 提交表单数据
    handleOk = () => {
        console.log(this.form.getFieldsValue())
        this.form.validateFields(async (err, values) => {
            if(err) {
                message.error(err)
            } else {
                await userAdd(values)
                this.handleCancel()
                await this.fetch()
            }
        })
    }
    handleCancel = () => {
        this.setState({visible: false})
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
}