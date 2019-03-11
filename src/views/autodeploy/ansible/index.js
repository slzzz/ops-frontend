import React, { Component } from 'react';
import Button from 'antd/lib/button'
import { Select, Input,message } from 'antd';
import './index.css';

const Option = Select.Option;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={'192.168.1.1'+i}>{'192.168.1.1'+i}</Option>);
}
const { TextArea } = Input;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          output: 'please input command:',
        };
      }
  error = () => {
    message.error('please select ip!');
  };

  handleChange = (value) => {
    console.log({ value: value })
    this.setState({ value: value })
  }
  _click = () => {
    if (this.state.value.length === 0){
      this.error()
    }else{
      console.log(this.state.value)
      this.setState({output: this.state.output + '<br>  App.css          App.js           App.test.js      index.css        index.js         layout.js        logo.svg         route.js         serviceWorker.js'})
      console.log(this.state.output)
    }
  }

  render() {
    return (
      <div className="App">
        <Select
            defaultValue={[]}
            mode="multiple"
            onChange={this.handleChange}
            placeholder="Please select"
            style={{ width: '100%',padding: '0px 0px 10px 0px'}}
        >
            {children}
        </Select>
        <TextArea rows={4} />
        <Button
            onClick={this._click}
            type="primary"
        >
        Run
        </Button>
        <div
            className="Output"
            dangerouslySetInnerHTML={{__html: this.state.output}}
            style={{ width: '100%' }}
        >
        </div>
      </div>
    );
  }
}

export default App;