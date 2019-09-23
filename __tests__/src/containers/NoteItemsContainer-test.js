import {Text} from 'react-native';
import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';

import {noteItemHelpers} from '@helpers';

import NoteItemsContainer from '@containers/NoteItemsContainer';

describe('NoteItemsContainer', () => {
  describe('Props', () => {
    let renderResult;
    let noteItems;

    beforeEach(() => {
      noteItems = [
        {id: 1, text: 'Text lorem ipsum something', completed: false},
        {id: 2, text: 'Text1', completed: false},
      ];

      renderResult = render(
        <NoteItemsContainer noteItems={noteItems}>
          <Text testID="testComponent">test</Text>
        </NoteItemsContainer>,
      );
    });

    it('should pass noteItems to child component', () => {
      const {getByTestId} = renderResult;

      let testComponent = getByTestId('testComponent');
      expect(testComponent.props.noteItems).not.toBeNull();
    });

    it('should pass noteItemSelected to child component', () => {
      const {getByTestId} = renderResult;

      let testComponent = getByTestId('testComponent');
      expect(testComponent.props.noteItemSelected).not.toBeNull();
    });

    it('should pass onNoteItemCompletedToggle to child component', () => {
      const {getByTestId} = renderResult;

      let testComponent = getByTestId('testComponent');
      expect(testComponent.props.onNoteItemCompletedToggle).not.toBeNull();
    });

    it('should pass onNoteItemChangeText to child component', () => {
      const {getByTestId} = renderResult;

      let testComponent = getByTestId('testComponent');
      expect(testComponent.props.onNoteItemChangeText).not.toBeNull();
    });

    it('should pass onNoteItemPress to child component', () => {
      const {getByTestId} = renderResult;

      let testComponent = getByTestId('testComponent');
      expect(testComponent.props.onNoteItemPress).not.toBeNull();
    });

    it('should pass onNoteItemDeletePress to child component', () => {
      const {getByTestId} = renderResult;

      let testComponent = getByTestId('testComponent');
      expect(testComponent.props.onNoteItemDeletePress).not.toBeNull();
    });
  });

  describe('events', () => {
    let onNoteItemChangeHandler;
    let noteItems;
    let renderResult;

    beforeEach(() => {
      noteItemHelpers.toggleCompleted = jest.fn().mockReturnValue(noteItems);
      noteItemHelpers.updateText = jest.fn().mockReturnValue(noteItems);
      noteItemHelpers.deleteItem = jest
        .fn()
        .mockReturnValue({noteItems, noteItemSelected: 1});

      onNoteItemChangeHandler = jest.fn();
      noteItems = [
        {id: 1, text: 'Text lorem ipsum something', completed: false},
        {id: 2, text: 'Text1', completed: false},
      ];

      renderResult = render(
        <NoteItemsContainer
          noteItems={noteItems}
          onNoteItemChange={onNoteItemChangeHandler}>
          <Text testID="testComponent">test</Text>
        </NoteItemsContainer>,
      );
    });

    describe('onNoteItemCompletedToggle trigger', () => {
      it('should call noteItemHelpers.toggleCompleted method', () => {
        const {getByTestId} = renderResult;
        const testComponent = getByTestId('testComponent');
        fireEvent(testComponent, 'onNoteItemCompletedToggle');

        expect(noteItemHelpers.toggleCompleted).toHaveBeenCalled();
      });

      it('should trigger onNoteItemChange with noteItems', () => {
        const {getByTestId} = renderResult;
        const testComponent = getByTestId('testComponent');
        fireEvent(testComponent, 'onNoteItemCompletedToggle');

        expect(onNoteItemChangeHandler).toHaveBeenCalledWith(noteItems);
      });
    });

    describe('onNoteItemChangeText trigger', () => {
      it('should call noteItemHelpers.updateText method', () => {
        const {getByTestId} = renderResult;
        const testComponent = getByTestId('testComponent');
        fireEvent(testComponent, 'onNoteItemChangeText');

        expect(noteItemHelpers.updateText).toHaveBeenCalled();
      });

      it('should trigger onNoteItemChange with noteItems', () => {
        const {getByTestId} = renderResult;
        const testComponent = getByTestId('testComponent');
        fireEvent(testComponent, 'onNoteItemChangeText');

        expect(onNoteItemChangeHandler).toHaveBeenCalledWith(noteItems);
      });
    });

    describe('onNoteItemPress trigger', () => {
      it('should set the noteItemSelected props to the note item pressed id', () => {
        const {getByTestId} = renderResult;
        const testComponent = getByTestId('testComponent');
        fireEvent(testComponent, 'onNoteItemPress', 1);

        expect(testComponent.props.noteItemSelected).toEqual(1);
      });
    });

    describe('onNoteItemDeletePress trigger', () => {
      it('should call noteItemHelpers.deleteItem method', () => {
        const {getByTestId} = renderResult;
        const testComponent = getByTestId('testComponent');
        fireEvent(testComponent, 'onNoteItemDeletePress');

        expect(noteItemHelpers.deleteItem).toHaveBeenCalled();
      });

      it('should trigger onNoteItemChange with noteItems', () => {
        const {getByTestId} = renderResult;
        const testComponent = getByTestId('testComponent');
        fireEvent(testComponent, 'onNoteItemDeletePress');

        expect(onNoteItemChangeHandler).toHaveBeenCalledWith(noteItems);
      });
    });
  });
});
