import * as React from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Switch } from 'react-router-dom';
// import Error404 from './components/Errors/Error404'
// import RedirectWithStatus from './components/Errors/RedirectWithStatus'
/*
<RedirectWithStatus
  status={302}
  from="/about"
  to="/about-us"
/>
*/

import routes from './routes';

export default class App extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <Helmet>
          <title>Typescript react ssr</title>
          <meta name="description" content="moebel stuff, tables, kitchen, chairs" />
        </Helmet>
        <main className="content">
          <Switch>
            {routes.map((val: any, i) => <Route {...val} key={i} />)}
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}
