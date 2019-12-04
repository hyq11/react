import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { userList, userAdd, userInfo, userUpdate } from '../../api/user'
import { roleList } from '../../api/role'
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
        visible: false,
        roles: [],
        roleName: ''
    }
    // 这个生命周期是在render()后执行的
    componentDidMount() {
        this.fetch()
        this.getRoleList()
    }
    //  获取角色列表
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
                    <AddForm form1={form => this.form = form} formData={this.state.formData} onChange={this.onChange}></AddForm>
                </Modal>
            </Card>
        )
    }
    // 获取用户列表
    fetch = async () => {
        if (this.state.loading) return
        this.setState({
            loading: true
        })
        const { code, result } = await userList()
        this.setState({
            loading: false
        })
        if (code === 200) {
            this.setState({
                dataSource: result
            })
        }
    }
    // 初始表格数据
    getInitData = () => {
        let that = this
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
                render({ createDate }) {
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
                width: 150,
                render(row) {
                    return (
                        <Group size="small">
                            <Button type="primary" onClick={() => that.edit(row._id)}>修改</Button>
                            <Button type="danger">删除</Button>
                        </Group>
                    )
                }
            }
        ]
    }
    // 提交表单数据
    handleOk = () => {
        let that = this
        this.form.validateFields(async (err, values) => {
            if (err) {
                message.error(err)
            } else {
                try {
                    if (that.state.userId) {
                        const res = await userUpdate(Object.assign(values, 
                            { id: this.state.userId,
                                roleName: this.state.roleName 
                            }))
                        if(res.code === 200) {
                            message.success('编辑成功')
                        } else {
                            message.error(res.message)
                            return
                        }
                    } else {
                        await userAdd(values)
                        message.success('新增成功')
                    }
                }
                catch (err) {
                    message.error(err.message)
                }
                this.handleCancel()
                await this.fetch()
            }
        })
    }
    // 关闭弹窗
    handleCancel = () => {
        this.setState({ visible: false })
    }
    // 打开弹窗
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    // 获取用户信息
    // 编辑
    edit = async (id) => {
        try {
            const res = await userInfo({ id })
            this.setState({
                formData: res.result,
                visible: true,
                userId: id
            })
        } catch (err) {
            message.error(err.message)
        }
    }
    //
    onChange = (value) => {
        const list = this.state.roles
        const roleInfo = list.find(item => item._id === value)
        this.setState({
            roleName: roleInfo.name
        })
    }
}