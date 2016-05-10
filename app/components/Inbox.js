import React from 'react';
import ConversationSummary from './ConversationSummary';
import autoBind from 'react-autobind';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  
  renderConvoSum(human) {
    return <ConversationSummary key={human} index={human} details={this.props.humans[human]} />;
  }
  
  render() {
    return (
      <div id="inbox">
        <h1>Inbox</h1>
        <table>
          <thead>
            <tr>
              <th>Chat Received</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.humans).map(this.renderConvoSum)}
          </tbody>
        </table>
      </div>
    )
  }
};

export default Inbox;
