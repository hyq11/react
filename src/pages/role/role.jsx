import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Modal, Table, message, Input } from 'antd'
import { dealTime } from '../../utils/tools'
import { roleList, roleAdd, roleSetProperty, roleGetProperty } from '../../api/role'
import SetForm from './setForm'

const { Group } = Button
export default class Role extends Component {
    constructor(props) {
        super(props)
        this.initColumns()
        this.property = React.createRef()
    }
    static propTypes = {

    }
    state = {
        roles: [],
        role: {}, // 选中的项
        visible: false,
        visible2: false,
        id: '',
        checkedKeys: []
    }
    componentDidMount() {
        this.fetch()
    }
    render() {
        const { roles, visible, visible2, role } = this.state
        const title = (
            <Group>
                <Button type="primary" onClick={this.createRole}>创建角色</Button>
                <Button type="primary" onClick={() => this.setProperty(role._id)} disabled={ role._id ? false : true }>设置权限</Button>
            </Group>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    columns={this.columns}
                    dataSource={roles}
                    rowKey="_id"
                    rowSelection={{ type: 'radio', columnWidth: 80, selectedRowKeys: [role._id]}}
                    onRow={this.onRow}
                ></Table>
                <Modal
                    title="角色添加"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="提交"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                >
                    <Input onChange={this.onChange} placeholder="请输入角色"></Input>
                </Modal>
                <Modal title="设置权限"
                    visible={visible2}
                    onOk={this.handleSubmit}
                    okText="提交"
                    cancelText="取消"
                    onCancel={this.handleCancel}>
                        <SetForm ref={this.property} checkedKeys={this.state.checkedKeys}></SetForm>
                </Modal>
            </Card>
        )
    }
    //  初始化表格
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                index: 'name'
            },
            {
                title: '创建时间',
                render({ createTime }) {
                    return (<span>{dealTime(createTime, 'YYYY-MM-DD HH:mm:ss')}</span>)
                }
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                index: 'auth_name'
            },
            {
                title: '授权时间',
                render({ auth_time }) {
                    return (<span>{dealTime(auth_time, 'YYYY-MM-DD HH:mm:ss')}</span>)
                }
            }
        ]
    }
    // 列表数据
    fetch = async () => {
        try {
            const { result } = await roleList()
            this.setState({
                roles: result
            })
        } catch (err) {
            message.error(err.message)
        }
    }
    // 显示添加角色的Modal
    createRole = () => {
        this.setState({
            visible: true
        })
    }
    // 添加角色
    handleOk = async () => {
        const { name } = this.state
        if(!name){
            return message.warning('请填写角色再提交')
        }
        try {
            await roleAdd({ name })
            message.success('创建角色成功')
            this.handleCancel()
            await this.fetch()
        } catch(err) {
            message.error(err.message)
        }
    }
    // 关闭弹窗
    handleCancel = () => {
        // this.property.current.clearData()
        this.setState({
            visible: false,
            visible2: false,
        })
    }
    // 设置权限
    handleSubmit = async () => {
        let checkedKeys  = this.property.current.getMenus()
        let id = this.state.role._id
        try {

            await roleSetProperty({
                id,
                menus: checkedKeys
            })
            this.handleCancel()
            message.success('分配权限成功')
            await this.fetch()
        }
        catch(err) {
            message.error(err.message)
        }
    }
    onChange = (e) => {
        e.preventDefault()
        if(!e.target.value) {
            return message.warning('请输入角色名称')
        } else {
            this.setState({
                name: e.target.value
            })
        }
    }
    // 设置权限
    setProperty = async(id) => {
        // 获取权限详情
        try {
            const { result , code} = await roleGetProperty({id})
            console.log(result.menus)
            if(code === 200) {
                this.setState({
                    checkedKeys: result.menus,
                    visible2: true
                })
            }
        } catch (err) {
            message.error(err.message)
        }
    }
    // 单选
    onRow = (role) =>{
        return {
            // 这样做是为了点击这一行的时候可以选中单选
            onClick: (event) => {
                this.setState({
                    role
                })
            }
        }
    }
}