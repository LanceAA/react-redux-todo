import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import {addEntry, editText, removeEntry} from './reducer.js';
import {connect} from 'react-redux';

class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: "",
      focusedChore: this.props.undoRedoClicked || undefined
    }
    this.updateFocusedChore = this.updateFocusedChore.bind(this);
    this.updateChoreText = this.updateChoreText.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.checkKey = this.checkKey.bind(this);
    this.doNothing = this.doNothing.bind(this);
    this.handleNewEntry = this.handleNewEntry.bind(this);
  }

  componentDidUpdate() {
    if ((this.props.cutEnabled || this.props.deleteEnabled) && this.state.focusedChore != undefined) {
      this.setState({
        focusedChore: undefined
      });
    }
  }

  doNothing() {
    return;
  }

  checkKey(e, id) {
    const {chores, dispatch} = this.props;
    if (chores[id].content === "" && e.key ==="Backspace") {
      dispatch(removeEntry(id));
    }
  }

  updateFocusedChore(id) {
    if (this.props.chores[id]) {
      this.setState({
        focusedChore: id,
        editText: this.props.chores[id].content
      })
    } else {
      this.setState({
        focusedChore: id,
        editText: ""
      });
    }
  }

  saveEdit(id) {
    this.props.dispatch(editText(this.state.editText, id));
  }

  updateChoreText(e, key) {
    this.setState({
      editText: e.target.value
    }, () => {this.saveEdit(key)})
  }
  
  handleNewEntry() {
    this.props.dispatch(addEntry(""));
    this.updateFocusedChore(this.props.chores.length);
  }

  render() {
    const noteList = this.props.chores.map((chore, key) => {
      const containerOnClick = () => {
        if (this.props.deleteEnabled) {
          if (this.props.indexesToDelete.indexOf(key) > -1) {
            this.props.removeIndexFromDeleteAry(key);
          } else {
            this.props.addIndexToDelete(key);
          }
        } else if (this.props.cutEnabled) {
          this.props.updateCutEntry(chore.content, key);
        }
      }

      const paragraphOnClick = () => {
        this.updateFocusedChore(key);
      }

      const determinePClass = () => {
        if (this.props.deleteEnabled && this.props.indexesToDelete.indexOf(key) > -1) {
          return "note-input remove";
        } else if (this.props.deleteEnabled) {
          return "note-input remove-on-hover";
        } else {
          return "note-input cursor-text";
        }
      }
      const determineBanClass = () => {
        if (this.props.deleteEnabled && this.props.indexesToDelete.indexOf(key) > -1) {
          return "ban-container-static";
        } else if (this.props.deleteEnabled) {
          return "ban-container";
        } else {
          return "ban-container d-none";
        }
      }
      const contentOrEdit = (!this.props.deleteEnabled && !this.props.cutEnabled && this.state.focusedChore === key) ? <input className="note-input" autoFocus={true} onKeyDown={(e) => {this.checkKey(e, key)}} onChange={(e) => {this.updateChoreText(e, key)}} value={this.state.editText}/> : <p className={determinePClass()} onClick={this.state.focusedChore === key ? this.doNothing : paragraphOnClick}>{chore.content}</p>

      return (
        <div key={key} className="note-input-container" onClick={containerOnClick}>
          <div className={determineBanClass()}>
            <i className={this.props.deleteEnabled ? "fas fa-2x fa-ban ban-btn" : "d-none"}></i>
          </div>
          <div>
            {contentOrEdit}
          </div>
        </div>
      );
    })
    
    return (
      <div id="notepad">
          <div id="notepad-background" className="row h-100">
            <div id="notepad-list" className="col-10 offset-1">
              {noteList}
              <div className="note-input-container">
                <div id="add-entry" onClick={this.handleNewEntry} className="text-muted pointer-cursor">
                  <i className="fas fa-plus d-inline-block ml-2 mr-2"></i><p className="d-inline-block">New item</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    chores: state.present
  }
}

export default connect(mapStateToProps)(Notepad);