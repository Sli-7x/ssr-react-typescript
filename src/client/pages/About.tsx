import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withError } from '../components/Errors/ErrorWrapper';

interface IProps {
  fetchData?: void;
}

class About extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      show: false,
    };
  }

  onClick() {
    this.setState({ show: true }, () => {
      throw new Error('asd');
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Typescript react ssr | About</title>
        </Helmet>
        ABOUT US
        <button onClick={this.onClick}>Click me</button>
      </div>
    );
  }
}

export default withError(About);
