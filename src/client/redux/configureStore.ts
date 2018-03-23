import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const configureStore = (preloadedState?: any): any => {
  const store = createStore(reducers, preloadedState, applyMiddleware(thunk));

  if ((module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default configureStore;
