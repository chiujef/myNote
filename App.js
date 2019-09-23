/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Note} from '@components';
import {NoteContainer} from '@containers';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <NoteContainer>
          <Note />
        </NoteContainer>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
