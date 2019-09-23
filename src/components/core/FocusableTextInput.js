import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class FocusableTextInput extends React.Component {
  state = {
    isFocus: this.props.isFocus || false,
  };

  onPress = () => {
    this.setState({isFocus: true});
    this.props.onPress && this.props.onPress();
  };

  onBlur = () => {
    this.setState({isFocus: false});
    this.props.onBlur && this.props.onBlur();
  };

  render() {
    const {text, textInputStyle, onChangeText} = this.props;
    const {isFocus} = this.state;

    return (
      <View style={styles.container}>
        {isFocus ? (
          <TextInput
            style={[styles.textInput, textInputStyle]}
            multiline={true}
            onChangeText={onChangeText}
            onBlur={this.onBlur}
            blurOnSubmit={false}
            value={text}
            autoCorrect={false}
            autoFocus={true}
            autoCompleteType="off"
          />
        ) : (
          <TouchableWithoutFeedback style={styles.text} onPress={this.onPress}>
            <Text style={textInputStyle}>{text}</Text>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

FocusableTextInput.propTypes = {
  text: PropTypes.string,
  isFocus: PropTypes.bool,
  onChangeText: PropTypes.func,
  onPress: PropTypes.func,
  onBlur: PropTypes.func,
};

/*export default FocusableTextInput;*/
