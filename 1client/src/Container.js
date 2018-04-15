import React from 'react';
import styles from './styles.css';
import Table from './Table.js';

let Container = () => {
  return (
   <div >

     <div className = {styles.screen}>
       <input type = "checkbox" value = "None" className = {styles.magicButton} name="check" />
       <div> Input Box </div>
       <div className = {styles.coverImage}></div>
       <div className = {styles.bodyPlayer}></div>
       <div className = {styles.testing}> Partial Result Data </div>
      <Table />
     </div> 


   </div>
  );
};

module.exports = Container;