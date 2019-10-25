import React from 'react';
import ReactDOM from 'react-dom';
import './style.sass';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import ToDo from './components/ToDo.js'
import undoableChores from './components/reducer.js';

const store = createStore(undoableChores)

ReactDOM.render(
  <Provider store={store}>
    <ToDo/>
  </Provider>,
  document.getElementById('root')
);


// const ListItems = (props) => {
//   const list = Object.values(props.chores).map((item) => {
//     const content = (props.editId == item.id) ? 
//     <input className='form-control edit-input' key={item.id} autoFocus={true} value={props.editText} onKeyUp={(e) => {props.checkKey(e, item.id)}} onChange={(e) => {props.updateEditText(e)}}/> 
//     : 
//     <li className='list-group-item d-flex justify-content-between' onClick={() => {props.updateIdToEdit(item.id)}}>{item.content}</li>

//     return (
//       <div key={item.id} className="row">
//         <div className="col-11">
//           {content}
//         </div>
//         <div className="col">
//           <button className='delete-btn btn btn-secondary' onClick={() => {props.deleteElement(item.id)}}>X</button>
//         </div>
//       </div>
//     );
//   });
//   return (
//     <div>
//       {list}
//     </div>
//   )
// }