import init from '../init.js';

const TrackUIReducer = (state = init.initialState1, action) => {
  if (action.type === 'CHANGE_COVER') {
     state = Object.assign({}, state, {
       cover: action.payload, 
       coverLastValues: [...state.coverLastValues, action.payload]
     });
   }
   if (action.type === 'CHANGE_TOPRESULTS') {
     state = Object.assign({}, state, {
       topResults: action.payload, 
       topResultsLastValues: [...state.topResultsLastValues, action.payload]
     });
   }
   if (action.type === 'CHANGE_SCREENSONG') {
     state = Object.assign({}, state, {
       screenSong: action.payload,
       screenSongLastValues: [...state.screenSongLastValues, action.payload]
     });
   }
   if (action.type === 'CHANGE_TRACKLISTUI') {
     state = Object.assign({}, state, {
       trackListUI: action.payload,
       trackListUILastValues: [...state.trackListUILastValues, action.payload]
     });
   }
   if (action.type === 'CHANGE_SCREENARTIST') {
     state = Object.assign({}, state, {
       screenArtist: action.payload,
       screenArtistLastValues: [...state.screenArtistLastValues, action.payload]
     });
   }
   return state;
 };


export default TrackUIReducer;
