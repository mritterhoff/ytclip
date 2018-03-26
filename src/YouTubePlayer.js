import React from 'react';
// import ClassNames from 'classnames';

import EventLog from './EventLog';
import Controls from './Controls';

const settings = {
  speed: 1,
  start: 1,
  end: 500
};

let player;

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

const teammates = 'Andrew Avi Chris Hoff Jiyu Mark Sue'.split(' ');


class YouTubePlayer extends React.Component {
  constructor() {
    super();
    console.log('in constructor');
    this.state = {
      events: [],
      loaded: false
    };
    window.onYouTubePlayerAPIReady = this.onYouTubePlayerAPIReady.bind(this);
  }

  // shamelessly borrowed from: https://stackoverflow.com/a/42281973/1188090
  // https://developers.google.com/youtube/iframe_api_reference
  // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5


  onStateChange = (state) => {
    console.log(getStateName(state.data));
    if (!this.state.loaded && state.data > 0) {
      // we're loaded now!
      this.setState(() => ({ loaded: true }));
      this.playerLoaded();
    }
  }

  onPlayerReady = (event) => {
    event.target.playVideo();
  }

  getInitialConfigs(options) {
    console.log('getting configs!', options);
    return {
      videoId: 'pI4T4C75H0U', // game 8
      playerVars: {
        modestbranding: 1, // Hide the Youtube Logo
        cc_load_policy: 0, // Hide closed captions
        iv_load_policy: 3, // Hide the Video Annotations
        start: options.start,
        end: options.end,
        autohide: 0 // Hide video controls when playing
      },
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onStateChange
      }
    };
  }

  // Replace the 'ytplayer' element with an <iframe> and YouTube player after the API code downloads.
  onYouTubePlayerAPIReady() {
    player = new window.YT.Player('ytplayer', this.getInitialConfigs(settings));
    console.log('onYouTubePlayerAPIReady got called!');
  }

  // save the given event in chrono order
  saveEvent = (event) => {
    this.setState((prevState) => {
      const { events } = prevState;
      events.push(event);
      events.sort((a, b) => a.time - b.time);
      return events;
    });
  }

  setSpeed = (speed) => {
    player.setPlaybackRate(speed);
  }

  seekTo = (time) => {
    player.seekTo(time);
    console.log(`seeked to ${time}`);
  }

  playerLoaded = () => {
    // In order to avoid cueing a new video, add an interval time to check the time every 100ms real time. Once end time is reached, will increment playCount and seek to new start
    setInterval(() => {
      const time = player.getCurrentTime();
      if (time >= settings.end) {
        console.log('looping');
        player.seekTo(settings.start);
      }
    }, 100);
  }

  deleteEvent = (indexToDelete) => {
    this.setState((prevState) => {
      const { events } = prevState;
      events.splice(indexToDelete, 1);
      return events;
    });
  }

  getTime = () => player.getCurrentTime().toFixed(2);

  render() {
    return (
      <div>
        <div id='ytplayer' />
        <Controls
          teammates={teammates}
          saveEvent={this.saveEvent}
          getTime={this.getTime}
          setSpeed={this.setSpeed}
          enabled={this.state.loaded}
        />
        <br />
        <EventLog
          events={this.state.events}
          seekToCB={this.seekTo}
          deleteEventCB={this.deleteEvent}
        />
      </div>
    );
  }
}


export default YouTubePlayer;
