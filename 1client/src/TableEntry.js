import React from 'react';
import styles from './styles.css';


let TableEntry = (props) => {
  return (
     <div >
         <tr className={styles.song}>
            <td className={styles.nr}><h5> {props.number} </h5></td>
            <td className={styles.title}><h6>{props.title}</h6></td>
            <td className={styles.length}> <h5> 0:00 </h5></td>
          </tr>
     </div>
  );
};

module.exports = TableEntry;