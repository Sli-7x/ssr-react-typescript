import * as serialize from 'serialize-javascript';

interface IInfo {
  content: string;
  data?: any;
  bundles?: any[];
  helmet?: any;
}

declare global {
  interface IWindow {
    main: any;
  }
}

export default ({ content, data, bundles = [], helmet }: IInfo) => {
  return `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="msapplication-config" content="none">
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="app">${content}</div>
      <script>window.__INITIAL_STATE__ = ${serialize(data, { isJSON: true })}</script>
      <script src="/js/vendor.js"></script>
      <script src="/js/client.js"></script>
      ${bundles.map((bundle: any) => (bundle ? `<script src="/${bundle.file}"></script>` : '')).join('\n')}
      ${'<script>window.main();</script>'}
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
      <link href="/css/global.css" rel="stylesheet" />
    </body>
    </html>`;
};
