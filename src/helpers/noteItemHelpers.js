const noteItemHelpers = {
  uid: 5,

  findById: function(noteItems, id) {
    return noteItems.find(x => x.id === id);
  },

  createNewItem: function(text = '') {
    return {id: this.uid++, text, completed: false};
  },

  toggleCompleted: function(noteItems, id) {
    const noteItemsArray = [...noteItems];
    let noteItem = noteItemHelpers.findById(noteItemsArray, id);
    if (noteItem) {
      noteItem.completed = !noteItem.completed;
    }

    return noteItemsArray;
  },

  updateText: function(noteItems, id, text) {
    const noteItemsArray = [...noteItems];
    let noteItem = this.findById(noteItemsArray, id);
    if (noteItem) {
      noteItem.text = text;
    }

    return noteItemsArray;
  },

  addItem: function(noteItems) {
    const noteItemsArray = [...noteItems];
    noteItemsArray.push(this.createNewItem());

    return {
      noteItems: noteItemsArray,
      noteItemSelected: noteItemsArray.slice(-1)[0].id,
    };
  },

  deleteItem: function(noteItems, id) {
    const noteItemsArray = noteItems.filter(ni => ni.id !== id);

    return {
      noteItems: noteItemsArray,
      noteItemSelected: -1,
    };
  },
};

export default noteItemHelpers;
