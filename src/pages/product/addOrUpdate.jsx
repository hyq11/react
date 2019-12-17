import React, { Component } from 'react'
import { Card, Cascader, Form, Input, InputNumber, message, Icon, Button } from 'antd'
import { productAddOrUpdate, productDetail } from '../../api/product'
import { categoryList } from '../../api/category'
import RichTextEditor  from './richTextEditor'
import UploadPic from './uploadPic'
const { Item } = Form
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
    },
}
class AddOrUpdate extends Component {
    constructor(props) {
        super(props)
        this.pw = React.createRef()
        
        this.id = this.props.location.state
        this.getDetail()
    }
    state = {
        loading: false,
        click: false,
        srcl: [],
        options: []
    }
    // componentWillMount() {
    // }
    componentDidMount() {
        this.getList('0')
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { img, cId, typeid } = this.state;
        const id = this.props.location.state
        //显示分类
        let defaultCat = []

        if (typeid === '0') {
            defaultCat.push(typeid) // typeid: 分类的的父id
        } else {
            defaultCat.push(typeid)
            defaultCat.push(cId) // 选中子类分类的id
        }

        const title = (
            <div className="co-title">
                <Icon type="rollback" className="co-back" onClick={this.back} />
                <h2 className="co-title-text">{id ? "编辑" : "添加"}</h2>
            </div>
        )
        return (
            <Card title={title} style={{height: "100%", overflow: 'auto'}}>
                <Form {...formItemLayout}>
                    <Item label="商品名称:">
                        {
                            getFieldDecorator('productname', {
                                initialValue: this.state.productname,
                                rules: [
                                    { required: true, message: '必填' }
                                ]
                            })(<Input />)
                        }
                    </Item>
                    <Item label="商品类型:">
                        {
                            getFieldDecorator('cId', {
                                initialValue: defaultCat,
                                rules: [{ required: true, message: '必填' }],
                            })(
                                <Cascader
                                    options={this.state.options}
                                    loadData={this.loadData}
                                    onChange={this.onChange}
                                    expandTrigger="hover"
                                />
                            )}
                    </Item>
                    <Item label="价格元(RMB):">
                        {getFieldDecorator('price', {
                            initialValue: this.state.price,
                            rules: [{ required: true, message: '必填' }]
                        })(
                            <InputNumber min={0} precision={2} />
                        )}
                    </Item>
                    <Item label="产地:">
                        {
                            getFieldDecorator('origin', {
                                initialValue: this.state.origin,
                                rules: [
                                    { required: true, message: '必填' }
                                ]
                            })(<Input />)
                        }
                    </Item>
                    <Item label="品牌:">
                        {
                            getFieldDecorator('brand', {
                                initialValue: this.state.brand,
                                rules: [
                                    { required: true, message: '必填' }
                                ]
                            })(<Input />)
                        }
                    </Item>
                    <Item label="规格:">
                        {
                            getFieldDecorator('size', {
                                initialValue: this.state.size,
                                rules: [
                                    { required: true, message: '必填' }
                                ]
                            })(<Input />)
                        }
                    </Item>
                    <Item label="净重(kg):">
                        {
                            getFieldDecorator('weight', {
                                initialValue: this.state.weight,
                                rules: [
                                    { required: true, message: '必填' }
                                ]
                            })(<InputNumber min={0} precision={2} />)
                        }
                    </Item>
                    <Item label="图片">
                        <UploadPic ref={this.pw} imgs={img}></UploadPic>
                    </Item>
                    <Item label="描述">
                        <RichTextEditor changeText={this.getRichEdit} desc={this.state.description}/>
                    </Item>
                    <Item>
                        <Button type="primary" onClick={this.submitData}>提交</Button>
                        <Button onClick={this.back}>取消</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
    // 返回
    back = () => {
        this.props.history.goBack()
    }
    // 提交表单数据
    submitData = () => {
        let _this= this
        this.props.form.validateFields( (err, values) => {
            if (err) {
                message.err(err)
            } else {
               _this.sendData()
                message.success(this.id ? '编辑成功' : '添加成功')
                this.back()
            }
        })
    }
    async sendData () {
        let imgs = this.pw.current.getImgs()
        const { productname, cId, price, weight, size, origin, brand } = this.props.form.getFieldsValue()
        await productAddOrUpdate({
            id: this.id,
            productname, price, weight, size, origin, brand,
            typeid: cId[0],
            cId: cId[1] ? cId[1] : '',
            description: this.state.a,
            img: imgs
        })
    }
    // 获取商品详情
    getDetail = async () => {
        const id = this.props.location.state
        if (!id) return
        const { result } = await productDetail({ id })
        this.setState({
            ...result
        })
    }
    // 监听分类数据变化
    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    }
    // 异步加载二级分类
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        const result = await this.getList(targetOption.value) // 或二级分类列表
        targetOption.loading = false
        if (result.length === 0) {
            targetOption.isLeaf = true
        } else {
            targetOption.children = result.map(item => {
                return {
                    value: item._id,
                    label: item.categoryName
                }
            })
        }
        this.setState({
            options: [...this.state.options]
        }, () => {
            console.log(this.state.options)
        })
    }
    // 获取分类数据
    getList = async (parentId) => {
        const { result } = await categoryList({ parentId })
        // note: 这里判断显示是一级和二级数据
        if (parentId === '0') {
            this.initialData(result)
        } else {
            return result // 直接返回二级数据=>这里返回的是一个Promise
        }
    }
    // 处理分类数据
    initialData = async (res) => {
        const options = res.map(item => {
            return {
                value: item._id,
                label: item.categoryName,
                isLeaf: false
            }
        })
        // 如果是二级列表更新
        if (this.id && this.setState.typeid !== '0') {
            const result = await this.getList(this.state.typeid)
            const targetOption = options.find(item => item.id === this.setState.typeid)  // typeid(parentId) === item._id就找到了父级item
            targetOption.children = result.map(item => {
                return {
                    value: item._id,
                    label: item.categoryName,
                    isLeaf: false
                }
            })
        }
        this.setState({ options })
    }
    getRichEdit = (value) => {
        this.setState({
            a: value
        })
    }
}
const wrapAddOrUpdate = Form.create({ name: 'AddOrUpdate' })(AddOrUpdate)
export default wrapAddOrUpdate

/**
 * 子组件调用父组件方法： 酱紫组件的方法以函数的形式传给子组件，子组件就可以带哦用了
 * 父组件调用子组件方法：父组件中，在子组件上使用ref,然后就可以获使用子组件里面的方法了
 */