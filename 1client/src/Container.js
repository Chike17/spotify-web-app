import React from 'react';
import styles from './styles.css';
import Table from './Table.js';
import Input from './Input.js';

let stock = 'https://angstyteenwatchingtoomuchtv.files.wordpress.com/2015/07/tumblr_nlhsir3adc1sk2qobo1_12801.gif")';

let Container = (props) => {
  console.log(props.firstcover, '##################');
  let divStyle = {
    'background': 'url(' + '"' + props.firstcover + '"' + ')',
    'background': 'url("https://angstyteenwatchingtoomuchtv.files.wordpress.com/2015/07/tumblr_nlhsir3adc1sk2qobo1_12801.gif")',
    'background-size': 'cover'
  };
  return (
   <div >

     <div className = {styles.screen}>
       <input type = "checkbox" value = "None" className = {styles.magicButton} name="check" />
       <Input setTrackList = {props.setTrackList} />
       <div className = {styles.coverImage} style = {divStyle}></div>
       <div className = {styles.bodyPlayer}></div>
       <div className = {styles.testing}> Partial Result Data </div>
      <Table tracklist = {props.tracklist}/>
     </div> 


   </div>
  );
};

module.exports = Container;