import React from 'react';
import styles from './styles.css';
import Table from './Table.js';
import Input from './Input.js';
import ProgressBar from './ProgressBar.js'; 


class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  forceIt() {
    this.forceUpdate();
  }
  render() {
    let context = this;
    let divStyle = {
      'background': 'url(' + '"' + this.props.cover + '"' + ')',
      'backgroundSize': 'cover'
    }; 
    return (
      <div>
         <div className = {styles.screen} onClick = {() => { props.getCurrentTime(); } } >
         <input type = "checkbox" value = "None" className = {styles.magicButton} name="check" />
         <Input setTrackList = {this.props.setTrackList} />
         <div className = {styles.coverImage} style = {divStyle}></div>
         <div className = {styles.bodyPlayer}></div>
         <div className = {styles.testing}> Partial Result Data </div>
         <Table tracklist = {this.props.tracklist} stopSong = {this.props.stopSong}/>
         <div className = {styles.progresscontainer}>
            <ProgressBar urls = {this.props.urls} forceIt = {this.forceIt.bind(this)}/>
        </div>
     </div> 
     
      </div>
    );
  }
}

module.exports = Container;
