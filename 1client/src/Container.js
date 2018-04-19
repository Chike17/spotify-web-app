import React from 'react';
import styles from './styles.css';
import Table from './Table.js';
import Input from './Input.js';

let Container = (props) => {
  let context = this;
  let divStyle = {
    'background': 'url(' + '"' + props.cover + '"' + ')',
    'backgroundSize': 'cover'
  };
  return (
   <div >
     <div className = {styles.screen}>
       <input type = "checkbox" value = "None" className = {styles.magicButton} name="check" />
       <Input setTrackList = {props.setTrackList} />
       <div className = {styles.coverImage} style = {divStyle}></div>
       <div className = {styles.bodyPlayer}></div>
       <div className = {styles.testing}> Partial Result Data </div>
      <Table tracklist = {props.tracklist} stopSong = {props.stopSong}/>
     </div> 
   </div>
  );
};

module.exports = Container;