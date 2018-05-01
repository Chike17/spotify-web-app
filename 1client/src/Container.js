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
                  partials: [{song: 'song', artist: 'artist'},
                             {song: 'song', artist: 'artist'},
                             {song: 'song', artist: 'artist'},
                             {song: 'song', artist: 'artist'},
                             {song: 'song', artist: 'artist'}]};
   
  }
  componentWillReceiveProps (nextProps) {
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
  render() {
    let context = this;
    let divStyle = {
      'background': 'url(' + '"' + this.props.cover + '"' + ')',
      'backgroundSize': 'cover',
    }; 
    let screenHeight = {height: (this.props.length * 49.439) + 432 + 'px'}
    let inputStyle = {
      left: '100px',
      'background-color': 'black'
    };
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
                <div> {item.song} by {item.artist} </div>)}
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
                <div className = {styles.song} ><h4> Trophies </h4></div>
                <div className = {styles.artist} ><h4> Drake </h4></div>
              </div>
              <div className = {styles.progresscontainer}> 
              <div className = {styles.running}> 0:00 </div>
               <div>
                  <ProgressBar urls = {this.props.urls} 
                               container = {this} 
                               changeCover = {this.props.changeCover}
                               partialStatus = {this.props.partialStatus}/>
               </div>
              <div className = {styles.endTime}> 0:00 </div>
              </div>
       </div> 
     
      </div>
    );
  }
}

module.exports = Container;
