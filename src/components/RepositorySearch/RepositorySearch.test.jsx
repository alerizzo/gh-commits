import React from 'react';
import renderer from 'react-test-renderer';

import { RepositorySearch } from 'components';

describe('<RepositorySearch />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<RepositorySearch {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
