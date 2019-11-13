import React from 'react';
import renderer from 'react-test-renderer';

import CommitsPageHeader from './CommitsPageHeader';

describe('<CommitsPageHeader />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<CommitsPageHeader {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<CommitsPageHeader isSearching />', () => {
  const defaultProps = {
    isSearching: true,
  };
  const wrapper = renderer.create(<CommitsPageHeader {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<CommitsPageHeader repository={...} />', () => {
  const defaultProps = {
    repository: {
      owner: 'Owner',
      repository: 'Repository',
      refName: 'Ref Name',
    },
  };
  const wrapper = renderer.create(<CommitsPageHeader {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<CommitsPageHeader showTableHeader />', () => {
  const defaultProps = {
    showTableHeader: true,
  };
  const wrapper = renderer.create(<CommitsPageHeader {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
