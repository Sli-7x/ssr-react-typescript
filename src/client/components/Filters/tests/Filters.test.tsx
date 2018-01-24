import * as React from 'react';
import Filters from '../Filters';
import * as renderer from 'react-test-renderer';

const mock = [
  {
    id: 12,
    title: 'Some random title',
  },
];

describe('Filters.tsx', () => {
  it('should render correctly', () => {
    const filledTree = renderer.create(<Filters list={mock} />).toJSON();
    expect(filledTree).toMatchSnapshot();
  });
});
