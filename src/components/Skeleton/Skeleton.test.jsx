import React from 'react';
import renderer from 'react-test-renderer';

import { Skeleton } from 'components';

describe('<Skeleton.Circle />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Skeleton.Circle {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Skeleton.Text />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Skeleton.Text {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
