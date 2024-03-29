import React from 'react';
import renderer from 'react-test-renderer';

import CommitsList from './CommitsList';

describe('<CommitsList />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<CommitsList {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
