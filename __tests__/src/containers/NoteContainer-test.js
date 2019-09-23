import {Text} from 'react-native';
import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';

import NoteContainer from '@containers/NoteContainer';

describe('NoteContainer', () => {
  describe('Props', () => {
    let renderResult;

    beforeEach(() => {
      renderResult = render(
        <NoteContainer>
          <Text testID="testComponent">test</Text>
        </NoteContainer>,
      );
    });

    it('should pass note to child component', () => {
      const {getByTestId} = renderResult;

      let testComponent = getByTestId('testComponent');
      expect(testComponent.props.note).not.toBeNull();
    });

    it('should pass onTitleChange to child component', () => {
      const {getByTestId} = renderResult;

      let testComponent = getByTestId('testComponent');
      expect(testComponent.props.onTitleChange).not.toBeNull();
    });

    it('should pass onNoteItemChange to child component', () => {
      const {getByTestId} = renderResult;

      let testComponent = getByTestId('testComponent');
      expect(testComponent.props.onNoteItemChange).not.toBeNull();
    });
  });

  describe('events', () => {
    let renderResult;

    beforeEach(() => {
      renderResult = render(
        <NoteContainer>
          <Text testID="testComponent">test</Text>
        </NoteContainer>,
      );
    });

    describe('triggering onTitleChange', () => {
      it('should render the new title', () => {
        const {getByTestId} = renderResult;
        let testComponent = getByTestId('testComponent');
        fireEvent(testComponent, 'onTitleChange', 'New Title');

        expect(testComponent.props.note.title).toMatch(/New Title/);
      });
    });

    describe('triggering onNoteItemChange', () => {
      it('should render the new note items', () => {
        const {getByTestId} = renderResult;
        let testComponent = getByTestId('testComponent');
        fireEvent(testComponent, 'onNoteItemChange', {
          id: 10,
          text: 'New Item',
          completed: false,
        });

        expect(testComponent.props.note.items.id).toEqual(10);
      });
    });
  });
});
