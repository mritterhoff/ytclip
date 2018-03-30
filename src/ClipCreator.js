import React from 'react';
import ClassNames from 'classnames';

import VideoIDInput from './VideoIDInput';
import SpeedButtons from './SpeedButtons';

/**
  https://www.youtube.com/watch?v=K8P8uFahAgc
  https://youtu.be/K8P8uFahAgc?t=6
*/

class ClipCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      videoId: undefined,
      start: 0,
      duration: 0,
      rate: 1
    }
  }

  newIdCB = (id) => {
    console.log(`new id is: ${id}`);
    this.setState({videoId: id});
  }

  newRateCB = (rate) => {
    console.log(`new rate is: ${rate}`);
    this.setState({rate: rate});
  }

  render() {
    return (
      <div className={ClassNames({ App: true, Debug: false })}>
        <h4>Instructions</h4>
        <ul>
          <li>TODO</li>
        </ul>
        <VideoIDInput 
          videoId={this.state.videoId || ''} 
          newIdCB={this.newIdCB}/>
        <span>YouTubePlayer goes here</span><br/>
        <span>Start time input goes here, text entry and button to grab current time?</span><br/>
        <span>Duration input goes here, if vid is playing, increment it accordingly?</span><br/>
        <SpeedButtons rate={this.state.rate} onClickCB={this.newRateCB} />
      </div>
    );
  }
}

export default ClipCreator;
