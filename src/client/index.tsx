import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './core/configureStore';
import App from './App';
import * as Loadable from 'react-loadable';
// import { renderRoutes } from 'react-router-config';
// import routes from './routes';

declare global {
  interface IWindow {
    __INITIAL_STATE__: any;
    main: any;
  }
}

window.__INITIAL_STATE__ = window.__INITIAL_STATE__;
const store = configureStore(window.__INITIAL_STATE__);

const renderApp = (Comp?: any) => {
  return hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Comp />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  );
};

if ((module as any).hot) {
  (window as IWindow).main = () => {
    Loadable.preloadReady().then(() => {
      renderApp(App);
    });
  };

  (module as any).hot.accept('./App', () => {
    const NewApp = require('./App').default;
    renderApp(NewApp);
  });
} else {
  (window as IWindow).main = () => {
    Loadable.preloadReady().then(() => {
      renderApp(App);
    });
  };
}
