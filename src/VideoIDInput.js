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
  return undefined;
}

export default VideoIDInput;
