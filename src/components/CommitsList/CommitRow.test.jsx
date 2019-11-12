import React from 'react';
import renderer from 'react-test-renderer';

import CommitRow from './CommitRow';

describe('<CommitRow />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<CommitRow {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<CommitRow commit={ ... } />', () => {
  const defaultProps = {
    commit: {
      id: 'MDY6Q29tbWl0MTU3NjIxOTYzOjE3MmJkYjc4MDU5NDA0ZjE5MzA1OWEyOGJkMzkzZDA4NmM0NjZhOTE=',
      abbreviatedOid: '172bdb7',
      messageHeadline: 'Sample message headline',
      committedDate: '2019-10-08T17:00:00Z',
      author: {
        name: 'Tyler Durden',
        email: 'tdurden@paperstsoap.co',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/92839?v=4',
      },
      parents: {
        totalCount: 2,
      },
    },
  };

  const wrapper = renderer.create(<CommitRow {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<CommitRow.Header />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<CommitRow.Header {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<CommitRow.Skeleton />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<CommitRow.Skeleton {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
