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
    console.log((this.props.length * 49.439) + 432, 'length!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    let context = this;
    let divStyle = {
      'background': 'url(' + '"' + this.props.cover + '"' + ')',
      'backgroundSize': 'cover',
    }; 
    let screenHeight = {height: (this.props.length * 49.439) + 432 + 'px'}
    let inputStyle = {
      left: '100px',
      'background-color':'black'
    }
    return (
      <div>
         <div className = {styles.screen} styles = {screenHeight} >
         <div className =  {styles.searchMode}> Search Mode </div>
         <input type = "checkbox" value = "Node" className = {styles.magicButton} name="check" />
         <div className = {styles.coverImage} style = {divStyle}> </div>
         <div className = {styles.newTracks}></div>
         <input setTrackList = {this.props.setTrackList}
                getpreResults = {this.props.getpreResults}
                placeholder = "Search"
                className={styles.searchInputBox} />
         <p className={styles.userMessageContainer}>First 5 results</p>
         <div className = {styles.testing}>  
           <div className = {styles.threeResultsContainer}> 
              <div> Jesus Walks by Kanye West </div>
              <div> Excuse Me Miss by Jay-Z  </div>
              <div> DNA. by Kendrick Lamar  </div>
              <div> Finesse by Bruno Mars ft. Cardi B </div>
              <div> I'm The Plug by Drake </div>
           </div>
         <div className = {styles.bodyPlayer}> </div>
         </div>
         <Table tracklist = {this.props.tracklist} 
                stopSong = {this.props.stopSong} 
                playPrev = {this.state.playPrev} 
                playNext = {this.state.playNext}
                clickE = {this.state.clickEvent}
                toggle = {this.state.toggle}/>
              <div className = {styles.songArtistContainer} >  
                <div className = {styles.song} ><h4> Trophies </h4></div>
                <div className = {styles.artist} ><h4> Drake </h4></div>
              </div>
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
