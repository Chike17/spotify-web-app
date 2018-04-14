import React from 'react';
import styles from './styles.css';
import Table from './Table.js';

let Container = () => {
  return (
   <div >

     <div className = {styles.screen}>

       <input type = "checkbox" value = "None" className = {styles.magicButton} name="check" />
       <label className= {styles.main} htmlFor = {styles.magicButton} ></label>
       <div className = {styles.coverImage}></div>
       <div className = {styles.search} ></div>
       <div className = {styles.bodyPlayer}></div>
   
     </div> 

    <Table />

   </div>
  );
};

module.exports = Container;