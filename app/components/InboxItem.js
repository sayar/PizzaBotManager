import React from 'react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import autoBind from 'react-autobind';

class InboxItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  sortByDate(a, b) {
    return a.time>b.time ? -1 : a.time<b.time ? 1 : 0;
  }
  
  messageSummary(conversations) {
    var lastMessage = conversations.sort(this.sortByDate)[0];
    return lastMessage.who + ' said: "' + lastMessage.text + '" @ ' + lastMessage.time.toDateString();
  }
  
  render() {
    return (
      <tr className="inbox-item">
        <td className="conversation"><Link to={'/conversation/' + encodeURIComponent(this.props.index)}>{this.messageSummary(this.props.details.conversations)}</Link></td>
        <td className="name">{this.props.index}</td>
        <td className="status">{this.props.details.orders.sort(this.sortByDate)[0].status}</td>
      </tr>
    )
  }
};

export default InboxItem;
