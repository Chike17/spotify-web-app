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
      buffer: ''
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      this.state.accessToken = params.access_token;
    }
    this.setTrackList = this.setTrackList.bind(this);
  }
  playSong(buffer) {
    // let context = this;
    //  //creating source node
    // let source = this.state.actx.createBufferSource();
    // this.state.source = source;
    // let src = this.state.source;
    // // context.setState({source: src});
    // //passing in data
    // src.buffer = buffer;
    // //giving the src which sound to play
    // src.connect(this.state.actx.destination);
    // //start playing
    
    // src.start(0);
    
    // src.onended = () => {
    //   if (!context.state.pureStop) {
    //     return;
    //   }
    //   let trackNumber = context.state.trackNumber++;
    //   context.fetchBuff(context.state.urls, context.state.trackNumber, context.state.actx);
    // };
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
  componentDidMount() {
    let context = this;
    audioCtx = new AudioContext();
    this.setState({actx: audioCtx}, () => {
      spotifyWebApi.searchTracks('Timberlake')
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
            context.fetchBuff(context.state.urls, context.state.trackNumber, context.state.actx);
          });
        }, function(err) {
          console.error(err, 'error!!!!!');
        });
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
    // let context = this;
    // console.log('playing', urlArray[index]);
    // fetchBuffer(urlArray[index], audioContext, (buffer) => {
    //   context.state.buffer = buffer;
    //   context.playSong(context.state.buffer);
    // });
  }
  setTrackList (input) {
    // implement to fit current structure of the app
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
                                                           playSong(audioBuffer);
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
        <Container getCurrentTime = {this.getCurrentTime.bind(this)} 
                   tracklist = {this.state.tracklist} 
                   urls = {this.state.urls}
                   setTrackList = {this.setTrackList}
                   cover = {this.state.cover}
                   stopSong = {this.stopSong.bind(this)}
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



