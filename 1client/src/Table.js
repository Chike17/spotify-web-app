import React from 'react';
import styles from './styles.css';

let Table = () => {
  return (
   <div >
    <div className = {styles.listcontainer}>
    <div className= {styles.scrollcontainer}>
    <table className= {styles.list}>
    <tbody>

      <tr className= {styles.song} >

      <td className={styles.nr}>
        <h5>1</h5> </td>
            <td className={styles.title}><h6>Heavydirtysoul</h6></td>
            <td className={styles.length}><h5>3:54</h5></td>
            <td><input type="checkbox" className={styles.heart}/><label className={styles.zmr} htmlFor= {styles.heart} ></label></td>
       </tr>
        
          <tr className={styles.song}>
            <td className={styles.nr}><h5>2</h5></td>
            <td className={styles.title}><h6 styles ="color: #ff564c;">StressedOut</h6></td>
            <td className={styles.length}><h5>3:22</h5></td>
            <td><input type="checkbox" className={styles.heart1} checked /><label className={styles.zmr} htmlFor= {styles.heart1}></label></td>
          </tr>
        
          <tr className={styles.song}>
            <td className={styles.nr}><h5>3</h5></td>
            <td className={styles.title}><h6>Ride</h6></td>
            <td className={styles.length}> <h5>3:34</h5></td>
            <td><input type="checkbox" className={styles.heart2}/><label className={styles.zmr} htmlFor= {styles.heart2}></label></td>
          </tr>
        
          <tr className={styles.song}>
            <td className={styles.nr}><h5>4</h5></td>
            <td className={styles.title}><h6>Fairy Local</h6></td>
            <td className={styles.length}><h5>3:27</h5></td>
            <td><input type="checkbox" className={styles.heart3} checked /><label className={styles.zmr} htmlFor={styles.heart3}></label></td>
          </tr>
          
          <tr className={styles.song}>
            <td className={styles.nr}><h5>5</h5></td>
            <td className={styles.title}><h6>Tear in My Heart</h6></td>
            <td className={styles.length}><h5>3:08</h5></td>
            <td><input type="checkbox" className= {styles.heart4}/><label className={styles.zmr} htmlFor= {styles.heart4}></label></td>
          </tr>
          
          <tr className={styles.song}>
            <td className={styles.nr}><h5>6</h5></td>
            <td className={styles.title}><h6>Lane Boy</h6></td>
            <td className={styles.length}><h5>4:13</h5></td>
            <td><input type="checkbox" className={styles.heart5}/><label className={styles.zmr} htmlFor={styles.heart5}></label></td>
          </tr>
          
          <tr className={styles.song}>
            <td className={styles.nr}><h5>7</h5></td>
            <td className={styles.title}><h6>The Judge</h6></td>
            <td className={styles.length}><h5>4:57</h5></td>
            <td><input type="checkbox" className={styles.heart6}/><label className={styles.zmr} htmlFor={styles.heart6}></label></td>
          </tr>
          
          <tr className={styles.song}>
            <td className={styles.nr}><h5>8</h5></td>
            <td className={styles.title}><h6>Doubt</h6></td>
            <td className={styles.length}><h5>3:11</h5></td>
            <td><input type="checkbox" className={styles.heart7}/><label className={styles.zmr} htmlFor={styles.heart7}></label></td>
          </tr>
          
          <tr className={styles.song}>
            <td className={styles.nr}><h5>9</h5></td>
            <td className={styles.title}><h6>Polarize</h6></td>
            <td className={styles.length}><h5>3:46</h5></td>
            <td><input type="checkbox" className= {styles.heart8}/><label className={styles.zmr} htmlFor={styles.heart8}></label></td>
          </tr>

         </tbody>
        </table>

        </div>
        </div>
        
        <div className={styles.bar}></div>
        
        <div className={styles.info}>
        
        </div>

        <audio preload="auto" className={styles.audio} controls>
         <source src="http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3"/>
         <source src="http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.ogg"/>
       </audio>

        <table className={styles.player}>
          <tbody>
            <td><input type="checkbox" className={styles.backward}/><label className={styles.backward} htmlFor={styles.backward}></label></td>
            <td><input type="checkbox" className={styles.play} title="Play" onclick="togglePlayPause()"/><label className={styles.play} htmlFor={styles.play}></label></td>
            <td><input type="checkbox" className={styles.forward}/><label className={styles.forward}htmlFor={styles.forward}></label></td>
          </tbody>
        </table>

   </div>

  );
};

module.exports = Table;