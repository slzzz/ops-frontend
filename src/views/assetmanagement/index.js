import React,{Component} from 'react'
import { Table ,Button,Input,message,Popconfirm} from 'antd'
// import {getAssets} from '@/redux/actions'
import api from '@/axios'

// const data= [
//   {
//     'id': '',
//     'name': '范杰',
//     'email': 't.hee@zjok.bf',
//     'address': '山西省 晋城市 阳城县',
//     'date': '2006-08-30',
//     'model': 'dell',
//     'price': '2',
//     'ip': '1.1.1.1'
//   },
//   {
//     'name': '段强',
//     'email': 's.turg@oxbxcgofx.biz',
//     'address': '江西省 景德镇市 昌江区',
//     'date': '2015-05-15',
//     'model': 'asus',
//     'price': '1',
//     'ip': '1.1.1.2'
//   }
// ]
class TableEdit extends Component {
  state = {
    data: [],
    editable:[],
    editValue:[],
    columns :[
      {
        title: 'Id',
        dataIndex: 'id',
        width: '5%'
      }, {
        title: 'IP',
        dataIndex: 'ip',
        render: (name,row,index) => {
          const editable = this.state.editable
          return (
            editable[index]?(
              <span>
                <Input
                    onChange={
                      this.changInputVal.bind(this,index)
                    }
                    style={{width:'80%',marginRight:10}}
                    type='text'
                    value={this.state.editValue[index]}
                />
                <Button
                    onClick={this.save.bind(this,index)}
                    type='primary'
                >完成</Button>
              </span>
            ):(
              `${name}`
            )
          )
        },
        width: '12%',
      }, {
        title: 'MODEL',
        dataIndex: 'model',
        width: '12%',
      },{
        title: '位置',
        dataIndex: 'address',
        width: '12%',
      },{
        title: '负责人',
        dataIndex: 'name',
        width: '12%',
      },{
        title: 'Email',
        dataIndex: 'email'
      },{
        title: '价格',
        dataIndex: 'price',
        width: '12%',
      },{
        title: 'Date',
        dataIndex: 'date',
        width: '12%',
      }, {
        title:'handle',
        dataIndex: 'control',
        width: '18%',
        render: (text,row,index) => {
          const editable = this.state.editable
            return (
                    <div>
                        {
                          editable[index]?(
                             <Button
                                 onClick={this.cancel.bind(this,index)}
                                 style={{marginRight:12}}
                             >取消</Button>
                            ):(
                            <Button
                                ghost
                                onClick={this.setEditable.bind(this,index)}
                                style={{marginRight:12}}
                                type='primary'
                            >修改</Button>
                          )
                        }
                        <Popconfirm
                            onConfirm={() => this.deleteRow(index)}
                            title="确认删除?"
                        >
                          <Button
                              ghost
                              style={{marginRight:0}}
                              type='danger'
                          >删除</Button>
                        </Popconfirm>

                    </div>
            )
        }
      }
    ]
  }
  componentDidMount(){
    api.get('/api/assets').then(response => {
      console.log(response)
      this.setState({
        data: response.data.datas
      })
    })
  }

  // 点击修改时，将当前行改成可编辑状态,并将当前Input的值修改为当前行name的值
  setEditable(index){
    const newEditable= [...this.state.editable],newEditValue = [...this.state.editValue],name = this.state.data[index].name

    newEditValue.splice(index,1,name)
    newEditable.splice(index,1,true)

    this.setState({editable:newEditable,editValue:newEditValue})
  }

  changInputVal(index,e){
    const newData = [...this.state.editValue]
    newData.splice(index,1,e.target.value)
    this.setState({editValue:newData})
  }

  // 修改后保存
  save(index) {
    const inputVal =this.state.editValue[index].trim() ,newData =[...this.state.data]

    // 当前行input框内容不为空时，保存
    if(inputVal){
      const item = newData[index]
      newData.splice(index,1,{...item,name:inputVal})
      this.setState({data:newData})
      message.success('修改成功')
      // 修改完成后 取消可编辑状态
      this.cancel(index)
    }

  }

  deleteRow(index) {
    // 删除当前行的数据、编辑状态、编辑值
    const newData =[...this.state.data]
    newData.splice(index,1)

    const newEditable =[...this.state.editable]
    newEditable.splice(index,1)

    const newEditValue =[...this.state.editValue]
    newEditValue.splice(index,1)

    this.setState({data:newData,editable:newEditValue,editValue:newEditable})

    message.success('删除成功')
  }
  // 取消修改，将编辑状态改为false
  cancel(index){
    const newEditable = [...this.state.editable]
    newEditable.splice(index,1,false)
    this.setState({editable:newEditable})
  }


  render() {

    return (
      <div className='shadow-radius'>
          <Table
              bordered
              columns={this.state.columns}
              dataSource={this.state.data}
              pagination={false}
              rowKey={row => row.date}
          />
      </div>
    )
  }
}

export default TableEdit