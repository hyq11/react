import React, { Component } from 'react'
import { Card, Icon, List, Spin } from 'antd'
import './main.less'

import { productDetail, baseURL } from '../../api/product'
const { Item } = List
export default class componentName extends Component {
    state = {
        data: {},
        loading: false
    }
    componentDidMount() {
        // 获取详情
        this.getProductDetail()
    }
    render() {
        const title = (
            <div className="co-title">
                <Icon type="rollback" className="co-back" onClick={this.back} />
                <h2 className="co-title-text">商品详情</h2>
            </div>
        )
        const { data, loading, imgs } = this.state
        return (
            <Card title={title}>
                <List>
                    <Item><span className="list_label">商品名称:</span>{data.productname}</Item>
                    <Item><span className="list_label">商品类型:</span>{data.typeid}{data.cId}</Item>
                    <Item><span className="list_label">价格元(RMB):</span>{data.price}</Item>
                    <Item><span className="list_label">图片:</span>
                        {
                            // console.log(Array.isArray(imgs))
                            // console.log(imgs.length)
                            // imgs.map((item, i) => {
                            //     return (<span key={i}>{item}-</span>)
                            // })
                        }
                    </Item>
                    <Item><span className="list_label">产地:</span>{data.origin}</Item>
                    <Item><span className="list_label">品牌:</span>{data.brand}</Item>
                    <Item><span className="list_label">规格:</span>{data.size}</Item>
                    <Item><span className="list_label">净重(kg):</span>{data.weight}</Item>
                </List>
                <Spin spinning={loading} />
            </Card>
        )
    }
    getProductDetail = async () => {
        if (this.state.loading) return
        this.setState({ loading: true })
        const id = this.props.match.params.id
        const { result } = await productDetail({ id })
        const imgs = result.img
        console.log(Array.isArray(imgs))
        this.setState({
            data: {imgs, ...result},
            loading: false,
            imgs
        })
        this.imgs = imgs
    }
    back = () => {
        this.props.history.goBack()
    }
}
