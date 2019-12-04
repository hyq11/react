import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Detail from "./detail"
import AddOrUpdate from "./addOrUpdate"
import Main from "./main"

class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product" exact component={Main}></Route>
                <Route path="/product/detail/:id" component={Detail}></Route>
                <Route path="/product/addOrUpdate" component={AddOrUpdate}></Route>
                <Redirect to="/product"></Redirect>
            </Switch>
        )
    }
}
export default Product
