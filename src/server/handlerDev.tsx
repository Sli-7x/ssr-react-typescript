import * as express from 'express';
import * as React from 'react';
import * as ReactDom from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import configureStore from '../client/core/configureStore';
import App from '../client/App';
import routes from '../client/routes';
import template from './template';

const router = express.Router();

router.get('*', async (req: express.Request, res: express.Response) => {
  const context: any = {};
  const url: string = req.url.split(/[?#]/)[0];
  const store = configureStore();

  const promises = await routes.filter((route: any) => route.path === url).map(async (route) => {
    const component: any = route.component;
    if (component.preload && component.preload instanceof Function) {
      const data = await component.preload();

      const fetchData = data.default.fetchData;
      return fetchData instanceof Function ? fetchData({ store }) : Promise.resolve(null);
    }

    if (component.fetchData instanceof Function) {
      return component.fetchData({ store, req, res });
    }
  });

  return Promise.all(promises).then(() => {
    const appHtml = ReactDom.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>,
    );

    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 301 || context.status === 302) {
      return res.redirect(context.status, context.url);
    }

    const helmet = Helmet.renderStatic();

    const html = template({ content: appHtml, helmet: helmet, data: store.getState() });

    res.send(html);
  });
});

export default router;
