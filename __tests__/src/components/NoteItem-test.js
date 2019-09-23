/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from 'react-native-testing-library';

import NoteItem from '@components/NoteItem';

describe('NoteItem', () => {
  let noteItem;
  let noteItemComplete;

  beforeEach(() => {
    noteItem = {
      id: 1,
      text: 'tent',
      completed: false,
    };

    noteItemComplete = {
      id: 1,
      text: 'tent',
      completed: true,
    };
  });

  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer
        .create(<NoteItem noteItem={noteItem} isSelected={true} />)
        .toJSON();
      expect(component).toMatchSnapshot();
    });

    it('completed noteItem should match to snapshot', () => {
      const component = renderer
        .create(<NoteItem noteItem={noteItemComplete} isSelected={true} />)
        .toJSON();
      expect(component).toMatchSnapshot();
    });

    it('isSelected should show "x" button', () => {
      const {queryByText} = render(
        <NoteItem noteItem={noteItem} isSelected={true} />,
      );

      expect(queryByText('x')).not.toBeNull();
    });

    it('not isSelected should not show "x" button', () => {
      const {queryByText} = render(
        <NoteItem noteItem={noteItem} isSelected={false} />,
      );

      expect(queryByText('x')).toBeNull();
    });
  });

  describe('Pressing checkbox', () => {
    it('should trigger onCompletedToggle event with noteItem id', () => {
      const onCompletedToggleHandler = jest.fn();
      const {getByTestId} = render(
        <NoteItem
          noteItem={noteItem}
          onCompletedToggle={onCompletedToggleHandler}
        />,
      );

      fireEvent(getByTestId('checkbox'), 'onPress');

      expect(onCompletedToggleHandler).toHaveBeenCalledWith(noteItem.id);
    });
  });

  describe('Pressing unselected noteItem text', () => {
    it('should trigger onTextPress with noteItem id', () => {
      const onTextPressHandler = jest.fn();
      const {queryByText} = render(
        <NoteItem noteItem={noteItem} onTextPress={onTextPressHandler} />,
      );

      fireEvent(queryByText('tent'), 'onPress');

      expect(onTextPressHandler).toHaveBeenCalledWith(noteItem.id);
    });
  });

  describe('Changing selected noteItem text', () => {
    it('should trigger onChangeText with noteItem id', () => {
      const onChangeTextHandler = jest.fn();
      const {queryByType} = render(
        <NoteItem
          noteItem={noteItem}
          isSelected={true}
          onChangeText={onChangeTextHandler}
        />,
      );

      fireEvent.changeText(queryByType('TextInput'), 'ab');

      expect(onChangeTextHandler).toHaveBeenCalledWith(noteItem.id, 'ab');
    });
  });

  describe('Pressing "x" button', () => {
    it('should trigger onThisDeletePress event with noteItem id', () => {
      const onDeletePressHandler = jest.fn();
      const {getByText} = render(
        <NoteItem
          noteItem={noteItem}
          isSelected={true}
          onDeletePress={onDeletePressHandler}
        />,
      );

      fireEvent(getByText('x'), 'onPress');

      expect(onDeletePressHandler).toHaveBeenCalledWith(noteItem.id);
    });
  });
});
