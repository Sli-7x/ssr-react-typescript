import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Loadable from 'react-loadable';
import { ThemeProvider } from 'styled-components';
import configureStore from './core/configureStore';
import App from './App';
import { theme } from './core/theme';

declare global {
  interface IWindow {
    __INITIAL_STATE__: any;
    main: any;
  }
}

window.__INITIAL_STATE__ = window.__INITIAL_STATE__;
const initaliState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;
const store = configureStore(initaliState);

const renderApp = (Comp?: any) => {
  return hydrate(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Comp />
        </BrowserRouter>
      </ThemeProvider>
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
