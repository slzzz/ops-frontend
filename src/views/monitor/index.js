import React, { Component } from 'react';
import { Card } from 'antd';
import './index.css';
import api from '@/axios'

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const arr = ['52.82.47.13', '52.82.4.8', '52.82.60.201', '52.82.58.162']


class App extends Component {
  constructor(props) {
    super(props);
  }
  //   componentWillMount(){
  // })

  handleClick = (e) =>{
    console.log(e.currentTarget.textContent)
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
      </div>
    );
  }
}

export default App;