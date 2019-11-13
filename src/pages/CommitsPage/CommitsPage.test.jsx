import React from 'react';
import renderer from 'react-test-renderer';

import CommitsPage from './CommitsPage';

describe('<CommitsPage />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<CommitsPage {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
