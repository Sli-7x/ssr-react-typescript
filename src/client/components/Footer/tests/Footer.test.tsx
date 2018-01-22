import * as React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer';
import * as renderer from 'react-test-renderer';

describe('Footer.tsx', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
