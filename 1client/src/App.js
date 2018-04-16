import React from 'react';
import styles from './styles.css';
import init from './init.js';
import Container from './Container.js';
import { connect } from 'react-redux';
import $ from 'jquery';
import store from './store.js';
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();


class App extends React.Component {
  constructor (props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      something: '',
      loggedIn: params.access_token ? true : false,
      nowplaying: {name: 'Not checked', image: ''}
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
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

  componentDidMount() {
    console.log('before api call');
    let context = this;
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      console.log(response, '******');
      context.setState({nowplaying: {name: response.item.artists[0].name,
                                  image: response.item.album.images[0].url}});
    }).catch((e) => {
      console.log(e, 'error!');
    });
  }
  render() {
    return (
      <div>
       <div> Now playing : {this.state.nowplaying.name} </div>

       <div> 
        <img src = {this.state.nowplaying.image} style = {{width: 100}}/>
       </div> 

        <Container firstcover = {this.state.image} />
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



