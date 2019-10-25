import React from 'react';
import Notepad from './Notepad.js';
import Toolbar from './Toolbar.js';
import {connect} from 'react-redux';
import {removeEntry, pasteEntries} from './reducer.js';
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cutEntry: undefined,
      cutEnabled: false,
      cutAry: [],
      deleteEnabled: false,
      indexesToDelete: [],
      undoRedoClicked: false
    };
    this.enableCut = this.enableCut.bind(this);
    this.disableCut = this.disableCut.bind(this);
    this.updateCutEntry = this.updateCutEntry.bind(this);
    this.paste = this.paste.bind(this);
    this.enableDelete = this.enableDelete.bind(this);
    this.disableDelete = this.disableDelete.bind(this);
    this.addIndexToDelete = this.addIndexToDelete.bind(this);
    this.removeIndexFromDeleteAry = this.removeIndexFromDeleteAry.bind(this);
  }

  addIndexToDelete(id) {
    const newAry = [...this.state.indexesToDelete];
    newAry.push(id);
    this.setState({
      indexesToDelete: newAry
    });
  }

  removeIndexFromDeleteAry(id) {
    const newAry = [...this.state.indexesToDelete];
    newAry.splice(newAry.indexOf(id), 1);
    this.setState({
      indexesToDelete: newAry
    });
  }

  enableDelete() {
    this.setState({
      deleteEnabled: true
    });
  }

  disableDelete() {
    this.setState({
      deleteEnabled: false,
      indexesToDelete: []
    });
  }

  paste() {
    const ary = this.state.cutAry;
    this.setState({
      cutAry: [],
      cutEnabled: false
    }, () => {this.props.dispatch(pasteEntries(ary))})
  }

  enableCut() {
    this.setState({
      cutEnabled: true
    });
  };

  disableCut() {
    this.setState({
      cutEnabled: false
    });
  }

  updateCutEntry(entry, key) {
    const newState = [...this.state.cutAry]
    newState.push({content: entry});
    this.setState({
      cutAry: newState,
    }, () => {this.props.dispatch(removeEntry(key));});
  }

  render() {
    console.log(this.state);
    return (
      <div className="container-fluid">
        <div id="directory">
          <h1 id="directory-text">Home / Tools / Notepad</h1>
        </div>
        <Toolbar cutEntry={this.state.cutEntry} cutEnabled={this.state.cutEnabled} enableCut={this.enableCut} disableCut={this.disableCut} cutAry={this.state.cutAry} paste={this.paste} deleteEnabled={this.state.deleteEnabled} indexesToDelete={this.state.indexesToDelete} enableDelete={this.enableDelete} disableDelete={this.disableDelete}/>
        <Notepad cutEnabled ={this.state.cutEnabled} updateCutEntry={this.updateCutEntry} unfocuse={this.state.unfocuse} deleteEnabled={this.state.deleteEnabled} indexesToDelete={this.state.indexesToDelete} addIndexToDelete={this.addIndexToDelete} removeIndexFromDeleteAry={this.removeIndexFromDeleteAry}/>
      </div>
    );
  }
}

export default connect()(ToDo);