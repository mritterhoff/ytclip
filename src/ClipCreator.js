import React from 'react';
import ClassNames from 'classnames';

import VideoIDInput from './VideoIDInput';

class ClipCreator extends React.Component {
  render() {
    return (
      <div className={ClassNames({ App: true, Debug: false })}>
        <h4>Instructions</h4>
        <ul>
          <li>TODO</li>
        </ul>
        <VideoIDInput />
      </div>
    );
  }
}

export default ClipCreator;
