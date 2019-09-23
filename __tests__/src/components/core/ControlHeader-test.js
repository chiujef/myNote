/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';
import {render} from 'react-native-testing-library';

import ControlHeader from '@components/core/ControlHeader';

describe('ControlHeader', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer
        .create(
          <ControlHeader>
            <Text>test</Text>
          </ControlHeader>,
        )
        .toJSON();

      expect(component).toMatchSnapshot();
    });

    it('should render the child component', () => {
      const {queryByType} = render(
        <ControlHeader>
          <Text>test</Text>
        </ControlHeader>,
      );

      expect(queryByType('Text')).not.toBeNull();
    });
  });
});
