import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tree } from 'antd';
import menuList from '../../config/menuConfig.js'

const { TreeNode } = Tree;
export default class SetForm extends Component {
    static propTypes = {
        checkedKeys: PropTypes.array,
        handleOnCheck: PropTypes.func
    }
    // 展开
    handleOnExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        })
    }
    //map方法来处理权限数据
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });
    componentWillMount () {
        this.treeNodes = this.getTreeNodes(menuList)
    }

    render() {
        const {checkedKeys, handleOnCheck} = this.props
        return (
            <div>
                 <Tree
                    checkable
                    defaultExpandAll={true}
                    onCheck={handleOnCheck}
                    onExpand={this.handleOnExpand}
                    checkedKeys={checkedKeys}
                >
                    {this.treeNodes}
                    {/* <TreeNode title="平台权限" key="all">
                        <TreeNode title="parent 1-0" key="0-0-0">
                            <TreeNode title="leaf" key="0-0-0-0" />
                            <TreeNode title="leaf" key="0-0-0-1" />
                        </TreeNode>
                        <TreeNode title="parent 1-1" key="0-0-1">
                            <TreeNode title="sss" key="0-0-1-0" />
                        </TreeNode>
                    </TreeNode> */}
                </Tree>
            </div>
        )
    }
    //  使用reduce 方法来处理权限数据
    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.path}>
                    { item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }
}
