import React from 'react';
import styles from './styles.css';
import TableEntry from './TableEntry.js';

let Table = (props) => {
  return (
   <div >
      <table className={styles.player} >
        <tbody>
          <td> <label className={styles.backward} htmlFor={styles.backward} onClick = {() => { props.playPrev(); }} ></label></td>
          <td> <label className={styles.play} htmlFor={styles.play} onClick = {() => { props.toggle(); }} ></label></td>
          <td> <label className={styles.forward}htmlFor={styles.forward} onClick = {() => { props.playNext(); } } ></label></td>
        </tbody>
      </table>
      <div className = {styles.listcontainer} >
        <div className= {styles.scrollcontainer}>
          <table className= {styles.list}>
           <tbody>
              <div>
               {props.tracklist.map((track, i) => <TableEntry title = {track.name} clicked = {props.clickE} index = {i} /> )}
              </div>
           </tbody>
         </table>
        </div>
      </div> 
   </div>
  );
};

module.exports = Table;

























