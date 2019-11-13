import React from 'react';
import renderer from 'react-test-renderer';

import { Page } from 'components';

describe('<Page />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Page {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
