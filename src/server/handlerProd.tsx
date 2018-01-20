import * as express from 'express';
import * as React from 'react';
import * as fs from 'fs';
import * as path from 'path';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import configureStore from '../client/core/configureStore';
import routes from '../client/routes';
import template from './template';
import App from '../client/App';
import { ssrCache, cacheMiddleware, getCacheKey } from './cacheMiddleware';

const router = express.Router();
let stats: any = {};
let modules: any[];
if (fs.existsSync(path.resolve(__dirname, '../../dist/js/react-loadable.json'))) {
  stats = import(path.resolve(__dirname, '../../dist/js/react-loadable.json'));
}

router.get('*', cacheMiddleware, async (req, res) => {
  const url = req.url.split(/[?#]/)[0];
  const store = configureStore();
  const context: any = {};
  modules = [];

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
    const appHtml = renderToString(
      <Loadable.Capture report={storas}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </Loadable.Capture>,
    );

    if (context.status === 404) {
      res.status(404);
    }

    if (context.status === 301 || context.status === 302) {
      return res.redirect(context.status, context.url);
    }

    const bundles = getBundles(stats, modules);
    const helmet = Helmet.renderStatic();
    const html = template({ data: store.getState(), content: appHtml, bundles: bundles, helmet: helmet });

    if (context.status !== 404) {
      ssrCache.set(getCacheKey(req), html);
    }

    res.send(html);
  });
});

const storas = (moduleName: string) => modules.push(moduleName);

export default router;
