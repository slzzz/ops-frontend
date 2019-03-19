import React, { Component } from 'react';
import Button from 'antd/lib/button'
import { Select, Input,message } from 'antd';
import './index.css';
import api from '@/axios'

const Option = Select.Option;
// const children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={'192.168.1.1'+i}>{'192.168.1.1'+i}</Option>);
// }
const { TextArea } = Input;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          children: [],
          ipValue: '',
          cmdValue: '',
          output: 'please input command:',
        };
      }
      componentWillMount(){
    console.log('*******')
    api.get('/api/ansible/gethost').then(response => {
        for (var i in response.data.datas){
          // console.log(response.data.datas[i])
          this.state.children.push(<Option key={response.data.datas[i]}>{response.data.datas[i]}</Option>)
        }
        // this.setState({
        //   children: response.data.datas
        // })
    })
  }
  error = () => {
    message.error('please select ip and input cmd!');
  };

  ipHandleChange = (e) => {
    this.setState({ ipValue: e })
  }
  cmdHandleChange = (event) => {
    this.setState({ cmdValue: event.target.value })
  }
  _click = () => {
    if (this.state.ipValue.length === 0 || this.state.cmdValue.length === 0){
      this.error()
    }else{
      console.log(this.state.ipValue)
      console.log(this.state.cmdValue)
      api.post('/api/ansible/runcmd',{
        hosts: this.state.ipValue,
        cmd: this.state.cmdValue
      }).then(response =>{
        this.setState({
          output: this.state.output + '<br>' + response.data.datas.replace(/\n/g, '<br />')
        })
      })
      // this.setState({output: this.state.output + '<br>  App.css          App.js           App.test.js      index.css        index.js         layout.js        logo.svg         route.js         serviceWorker.js'})
    }
  }

  render() {
    return (
      <div className="App">
        <Select
            defaultValue={[]}
            mode="multiple"
            onChange={this.ipHandleChange}
            placeholder="Please select"
            style={{ width: '100%',padding: '0px 0px 10px 0px'}}
        >
            {this.state.children}
        </Select>
        <TextArea
            onChange={this.cmdHandleChange}
            rows={4}
        />
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