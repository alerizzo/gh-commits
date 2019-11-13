import React from 'react';
import renderer from 'react-test-renderer';

import { TextInput } from 'components';

describe('<TextInput />', () => {
  const defaultProps = {};
  const wrapper = renderer.create(<TextInput {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<TextInput isInvalid invalidMessage="Error text" />', () => {
  const defaultProps = {
    isInvalid: true,
    invalidMessage: 'Error text',
  };
  const wrapper = renderer.create(<TextInput {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<TextInput isLoading />', () => {
  const defaultProps = {
    isLoading: true,
  };
  const wrapper = renderer.create(<TextInput {...defaultProps} />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
