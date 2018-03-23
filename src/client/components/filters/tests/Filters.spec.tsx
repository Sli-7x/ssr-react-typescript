import * as React from 'react';
import { Filters } from '../Filters';
import * as renderer from 'react-test-renderer';

describe('Filters.tsx', () => {
  const props = {
    list: [{ id: 12, title: 'Some random title' }],
  };
  it('should render correctly', () => {
    const filledTree = renderer.create(<Filters {...props} />).toJSON();
    expect(filledTree).toMatchSnapshot();
  });
});
