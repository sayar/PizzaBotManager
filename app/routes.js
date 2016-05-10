import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import Conversation from './components/Conversation';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/conversation/:human" component={Conversation}></Route>
    </Route>
  </Router>
), document.getElementById('main'))
