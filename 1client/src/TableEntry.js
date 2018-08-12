import React from 'react';
import styles from './styles.css';


let TableEntry = (props) => {
  let title = props.title;
  if (title.length >= 26) {
    title = title.substring(0, 25) + '...'; 
  }
  return (
     <div className={styles.tableEntryDiv} >
         <div className={styles.songEntry} >
            <div className={styles.num} ><h5> {props.index} </h5> </div>
            <div className={styles.title} > <h6> {title}</h6></div>
            <div className={styles.artistName} onClick = {() => { props.clicked(props.index); }}><h6> {props.artist} </h6> </div>
            <div className={styles.length}> <h5> {'0:30'} </h5> </div>
          </div>
     </div>
  );
};

module.exports = TableEntry;