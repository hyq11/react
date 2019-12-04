import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, Message } from 'antd';
import { categoryList, categoryUpdate, categoryAdd, categoryDel } from '../../api/category'
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
                dataIndex: '_id',
                key: '_id',
            },
            {
                title: '角色名称',
                dataIndex: 'categoryName',
                key: 'categoryName',
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
                align: 'center',
                width: 250,
                render: (_, row) => (
                    <Group size="small">
                        <Button type="primary" onClick={() => this.showEditModel(row)}>Edit</Button>
                        <Button type="primary" onClick={() => this.confirmModal(row)}>Del</Button>
                        <Button type="primary" onClick={() => this.addDataSecond(row)}>Add</Button>
                        {row.parentId === '0' && <Button type="primary" onClick={() => this.checkDetail(row)}>查看子类</Button>}
                    </Group>
                )
            },
        ]
        const extra = (
            <Button type="primary" onClick={this.addData}><Icon type="plus"></Icon>添加</Button>
        )
        const title = "首页"
        const { dataSource, loading, visible, id, categoryName, showModal } = this.state
        return (
            <Card title={title} extra={extra}>
                <Table dataSource={dataSource} columns={columns} bordered loading={loading} rowKey="_id" />
                <Modal
                    title="编辑"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="提交"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                >
                    <EditForm id={id} categoryName={categoryName} setForm={(form) => this.form = form}></EditForm>
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
    fetch = async (parentId) => {
        if (this.setState.loading === true) return
        this.setState({ loading: true })
        const { result } = await categoryList({parentId})
        this.setState({ loading: false })
        let dataSource = []
        if(parentId) {
            dataSource = result
        } else {
            dataSource = result.filter(item => item.parentId === '0')
        }

        this.setState({ dataSource })
    }
    // 显示编辑框
    showEditModel = (row) => {
        this.setState({
            visible: true,
            id: row._id,
            categoryName: row.categoryName
        })
    }
    // 提交修改
    handleOk = async () => {
        const id = this.state.id
        const categoryName = this.form.getFieldValue('categoryName')
        // 清除表单数据
        this.form.resetFields()
        await categoryUpdate({ id, categoryName })
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
        this.setState({
            showModal: true
        })
    }
    submitData = () => {
        // 发送请求
        let _this = this
        this.form2.validateFields(async (err, values) => {
            if (!err) {
                _this.add()
            } else {
                Message.error(err)
            }
        });
    }
    add = async () => {
        const values = this.form2.getFieldsValue()
        const parentId = this.state.parentId
        const res = await categoryAdd({parentId, ...values})
        if (res.code === 200) {
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
    confirmModal = (row) => {
        confirm({
            title: '确认删除吗？',
            content: '请谨慎操作，一经删除无法恢复👌',
            onOk: async () => {
                await categoryDel({ id: row._id })
                await this.fetch()
            }
        });
    }
    checkDetail = (row) => {
        this.fetch(row._id)
    }
    addDataSecond= (row) => {
        this.setState({
            parentId: row._id,
            showModal: true
        })
    }
}
