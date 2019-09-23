import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import {FocusableTextInput} from '@components/core';

const NoteItem = ({
  noteItem,
  isSelected,
  onCompletedToggle,
  onChangeText,
  onTextPress,
  onDeletePress,
}) => {
  function onThisCompletedToggle() {
    onCompletedToggle && onCompletedToggle(noteItem.id);
  }

  function onThisChangeText(text) {
    onChangeText && onChangeText(noteItem.id, text);
  }

  function onThisDeletePress() {
    onDeletePress && onDeletePress(noteItem.id);
  }

  function onThisTextPress() {
    onTextPress && onTextPress(noteItem.id);
  }

  return (
    <View style={styles.noteItemContainer}>
      <CheckBox
        style={styles.noteItemCheckBox}
        checked={noteItem.completed}
        onPress={onThisCompletedToggle}
      />
      <FocusableTextInput
        style={styles.noteItem}
        textInputStyle={noteItem.completed ? styles.noteItemCompleted : null}
        text={noteItem.text}
        isFocus={isSelected}
        onChangeText={onThisChangeText}
        onPress={onThisTextPress}
      />
      <View style={styles.noteItemButtonContainer}>
        {isSelected ? <Button title="x" onPress={onThisDeletePress} /> : false}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  noteItemCheckBox: {
    flex: 0.15,
  },
  noteItem: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    flex: 0.6,
  },
  noteItemCompleted: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  noteItemButtonContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 1,
    flex: 0.25,
  },
  noteText: {
    textAlignVertical: 'center',
  },
});

NoteItem.propTypes = {
  noteItem: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    completed: PropTypes.bool,
  }),
  isSelected: PropTypes.bool,
  onCompletedToggle: PropTypes.func,
  onChangeText: PropTypes.func,
  onTextPress: PropTypes.func,
  onDeletePress: PropTypes.func,
};

export default NoteItem;
