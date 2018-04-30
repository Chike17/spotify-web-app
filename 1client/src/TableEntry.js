import React from 'react';
import styles from './styles.css';


let TableEntry = (props) => {
	let title = props.title;
	if (title.length >= 26){
	  title = title.substring(0, 25) + '...'; 
	}
  return (
     <div className={styles.tableEntryDiv} >
         <tr className={styles.songEntry} onClick = {() => { props.clicked(props.index); }} >
            <td className={styles.nr}><h5> {props.index} </h5></td>
            <td className={styles.title}><h6>{title}</h6></td>
            <td className={styles.length}> <h5> 0:00 </h5></td>
            <td className={styles.artistName}><h6> Drake </h6></td>
          </tr>
     </div>
  );
};

module.exports = TableEntry;