import React from 'react';
import styles from './styles.css';
import Table from './Table.js';
import Input from './Input.js';
import ProgressBar from './ProgressBar.js';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playPrev: '',
      playNext: '',
      toggle: '',
      clickEvent: '',
      onStartPlay: null,
      onStartPause: null,
      setPause: null,
      progress: '00',
      duration: '17:17',
      appStarted: false,
      song: 'No Songs in Queue',
      artist: 'Please Go Into Search Mode',
      by: '',
      makeContext: null,
      trackNumber: 0,
      endTime: '0:00',
      partials: [
        { song: '', artist: '' },
        { song: '', artist: '' },
        { song: '', artist: '' },
        { song: '', artist: '' },
        { song: '', artist: '' },
      ],
    };
  }
  componentWillReceiveProps(nextProps) {
    let context = this;
    let infoFiltered = nextProps.topResults.map((info) => {
      if (info['song'].length > 20) {
        let song = info['song'].substring(0, 17) + '...';
        info['song'] = song;
      }
      if (info['artist'].length > 20) {
        let artist = info['artist'].substring(0, 17) + '...';
        info['artist'] = artist;
      }
      return info;
    });
    this.setState({ partials: infoFiltered });
  }
  shouldComponentUpdate(nextProps) {
    let displaySA = this.props.songAndArtist;
    if (displaySA.song.length > 20) {
      displaySA['song'] = displaySA.song.substring(0, 12) + '...';
    }
    if (displaySA.song.artist > 20) {
      displaySA['artist'] = displaySA.artist.substring(0, 12) + '...';
    } else {
      this.setState({
        song: displaySA.song,
        artist: displaySA.artist,
        trackNumber: displaySA.trackNumber,
      });
    }
    if (this.props.urls.length > 1) {
      this.setState({ endTime: '0:30' });
    }
    this.setState({ by: 'by' });
    return true;
  }
  updateProgress(progress) {
    this.setState({ progress: progress });
  }
  render() {
    let context = this;
    let divStyle = {
      background: 'url(' + '"' + this.props.cover + '"' + ')',
      backgroundSize: 'cover',
    };
    let inputStyle = {
      left: '100px',
      'background-color': 'black',
    };
    this.state.appStarted = true;
    return (
      <div>
        <div className={styles.screen}>
          <div className={styles.searchMode}> Search Mode </div>
          <input type="checkbox" className={styles.magicButton} />
          <div className={styles.coverImage} style={divStyle}>
            {' '}
          </div>
          <div className={styles.newTracks}></div>
          <Input
            setTrackList={this.props.setTrackList}
            getpreResults={this.props.getpreResults}
            makeContext={this.state.makeContext}
            setPause={this.state.setPause}
          />
          <p className={styles.userMessageContainer}>
            {this.props.userMessage}{' '}
          </p>
          <div className={styles.containPre}>
            <div className={styles.threeResultsContainer}>
              {this.state.partials.map((item, index) => (
                <div key={index}>
                  {' '}
                  {item.song + ' '} {this.state.by} {' ' + item.artist}{' '}
                </div>
              ))}
            </div>
            <div className={styles.bodyPlayer}> </div>
          </div>
          <Table
            tracklist={this.props.tracklist}
            stopSong={this.props.stopSong}
            playPrev={this.state.playPrev}
            playNext={this.state.playNext}
            clickE={this.state.clickEvent}
            toggle={this.state.toggle}
            container={this}
          />
          <div className={styles.songArtistContainer}>
            <div className={styles.song}>
              <h4>
                {' '}
                {this.state.trackNumber + 1 + '. '} {this.state.song}{' '}
              </h4>{' '}
            </div>
            <div className={styles.artist}>
              <h5> {this.state.artist} </h5>
            </div>
          </div>
          <div className={styles.progresscontainer}>
            <div className={styles.running}> {'0:' + this.state.progress} </div>
            <div>
              <ProgressBar
                urls={this.props.urls}
                container={this}
                changeCover={this.props.changeCover}
                updateProgress={this.updateProgress.bind(this)}
                partialStatus={this.props.partialStatus}
                changeSongAndArtist={this.props.changeSongAndArtist}
                onStartPlay={this.state.onStartPlay}
                onStartPause={this.state.onStartPause}
                makeContext={this.state.makeContext}
                setInputStatus={this.props.setInputStatus}
                setErrorMessage={this.props.setErrorMessage}
              />
            </div>
            <div className={styles.endTime}> {this.state.endTime} </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Container;
