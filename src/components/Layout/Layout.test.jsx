import React from 'react';
import renderer from 'react-test-renderer';

import { Layout } from 'components';

describe('<Layout />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<Layout {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Layout>...</Layout>', () => {
  const defaultProps = {};
  const wrapper = renderer.create(
    <Layout {...defaultProps}>
      <p>Some content</p>
    </Layout>
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
