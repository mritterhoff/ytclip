import React from 'react';
// import ClassNames from 'classnames';

import LoopingYoutubeVideo from './YouTubePlayer';
import SpeedButtons from './SpeedButtons';

class ClipPlayer extends React.Component {
  render() {
    const { urlMap, updateURL } = this.props;

    return (
      <div>
        <SpeedButtons rate={urlMap.r} onClickCB={updateURL} />
        <span id='youtubeLink'>
          <a href={`https://youtu.be/${urlMap.v}?t=${urlMap.s}`}>Open in Youtube</a>
        </span>
        <LoopingYoutubeVideo urlMap={urlMap} />
        <div id='debug' style={{ float: 'right' }}>
          <span>Debug info:</span>
          {Object.keys(urlMap).map(k => <span key={k}>{k}: {urlMap[k]}</span>)}
        </div>
      </div>
    );
  }
}

export default ClipPlayer;
