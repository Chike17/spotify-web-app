import React from 'react';
import styles from './styles.css';
import Table from './Table.js';
import Input from './Input.js';
import ProgressBar from './ProgressBar.js'; 


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playPrev: '', playNext: '', toggle: '', clickEvent: ''};
  }
  render() {
    console.log(this.state.playPrev, 'prev???');
    console.log(this.state.playNext, 'next???');
    let context = this;
    let divStyle = {
      'background': 'url(' + '"' + this.props.cover + '"' + ') fixed',
    }; 
    let inputStyle = {
      left: '100px',
      'background-color':'black'
    }
    return (
      <div>
         <div className = {styles.screen} >
         <div className =  {styles.searchMode}> search mode </div>
         <input type = "checkbox" value = "Node" className = {styles.magicButton} name="check" />
         <div className = {styles.coverImage} style = {divStyle}> </div>
         <div className = {styles.newTracks}>SEARCH FOR A NEW TRACKLIST </div>
         <Input setTrackList = {this.props.setTrackList}
                getpreResults = {this.props.getpreResults}/>
         <div className = {styles.bodyPlayer}> </div>
         <div className = {styles.testing}> First 3 Results 
           <div className = {styles.threeResultsContainer}> 
              <div> 1. Song By Artist </div>
              <div> 2. Song By Artist </div> 
              <div> 3. Song By Artist </div> 
           </div>
         </div>
         <Table tracklist = {this.props.tracklist} 
                stopSong = {this.props.stopSong} 
                playPrev = {this.state.playPrev} 
                playNext = {this.state.playNext}
                clickE = {this.state.clickEvent}
                toggle = {this.state.toggle}/>
              <div className = {styles.nowPlaying} > Now Playing Song by Artist </div>
              <div className = {styles.progresscontainer}> 
              <div className = {styles.running}> 0:00 </div>
               <div>
                  <ProgressBar urls = {this.props.urls} container = {this} changeCover = {this.props.changeCover} />
               </div>
              <div className = {styles.endTime}> 0:00 </div>
              </div>
     </div> 
     
      </div>
    );
  }
}

module.exports = Container;
