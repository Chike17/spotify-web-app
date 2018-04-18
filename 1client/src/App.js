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

// implement set tracklist

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
      trackNumber: 0
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      this.state.accessToken = params.access_token;
    }
    this.setTrackList = this.setTrackList.bind(this);
  }
  playSound(buffer, audioContext) {
    let context = this;
     //creating source node
    let source = audioContext.createBufferSource();
    //passing in data
    source.buffer = buffer;
    //giving the source which sound to play
    source.connect(audioContext.destination);
    //start playing
    source.start(0);
    source.onended = () => {
      let trackNumber = context.state.trackNumber++;
      context.fetchBuff(context.state.urls, context.state.trackNumber, audioContext);
    };
  }
  componentDidMount() {
    let context = this;
    audioCtx = new AudioContext();
    spotifyWebApi.searchTracks('Love')
      .then(function(response) {
        let tracks = response.tracks.items;
        tracks = tracks.filter((track) => {
          return track.preview_url !== null;
        });
        console.log(tracks);
        let cover = response.tracks.items[0].album.images[1].url;
        let url1 = response.tracks.items[0].preview_url;
        let urls = tracks.map((item) => {
          return item.preview_url;
        });
        context.setState({cover: cover, tracklist: tracks, urls: urls}, () => {
          context.fetchBuff(context.state.urls, context.state.trackNumber, audioCtx);
        });
        // fetchBuffer(url1, audioCtx, (buffer) => {
        //   context.playSound(buffer, audioCtx);
        // });
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
  fetchBuff(urlArray, index, audioContext) {
    let context = this;
    console.log('playing', urlArray[index]);
    fetchBuffer(urlArray[index], audioContext, (buffer) => {
      context.playSound(buffer, audioContext);
    });
  }
  setTrackList (input) {
    let context = this;
    spotifyWebApi.searchTracks(input)
    .then(function(response) {
      let tracks = response.tracks.items;
      console.log(tracks, 'tracks###################');
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
        <Container 
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



