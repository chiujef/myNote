import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {NoteItem} from '@components';

const NoteItems = ({
  noteItems,
  noteItemSelected,
  onNoteItemCompletedToggle,
  onNoteItemChangeText,
  onNoteItemPress,
  onNoteItemDeletePress,
}) => {
  return (
    <Fragment>
      {noteItems.map(noteItem => {
        let isSelected = noteItemSelected === noteItem.id;
        return (
          <NoteItem
            key={noteItem.id}
            noteItem={noteItem}
            isSelected={isSelected}
            onCompletedToggle={onNoteItemCompletedToggle}
            onChangeText={onNoteItemChangeText}
            onTextPress={onNoteItemPress}
            onDeletePress={onNoteItemDeletePress}
          />
        );
      })}
    </Fragment>
  );
};

NoteItems.propTypes = {
  noteItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
  noteItemSelected: PropTypes.number,
  onNoteItemCompletedToggle: PropTypes.func,
  onNoteItemChangeText: PropTypes.func,
  onNoteItemPress: PropTypes.func,
  onNoteItemDeletePress: PropTypes.func,
};

export default NoteItems;
