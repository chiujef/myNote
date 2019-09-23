import PropTypes from 'prop-types';
import React from 'react';
import {noteItemHelpers} from '@helpers';

export default class NoteItemsContainer extends React.Component {
  state = {
    noteItemSelected: -1,
  };

  onNoteItemCompletedToggle = noteItemId => {
    const {noteItems, onNoteItemChange} = this.props;

    const newNoteItems = noteItemHelpers.toggleCompleted(noteItems, noteItemId);
    this.setState({noteItemSelected: noteItemId});

    onNoteItemChange && onNoteItemChange(newNoteItems);
  };

  onNoteItemChangeText = (noteItemId, text) => {
    const {noteItems, onNoteItemChange} = this.props;

    const newNoteItems = noteItemHelpers.updateText(
      noteItems,
      noteItemId,
      text,
    );
    this.setState({noteItemSelected: noteItemId});

    onNoteItemChange && onNoteItemChange(newNoteItems);
  };

  onNoteItemPress = noteItemId => {
    this.setState({noteItemSelected: noteItemId});
  };

  onNoteItemAddPress = () => {
    const {noteItems, onNoteItemChange} = this.props;

    const result = noteItemHelpers.addItem(noteItems);
    this.setState({noteItemSelected: result.noteItemSelected});

    onNoteItemChange && onNoteItemChange(result.noteItems);
  };

  onNoteItemDeletePress = noteItemId => {
    const {noteItems, onNoteItemChange} = this.props;

    const result = noteItemHelpers.deleteItem(noteItems, noteItemId);
    this.setState({noteItemSelected: result.noteItemSelected});

    onNoteItemChange && onNoteItemChange(result.noteItems);
  };

  render() {
    const {noteItemSelected} = this.state;
    const {noteItems} = this.props;

    return React.cloneElement(this.props.children, {
      noteItems,
      noteItemSelected,
      onNoteItemCompletedToggle: this.onNoteItemCompletedToggle,
      onNoteItemChangeText: this.onNoteItemChangeText,
      onNoteItemPress: this.onNoteItemPress,
      onNoteItemDeletePress: this.onNoteItemDeletePress,
    });
  }
}

NoteItemsContainer.propTypes = {
  noteItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
  onNoteItemChange: PropTypes.func,
};
