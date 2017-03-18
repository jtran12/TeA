import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers';
import createLogger from 'redux-logger';

function reduxStore(initialState) {
  const logger = createLogger();
  const store = createStore(reducers, initialState, applyMiddleware(logger),
    window.devToolsExtension && window.devToolsExtension());

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default reduxStore;
