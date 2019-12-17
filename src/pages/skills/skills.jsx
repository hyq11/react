import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { skillList,skillDel } from '../../api/skills'
import AddForm from './addForm'

const { Group } = Button
const Confirm = Modal.confirm
class Product extends Component {
    state = {
        name: '',
        loading: false,
        dataSource:[]
    }
    componentDidMount () {
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
                title: '荣耀名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '攻击力',
                dataIndex: 'ATK',
                key: 'ATK',
            },
            {
                title: '防御力',
                dataIndex: 'DEF',
                key: 'DEF',
            },
            {
                title: '力量',
                dataIndex: 'STR',
                key: 'STR',
            },
            {
                title: '敏捷',
                dataIndex: 'AGI',
                key: 'AGI',
            },
            {
                title: '智力',
                dataIndex: 'INT',
                key: 'INT',
            },
            {
                title: '经验',
                dataIndex: 'EXP',
                key: 'EXP',
            },
            {
                title: '等级',
                dataIndex: 'LV',
                key: 'LV',
            },
            {
                title: '生命值',
                dataIndex: 'HP',
                key: 'HP',
            },
            {
                title: '魔法力',
                dataIndex: 'MP',
                key: 'MP',
            },
            {
                title: '操作',
                render: (row) => (
                    <Group>
                        <AddForm list={this} {...row}></AddForm>
                        <Button onClick={() => this.remove(row._id)}>del</Button>
                    </Group>
                )
            }
        ]
        // 搜索
        const extra = (
            <Button type="primary">搜索</Button>
        )
        const title = (
            <AddForm></AddForm>
            // <Button onClick={this.add}>新增</Button>
        )
        const { loading, dataSource } = this.state
        return (
            <Card bordered={false} extra={extra} title={title}>
                <Table rowKey="_id" loading={loading} columns={columns} dataSource={dataSource} bordered/>
            </Card>
        )
    }
    // 获取列表数据
    fetch = async () => {
        if(this.state.loading) return
        this.setState({loading: true})
        const sendData = this.state.name ? {name: this.state.name} : {}
        const { result } =  await skillList(sendData)
        this.setState({ dataSource: result }, ()=>{
            this.setState({ loading: false})
        })
    }
    // 新增hero技能数据
    remove = (id) => {
        Confirm({
            title: '确定删除吗？',
            onOk: async ()=> {
                try {
                    await skillDel({id})
                    message.success('删除成功!')
                    await this.fetch()
                } catch(err) {
                    message.error(err.message)
                }
            }
        })
    }
}
export default Product
