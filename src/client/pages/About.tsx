import * as React from 'react';
import { Helmet } from 'react-helmet';

interface IProps {
  fetchData?: void;
}

class About extends React.Component<IProps, any> {
  render() {
    return (
      <div>
        <Helmet>
          <title>Typescript react ssr | About</title>
        </Helmet>
        ABOUT US
      </div>
    );
  }
}

export default About;
