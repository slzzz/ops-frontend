import React, { Component } from 'react';
import Button from 'antd/lib/button'
import { Tree } from 'antd';
import './index.css';
import api from '@/axios'

const { TreeNode } = Tree
const treeData = [{
  title: 'dam',
  key: 'dam',
  children: [
    { title: 'dam-china', key: 'dam-china', children: [
      { title: 'prod', key: 'cn-dam-prod' },
    ] },
    { title: 'dam-us', key: 'dam-us', children: [
      { title: 'dev', key: 'us-dam-dev' },
      { title: 'prod', key: 'us-dam-prod' },
    ] },
  ],
},{
  title: 'bim',
  key: 'bim',
  children: [
    { title: 'bim-china', key: 'bim-china', children: [
      { title: 'dev', key: 'cn-bim-dev' },
      { title: 'prod', key: 'cn-bim-prod' },
    ] }
  ],
},]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoExpandParent: true,
      selectedKeys: [],
    }
  }
  //   componentWillMount(){
  // })
  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode
            dataRef={item}
            key={item.key}
            title={item.title}
        >
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return  <TreeNode
        key='t'
        {...item}
            />;
  })


  _click = () => {
    console.log(this.state.checkedKeys)
  }

  render() {
    return (
      <div className="App">
        <h1>Modelo Converter Auto Deploy</h1>
        <Tree
            autoExpandParent={this.state.autoExpandParent}
            checkable
            checkedKeys={this.state.checkedKeys}
            className="tree"
            expandedKeys={this.state.expandedKeys}
            onCheck={this.onCheck}
            onExpand={this.onExpand}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
        >
          {this.renderTreeNodes(treeData)}
        </Tree>


        <Button
            onClick={this._click}
            type="primary"
        >
          Run
        </Button>
        <div
            className="Output"
            dangerouslySetInnerHTML={{ __html: this.state.output }}
            style={{ width: '100%' }}
        >
        </div>
      </div>
    );
  }
}

export default App;