import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import {nukeEntries, removeMultipleEntries} from './reducer.js';
import {connect} from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.deleteAllEntries = this.deleteAllEntries.bind(this);
    this.doNothing = this.doNothing.bind(this);
    this.determineCutOnClick = this.determineCutOnClick.bind(this);
    this.determineCutClass = this.determineCutClass.bind(this);
    this.deleteSelectedEntries = this.deleteSelectedEntries.bind(this);
  }

  determineCutClass() {

    if (this.props.cutEnabled && this.props.cutAry.length <= 0) {
      return "far fa-3x fa-clipboard";
    } else if (this.props.cutEnabled && this.props.cutAry.length > 0) {
      return "fas fa-3x fa-clipboard";
    } else {
      return "fas fa-3x fa-cut";
    }
  }

  determineCutOnClick() {
    if (this.props.cutEnabled && this.props.cutAry.length <= 0) {
      this.props.disableCut();
    } else if (this.props.cutEnabled && this.props.cutAry.length > 0) {
      this.props.paste();
    } else {
      this.props.enableCut();
    }
  }

  deleteAllEntries() {
    this.props.dispatch(nukeEntries());
  }

  doNothing() {
    return;
  }

  deleteSelectedEntries() {
    this.props.dispatch(removeMultipleEntries(this.props.indexesToDelete));
    this.props.disableDelete();
  }

  render() {
    const {canUndo, canRedo, onUndo, onRedo} = this.props;

    return  <div id="toolbar-container" className="row">
              <div className="col-1">
                <i className="far fa-3x fa-file" onClick={this.props.deleteEnabled ?  this.doNothing : this.deleteAllEntries}></i>
              </div>
              <div className="col-1">
                <i className={this.determineCutClass()} onClick={this.determineCutOnClick}></i>
              </div>
              <div className="col-1">
                <i className={canUndo ? "fas fa-3x fa-undo" : "fas fa-3x fa-undo text-muted default-cursor"} onClick={(this.props.deleteEnabled || this.props.cutEnabled || !canUndo) ? this.doNothing : onUndo}></i>
              </div>
              <div className="col-1">
                <i className={canRedo ? "fas fa-3x fa-redo" : "fas fa-3x fa-redo text-muted default-cursor"} onClick={(this.props.deleteEnabled || this.props.cutEnabled || !canRedo) ? this.doNothing : onRedo}></i>
              </div>
              <div className={this.props.deleteEnabled ? "d-none" : "col-1"}>
                <i className="fas fa-3x fa-trash-alt" onClick={this.props.enableDelete}></i>
              </div>
              <div className={this.props.deleteEnabled ? "col-1" : "d-none"}>
                <i id="checkmark" className="fas fa-3x fa-check" onClick={this.deleteSelectedEntries}></i>
              </div>
              <div className={this.props.deleteEnabled ? "col-1" : "d-none"}>
                <i id="x" className="fas fa-3x fa-times" onClick={this.props.disableDelete}></i>
              </div>
            </div>
  }
}

const mapStateToProps = state => {
  return {
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);