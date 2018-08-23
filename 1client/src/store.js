 import { createStore, combineReducers, applyMiddleware } from 'redux';
 import logger from 'redux-logger';
 import { Provider } from 'react-redux';
 import TrackReducer  from './Reducers/TrackReducer';
 import TrackUIReducer from './Reducers/TrackUIReducer';
 
 const initialState = {
   TrackReducer: {currentSong: '', trackList: []},
   TrackUIReducer: {cover: '', topResults: [], 
   screenSong: '', screenArtist: '',
   trackListUI: []},
 };

 const myLogger = (store) => (next) => (action) => {
   console.log ('Logged Action:', action);
   next(action);
 };

 const store = createStore(combineReducers({TrackReducer: TrackReducer, TrackUIReducer: TrackUIReducer}), {}, applyMiddleware());
 

 store.subscribe(() => {
   console.log('Store updated!', store.getState());

 });
 

 export default store;