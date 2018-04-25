import React from 'react';
import styles from './styles.css';

let Controls = (props) => {
  return (
   <div >
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

module.exports = Controls;





