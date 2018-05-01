import React from 'react';
import styles from './styles.css';
import TableEntry from './TableEntry.js';
import FaIconPack from 'react-icons/lib/fa';
import backward from 'react-icons/lib/fa/backward';
import FontAwesome from 'react-fontawesome';
import InfiniteScroll from 'react-simple-infinite-scroll';
import ScrollArea from 'react-scrollbar';


let Table = (props) => {
  let divStyle = {overflow: 'auto', height: '100% ', display: 'block'};
  return (
   <div >
      <table className={styles.player} >
        <tbody>
          <td> <i className={[styles.back,'fas','fa-step-backward'].join(' ')} htmlFor={styles.backward} onClick = {() => { props.playPrev(); }} ></i></td>
          <td> <i className={[styles.play,'fas','fa-play'].join(' ')} htmlFor={styles.play} onClick = {() => { props.toggle(); }} ></i></td>
          <td> <i className={[styles.fore,'fas','fa-step-forward'].join(' ')} htmlFor={styles.forward} onClick = {() => { props.playNext(); } } ></i></td>
        </tbody>
      </table>
      <div className = {styles.listcontainer} style = {divStyle}>
          <div className= {styles.list}>
           <div style = {{'height': '135px', 'overflow': 'auto', 'display': 'block', 'overflow-x': 'hidden'}}>
              <div>
               {props.tracklist.map((track, i) => <TableEntry title = {track.name} clicked = {props.clickE} index = {i + 1} onClick = {() => { props.clickE(i); }}/> )}
              </div>
           </div>
         </div>
      </div> 
   </div>
  );
};

module.exports = Table;

























