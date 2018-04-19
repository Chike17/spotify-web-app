import React from 'react';
import styles from './styles.css';
import TableEntry from './TableEntry.js';

let Table = (props) => {
  return (
   <div >
      <div className = {styles.listcontainer}>
        <div className= {styles.scrollcontainer}>
          <table className= {styles.list}>
           <tbody>
              <div>
               {props.tracklist.map((track, index) => <TableEntry title = {track.name} number = {index} />)}
              </div>
           </tbody>
         </table>
        </div>
      </div>
      <table className={styles.player}>
        <tbody>
          <td><input type="checkbox" className={styles.backward}/><label className={styles.backward} htmlFor={styles.backward}></label></td>
          <td><input type="checkbox" className={styles.play} title="Play" /><label className={styles.play} htmlFor={styles.play} onClick = {() => { props.stopSong(); }} ></label></td>
          <td><input type="checkbox" className={styles.forward}/><label className={styles.forward}htmlFor={styles.forward}></label></td>
        </tbody>
      </table>
   </div>

  );
};

module.exports = Table;


