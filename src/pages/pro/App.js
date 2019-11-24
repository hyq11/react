import React, { Component } from 'react';
import { Button, Modal, Tag } from "antd"
import CarType from './carType'
class App extends Component {
  state = {
    visible: false,
    list: [{
      name: '2017款 宝马I系',
      code: '2017-1'
    }, {
      name: '奔驰车系-2',
      code: 'b-2'
    }]
  }
  add = () => {
    this.setState({
      visible: true
    })
  }
  add2 = () => {
    this.setState({
      visible: true
    })
  }
  handleGetCar = () => {
    const list = this.car.state.items
    this.setState({
      visible: false,
      list: list.map(item => ({
        code: item.value,
        name: item.label
      }))
    }, () => {
      this.car.resetData()
    })
    console.log(this.car.state.items)
  }
  handleCancel = () => {
    this.setState({
      visible: false
    }, () => {
      this.car.resetData()
    })
  }
  handleClose = (tag) => {
    let list = this.state.list
    list = list.filter(item => item.code !== tag)
    this.setState({
      list
    })
  }
  render() {
    const { visible, list } = this.state
    return (
      <div>
        {/* <Button type="primary" onClick={this.add}>添加车型</Button> */}
        <Button type="primary" onClick={this.add2}>编辑车型</Button>
        <Modal
          visible={visible}
          width={600}
          onCancel={this.handleCancel}
          onOk={this.handleGetCar}>
          <CarType getCar={data => this.car = data} selectedCar={list}></CarType>
        </Modal>
        <div>
          {
            list.map(item => {
              return (
                <Tag key={item.code} closable onClose={() => this.handleClose(item.code)}>{item.name}</Tag>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;