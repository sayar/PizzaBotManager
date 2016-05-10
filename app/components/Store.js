import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import autoBind from 'react-autobind';

class Store extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getCount(status) {
    return this.props.details.orders.filter(function(n){ return n.status === status}).length;
  }
  
  render() {
    return (
      <li>
        <p>{this.props.index}</p>
        <p>Orders Confirmed: {this.getCount("Confirmed")}</p>
        <p>Orders In The Oven: {this.getCount("In The Oven")}</p>
        <p>Orders Delivered: {this.getCount("Delivered")}</p>
      </li>
    )
  }
};

export default Store;
