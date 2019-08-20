import React from 'react';
import { Layout, Input, Button } from 'antd';
import ReactJson from 'react-json-view';
import JsonToGo from './JsonToGo';

import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/go/go'

const { Header, Content } = Layout;
const { TextArea } = Input;

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      jsonStr: "",
      json: {},
      golang: "",
      jsonWeight: 1,
      viewWeight: 2,
      goWeight: 2
    }
  }
  
  onParse = () => {
    this.setState({
      json: JSON.parse(this.state.jsonStr),
      golang: JsonToGo(this.state.jsonStr).go
    })
  }

  render () {
    return (
      <Layout style={{height: '100%'}}>
        <Header style={{color: '#FFF', fontSize: 20}}>
          JsonFormat / JsonView / Json 转 Go Struct
        </Header>
        <Content style={{display: 'flex'}}>
          <div style={{ flex: this.state.jsonWeight, padding: 10}}>
            <TextArea style={{ height: "100%" }} autoFocus onChange={
                (e) => { this.setState({ jsonStr: e.target.value }) }
              } />

            <Button style={{ position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)' }} 
              type="primary" shape="circle" icon="arrow-right" size="large" onClick={() => this.onParse()}/>
          </div>
          
          <div style={{ flex: this.state.viewWeight, padding: 10, overflow: 'auto' }}>
            <ReactJson style={{ height: "100%" }} src={this.state.json} theme="Hopscotch"/>
          </div>
          <div style={{ flex: this.state.goWeight, padding: 10, overflow: 'auto' }}>
            <CodeMirror
              value={this.state.golang}
              options={{
                theme: 'monokai',
                keyMap: 'sublime',
                mode: 'go',
              }}
            />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default App;
