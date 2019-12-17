import React, { Component } from 'react'
import './main.less'
import { Card, Table, Button, Input, Select, Avatar, message, Modal} from 'antd'
import { productList, baseURL, productDel } from '../../api/product'
import {categoryList}  from '../../api/category.js'

const { Group } = Button
const { Option } = Select


export default class componentName extends Component {
    state = {
        dataSource: [],
        loading: false,
        typeid: '',
        prdname: '',
        categoryList: []
    }
    componentDidMount() {
        this.fetch()
        this.getCategoryList()
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: "_id",
                key: "_id"
            },
            {
                title: "商品名称",
                dataIndex: "productname",
                key: "productname",
                width: 150
            },
            {
                title: '价格(元)',
                align: 'center',
                render: (_, row)=> {
                    const { price } = row
                    return (
                        <span>￥{price ? price : 0}</span>
                        )
                }
            },
            {
                title: '类型',
                dataIndex: 'typeid',
                key: 'typeid',
                align: 'center'
            },
            {
                title: '图片',
                width: 80,
                align: 'center',
                render: (_, row) => {
                    return (<Avatar shape="square" size={50} src={`${baseURL}${row.img[0]}`}></Avatar>)
                }
            },
            {
                title: '产地',
                dataIndex: 'origin',
                key: 'origin',
                align: 'center'
            },
            {
                title: '品牌',
                dataIndex: 'brand',
                align: 'center',
                key: 'brand'
            },
            {
                title: '规格',
                dataIndex: 'size',
                align: 'center',
                key: 'size'
            },
            {
                title: '净重(kg)',
                dataIndex: 'weight',
                align: 'center',
                key: 'weight'
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: "action",
                render: (_, row)=> (
                    <Group size="small">
                        <Button onClick={() => this.addOrUpdate(row._id)}>edit</Button>
                        <Button onClick={() => this.checkDetail(row._id)}>查看</Button>
                        <Button onClick={() => this.del(row._id)} type="danger">delete</Button>
                    </Group>
                )
            }
        ]
        const { loading, dataSource, categoryList} = this.state
        const extra = (
            <div className="co-inline">
               <Select placeholder="全部" style={{ width: '120px' }} onChange={this.handleChange} allowClear={true}>
                   {
                       categoryList.map(item => {
                           return (<Option key={item._id} value={item._id}>{item.categoryName}</Option>)
                       })
                   }
                </Select>
                <Input type="text" placeholder="请输入商品名称" onChange={this.inputValue} style={{ width: "150px"}}/>
                <Button type="primary" onClick={this.fetch}>搜索</Button>
            </div>
        )
        const title=(
            <Button icon='plus' type="primary" onClick={this.add}>新增</Button>
            )
        return (
            <Card title={title} extra={extra}>
                <Table rowKey="_id" dataSource={dataSource} columns={columns} loading={loading} bordered></Table>
            </Card>
        )
    }
    handleChange = (value) => {
        this.setState({
            typeid: value
        })
    }
    inputValue = (e)=> {
        this.input = e.target.value
    }
  
    // 获取表格数据
    fetch = async () => {
        if(this.state.loading) return
        this.setState({loading: true})
        const { result } = await productList({
            typeid: this.state.typeid || '',
            productname: this.input || ''
        })
        this.setState({ 
            dataSource: result,
            loading: false
        })
    }
    // 获取分类的接口
    getCategoryList = async () => {
        const { result } = await categoryList({parentId: '0'})
        this.setState({
            categoryList: result
        })
    }
    checkDetail = (id) => {
        this.props.history.push('/product/detail/'+id)
    }
    del = (id) => {
        Modal.confirm({
            title: '确定删除吗❓',
            content: '一经删除，无法恢复🦆€！',
            okText: "I'm sure 👌",
            okType: 'danger',
            cancelText: '🙅不‍,取消',
            onOk: async () => {
                await productDel({id})
                await this.fetch()
                message.success('删除成功')
            }
        })
    }
    addOrUpdate = (id) => {
        this.props.history.push('/product/addOrUpdate', id)
    }
    add = () => {
        this.props.history.push('/product/addOrUpdate')
    }
}
