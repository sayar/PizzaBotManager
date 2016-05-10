import React from 'react';
import Conversation from './Conversation';
import Inbox from './Inbox';
import StoreList from './StoreList';
import autoBind from 'react-autobind';
import samples from '../sample-data';

class App extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
 
    this.state = { 
      "humans": {},
      "stores": {}
    };
  }
  
  loadSampleData() {
    this.setState(samples);
  }
  
  // Handle when user navigates to a conversation directly without first loading the index...
  componentWillMount() {
    if('human' in this.props.params){
      this.loadSampleData();
    }
  }
  
  render() {
    return (
      <div>
        <div id="header"></div>
        <button onClick={this.loadSampleData}>Load Sample Data</button>
        <div className="container">
          <div className="column">
            <Inbox humans={this.state.humans} />
          </div>
          <div className="column">
            {this.props.children || "Select a Conversation from the Inbox"}
          </div>
          <div className="column">
            <StoreList stores={this.state.stores} />
          </div>
        </div>
      </div>
    )
  }
};

export default App;
