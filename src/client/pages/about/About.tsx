import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withError } from '../../components/errors/ErrorWrapper';
import { Button } from '../../shared/button/Button';

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
        <Button onClick={this.onClick}>Click me</Button>
      </div>
    );
  }
}

export default withError(About);
