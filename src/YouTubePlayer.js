// shamelessly borrowed from: https://stackoverflow.com/a/42281973/1188090
// https://developers.google.com/youtube/iframe_api_reference
// https://developers.google.com/youtube/player_parameters?playerVersion=HTML5

import React from 'react';
// import ClassNames from 'classnames';

// import Controls from './Controls';

function getStateName(state) {
  const names = {
    '-1': 'unstarted',
    '0': 'ended',
    '1': 'playing',
    '2': 'paused',
    '3': 'buffering',
    '5': 'video cued'
  };
  return `State: ${state} ${names[state]}`;
}

class YouTubePlayer extends React.Component {
  loadedPromise = null;
  isNowLoaded = null;

  constructor() {
    super();
    this.state = {
      player: undefined
    };

    // this is better than checking playbackrate every 100ms like the following:
    // if (this.state.player.getPlaybackRate() !== this.props.rate) {
    //   this.setSpeed(this.props.rate || 1);
    // }
    this.loadedPromise = new Promise((resolve) => { this.isNowLoaded = resolve; })
      .then(() => { this.playerLoaded(); });

    window.onYouTubePlayerAPIReady = this.onYouTubePlayerAPIReady.bind(this);
  }

  getInitialConfigs(options) {
    console.log('getting configs!', options);
    return {
      videoId: options.videoId,
      playerVars: {
        modestbranding: 1, // Hide the Youtube Logo
        cc_load_policy: 0, // Hide closed captions
        iv_load_policy: 3, // Hide the Video Annotations
        start: options.start,
        end: options.end,
        autohide: 0 // Hide video controls when playing
      },
      events: {
        onReady: (event) => { event.target.playVideo(); },
        onStateChange: this.onStateChange
      }
    };
  }

  onStateChange = (state) => {
    console.log(getStateName(state.data));

    // only call this once
    if (this.isNowLoaded && state.data > 0) {
      this.isNowLoaded();
      this.isNowLoaded = null;
    }
  }

  // Replace the 'ytplayer' element with an <iframe> and YouTube player after the API code downloads.
  onYouTubePlayerAPIReady() {
    this.setState({ player: new window.YT.Player('ytplayer', this.getInitialConfigs(this.props)) });
    console.log('onYouTubePlayerAPIReady got called!');
  }

  setSpeed = (speed) => {
    this.state.player.setPlaybackRate(speed);
  }

  seekTo = (time) => {
    this.state.player.seekTo(time);
    console.log(`seeked to ${time}`);
  }

  playerLoaded = () => {
    // In order to avoid cueing a new video, add an interval time to check the time every 100ms real time. Once end time is reached, will increment playCount and seek to new start
    setInterval(() => {
      const time = this.state.player.getCurrentTime();
      if (time >= this.props.end) {
        console.log('looping');
        this.state.player.seekTo(this.props.start);
      }
    }, 100);
  }

  // https://github.com/gajus/react-youtube-player/blob/master/src/index.js
  componentWillUnmount () {
    this.player.destroy();
  }

  render() {
    this.loadedPromise = this.loadedPromise.then(() => this.setSpeed(this.props.rate || 1));

    return (
      <div>
        <div id='ytplayer' />
      </div>
    );
  }
}


export default YouTubePlayer;
