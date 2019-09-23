import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {ControlHeader} from '@components/core';
import {NoteItems} from '@components';
import {NoteItemsContainer} from '@containers';

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.noteItemsContainer = React.createRef();
  }

  onNoteItemAddPress = () => {
    this.noteItemsContainer.current.onNoteItemAddPress();
  };

  render() {
    const {note, onTitleChange, onNoteItemChange} = this.props;

    return (
      <Fragment>
        <ControlHeader>
          <Button title="+ Add" onPress={this.onNoteItemAddPress} />
        </ControlHeader>
        <ScrollView
          style={styles.noteContainer}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled">
          <TextInput
            onChangeText={onTitleChange}
            style={styles.noteTitle}
            maxLength={25}
            placeholder="title"
            value={note.title}
          />
          <View>
            <NoteItemsContainer
              ref={this.noteItemsContainer}
              noteItems={note.items}
              onNoteItemChange={onNoteItemChange}>
              <NoteItems />
            </NoteItemsContainer>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  noteContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

Note.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        completed: PropTypes.bool,
      }),
    ),
  }),
  onTitleChange: PropTypes.func,
  onNoteItemChange: PropTypes.func,
};
