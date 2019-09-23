import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from 'react-native-testing-library';

import Note from '@components/Note';

describe('Note', () => {
  let note;

  beforeEach(() => {
    note = {
      title: 'this is the title',
      items: [
        {id: 1, text: 'Text lorem ipsum something', completed: false},
        {id: 2, text: 'Text1', completed: false},
        {
          id: 3,
          text:
            'Text2 what is this? Lorem ipsum lang akong nahibaw an. la nay lain.',
          completed: true,
        },
      ],
    };
  });

  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer.create(<Note note={note} />).toJSON();
      expect(component).toMatchSnapshot();
    });

    it('should display title', () => {
      const {getByDisplayValue} = render(<Note note={note} />);

      expect(getByDisplayValue(note.title)).not.toBeNull();
    });

    it('should display the note item texts', () => {
      const {getAllByText} = render(<Note note={note} />);

      expect(getAllByText(/Text/).length).toBe(3);
    });
  });

  describe('Changing title', () => {
    it('should trigger onTitleChange with new value', () => {
      const onTitleChangeHandler = jest.fn();
      const {getByDisplayValue} = render(
        <Note note={note} onTitleChange={onTitleChangeHandler} />,
      );

      fireEvent.changeText(getByDisplayValue(note.title), 'ab');

      expect(onTitleChangeHandler).toHaveBeenCalledWith('ab');
    });
  });

  describe('Pressing "Add"', () => {
    it('should trigger onNoteItemChange event with new noteItems values', () => {
      const onNoteItemChangeHandler = jest.fn();
      const {getByText} = render(
        <Note note={note} onNoteItemChange={onNoteItemChangeHandler} />,
      );

      fireEvent.press(getByText('+ Add'));

      expect(onNoteItemChangeHandler.mock.calls[0][0].length).toBe(4);
    });
  });
});
