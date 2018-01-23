import * as React from 'react';
import Footer from '../Footer';
import * as renderer from 'react-test-renderer';

describe('Footer.tsx', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
