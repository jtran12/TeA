import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App.jsx';
import Login from './containers/login/login.jsx';
import Main from './containers/main/Main.jsx';

export default(
  <Route path='/' component={App}>
    <IndexRoute component={Login} />
    <Route path="/main" component={Main}/>
  </Route>
);
