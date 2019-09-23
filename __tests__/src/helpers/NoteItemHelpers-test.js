import 'react-native';
import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';

import NoteItemHelpers from '@helpers/NoteItemHelpers';

describe('NoteItemHelpers', () => {
  let noteItems;

  beforeEach(() => {
    noteItems = [
      {id: 1, text: 'Text lorem ipsum something', completed: false},
      {id: 2, text: 'Text1', completed: false},
    ];
  });

  describe('findById', () => {
    describe('Passing noteItems and valid id', () => {
      it('should return the noteItems with the corresponding id', () => {
        let result = NoteItemHelpers.findById(noteItems, 1);

        expect(result.id).toEqual(1);
      });
    });

    describe('Passing noteItems and invalid id', () => {
      it('should return undefined', () => {
        let result = NoteItemHelpers.findById(noteItems, 10);

        expect(result).not.toBeDefined();
      });
    });
  });

  describe('createNewItem', () => {
    it('should create new not completed noteItem', () => {
      let result = NoteItemHelpers.createNewItem();

      expect(result.completed).toBeFalsy();
    });

    describe('passing no parameters', () => {
      it('should create new noteItem with empty text', () => {
        let result = NoteItemHelpers.createNewItem();

        expect(result.text).toEqual('');
      });
    });

    describe('passing parameter text', () => {
      it('should create new noteItem with text', () => {
        let result = NoteItemHelpers.createNewItem('text');

        expect(result.text).toEqual('text');
      });
    });
  });

  describe('toggleCompleted', () => {
    describe('passing noteItems and valid id', () => {
      it('should toggle completed field of target noteItem', () => {
        let result = NoteItemHelpers.toggleCompleted(noteItems, 1);

        expect(result[0].completed).not.toBeFalsy();
      });
    });

    describe('passing noteItems and invalid id', () => {
      it('should not change the noteItems', () => {
        let result = NoteItemHelpers.toggleCompleted(noteItems, 10);

        expect(result[0].completed).toBeFalsy();
        expect(result[1].completed).toBeFalsy();
      });
    });
  });

  describe('updateText', () => {
    describe('passing noteItems and valid id', () => {
      it('should update the text of target noteItem', () => {
        let result = NoteItemHelpers.updateText(noteItems, 1, 'new text');

        expect(result[0].text).toEqual('new text');
      });
    });

    describe('passing noteItems and invalid id', () => {
      it('should not change the text of noteItems', () => {
        let result = NoteItemHelpers.updateText(noteItems, 10, 'new text');

        expect(result[0].text).not.toEqual('new text');
        expect(result[1].text).not.toEqual('new text');
      });
    });
  });

  describe('addItem', () => {
    it('should add new noteItem at the end of noteItems', () => {
      let result = NoteItemHelpers.addItem(noteItems);

      expect(result.noteItems[2].text).toEqual('');
      expect(result.noteItems[2].completed).toBeFalsy();
    });

    it('should return the newly added noteItem id', () => {
      let result = NoteItemHelpers.addItem(noteItems);

      expect(result.noteItemSelected).toEqual(result.noteItems[2].id);
    });
  });

  describe('deleteItem', () => {
    describe('passing noteItems and valid id', () => {
      it('should remove the target noteItem from noteItems', () => {
        let result = NoteItemHelpers.deleteItem(noteItems, 1);

        expect(result.noteItems.length).toEqual(1);
        expect(result.noteItems[0].id).not.toEqual(1);
      });
    });

    describe('passing noteItems and invalid id', () => {
      it('should not modify noteItems', () => {
        let result = NoteItemHelpers.deleteItem(noteItems, 10);

        expect(result.noteItems.length).toEqual(2);
      });
    });
  });
});
