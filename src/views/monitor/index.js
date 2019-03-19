import React, { Component } from 'react';
import { Card } from 'antd';
import './index.css';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import api from '@/axios'

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const arr = ['52.82.47.13', '52.82.4.8', '52.82.60.201', '52.82.58.162']



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: '52.82.47.13'
    }
  }
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    this.showChart()
 
}
  showChart = () =>{
    var monitorChart = echarts.init(document.getElementById('monitor'));
    api.post('/api/monitor/getdata',{'ip': this.state.ip}).then(response =>{
      console.log(response)
      var cpuarr = []
      for (var x in response.data.datas['cpu']){
        cpuarr.push(response.data.datas['cpu'][x].slice(0,-1))
      }
      var memarr = []
      for (var y in response.data.datas['mem']){
        memarr.push(response.data.datas['mem'][y].split(' ')[1].slice(0,-1))
      }
      var diskarr = []
      for (var i in response.data.datas['disk']){
        console.log(response.data.datas['disk'][i].split(' '))

        diskarr.push(response.data.datas['disk'][i].split(' ')[1].slice(0,-1))
      }
      monitorChart.setOption({
        title: {
            text: 'System Metrics'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['cpu', 'mem', 'disk']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: response.data.datas['date']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'cpu',
                type:'line',
                step: 'start',
                data: cpuarr
            },
            {
                name:'mem',
                type:'line',
                step: 'middle',
                data: memarr
            },
            {
                name:'disk',
                type:'line',
                step: 'end',
                data:diskarr
            }
        ]
      })
    })
  }
  handleClick = (e) =>{
    console.log(e.currentTarget.textContent)
    this.setState({
      ip: e.currentTarget.textContent
    })

    this.showChart()
  }


  render() {
    return (
      <div className="App">

        <Card title="Monitor">
          {arr.map((i) =>{
            return <Card.Grid key={i} onClick={this.handleClick}  style={gridStyle}>{i}</Card.Grid>
          })}
        </Card>

        {/* <div
            className="Output"
            dangerouslySetInnerHTML={{ __html: this.state.output }}
            style={{ width: '100%' }}
        >
        </div> */}
        <div id="monitor"></div>
      </div>
    );
  }
}

export default App;