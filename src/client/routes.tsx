import * as React from 'react';
import * as Loadable from 'react-loadable';

function loading(props: any) {
  let comp: any = null;
  if (props.error) {
    comp = <div>Error!</div>;
  } else if (props.pastDelay) {
    comp = <div>Loading...</div>;
  }

  return comp;
}

const Error404 = Loadable({
  loader: () => import('./components/errors/Error404'),
  loading: loading,
  delay: 300,
});

const About = Loadable({
  loader: () => import('./pages/About'),
  loading: loading,
  delay: 300,
});

const List = Loadable({
  loader: () => import('./pages/List'),
  loading: loading,
  delay: 300,
});

const routes = [
  {
    path: '/',
    exact: true,
    component: List,
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    path: '*',
    component: Error404,
    status: 404,
  },
];

export default routes;
