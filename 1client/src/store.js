 import { createStore, combineReducers, applyMiddleware } from 'redux';
 import logger from 'redux-logger';
 import { Provider } from 'react-redux';
 // import reducers
 
 const initialState = {
   result: 1,
   lastValues: []
 };

 const myLogger = (store) => (next) => (action) => {
   console.log ('Logged Action:', action);
   next(action);
 };

 const store = createStore(combineReducers({}), {}, applyMiddleware());
 
 // const store = createStore(reducer);

 store.subscribe(() => {
   console.log('Store updated!', store.getState());

 });
 export default store;