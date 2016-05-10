import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import autoBind from 'react-autobind';

class Message extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <p>{this.props.who} said: "{this.props.text}"</p>
    )
  }
};

export default Message;
