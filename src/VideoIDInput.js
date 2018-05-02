/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
// import ClassNames from 'classnames';

class VideoIDInput extends React.Component {
  onChange = (el) => {
    const url = el.target.value;
    console.log(url);
    this.props.newIdCB(extract(url));
  }

  render() {
    return (
      <div>
        <label htmlFor='textInput'>Youtube link:</label>
        <input id='textInput' size='32' onChange={this.onChange} />
        <span style={{ display: 'inline-block', marginLeft: '.2em' }}>
          VideoID: {this.props.videoId}
        </span>
      </div>
    );
  }
}

function extract(url) {
  // http://youclipper.com/?d=7.5&r=.75&s=2532&v=pI4T4C75H0U
  // 
  if (url.match(/^(?:https?:\/\/)?www.youtube.com/) || url.match(/^https?:\/\/youclipper.com\//)) {
    const vidMatch = url.match(/v=([A-Za-z0-9-]+)/);
    if (vidMatch) {
      return vidMatch[2];
    }
  }
  else if (url.match(/^https?:\/\/youtu.be\//)) {
    const vidMatch = url.match(/^https?:\/\/youtu.be\/([A-Za-z0-9-]+)/)
    if (vidMatch) {
      return vidMatch[1];
    }
  }

  return undefined;
}

export default VideoIDInput;
