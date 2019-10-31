import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Table, Button } from 'antd'
import { skillAdd, skillList, skillUpdate, skillDel } from '../../api/skills'

const { Group } = Button
class Product extends Component {
    static propTypes = {

    }
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
                dataIndex: 'action',
                key: 'action',
                render: () => (
                    <Group>
                        <Button>edit</Button>
                        <Button>del</Button>
                    </Group>
                )
            }
        ]
        // 搜索
        const extra = (
            <Button type="primary">搜索</Button>
        )
        const title = (
            <Button>新增</Button>
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
}
export default Product
