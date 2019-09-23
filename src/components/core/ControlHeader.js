import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const ControlHeader = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 50,
    borderTopColor: '#b3bec9',
    borderTopWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
});

ControlHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ControlHeader;
