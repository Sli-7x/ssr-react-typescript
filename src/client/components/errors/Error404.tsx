import * as React from 'react';

class Error404 extends React.Component {
  componentWillMount() {
    const { staticContext }: any = this.props;
    if (staticContext) {
      staticContext.status = 404;
    }
  }

  render() {
    return <h1>Sorry, can’t find that. 404</h1>;
  }
}

export default Error404;
