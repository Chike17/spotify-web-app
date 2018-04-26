import React from 'react';
import styles from './styles.css';
import Table from './Table.js';
import Input from './Input.js';
import ProgressBar from './ProgressBar.js'; 


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playPrev: '', playNext: '', toggle: ''};
  }
  render() {
    console.log(this.state.playPrev, 'prev???');
    console.log(this.state.playNext, 'next???');
    let context = this;
    let divStyle = {
      'background': 'url(' + '"' + this.props.cover + '"' + ')',
      'backgroundSize': 'cover'
    }; 
    return (
      <div>
         <div className = {styles.screen} >
         <input type = "checkbox" value = "None" className = {styles.magicButton} name="check" />
         <Input setTrackList = {this.props.setTrackList}
                getpreResults = {this.props.getpreResults} />
         <div className = {styles.coverImage} style = {divStyle}></div>
         <div className = {styles.bodyPlayer}></div>
         <div className = {styles.testing}> Number of Results: {this.props.numofTracks} </div>
         <Table tracklist = {this.props.tracklist} 
                stopSong = {this.props.stopSong} 
                playPrev = {this.state.playPrev} 
                playNext = {this.state.playNext}
                toggle = {this.state.toggle}/>
         <div className = {styles.progresscontainer}>
            <ProgressBar urls = {this.props.urls} container = {this} changeCover = {this.props.changeCover} />
        </div>
     </div> 
     
      </div>
    );
  }
}

module.exports = Container;
