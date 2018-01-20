import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as helmet from 'helmet';
import * as Loadable from 'react-loadable';
import * as compression from 'compression';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import Routes from './handlerDev';
import ProdRoutes from './handlerProd';
import * as webpackDev from '../../config/webpack.dev.js';

const PORT = process.env.PORT;
const app = express();
const isProd = process.env.NODE_ENV === 'production';
const isServer = process.env.NODE_ENV === 'server';

app.use(compression());
app.use(helmet());
app.use(cookieParser());

process.on('uncaughtException', (err) => {
  console.log(err);
});

app.get('/api/filters', (req: express.Request, res: express.Response) => {
  console.log(req.url);
  const data = {
    success: true,
    message: null,
    content: {
      adsTypes: [{ id: 1, title: 'First', slug: 'first' }, { id: 2, title: 'Second', slug: 'second' }],
      objectsTypes: [
        { id: 1, title: 'Some filter', slug: 'some-filter' },
        { id: 2, title: 'Another', slug: 'another' },
        { id: 3, title: 'Moto', slug: 'moto' },
        { id: 4, title: 'Cars', slug: 'cars' },
      ],
      countries: [{ id: 1, code: 'UK', title: 'United Kingdom', slug: 'united-kingdom' }],
    },
  };

  return res.status(200).json(data);
});

if (!isProd && !isServer) {
  const config: any = webpackDev;
  const compiler = webpack(config);
  const options: any = {
    serverSideRender: true,
    stats: {
      colors: true,
    },
  };
  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(compiler));
  app.use('/', Routes);
  Loadable.preloadAll().then(() => {
    app.listen(PORT, () => console.log('started port: ' + PORT));
  });
} else {
  app.use(express.static(path.join(__dirname, '..', '..', 'dist'), { redirect: false }));
  app.use('/', ProdRoutes);

  Loadable.preloadAll().then(() => {
    app.listen(PORT, () => console.log('started production port: ' + PORT));
  });
}
