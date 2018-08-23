import init from '../init.js';

const TrackReducer = (state = init.initialState2, action) => {
   if (action.type === 'CHANGE_CURRENTSONG') {
     state = Object.assign({}, state, {
       currentSong: action.payload,
       lastValues: [...state.lastValues, action.payload]
     });
   }
   if (action.type === 'CHANGE_TRACKLIST') {
     state = Object.assign({}, state, {
       trackList: action.payload, 
       lastValues: [...state.lastValues, action.payload]
     });
   }
   return state;
 };

export default TrackReducer;