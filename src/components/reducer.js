import undoable, { distinctState } from 'redux-undo';

let choreSave = (localStorage.getItem('chore-list')) ? JSON.parse(localStorage.getItem('chore-list')) : [];

const chores = (state = [], action) => {
  switch(action.type) {
    case "ADD-ENTRY":
      return [
        ...state,
        {content: action.content}
      ];
    case "EDIT-TEXT":
      let newState = [];
      for (let i = 0; i < state.length; i++) {
        newState.push({content: state[i].content});
      }
      newState[action.id].content = action.text
      return newState;
    case "REMOVE-ENTRY":
      newState = [...state];
      newState.splice(action.id, 1);
        return newState;
    case "NUKE-ENTRIES":
      return state = []
    case "PASTE-ENTRIES": 
      newState = [...state];
      newState.splice(0, 0, ...action.ary);
      return newState;
    case "REMOVE-MULTIPLE-ENTRIES":
      newState = [...state];
      action.ary.sort((a, b) => {return a - b;});
      for (let i = action.ary.length -1; i >= 0; i--) {
        newState.splice(action.ary[i], 1);
      }
      return newState;
    default:
      return state
  }
}

const undoableChores = undoable(chores, {
  filter: distinctState()
});

export const addEntry = (content) => ({
  type: "ADD-ENTRY",
  content: content
})

export const editText = (text, id) => ({
  type: "EDIT-TEXT",
  text,
  id
})

export const removeEntry = (id) => ({
  type: "REMOVE-ENTRY",
  id
})

export const nukeEntries = () => ({
  type: "NUKE-ENTRIES",
})

export const pasteEntries = (ary) => ({
  type: "PASTE-ENTRIES",
  ary
})

export const removeMultipleEntries = (ary) => ({
  type: "REMOVE-MULTIPLE-ENTRIES",
  ary
})

export default undoableChores;