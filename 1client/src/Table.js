import React from 'react';
import styles from './styles.css';
import TableEntry from './TableEntry.js';

let Table = (props) => {
  return (
   <div >
      <table className={styles.player} onClick = {console.log(props.playPrev, 'Table play prev???????????????????????????????????')} >
        <tbody>
          <td><input type="checkbox" className={styles.backward}/><label className={styles.backward} htmlFor={styles.backward} onClick = {() => { props.playPrev(); }} ></label></td>
          <td><input type="checkbox" className={styles.play} title="Play" /><label className={styles.play} htmlFor={styles.play} onClick = {() => { props.toggle(); }} ></label></td>
          <td><input type="checkbox" className={styles.forward}/><label className={styles.forward}htmlFor={styles.forward} onClick = {() => { props.playNext(); } } ></label></td>
        </tbody>
      </table>
      <div className = {styles.listcontainer} onClick = { console.log(props.playPrev, 'Table play prev???????????????????????????????????')} >
        <div className= {styles.scrollcontainer}>
          <table className= {styles.list}>
           <tbody>
              <div>
               {props.tracklist.map((track, index) => <TableEntry title = {track.name} number = {index} /> )}
              </div>
           </tbody>
         </table>
        </div>
      </div> 
   </div>
  );
};

module.exports = Table;

























