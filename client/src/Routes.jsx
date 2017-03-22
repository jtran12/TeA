import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App.jsx';
import Main from './containers/main/Main.jsx';

export default(
  <Route path='/' component={App}>
    <IndexRoute component={Main} />
  </Route>
);
