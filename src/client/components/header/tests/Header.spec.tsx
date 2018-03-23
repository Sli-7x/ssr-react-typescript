import * as React from 'react';
import { Header } from '../Header';
import * as renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';

describe('Header.tsx', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <StaticRouter context={{}}>
          <Header />
        </StaticRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
