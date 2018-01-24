import * as React from 'react';
import { mount } from 'enzyme';
import Error404 from '../Error404';
import App from '../../../App';
import * as renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';

describe('Error404.tsx', () => {
  // it('should render correctly', () => {
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/random']}>
  //       <Error404 />
  //     </MemoryRouter>,
  //   );
  //   // expect(wrapper.find(LandingPage)).toHaveLength(0);
  //   expect(wrapper.find(Error404)).toHaveLength(1);
  // });

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
