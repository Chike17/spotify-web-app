import React from 'react';
import styles from './styles.css';
let url = 'http://static.kevvv.in/sounds/callmemaybe.mp3';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.url = url;
    this.state = {
      url: '',
      trackNumber: 0,
      progress: 0,
      urlsTracker: [],
      realSubmit: false,
    };
    const container = this.props.container;
    container.playPrev = this.playPreviousSong.bind(this);
    container.playNext = this.playNextSong.bind(this);
    container.toggle = this.toggle.bind(this);
    container.clickEvent = this.playOnClick.bind(this);
    container.makeContext = this.makeContext.bind(this);
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.onDrag.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
  }
  makeContext() {
    this.ac = new (window.AudioContext || webkitAudioContext)();
  }
  componentWillReceiveProps(nextProps) {
    let context = this;
    if (this.hitNext) {
      this.hitNext = false;
      return;
    }
    if (this.hitPrevious) {
      this.hitPrevious = false;
      return;
    }
    if (!this.props.partialStatus) {
      this.makeContext();
      this.pause();
      this.position = 0;
      this.setState(
        {
          realSubmit: true,
          trackNumber: 0,
          urlsTracker: [...this.state.urlsTracker, nextProps.urls],
          url: nextProps.urls[context.state.trackNumber],
          urls: nextProps.urls,
        },
        () => {
          context.fetch();
        }
      );
    }
  }
  fetch() {
    const context = this;
    if (!this.state.realSubmit) {
      return;
    }
    var xhr = new XMLHttpRequest();
    const url = context.state.urls[context.state.trackNumber];
    if (url) {
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function () {
        this.decode(xhr.response);
      }.bind(this);
      xhr.send();
    }
  }
  decode(arrayBuffer) {
    this.ac
      .decodeAudioData(
        arrayBuffer,
        function (audioBuffer) {
          this.buffer = audioBuffer;
          this.draw();
          this.play();
        }.bind(this)
      )
      .catch((err) => {
        console.log(err, 'decode error!!!');
        this.props.setErrorMessage();
      });
  }
  connect() {
    if (this.playing) {
      this.pause();
    }
    this.source = this.ac.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.ac.destination);
  }
  play(position) {
    this.connect();
    this.position =
      typeof position === 'number' ? position : this.position || 0;
    this.startTime = this.ac.currentTime - (this.position || 0);
    this.source.start(this.ac.currentTime, this.position);
    this.playing = true;
  }
  pause() {
    if (this.source) {
      this.source.stop(0);
      this.source = null;
      this.position = this.ac.currentTime - this.startTime;
      this.playing = false;
    }
  }
  seek(time) {
    if (this.playing) {
      this.play(time);
    } else {
      this.position = time;
    }
  }
  updatePosition() {
    this.position = this.playing
      ? this.ac.currentTime - this.startTime
      : this.position;
    if (this.position >= this.buffer.duration) {
      this.position = this.buffer.duration;
      this.pause();
    }
    return this.position;
  }
  toggle() {
    if (!this.playing) {
      this.play();
    } else {
      this.pause();
    }
  }

  onDrag(e) {
    if (!this.dragging) {
      return;
    }
    let width = 300;
    let position = this.startLeft + (e.pageX - this.startX);
    position = Math.max(Math.min(width, position), 0);
    this.setState({ scrubberStyle: { left: position } });
  }
  onMouseDown(e) {
    this.dragging = true;
    this.startX = e.pageX;
    this.startLeft = parseInt(this.state.scrubberStyle.left || 0, 10);
  }
  onMouseUp() {
    if (this.dragging) {
      let width = 300;
      let left = parseInt(this.state.scrubberStyle.left || 0, 10);
      let time = (left / width) * this.buffer.duration;
      this.seek(time);
      this.dragging = false;
    }
  }
  playNextSong() {
    this.pause();
    this.hitNext = true;
    let newTrackNumber = this.state.trackNumber;
    newTrackNumber++;
    this.setState({ trackNumber: newTrackNumber });
    if (this.state.trackNumber === this.state.urls.length) {
      this.pause();
      this.state.trackNumber = 0;
    }
    this.position = 0;
    this.props.changeCover(this.state.trackNumber);
    this.props.changeSongAndArtist(this.state.trackNumber);
    this.props.onStartPause();
    this.fetch();
    return;
  }
  playPreviousSong() {
    this.pause();
    this.hitPrevious = true;
    let newTrackNumber = this.state.trackNumber;
    newTrackNumber--;
    this.setState({ trackNumber: newTrackNumber });
    this.position = 0;
    if (this.state.trackNumber < 0) {
      this.pause();
      this.props.onStartPlay();
      this.state.trackNumber = 0;
      return;
    }
    this.props.changeCover(this.state.trackNumber);
    this.props.changeSongAndArtist(this.state.trackNumber);
    this.props.onStartPause();
    this.fetch();
    return;
  }
  playOnClick(index) {
    index = index - 1;
    this.pause();
    this.setState({ trackNumber: index });
    this.position = 0;
    this.props.changeCover(index);
    this.props.changeSongAndArtist(index);
    this.props.onStartPause();
    this.fetch();
    return;
  }
  passProgress(progress) {
    progress = progress * 30;
    progress = Math.round(progress, 1);
    progress = JSON.stringify(progress);
    if (progress.length < 2) {
      progress = '0' + progress;
    }
    this.props.updateProgress(progress);
  }
  draw() {
    if (this.buffer.duration === this.position) {
      let newTrackNumber = this.state.trackNumber;
      newTrackNumber++;
      this.setState({ trackNumber: newTrackNumber }, () => {
        this.position = 0;
        this.fetch();
        this.props.changeCover(this.state.trackNumber);
        this.props.changeSongAndArtist(this.state.trackNumber);
        this.props.onStartPause();
        return;
      });
    }
    if (this.state.trackNumber === this.state.urls.length) {
      this.setState({ trackNumber: 0 }, () => {
        this.position = 0;
        this.fetch();
        this.props.changeCover(this.state.trackNumber);
        this.props.changeSongAndArtist(this.state.trackNumber);
        this.props.onStartPause();
      });
    }
    const context = this;
    const progress = this.updatePosition() / context.buffer.duration;
    this.state.progress = progress;
    this.passProgress(progress);
    let width = 300;
    context.setState(
      { progressStyle: { width: this.state.progress * width + 'px' } },
      () => {}
    );
    requestAnimationFrame(context.draw.bind(context));
  }
  render() {
    return (
      <div>
        <div className={styles.track}>
          <div className={styles.progress} style={this.state.progressStyle}>
            {' '}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ProgressBar;
