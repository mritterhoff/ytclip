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

  letterToAction = {
    v: (value) => this.setState({videoId: value}),
    s: (value) => this.setState({start: value}),
    d: (value) => this.setState({duration: value}),
    r: (value) => this.setState({rate: value})
  }

  fieldChange = (field, el) => {
    let value =  el.target.value;
    console.log(field, value);
    this.letterToAction[field](value);
  }

  getLink() {
    let placeholder = '___';
    let params = {
      v: this.state.videoId || placeholder,
      s: this.state.start || placeholder,
      d: this.state.duration || placeholder,
      r: this.state.rate || placeholder
    };

    return `http://youclipper.com/?v=${params.v}&s=${params.s}&d=${params.d}&r=${params.r}`;
  }

  render() {
    return (
      <div className={ClassNames({ App: true, Debug: false })}>
        <span>Youtube clip sharing made easy!</span><br/>
        <span>Until this page has a friendlier UI, you can construct the URL with the following fields:</span><br/>
        <div>
          <label htmlFor='textInput'>Youtube videoID:</label>
          <input value={this.state.videoID} id='textInput' size='15' onChange={(el) => this.fieldChange('v', el)} />
        </div>
        <div>
          <label htmlFor='textInput'>Start time (ssss or mm:ss)</label>
          <input value={this.state.start} id='textInput' size='5' onChange={(el) => this.fieldChange('s', el)} />
        </div>
        <div>
          <label htmlFor='textInput'>Duration in seconds</label>
          <input value={this.state.duration} id='textInput' size='5' onChange={(el) => this.fieldChange('d', el)} />
        </div>
        <div>
          <label htmlFor='textInput'>Playback rate (.25, .5, .75, 1)</label>
          <input value={this.state.rate} id='textInput' size='2' onChange={(el) => this.fieldChange('r', el)} />
        </div>

        <span>Link to use: <a href={this.getLink()}>{this.getLink()}</a></span>
      </div>
    );
  }


  // render() {
  //   return (
  //     <div className={ClassNames({ App: true, Debug: false })}>
  //       <h4>Instructions</h4>
  //       <ul>
  //         <li>TODO</li>
  //       </ul>
  //       <VideoIDInput 
  //         videoId={this.state.videoId || ''} 
  //         newIdCB={this.newIdCB}/>
  //       <span>YouTubePlayer goes here</span><br/>
  //       <span>Start time input goes here, text entry and button to grab current time?</span><br/>
  //       <span>Duration input goes here, if vid is playing, increment it accordingly?</span><br/>
  //       <SpeedButtons rate={this.state.rate} onClickCB={this.newRateCB} />
  //     </div>
  //   );
  // }
}

export default ClipCreator;
