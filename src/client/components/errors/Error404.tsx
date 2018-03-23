import * as React from 'react';

export interface IError404Props {
  staticContext?: any;
}

export default class Error404 extends React.Component<IError404Props, any> {
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
