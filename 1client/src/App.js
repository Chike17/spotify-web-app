import React from 'react';
import styles from './styles.css';
import Container from './Container.js';
import { connect } from 'react-redux';
import store from './store.js';
import Spotify from 'spotify-web-api-js';
let stock = 'https://static1.squarespace.com/static/585e12abe4fcb5ea1248900e/t/5aab1c5b03ce6430365833ac/1521163366180/Spotify+Square.png?format=300w';
const spotifyWebApi = new Spotify();

class App extends React.Component {
  constructor (props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      tracklist: [],
      cover: stock,
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
      spotifyWebApi.setAccessToken(params.access_token);
      this.state.accessToken = params.access_token;
    }
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
      context.setState({userMessage: 'SEARCH TRACKS BY ARTIST, SONG, OR ALBUM', topResults: []});
      return;
    }
    spotifyWebApi.searchTracks(input)
        .then(function(response) {
          context.setState({userMessage: 'TOP RESULTS | READY TO SUBMIT'});
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
            context.setState({topResults: topResults}, () => {
              if (length === 5) {
                context.state.topResults = [];
              } 
            });
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
            let cover = response.tracks.items[0].album.images[1].url;
            let song = response.tracks.items[0].name;
            let artist = response.tracks.items[0].album.artists[0].name;
            let urls = tracks.map((item) => {
              return item.preview_url;
            });
            context.setState({cover: cover, 
                              tracklist: tracks, 
                              urls: urls,
                              songAndArtist: {song: song, artist: artist}}, () => {
              context.state.topResults = [];
            });
          }
        }, function(err) {
          context.setErrorMessage();
        });
  }
  setErrorMessage() {
    this.state.validInput = false;
    this.setState({userMessage: "INVALID ENTRY!! CAN'T SUBMIT!! TRY AGAIN!!",
                                topResults: []});
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
    let context = this;
    this.setState({cover: this.state.tracklist[index].album.images[1].url}, () => {
    });
  }
  changeSongAndArtist (index) {
    let song = this.state.tracklist[index].name;
    let artist = this.state.tracklist[index].album.artists[0].name;
    this.setState({songAndArtist: {artist: artist, 
                                   song: song, 
                                   trackNumber: index + 1}});
  }
  render() {
    return (
      <div> 
        <Container getCurrentTime = {this.getCurrentTime} 
                   tracklist = {this.state.tracklist} 
                   urls = {this.state.urls}
                   setTrackList = {this.setTrackList}
                   cover = {this.state.cover}
                   stopSong = {this.stopSong}
                   changeCover = {this.changeCover}
                   getpreResults = {this.getpreResults}
                   numofTracks = {this.state.numTracks}
                   changeSongAndArtist = {this.changeSongAndArtist}
                   topResults = {this.state.topResults}
                   partialStatus = {this.state.preResults}
                   userMessage = {this.state.userMessage}
                   songAndArtist = {this.state.songAndArtist}
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
    // implement
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // implement
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(App);


















