import React from 'react';
import styles from './styles.css';
import Table from './Table.js';

let divStyle = {
  background: 'url("https://angstyteenwatchingtoomuchtv.files.wordpress.com/2015/07/tumblr_nlhsir3adc1sk2qobo1_12801.gif")',
  "background-size": "cover"
};


let Container = () => {
  return (
   <div >

     <div className = {styles.screen}>
       <input type = "checkbox" value = "None" className = {styles.magicButton} name="check" />
       <div> Input Box </div>
       <div className = {styles.coverImage} style = {divStyle}></div>
       <div className = {styles.bodyPlayer}></div>
       <div className = {styles.testing}> Partial Result Data </div>
      <Table />
     </div> 


   </div>
  );
};

module.exports = Container;