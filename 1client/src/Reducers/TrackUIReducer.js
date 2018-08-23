import init from '../init.js';

const TrackUIReducer = (state = init.initialState1, action) => {
  if (action.type === 'CHANGE_COVER') {
     state = Object.assign({}, state, {
       cover: action.payload, 
       lastValues: [...state.lastValues, action.payload]
     });
   }
   if (action.type === 'CHANGE_TOPRESULTS') {
     state = Object.assign({}, state, {
       topResults: action.payload, 
       lastValues: [...state.lastValues, action.payload]
     });
   }
   if (action.type === 'CHANGE_SCREENSONG') {
     state = Object.assign({}, state, {
       screenSong: action.payload,
       lastValues: [...state.lastValues, action.payload]
     });
   }
   if (action.type === 'CHANGE_SCREENARTIST') {
     state = Object.assign({}, state, {
       screenArtist: action.payload,
       lastValues: [...state.lastValues, action.payload]
     });
   }
   if (action.type === 'CHANGE_TRACKLISTUI') {
     state = Object.assign({}, state, {
       trackListUI: action.payload,
       lastValues: [...state.lastValues, action.payload]
     });
   }
   return state;
 };


export default TrackUIReducer;
