import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import { baseURL } from '../../api/product'
import PropTypes from 'prop-types'



function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class UploadPic extends Component {
    static propTypes = {
        imgs: PropTypes.array
    }
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: []
        }
    }
    // 必须在这里面才能获取父组件传给子组建的数据
    /**
     * 父组件是异步获取数据的情况下，出现则这个问题
     */
    componentWillReceiveProps() {
        const { imgs } = this.props
        console.log(imgs)
        let fileList = []
        if (imgs && imgs.length) {
            fileList = imgs.map((item, index) => ({
                uid: -index,
                name: item,
                status: 'done',
                url: baseURL + item,
            }))
        }
        this.setState({ fileList }, ()=> {
            console.log(this.state.fileList)
        })
    }
    // 隐藏预览
    handleCancel = () => this.setState({ previewVisible: false });
    // 显示预览
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    // 图片修改
    handleChange = ({ file, fileList }) => {
        console.log(file)
        const res = file.response
        if (file.status === "done") {
            if (res.code === 200) {
                message.success('ok')
                file.url = res.src
            }
        }
        this.setState({fileList})
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/upload/file"
                    accept='image/*' /* 只接收图片类型的*/
                    listType="picture-card"
                    name="img" // 请求参数名
                    fileList={fileList || this.fileList} /*已上传文件的列表*/
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
    getImgs = () => {
        return this.state.fileList.map(item => item.name)
    }
}
export default UploadPic