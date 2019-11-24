import React, { Component } from 'react';
import { Checkbox, Tag } from  "antd"
import PropTypes from 'prop-types';

import './app.less'
class App extends Component {
  static propTypes = {
    selectedCar: PropTypes.array,
    getCar: PropTypes.func
  }
  constructor(props) {
    super(props)
    let items = this.props.selectedCar
    items = items.map(item => {
      return {
        label: item.name,
        value: item.code,
        checked: true
      }
    })
    let values = items.map(item => item.value)
    this.state = {
      index: '0',
      list: [
        {
          seriesCode: '11',
          name: '宝马车系'
        },
        {
          seriesCode: '22',
          name: '长安马自达车系'
        },
        {
          seriesCode: '33',
          name: '奔驰车系'
        }
      ],
      cartType: [],
      values,
      items, // 存储对象
      tags: []
    }
  }
  componentWillReceiveProps(nextProps) {
    let items = nextProps.selectedCar.map(item => {
      return {
        label: item.name,
        value: item.code,
        checked: true
      }
    })
    let values = items.map(item => item.value)
    this.setState({
      items,
      values
    })
  }
  componentWillMount() {
    this.props.getCar(this)
  }
  handleChange = (index, code) => {
    let data =[]
    if(code === '11') {
      data = [
        {
          label: '2017款 宝马I系',
          value: '2017-1'
        },
        {
          label: '2017款 宝马2系',
          value: '2017-2'
        },
        {
          label: '2017款 宝马3系',
          value: '2017-3'
        }
      ]
    } else if(code === '33') {
      data = [
        {
          label: '奔驰车系-1',
          value: 'b-1'
        },
        {
          label: '奔驰车系-2',
          value: 'b-2'
        },
        {
          label: '奔驰车系-3',
          value: 'b-3'
        }
      ]
    } else {
      data = [
        {
          label: '长安马自达车系-1',
          value: 'm-1'
        },
        {
          label: '长安马自达车系-2',
          value: 'm-3'
        },
        {
          label: '长安马自达车系-3',
          value: 'm-2'
        }
      ]
    }
    // let items = this.state.items
    data = data.map(item => {
      return Object.assign(item,  {checked: false})
    })
    const { values } = this.state
    data.forEach((item, i) => {
      const index = values.indexOf(item.value)
      if(index !==-1) {
        data[i].checked = true
      }
    })
    this.setState({
      index,
      cartType: data
    })
  }
  handleCheck = (value, i) => {
    let values = this.state.values
    let items = this.state.items
    const { cartType } = this.state
    const index = values.indexOf(value)
    if(index === -1) {
      values.push(value)
      cartType[i].checked = true
      items.push(cartType[i])
    } else {
      values.splice(index, 1)
      items = items.filter(item =>item.value !== value)
      cartType[i].checked = false
    }
    this.setState({
      values,
      items
    })
  }
  handleClose = (tag) => {
    let values = this.state.values
    let items = this.state.items
    const index = values.indexOf(tag)
    values.splice(index, 1)
    items = items.filter(item => item.value !== tag)
    this.setState({items, values})
  }
  resetData =() => {
    this.setState({
      cartType: [],
      values: [],
      items: []
    })
  }
  render() {
    const { index, list, cartType, items } = this.state
    return (
      <div className="app-box">
        <div className="left">
            {
              list.map((item, i) => {
                return (<div key={item.seriesCode} onClick={() => this.handleChange(i, item.seriesCode)} className={index === i ? 'active series' : 'series'}>{item.name}</div>)
              })
            }
        </div>
        <div className="right">
          {
            cartType.map((item, i) => {
              return (<Checkbox className="car" key={item.value} 
              checked={item.checked}
              onChange={() => this.handleCheck(item.value, i)}>{item.label}</Checkbox>)
            })
          }
        </div>
        <div className="clear"></div>
        <div>
          {
            items.map(item => {
              return (
                <Tag key={item.value} closable onClose={() => this.handleClose(item.value)}>{item.label}</Tag>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;