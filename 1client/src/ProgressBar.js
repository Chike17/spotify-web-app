import React from 'react';
import styles from './styles.css';
let url = 'http://static.kevvv.in/sounds/callmemaybe.mp3';

class ProgressBar extends React.Component {
  constructor (props) {
    super(props);
    this.ac = new ( window.AudioContext || webkitAudioContext )();
    this.url = url;
    this.fetch();
    this.state = {
      scrubberStyle: {width: 18},
    };
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.onDrag.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
  }
  fetch () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
      this.decode(xhr.response);
    }.bind(this);
    xhr.send();
  }
  decode ( arrayBuffer ) {
    this.ac.decodeAudioData(arrayBuffer, function( audioBuffer ) {
      this.buffer = audioBuffer;
      this.draw();
      this.play();
    }.bind(this));
  }
  connect () {
    if ( this.playing ) {
      this.pause();
    }
    this.source = this.ac.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.ac.destination);
  }
  play ( position ) {
    this.connect();
    this.position = typeof position === 'number' ? position : this.position || 0;
    this.startTime = this.ac.currentTime - ( this.position || 0 );
    this.source.start(this.ac.currentTime, this.position);
    this.playing = true;
  }
  pause () {
    if ( this.source ) {
      this.source.stop(0);
      this.source = null;
      this.position = this.ac.currentTime - this.startTime;
      this.playing = false;
    }
  }
  seek ( time ) {
    if ( this.playing ) {
      this.play(time);
    } else {
      this.position = time;
    }
  }
  updatePosition () {
    this.position = this.playing ? 
    this.ac.currentTime - this.startTime : this.position;
    if ( this.position >= this.buffer.duration ) {
      this.position = this.buffer.duration;
      this.pause();
    }
    return this.position;
  }
  toggle () {
    if ( !this.playing ) {
      this.play();
    } else {
      this.pause();
    }
  }
  onDrag ( e ) {
    let width;
    let position;
    if ( !this.dragging ) {
      return;
    }
    width = 236;
    position = this.startLeft + ( e.pageX - this.startX );
    position = Math.max(Math.min(width, position), 0);
    this.setState({scrubberStyle: {left: position}});
  }
  onClick(e) {
    let width;
    let position;
    if ( !this.dragging ) {
      return;
    }
    width = 236;
    position = this.startLeft + ( e.pageX - this.startX );
    position = Math.max(Math.min(width, position), 0);
    this.setState({scrubberStyle: {left: position}});
  }
  onMouseDown ( e ) {
    this.dragging = true;
    this.startX = e.pageX;
    this.startLeft = parseInt(this.state.scrubberStyle.left || 0, 10);
  }
  onMouseUp () {
    var width, left, time;
    if ( this.dragging ) {
      let width = 236;
      let left = parseInt(this.state.scrubberStyle.left || 0, 10);
      let time = left / width * this.buffer.duration;
      this.seek(time);
      this.dragging = false;
    }
  }
  draw () {
    let context = this;
    let progress = ( this.updatePosition() / context.buffer.duration );
    let width = 236;
    context.setState({progressStyle: {width: progress * width + 'px'} }, () => {
      if (!context.dragging) {
        context.setState({scrubberStyle: {width: context.state.scrubberStyle.width + 'px', left: progress * width + 'px'}});
      }
    });
    requestAnimationFrame(context.draw.bind(context));
  }
  render () {
    return (
     <div > 
        <div className= {styles.track} >
          <div className= {styles.progress} style = {this.state.progressStyle} > </div> 
          <div className= {styles.scrubber} onMouseDown = {this.onMouseDown.bind(this)} onDrag = {this.onDrag} style = {this.state.scrubberStyle} > </div> 
        </div>
     </div>
    );
  }
}

module.exports = ProgressBar;   



