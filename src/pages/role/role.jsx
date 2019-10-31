import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, Message } from 'antd';
import { roleList, roleUpate, roleAdd, roleDel } from '../../api/role'
import EditForm from './EditForm'
import AddForm from './AddForm'

const { confirm } = Modal;
const { Group } = Button;
export default class category extends Component {
    state = {
        dataSource: [],
        loading: false,
        visible: false,
        showModal: false
    }
    componentDidMount() {
        // 获取接口数据
        this.fetch()
    }
    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '角色名称',
                dataIndex: 'herotype',
                key: 'herotype',
                width: 120
            },
            {
                title: '特长',
                dataIndex: 'speciality',
                key: 'speciality',
                width: 150
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'center',
                width: 150,
                render: (_, row) => (
                    <Group>
                        <Button type="primary" onClick={() => this.showEditModel(row)}>edit</Button>
                        <Button type="primary" onClick={() => this.confirmModal(row)}>del</Button>
                    </Group>
                )
            },
        ]
        const extra = (
            <Button type="primary" onClick={this.addData}><Icon type="plus"></Icon>添加</Button>
        )
        const title = "首页"
        const { dataSource, loading, visible, id, herotype, showModal } = this.state
        return (
            <Card title={title} extra={extra}>
                <Table dataSource={dataSource} columns={columns} bordered loading={loading} rowKey="id" />
                <Modal
                    title="编辑"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="提交"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                >
                    <EditForm id={id} herotype={herotype} setForm={(form) => this.form = form}></EditForm>
                </Modal>
                <Modal
                    title="添加"
                    visible={showModal}
                    onOk={this.submitData}
                    okText="提交"
                    cancelText="取消"
                    onCancel={this.cancel}
                >
                    <AddForm setForm={(form) => this.form2 = form}></AddForm>
                </Modal>
            </Card>
        )
    }
    // 获取表格数据
    fetch = async () => {
        if (this.setState.loading === true) return
        this.setState({ loading: true })
        const { result } = await roleList()
        this.setState({ loading: false })
        const dataSource = result.map(item => {
            return {
                id: item._id,
                herotype: item.herotype,
                speciality: item.speciality,
                description: item.description
            }
        })
        this.setState({ dataSource })
    }
    // 显示编辑框
    showEditModel = (row) => {
        this.setState({ visible: true })
        this.setState({
            id: row.id,
            herotype: row.herotype
        })
    }
    // 提交修改
    handleOk = async () => {
        const id = this.state.id
        const herotype = this.form.getFieldValue('herotype')
        // 清除表单数据
        this.form.resetFields()
        await roleUpate({ id, herotype })
        this.setState({ visible: false })
        this.fetch()
    }
    // 关闭弹窗
    handleCancel = () => {
        this.setState({ visible: false })
        this.form.resetFields()
    }
    // 显示弹窗
    addData = () => {
        this.setState({ showModal: true })
    }
    submitData = () => {
        // 发送请求
        let _this = this
        this.form2.validateFields(async (err, values) => {
            if (!err) {
                this.add()
            } else {
                Message.error(err)
            }
        });
    }
    add = async () => {
        const values = this.form2.getFieldsValue()
        const res = await roleAdd(values)
        if(res.code === 200) {
            this.form2.resetFields()
            Message.success('添加成功✌！')
            this.setState({ showModal: false })
            this.fetch()
        } else {
            Message.waning('添加失败')
        }
    }
    cancel = () => {
        this.setState({ showModal: false })
        this.form2.resetFields()
    }
    // 删除
    confirmModal = (row)=> {
        confirm({
            title: '确认删除吗？',
            content: '请谨慎操作，一经删除无法恢复👌',
            onOk: async () => {
               await roleDel({ id: row.id })
               await this.fetch()
            }
        });
    }
}
