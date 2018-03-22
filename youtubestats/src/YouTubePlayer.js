import React from 'react';
// import ClassNames from 'classnames';

let playbackSpeeds = [
  {
    speed: 1,
    start: 37,
    end: 50
  },
  {
    speed: 0.25,
    start: 40,
    end: 44
  }
];
let player, playCount = 0;

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
  constructor() {
    super();
    console.log('in constructor')
    window.onYouTubePlayerAPIReady = this.onYouTubePlayerAPIReady.bind(this);
  }

  // shamelessly borrowed from: https://stackoverflow.com/a/42281973/1188090
// https://developers.google.com/youtube/iframe_api_reference
// https://developers.google.com/youtube/player_parameters?playerVersion=HTML5




onStateChange(state) {
  console.log(getStateName(state.data));
  if (state.data === window.YT.PlayerState.PLAYING) {
    console.log(`updating speed to: ${playbackSpeeds[playCount].speed}`);
    player.setPlaybackRate(playbackSpeeds[playCount].speed);
  }
}

onPlayerReady(event) {
  event.target.playVideo();
}

getInitialConfigs(options) {
  console.log('getting configs!', options);
  return {
    // height: '100%',
    // width: '100%',
    videoId: 'hr1plibwDPA',
    playerVars: {
      // controls: 0, // Show pause/play buttons in player
      // showinfo: 0, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      // fs: 1, // Hide the full screen button
      cc_load_policy: 0, // Hide closed captions
      iv_load_policy: 3, // Hide the Video Annotations
      start: options.start,
      end: options.end,
      autohide: 0 // Hide video controls when playing
    },
    events: {
      onReady: this.onPlayerReady.bind(this),
      onStateChange: this.onStateChange.bind(this)
    }
  };
}


// Replace the 'ytplayer' element with an <iframe> and YouTube player after the API code downloads.
onYouTubePlayerAPIReady() {
  player = new window.YT.Player('ytplayer', this.getInitialConfigs(playbackSpeeds[playCount]));
  alert('got called!');

  // In order to avoid cueing a new video, add an interval time to check the time every 100ms real time. Once end time is reached, will increment playCount and seek to new start
  setInterval(() => {
    if (player.getCurrentTime) { // not initially available
      const time = player.getCurrentTime();
      // console.log(time);
      if (time >= playbackSpeeds[playCount].end) {
        console.log('Switching to next speed');
        playCount = (playCount + 1) % playbackSpeeds.length;
        player.seekTo(playbackSpeeds[playCount].start);
      }
    }
  }, 100);
}

  printTime() {
    const textArea = document.getElementById('textArea');
    const newSpan = document.createElement('span');
    newSpan.innerHTML = player.getCurrentTime().toFixed(2);
    textArea.prepend(newSpan);
  }

  render() {
    return (
      <div>
        <div id='ytplayer'/>
        <button id='button1' onClick={this.printTime}>Print time</button>
        <br />
        <div id='textArea' />
      </div>
    );
  }
}


export default YouTubePlayer;
