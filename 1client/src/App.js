import React from 'react';
import styles from './styles.css';
import Container from './Container.js';
import { connect } from 'react-redux';
import Spotify from 'spotify-web-api-js';
import store from './store.js';
import { setCurrentSong, setTrackList } from './Actions/TrackActions.js';
import { setCover, setTopResults, setScreenSong, 
         setScreenArtist, setTrackListUI } from './Actions/TrackUIActions.js';
let song = 'No Songs in Queue';
let artist = 'Please Go Into Search Mode';
let trackNumber = 0;

const spotifyWebApi = new Spotify();

class App extends React.Component {
  constructor (props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      tracklist: [],
      accessToken: '',
      urls: [],
      trackNumber: '0',
      preResults: false,
      validINput: false,
      numTracks: 0,
      topResults: [],
      userMessage: 'SEARCH TRACKS BY ARTIST, SONG, OR ALBUM',
      songAndArtist: {song: 'No Songs in Queue', artist: 'Please Go Into Search Mode'}
    };
    if (params.access_token) {
      this.state.accessToken = params.access_token;
    }
    spotifyWebApi.setAccessToken(this.state.accessToken);
    this.state.accessToken = params.access_token;
    this.setTrackList = this.setTrackList.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.stopSong = this.stopSong.bind(this);
    this.changeCover = this.changeCover.bind(this);
    this.getpreResults = this.getpreResults.bind(this);
    this.changeSongAndArtist = this.changeSongAndArtist.bind(this);
    this.setValidInput = this.setValidInput.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);          
  }
  componentDidMount() {
  }
  getHashParams() {
    let hashParams = {};
    let e;
    let r = /([^&;=]+)=?([^&;]*)/g;
    let q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  stopSong() {
    if (this.state.pureStop) {
      this.setState({pureStop: false}, () => {
        this.state.source.stop();
      });
    } else if (!this.state.pureStop) {
      this.setState({pureStop: true}, () => {
        this.playSong(this.state.buffer);
      });
    }
  }
  getCurrentTime () {
    console.log(this.state.actx.currentTime);
  }
  spotifyCall (input) {
    let context = this;
    if (!input.length) {
      context.setState({userMessage: 'SEARCH TRACKS BY ARTIST, SONG, OR ALBUM'}, () => {
        context.props.setTopResults([]);
      });
      return;
    }
    spotifyWebApi.searchTracks(input)
        .then(function(response) {
          console.log('SUCCESS');
          context.setState({userMessage: 'TOP RESULTS | PRESS ENTER TO SUBMIT'});
          if (context.state.preResults) {
            context.preResults = false;
            let items = response.tracks.items;
            let length = items.length;
            let topResults = items.splice(0, 5);
            topResults = topResults.filter((track) => {
              return track.preview_url !== null;
            }).map((track) => {
              return {song: track.name, artist: track.album.artists[0].name };
            });
            if (!topResults.length) {
              context.setErrorMessage(); 
              return;
            } 
            context.state.validInput = true;
            context.props.setTopResults(topResults);
            if (length === 6) {
               context.props.setTopResults([]);
            }
          } else if (!context.state.preResults) {
            context.state.preResults = true;
            let tracks = response.tracks.items;
            if (!tracks.length) {
              context.setErrorMessage();
              return;
            }
            tracks = tracks.filter((track) => {
              return track.preview_url !== null;
            });
            let length = tracks.length;
            let cover = tracks[0].album.images[1].url;
            song = tracks[0].name;
            artist = tracks[0].album.artists[0].name;
            let urls = tracks.map((item) => {
              return item.preview_url;
            });
            context.setState({ 
                              urls: urls}, () => {
              context.props.setCover(cover);
              context.props.setTrackListUI(tracks);
              context.props.setScreenSong(song); 
              context.props.setScreenArtist(artist);
            });
          }
        }, function(err) {
          context.setErrorMessage();
        });
  }
  setErrorMessage() {
    this.state.validInput = false;
    this.setState({userMessage: "INVALID ENTRY!! CAN'T SUBMIT!! TRY AGAIN!!"}, () => {
      this.props.setTopResults([]);
    });
    return;
  }
  setValidInput(status) {
    this.state.validInput = status;
  }
  getpreResults(input) {
    this.state.preResults = true;
    this.spotifyCall(input);

  }
  setTrackList (input) {
    if (!this.state.validInput) {
      return;
    }
    this.state.preResults = false;
    this.spotifyCall(input);
  }
  changeCover(index) {
    this.props.setCover(store.getState().TrackUIReducer.trackListUI[index].album.images[1].url);
  }
  changeSongAndArtist (index) {
    trackNumber = index;
    song = store.getState().TrackUIReducer.trackListUI[index].name;
    artist = store.getState().TrackUIReducer.trackListUI[trackNumber].album.artists[0].name;
    this.props.setScreenSong(song);
    this.props.setScreenArtist(artist);
  }
  render() {
    return (
      <div> 
        <Container getCurrentTime = {this.getCurrentTime} 
                   tracklist = {store.getState().TrackUIReducer.trackListUI} 
                   urls = {this.state.urls}
                   setTrackList = {this.setTrackList}
                   cover = {store.getState().TrackUIReducer.cover}
                   stopSong = {this.stopSong}
                   changeCover = {this.changeCover}
                   getpreResults = {this.getpreResults}
                   numofTracks = {this.state.numTracks}
                   changeSongAndArtist = {this.changeSongAndArtist}
                   topResults = {store.getState().TrackUIReducer.topResults}
                   partialStatus = {this.state.preResults}
                   userMessage = {this.state.userMessage}
                   songAndArtist = {{song: song, artist: artist, trackNumber: trackNumber}}
                   trackNumber = {this.state.trackNumber}
                   setErrorMessage = {this.setErrorMessage}
                   setInputStatus = {this.setValidInput}
                   />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trackList: state.TrackReducer,
    currentSong: state.TrackReducer,
    location: state.TrackUIReducer,
    cover: state.TrackUIReducer,
    topResults: state.TrackUIReducer, 
    screenSong: state.TrackUIReducer,
    screenArtist: state.TrackUIReducer,
    trackList: state.TrackUIReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentSong: (currentSong) => {
      dispatch(setCurrentSong(currentSong));
    },
    setTrackList: (trackList) => {
      dispatch(setTrackList(trackList));
    },
    setCover: (cover) => {
      dispatch(setCover(cover));
    },
    setTopResults: (topResults) => {
      dispatch(setTopResults(topResults));
    },
    setScreenSong: (screenSong) => {
      dispatch(setScreenSong(screenSong));
    },
    setScreenArtist: (screenArtist) => {
      dispatch(setScreenArtist(screenArtist));
    },
    setTrackListUI: (trackListUI) => {
      dispatch(setTrackListUI(trackListUI));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



















