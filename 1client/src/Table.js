import React from 'react';
import styles from './styles.css';
import TableEntry from './TableEntry.js';
import FontAwesome from 'react-fontawesome';
import Scrollbar from 'smooth-scrollbar-react';
import Radium from 'radium';


class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 'pause'
    }; 
    let container = this.props.container;
    container.state.onStartPause = this.songPause.bind(this);
    container.state.onStartPlay = this.songPlay.bind(this);
  }
  toggleButton() {
    if (!this.props.tracklist.length) {
      return;
    }
    if (this.state.toggle === 'pause') {
      this.setState({toggle: 'play'});
    } else {
      this.setState({toggle: 'pause'});
    }
    this.props.toggle();
  }
  playN () {
    if (!this.props.tracklist.length) {
      return;
    }
    this.props.playNext();
  }
  playP () {
    if (!this.props.tracklist.length) {
      return;
    }
    this.props.playPrev();
  }
  songPause() {
    this.setState({toggle: 'pause'});
  }
  songPlay() {
    this.setState({toggle: 'play'});
  }
  render() {
    const playerStyle = {
      color: 'white',
      content: '' + '\f04e',
      cursor: 'pointer',
      transition: 'all 0.15s linear',
      ':hover': {
        color: '#bbb',
        transition: 'all 0.15s linear'
      }
    }
    return (
      <div >
        <table className={styles.player} >
          <tbody >
            <td style = {playerStyle} key = 'key1'> <FontAwesome name = 'backward' onClick = {() => { this.playP(); }} /> </td>
            <td style = {playerStyle} key = 'key2'> <FontAwesome name = {this.state.toggle} onClick = {() => { this.toggleButton(); }} /> </td>
            <td style = {playerStyle} key = 'key3'> <FontAwesome name = 'forward' onClick = {() => { this.playN(); }} /> </td>
          </tbody>
        </table>
        <div className = {styles.listcontainer} style = {{'height': '135px', 'overflow': 'auto'}} >
            <div >
              {this.props.tracklist.map((track, i) => <TableEntry title = {track.name} artist = {track.album.artists[0].name} clicked = {this.props.clickE} index = {i + 1} onClick = {() => {this.props.clickE(i); }}/> )}
            </div>
        </div> 
    </div>
    );
  }
}



module.exports = Radium(Table);
