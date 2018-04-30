let stock = 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Spotify_logo_vertical_black.jpg';
import React from 'react';
import styles from './styles.css';
import init from './init.js';
import Container from './Container.js';
import { connect } from 'react-redux';
import $ from 'jquery';
import store from './store.js';
import Spotify from 'spotify-web-api-js';
import fetchBuffer from './fetchBuffer.js';
const spotifyWebApi = new Spotify();
let audioCtx;


class App extends React.Component {
  constructor (props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      something: '',
      loggedIn: params.access_token ? true : false,
      tracklist: [],
      cover: stock,
      accessToken: '',
      urls: [],
      trackNumber: 0,
      source: undefined,
      actx: undefined,
      pureStop: true,
      buffer: '',
      preResults: false,
      numTracks: 0,
      length: 0
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      this.state.accessToken = params.access_token;
    }
    this.setTrackList = this.setTrackList.bind(this);
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
  playNextSong() {
    // implement
  }
  playSongBefore() {
    // implement
  }
  getCurrentTime () {
    console.log(this.state.actx.currentTime);
  }
  spotifyCall (input) {
    let context = this;
    spotifyWebApi.searchTracks(input)
        .then(function(response) {
          if (context.state.preResults) {
            console.log(input);
            let length = response.tracks.items.length;
            context.setState({numTracks: length});
          } else if (!context.preResults) {
            let tracks = response.tracks.items;
            tracks = tracks.filter((track) => {
              return track.preview_url !== null;
            });
            let length = tracks.length;
            context.setState({length: length});
            console.log(tracks);
            let cover = response.tracks.items[0].album.images[1].url;
            let url1 = response.tracks.items[0].preview_url;
            let urls = tracks.map((item) => {
              return item.preview_url;
            });
            context.state.preResults = false;
            context.setState({cover: cover, tracklist: tracks, urls: urls});
          }
        }, function(err) {
          console.error(err, 'error!!!!!');
        });
  }
  getpreResults(input) {
    this.state.preResults = true;
    this.spotifyCall(input);
  }
  componentDidMount() {
    let context = this;
    audioCtx = new AudioContext();
    this.setState({actx: audioCtx}, () => {
      context.spotifyCall('Timberlake');
    });
  }
  getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  setTrackList (input) {
    let context = this;
    console.log('set track list??????');
    context.state.preResults = false;
    this.spotifyCall(input);
  }
  changeCover(index) {
    this.setState({cover: this.state.tracklist[index].album.images[1].url});
  }
  render() {
    return (
      <div> 
        <Container getCurrentTime = {this.getCurrentTime.bind(this)} 
                   tracklist = {this.state.tracklist} 
                   urls = {this.state.urls}
                   setTrackList = {this.setTrackList}
                   cover = {this.state.cover}
                   stopSong = {this.stopSong.bind(this)}
                   changeCover = {this.changeCover.bind(this)}
                   getpreResults = {this.getpreResults.bind(this)}
                   numofTracks = {this.state.numTracks}
                   length = {this.state.length}
                   />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };

};


export default connect(mapStateToProps, mapDispatchToProps)(App);


