let stock = 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Spotify_logo_vertical_black.jpg';
import React from 'react';
import styles from './styles.css';
import init from './init.js';
import Container from './Container.js';
import { connect } from 'react-redux';
import $ from 'jquery';
import store from './store.js';
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();
let audioCtx;
let saved;

function playSound(buffer) {
  let source = audioCtx.createBufferSource();
  //passing in data
  source.buffer = buffer;
  //giving the source which sound to play
  source.connect(audioCtx.destination);
  //start playing
  source.start(0);
}

class App extends React.Component {
  constructor (props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      something: '',
      loggedIn: params.access_token ? true : false,
      nowplaying: {name: 'Not checked', image: ''},
      tracklist: [],
      cover:stock,
      accessToken: ''
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      this.state.accessToken = params.access_token;
    }
    this.setTrackList = this.setTrackList.bind(this);


   
  }
  playSound(buffer) {
     //creating source node
    let source = audioCtx.createBufferSource();
    //passing in data
    source.buffer = buffer;
    //giving the source which sound to play
    source.connect(audioCtx.destination);
    //start playing
    source.start(0);

  }
  componentDidMount() {
    let context = this;
    audioCtx = new AudioContext();
    console.log(audioCtx, 'audioCtx??uhijrnhrk?');
    spotifyWebApi.searchTracks('Love')
      .then(function(response) {
        let tracks = response.tracks.items;
        let url = response.tracks.items[0].preview_url;
        let cover = response.tracks.items[0].album.images[1].url;
        window.fetch(url)
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer, 
                                                         audioBuffer => {
                                                           console.log(audioBuffer, 'audioBuffer?????');
                                                           playSound(audioBuffer);
                                                           context.setState({cover: cover, tracklist: tracks});
                                                         }, 
                                                         error => 
                                                         console.error(error)
                                                       ));

      }, function(err) {
        console.error(err, 'error!!!!!');
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
    spotifyWebApi.searchTracks(input)
    .then(function(response) {
      let tracks = response.tracks.items;
      let url = response.tracks.items[0].preview_url;
      let cover = response.tracks.items[0].album.images[1].url;
      window.fetch(url)
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer, 
                                                         audioBuffer => {
                                                           console.log(audioBuffer, 'tracklist audioBuffer?????');
                                                           playSound(audioBuffer);
                                                           context.setState({cover: cover, tracklist: tracks});
                                                         }, 
                                                         error => 
                                                         console.error(error)
                                                       ));
    }, function(err) {
      console.error(err);
    }); 
  }
  render() {
    return (
      <div> 
        <Container firstcover = {this.state.nowplaying.image} 
                   tracklist = {this.state.tracklist} 
                   setTrackList = {this.setTrackList}
                   cover = {this.state.cover}/>
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



