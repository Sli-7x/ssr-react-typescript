import * as React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';
import * as renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';

describe('Footer.tsx', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<StaticRouter context={{}}><Header /></StaticRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render good', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('#header').length).toBe(1);
  });
});
