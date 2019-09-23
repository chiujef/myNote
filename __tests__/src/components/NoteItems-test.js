import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {render} from 'react-native-testing-library';

import NoteItems from '@components/NoteItems';

describe('NoteItems', () => {
  let noteItems;

  beforeEach(() => {
    noteItems = [
      {
        id: 1,
        text: 'tent',
        completed: false,
      },
      {
        id: 2,
        text: 'tent',
        completed: true,
      },
    ];
  });

  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer
        .create(<NoteItems noteItems={noteItems} noteItemSelected={-1} />)
        .toJSON();
      expect(component).toMatchSnapshot();
    });

    it('should render all the texts', () => {
      const {getAllByText} = render(
        <NoteItems noteItems={noteItems} noteItemSelected={-1} />,
      );

      expect(getAllByText('tent').length).toBe(2);
    });
  });
});
