import React from 'react';
import styles from './styles.css';
import Table from './Table.js';
import Input from './Input.js';
import ProgressBar from './ProgressBar.js'; 


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playPrev: '', 
                  playNext: '', 
                  toggle: '', 
                  clickEvent: '', 
                  progress: '00',
                  duration: '17:17',
                  appStarted: false,
                  song: 'No Songs in Queue',
                  artist: 'Please Go Into Search Mode',
                  by: '',
                  trackNumber: '1',
                  partials: [{song: '', artist: ''},
                             {song: '', artist: ''},
                             {song: '', artist: ''},
                             {song: '', artist: ''},
                             {song: '', artist: ''}]};
   
  }
  componentWillReceiveProps (nextProps) {
    let context = this;
    let infoFiltered = nextProps.fiveResults.map((info) => {
      if (info['song'].length > 20) {
        let song = info['song'].substring(0, 17) + '...';
        info['song'] = song;
      }
      if (info['artist'].length > 20) {
        let artist = info['artist'].substring(0, 17) + '...';
        info['artist'] = artist; 
      }
      return info;
    });
    this.setState({partials: infoFiltered});
  }
  componentDidMount() {
  }
  shouldComponentUpdate() {
    let displaySA = this.props.songAndArtist;
    if (displaySA.song.length > 15) {
      displaySA['song'] = displaySA.song.substring(0, 15) + '...';
    }
    if (displaySA.song.artist > 15) {
      displaySA['artist'] = displaySA.artist.substring(0, 15) + '...';
    }
   if (!displaySA.trackNumber) {
      this.setState({song: displaySA.song, 
          artist: displaySA.artist, 
          trackNumber:'1'})
    } else {
      this.setState({song: displaySA.song, 
                    artist: displaySA.artist, 
                    trackNumber:displaySA.trackNumber})
    }
    this.setState({by: 'by'});
    return true;
  }
  updateProgress(progress) {
    this.setState({progress: progress});
  }
  render() {
    let context = this;
    let screenHeight = {height: (this.props.length * 49.439) + 432 + 'px'}
    let divStyle = {
      'background': 'url(' + '"' + this.props.cover + '"' + ')',
      'backgroundSize': 'cover',
    }; 
    let inputStyle = {
      left: '100px',
      'background-color': 'black'
    };
    this.state.appStarted = true;
    return (
      <div >
         <div className = {styles.screen} styles = {screenHeight} >
         <div className = {styles.searchMode}> Search Mode </div>
         <input type = "checkbox" value = "Node" className = {styles.magicButton} name="check" />
         <div className = {styles.coverImage} style = {divStyle}> </div>
         <div className = {styles.newTracks}></div>
         <Input setTrackList = {this.props.setTrackList}
                getpreResults = {this.props.getpreResults}
           />
         <p className={styles.userMessageContainer}> {this.props.userMessage}</p>
         <div className = {styles.testing}>  
           <div className = {styles.threeResultsContainer}> 
              {this.state.partials.map((item) => 
                <div> {item.song + ' '} {this.state.by} {' ' +item.artist} </div>)}
           </div>
         <div className = {styles.bodyPlayer}> </div>
         </div>
         <Table tracklist = {this.props.tracklist} 
                stopSong = {this.props.stopSong} 
                playPrev = {this.state.playPrev} 
                playNext = {this.state.playNext}
                clickE = {this.state.clickEvent}
                toggle = {this.state.toggle}
          />
              <div className = {styles.songArtistContainer} >  
                <div className = {styles.song} ><h4> {this.state.trackNumber + '. '} {this.state.song} </h4></div>
                <div className = {styles.artist} ><h4> {this.state.artist} </h4></div>
              </div>
              <div className = {styles.progresscontainer}> 
              <div className = {styles.running}> {'0:' + this.state.progress} </div>
               <div>
                  <ProgressBar urls = {this.props.urls} 
                               container = {this} 
                               changeCover = {this.props.changeCover}
                               updateProgress = {this.updateProgress.bind(this)}
                               partialStatus = {this.props.partialStatus}
                               changeSongAndArtist = {this.props.changeSongAndArtist}/> 
               </div>
              <div className = {styles.endTime}> {'0:30'} </div>
              </div>
       </div> 
     
      </div>
    );
  }
}

module.exports = Container;








