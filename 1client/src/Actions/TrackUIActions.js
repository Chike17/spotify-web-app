export function setCover (cover) {
   return {
     type: 'CHANGE_COVER',
     payload: cover
   };
}


export function setTopResults (topResults) {
   return {
     type: 'CHANGE_TOPRESULTS',
     payload: topResults
   };
}


export function setScreenSong (screenSong) {
   return {
     type: 'CHANGE_SCREENSONG',
     payload: screenSong
    };
}


export function setScreenArtist (screenArtist) {
   return {
     type: 'CHANGE_SCREENARTIST',
     payload: screenArtist
   };
}


export function setTrackListUI (trackListUI) {
   return {
     type: 'CHANGE_TRACKLISTUI',
     payload: trackListUI
   };
}


 