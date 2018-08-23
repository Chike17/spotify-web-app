 export function setCurrentSong (currentSong) {
   return {
     type: 'CHANGE_CURRENTSONG',
     payload: currentSong
   };
}

export function setTrackList (trackList) {
   return {
     type: 'CHANGE_TRACKLIST',
     payload: trackList
   };
}

