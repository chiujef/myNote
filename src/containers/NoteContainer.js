import React from 'react';

export default class NoteContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {
        title: 'this is the title',
        items: [
          {id: 1, text: 'Text lorem ipsum something', completed: false},
          {id: 2, text: 'Text1', completed: false},
          {
            id: 3,
            text:
              'Text2 what is this? Lorem ipsum lang akong nahibaw an. la nay lain.',
            completed: false,
          },
        ],
      },
    };
  }

  onTitleChange = text => {
    this.setState(prevState => ({
      note: {
        ...prevState.note,
        title: text,
      },
    }));
  };

  onNoteItemChange = noteItems => {
    this.setState(prevState => ({
      note: {
        ...prevState.note,
        items: noteItems,
      },
    }));
  };

  render() {
    const {note} = this.state;

    return React.cloneElement(this.props.children, {
      note,
      onTitleChange: this.onTitleChange,
      onNoteItemChange: this.onNoteItemChange,
    });
  }
}
