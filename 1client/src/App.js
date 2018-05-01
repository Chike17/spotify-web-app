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
      length: 0,
      fiveResults: [],
      'userMessage': 'Top 6 Results | Ready to Submit',
      songAndArtist: {song: 'N/A', artist: 'N/A'}
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
  getCurrentTime () {
    console.log(this.state.actx.currentTime);
  }
  spotifyCall (input) {
    let context = this;
    spotifyWebApi.searchTracks(input)
        .then(function(response) {
          context.setState({userMessage: 'Top 6 Results | Ready to Submit'});
          if (context.state.preResults) {
            console.log('PRERESULTS!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            context.preResults = false;
            let items = response.tracks.items;
            let length = items.length;
            let fiveTracks = items.splice(0, 5);
            let info = [];
            for (let i = 0; i < fiveTracks.length; i++) {
              info.push({song: fiveTracks[i].name, 
                        artist: fiveTracks[i].album.artists[0].name});
            }
            context.setState({fiveResults: info}, () => {
              if (length === 5) {
                context.state.fiveResults = [];
              } 
            });
          } else if (!context.state.preResults) {
            let tracks = response.tracks.items;
            tracks = tracks.filter((track) => {
              return track.preview_url !== null;
            });
            let length = tracks.length;
            context.setState({length: length});
            let cover = response.tracks.items[0].album.images[1].url;
            let song = response.tracks.items[0].name;
            let artist = response.tracks.items[0].album.artists[0].name;
            let urls = tracks.map((item) => {
              return item.preview_url;
            });
            context.state.preResults = true;
            context.setState({cover: cover, 
                              tracklist: tracks, 
                              urls: urls,
                              songAndArtist: {song: song, artist: artist}}, () => {
              context.state.fiveResults = [];
            });
          }
        }, function(err) {
          context.setState({userMessage: 'INVALID ENTRY!!! TRY AGAIN!!!'});
        });
  }
  getpreResults(input) {
    this.state.preResults = true;
    this.spotifyCall(input);
  }
  componentDidMount() {
    // this.setState({actx: audioCtx}, () => {
    //   context.spotifyCall('Timberlake');
    // });
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
    this.state.preResults = false;
    this.spotifyCall(input);
  }
  changeCover(index) {
    let context = this;
    this.setState({cover: this.state.tracklist[index].album.images[1].url}, () => {
      context.changeSongandArtist(index);
    });
  }
  changeSongandArtist (index) {
    let song = this.state.tracklist[index].name;
    let artist = this.state.tracklist[index].album.artists[0].name;
    this.setState({songAndArtist: {artist: artist, song: song}});
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
                   fiveResults = {this.state.fiveResults}
                   partialStatus = {this.state.preResults}
                   userMessage = {this.state.userMessage}
                   songAndArtist = {this.state.songAndArtist}
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


