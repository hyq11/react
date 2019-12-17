import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Upload, Icon, message } from 'antd'
import { num } from '../../config/num'

export default class UploadTest extends Component {
    static propTypes = {

    }
    state = {
        imageUrl: '',
        loading2: '',
        loading: false,
        loading2: false,
        fileList:  []
    }
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    handleChange = ({file, fileList}) => {
        if (file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (file.status === 'done') {
            const path = 'http://127.0.0.1:9527/public/upload/'+ file.response.src[0].filename
                this.setState({
                imageUrl: path,
                loading: false,
           })
        }
    }
    handleChange2 = (file, fileList) => {
        if (file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        const res = file.response
        if(file.status === 'done') {
            if(res.code === 200)
            this.setState({
                imageUrl2: 'http://127.0.0.1:9527/public/upload/'+ file.response.src[0].filename,
                fileList,
            })
        }
    }

    render() {
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">上传图片(限制jgp,png)</div>
            </div>
          );
        const uploadButton3 = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">上传图片</div>
            </div>
          );
        const uploadButton2 = (
            <div>
              <Icon type={this.state.loading2 ? 'loading' : 'plus'} />
              <div className="ant-upload-text">上传图片</div>
            </div>
          );
          const imgs = () => {
              let a = []
              for(let i=0; i<100; i++) {
                  a.push(`<img src={${imageUrl}}/>`)
              }
            return (<Upload style={{ display: "inline-block"}}>{a}</Upload>)
          }
        const { imageUrl, imageUrl2 } = this.state
        const style = {
            display: 'inline-blck',
            borderRadius: '4px',
            border: '1px dashed #d9d9d9',
            width: '190px',
            padding: '8px',
            margin: '4px'
        }
        return (
            <Card title="上传操作">
                <Upload
                    accept="images/*"
                    name="img"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="/upload2/file"
                    onChange={this.handleChange}
                    >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton3}
                </Upload>
                <Upload
                    accept="images/*"
                    name="img"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="/upload2/file"
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <Upload
                    name="img"
                    listType="picture-card"
                    className="avatar-uploader"
                    action="/upload2/file"
                    onChange={this.handleChange2}
                    >
                    { imageUrl ? <img src={imageUrl2} alt="avatar" style={{ width: '100%' }} /> : uploadButton2}
                </Upload>
                <div>
                    {
                        imageUrl && num.map((item,i) => {
                            return (<img key={i} src={imageUrl} style={style}/>)
                        })
                    }
                </div>
            </Card>
        )
    }
}
