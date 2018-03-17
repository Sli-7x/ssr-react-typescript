import * as React from 'react';
import Error404 from '../Error404';
import * as renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

describe('Error404.tsx', () => {
  it('should render correctly', () => {
    const filledTree = renderer
      .create(
        <StaticRouter location="/asd" context={{}}>
          <Error404 />
        </StaticRouter>,
      )
      .toJSON();
    expect(filledTree).toMatchSnapshot();
  });
});
