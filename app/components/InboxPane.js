import React from 'react';
import InboxItem from './InboxItem';
import autoBind from 'react-autobind';

class InboxPane extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  
  renderConvoSum(human) {
    return <InboxItem key={human} index={human} details={this.props.humans[human]} />;
  }
  
  render() {
    return (
      <div id="inbox-pane" className="column">
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

export default InboxPane;
