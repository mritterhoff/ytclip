/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
// import ClassNames from 'classnames';

class VideoIDInput extends React.Component {
  constructor() {
    super();
    this.state = {
      videoID: undefined
    };
  }

  newVideoID = () => {
    console.log(`found match: ${this.state.videoID}`);
  }

  onChange = (el) => {
    const url = el.target.value;
    console.log(url);

    const id = this.extract(url);
    if (id) {
      this.setState({ videoID: id }, this.newVideoID);
    }
    else {
      this.setState({ videoID: undefined });
    }
  }

  extract = (url) => {
    if (url.match(/^(?:https?:\/\/)?www.youtube.com/)) {
      const vidMatch = url.match(/v=([A-Za-z0-9-]+)/);
      if (vidMatch) {
        return vidMatch[2];
      }
    }
    if (url.match(/^https?:\/\/youtu.be\//)) {
      const vidMatch = url.match(/https?:\/\/youtu.be\/([A-Za-z0-9-]+)/);
      if (vidMatch) {
        return vidMatch[1];
      }
    }
    return false;
  }

  render() {
    return (
      <div>
        <label htmlFor='textInput'>Youtube link:</label>
        <input id='textInput' size='32' onChange={this.onChange} />
        <span style={{ display: 'inline-block', marginLeft: '.2em' }}>
          VideoID: {this.state.videoID}
        </span>
      </div>
    );
  }
}

export default VideoIDInput;
