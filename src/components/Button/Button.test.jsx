import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from 'components';

describe('<Button />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Button {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
