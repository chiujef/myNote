import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from 'react-native-testing-library';

import FocusableTextInput from '@components/core/FocusableTextInput';

describe('FocusableTextInput', () => {
  describe('Rendering', () => {
    describe('Not focused component', () => {
      it('should match to snapshot', () => {
        const component = renderer
          .create(<FocusableTextInput text="text" isFocus={false} />)
          .toJSON();
        expect(component).toMatchSnapshot();
      });
    });

    describe('Focused component', () => {
      it('should match to snapshot', () => {
        const component = renderer
          .create(<FocusableTextInput text="text" isFocus={true} />)
          .toJSON();
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('Pressing text on unfocused component', () => {
    let renderResult;
    let onPressHandler = jest.fn();

    beforeEach(() => {
      renderResult = render(
        <FocusableTextInput text="Test" onPress={onPressHandler} />,
      );
    });

    it('should trigger onPress event', () => {
      const {getByText} = renderResult;
      fireEvent(getByText('Test'), 'onPress');

      expect(onPressHandler).toHaveBeenCalled();
    });

    it('should show the TextInput', () => {
      const {getByText, getByType} = renderResult;
      fireEvent(getByText('Test'), 'onPress');

      expect(getByType('TextInput')).not.toBeNull();
    });
  });

  describe('Changing text on focused component', () => {
    let renderResult;
    let onChangeTextHandler = jest.fn();

    beforeEach(() => {
      renderResult = render(
        <FocusableTextInput
          text="Test"
          isFocus={true}
          onChangeText={onChangeTextHandler}
        />,
      );
    });

    it('should trigger onChangeText event', () => {
      const {getByType} = renderResult;
      fireEvent.changeText(getByType('TextInput'), 'ab');

      expect(onChangeTextHandler).toHaveBeenCalled();
    });
  });

  describe('Unfocusing TextInput on focused component', () => {
    let renderResult;
    let onBlurHandler = jest.fn();

    beforeEach(() => {
      renderResult = render(
        <FocusableTextInput
          text="Test"
          isFocus={true}
          onBlur={onBlurHandler}
        />,
      );
    });

    it('should trigger onBlur event', () => {
      const {getByType} = renderResult;
      fireEvent(getByType('TextInput'), 'onBlur');

      expect(onBlurHandler).toHaveBeenCalled();
    });

    it('should hide TextInput', () => {
      const {queryByType} = renderResult;
      fireEvent(queryByType('TextInput'), 'onBlur');

      expect(queryByType('TextInput')).toBeNull();
    });
  });
});
